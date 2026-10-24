---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: 使用 Git Hooks 自动设置创建和修改日期
featured: false
draft: true
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: 了解如何使用 Git Hooks 在 AstroPaper 中自动设置文章的创建和修改日期。
---

本文介绍如何使用 Git 的 pre-commit hook，在 AstroPaper 主题的 frontmatter 中自动填写创建日期（`pubDatetime`）和修改日期（`modDatetime`）。

## 目录

## 让 Hook 在各处可用

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 很适合自动执行各种任务，例如在提交信息中[添加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea)或[检查](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)分支名称，或[阻止提交明文密钥](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)。它们最大的缺点是客户端 Hook 只对单台机器生效。

你可以在项目中创建 `hooks` 目录，再手动将 Hook 复制到 `.git/hooks`，或者创建符号链接。但这些操作都需要记得手动设置，而我总是容易忘记。

由于这个项目使用 npm，我们可以借助 [Husky](https://typicode.github.io/husky/)（AstroPaper 已安装）自动为我们安装这些 Hook。

> 更新：从 AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0) 起，项目改用 GitHub Actions，移除了 pre-commit hook。不过，你仍然可以自行[安装 Husky](https://typicode.github.io/husky/get-started.html)。

## Hook 的配置

我们希望在提交代码时运行这个 Hook 来更新日期，并将日期更新作为本次更改的一部分，因此会使用 `pre-commit` hook。AstroPaper 项目已经完成了相关设置；如果没有，可以运行 `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`。

打开 `hooks/pre-commit` 文件，添加以下代码片段中的一个或两个。

### 文件编辑时更新修改日期

---

更新：

本节已更新为更智能的 Hook 版本：文章发布之前不会更新 `modDatetime`。首次发布时，将草稿状态设为 `first`，其余工作会自动完成。

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` 会列出已暂存、准备提交的文件。输出类似这样：

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

行首字母表示文件发生的操作；上例中的文件是新增文件。修改过的文件以 `M` 表示。

我们将输出传给 grep，筛选其中已修改的文件。目标行需要以 `M` 开头（`^(M)`），后面可以有任意字符（`.*`），并以 `.md` 扩展名结尾（`.(md)$`）。这样便能过滤掉未修改的 Markdown 文件：`egrep -i "^(M).*\.(md)$"`。

---

#### 改进：进一步限定范围

还可以进一步限定为只检查 `blog` 目录中的 Markdown 文件，因为只有这些文件才包含所需的 frontmatter。

---

正则表达式会捕获两个部分：操作标记和文件路径。接下来将文件列表传入 while 循环，逐行处理匹配结果，并将操作标记赋给 `a`、路径赋给 `b`。这里暂时不使用 `a`。

为了判断文件的草稿状态，需要读取其 frontmatter。下面的代码先用 `cat` 获取文件内容，再用 `awk` 按 frontmatter 分隔符（`---`）切分文件，并取第二段（即两条 `---` 之间的 frontmatter）。然后再次使用 `awk` 查找 `draft` 字段并打印它的值。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

现在已经得到 `draft` 的值，接下来会执行三种操作之一：当草稿状态为 `false` 时，将 `modDatetime` 设置为当前时间；当草稿状态为 `first` 时，清空 `modDatetime` 并将草稿状态设为 `false`；其他情况下则不做任何操作。

接下来使用的 `sed` 命令对我来说有点神奇，因为我不常用它。这部分代码来自[另一篇介绍类似做法的文章](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/)。简单来说，它会在文件的 frontmatter（两条 `---` 之间）查找 `pubDatetime:` 字段，获取整行并将其替换为同名字段及格式正确的当前日期时间。

替换操作针对整个文件执行，因此会先将结果写入临时文件（`> tmp`），然后用 `mv` 将其移动到原文件位置并覆盖原文件。最后将更新后的文件添加到 Git 暂存区，准备提交。

---

#### 注意

要使 `sed` 正常工作，frontmatter 中必须已经存在 `modDatetime` 字段。如果要让应用支持空日期，还需要进行其他修改，详见[下文](#empty-moddatetime-changes)。

---

### 为新文件添加日期

为新文件添加日期的过程与上面类似，但这次需要查找新增的文件（`A`），并替换 `pubDatetime` 的值。

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### 改进：只循环一次

可以在循环中使用变量 `a` 判断文件操作类型，从而在一次循环中完成更新 `modDatetime` 或添加 `pubDatetime`。

---

## 填写 frontmatter

如果你的 IDE 支持代码片段，可以创建自定义片段来填写 frontmatter。[AstroPaper v4 默认提供了 VS Code 代码片段。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 允许 `modDatetime` 为空

为了让 Astro 编译 Markdown，需要知道 frontmatter 的字段结构。这些配置位于 `src/content/config.ts`。

若要允许字段存在但不填写值，需要添加 `.nullable()`：

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

为了避免 IDE 在博客引擎文件中报错，我还做了以下修改：

1. 在 `src/layouts/Layout.astro` 中添加 `| null`，结果如下：

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. 在 `src/components/Datetime.tsx` 中添加 `| null`，结果如下：

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
