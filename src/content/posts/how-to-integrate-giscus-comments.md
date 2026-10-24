---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: 如何在 AstroPaper 中集成 Giscus 评论
slug: how-to-integrate-giscus-comments
featured: false
draft: true
tags:
  - astro
  - blog
  - docs
description: 使用 Giscus 为托管在 GitHub Pages 上的静态博客添加评论功能。
---

将轻量级静态博客托管在 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) 等平台上有很多优点，但也意味着网站的交互能力有限。好在可以使用 [Giscus](https://giscus.app/) 在静态网站中嵌入评论功能。

## 目录

## _Giscus_ 的工作方式

[Giscus 使用 GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works)，在关联仓库的 `Discussions` 中读取和保存 _GitHub_ 用户的评论。

只需在网站中嵌入 _Giscus_ 客户端脚本并配置正确的仓库地址，用户登录 _GitHub_ 后即可查看和发布评论。

这种方案无需服务器：评论存储在 _GitHub_ 上，并由客户端动态加载，因此非常适合 _AstroPaper_ 这样的静态博客。

## 设置 _Giscus_

可以在 [giscus.app](https://giscus.app/) 上轻松完成 _Giscus_ 的设置，下面简要说明相关步骤。

### 前置条件

要让 _Giscus_ 正常工作，需要满足以下条件：

- 仓库必须是[公开仓库](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)；
- 已安装 [Giscus 应用](https://github.com/apps/giscus)；
- 仓库已启用 [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) 功能。

如果无法满足上述任一条件，就无法集成 _Giscus_。

### 配置 _Giscus_

接下来需要配置 _Giscus_。大多数情况下，默认选项已经够用；只有在明确了解配置含义并且有特定需求时，才需要修改它们。即使选错也不必担心，之后随时可以调整。

但你仍需要：

- 为界面选择合适的语言；
- 指定要关联的 _GitHub_ 仓库，通常是托管 _AstroPaper_ 博客的仓库；
- 如果不希望他人直接在 _GitHub_ 上随意创建讨论，可创建并指定一个 `Announcement` 类型的讨论；
- 设置配色方案。

完成配置后，_Giscus_ 会生成一个 `<script>` 标签，后续步骤会用到它。

## 使用简单的 script 标签

此时你应该会得到类似下面的 script 标签：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

将其添加到网站源代码即可。如果你使用 _AstroPaper_ 并希望为文章添加评论，可以打开 `PostDetails.astro`，将代码粘贴到希望显示评论的位置，例如 `Share this post on:` 按钮下方。

```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <!-- [!code ++:6] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```

完成！你已经成功在 _AstroPaper_ 中集成评论功能。

## 支持浅色/深色主题的 React 组件

布局中嵌入的 script 标签是静态的，_Giscus_ 配置（包括 `theme`）都直接写在布局里。由于 _AstroPaper_ 支持浅色/深色主题切换，如果评论区也能跟随网站主题切换，体验会更好。要实现这一点，需要采用更灵活的方式嵌入 _Giscus_。

首先安装 _Giscus_ 的 [React 组件](https://www.npmjs.com/package/@giscus/react)：

```bash
npm i @giscus/react && npx astro add react
```

然后在 `src/components` 中创建一个新的 React 组件 `Comments.tsx`：

```tsx file=src/components/Comments.tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

这个 _React_ 组件不仅封装了原生的 _Giscus_ 组件，还新增了 `lightTheme` 和 `darkTheme` 两个属性。通过两个事件监听器，_Giscus_ 评论区可以与网站主题保持一致，并在网站或浏览器主题变化时动态切换浅色和深色主题。

还需要定义 `GISCUS` 配置，建议将其放在 `constants.ts` 中：

```ts file=src/constants.ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```

请注意，如果在这里指定 `theme`，它会覆盖 `lightTheme` 和 `darkTheme` 属性，导致主题固定不变，效果与前面直接嵌入 `<script>` 标签的方式相同。

最后，将新的 Comments 组件添加到 `PostDetails.astro` 中，替换前一步添加的 `script` 标签：

```jsx file=src/layouts/PostDetails.astro
// [!code ++:1]
import Comments from "@/components/Comments";

<ShareLinks />

// [!code ++:1]
<Comments client:only="react" />

<hr class="my-6 border-dashed" />

<Footer />
```

这样就完成了。
