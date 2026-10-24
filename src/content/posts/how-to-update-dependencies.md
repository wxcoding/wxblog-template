---
title: 如何更新 AstroPaper 的依赖
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: true
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: 如何更新项目依赖以及 AstroPaper 模板。
---

更新项目依赖可能很繁琐，但完全不更新依赖也不是好主意 😬。本文将以 AstroPaper 为例，介绍我通常采用的项目更新方式。这些步骤也适用于其他 JavaScript/Node.js 项目。

![阿甘的仿造名言](@/assets/images/forrest-gump-quote.png)

## 目录

## 更新软件包依赖

更新依赖有多种方式，我尝试过不同方法来寻找最简单的做法。一种方式是使用 `npm install package-name@latest` 逐个手动更新软件包。这是最直接的方式，但未必最高效。

我推荐使用 [npm-check-updates 软件包](https://www.npmjs.com/package/npm-check-updates)来更新依赖。freeCodeCamp 有一篇很好的[相关文章](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)，因此这里不再详细介绍该工具本身，而是分享我通常采用的更新流程。

首先，全局安装 `npm-check-updates`：

```bash
npm install -g npm-check-updates
```

更新之前，先查看有哪些依赖可以升级：

```bash
ncu
```

大多数情况下，更新补丁版本不会影响项目。因此，我通常运行 `ncu -i --target patch` 或 `ncu -u --target patch` 来更新补丁版本。两者的区别是：`ncu -u --target patch` 会更新所有补丁版本，而 `ncu -i --target patch` 会让你选择要更新的软件包。选择哪种方式取决于你的需要。

接下来更新次要版本。次要版本通常不会破坏项目，但仍建议查看对应软件包的发布说明。这些更新往往还会带来一些可以应用到项目中的新功能。

```bash
ncu -i --target minor
```

最后，依赖中可能还会有一些主版本更新。运行下面的命令检查剩余更新：

```bash
ncu -i
```

如果还有主版本更新（或其他待处理更新），上面的命令会列出相应的软件包。主版本升级很可能导致整个项目无法正常运行，因此务必仔细阅读对应的发布说明或文档，并据此调整项目。

如果运行 `ncu -i` 后没有发现待更新的软件包，_**恭喜！**_ 你已经成功更新了项目中的所有依赖。

## 更新 AstroPaper 模板

和其他开源项目一样，AstroPaper 也会持续修复 Bug、更新功能。如果你使用 AstroPaper 作为模板，在新版本发布时可能也会想要更新模板。

不过，你可能已经根据自己的需求修改过模板，因此不存在一种适用于所有人的完美更新方式。下面提供一些避免破坏仓库的更新建议。请记住，大多数情况下，只更新软件包依赖就足够了。

### 需要留意的文件和目录

通常不建议直接覆盖你已经修改过的文件和目录，例如 `src/content/blog/`、`src/config.ts`、`src/pages/about.md`，以及 `public/` 和 `src/styles/base.css` 等资源和样式。

如果你只对模板做了少量修改，除了上述文件和目录之外，直接用最新版 AstroPaper 替换其他内容通常没有问题。就像原生 Android 和 OneUI 等厂商定制系统：对基础模板改动越少，后续需要更新的内容也越少。

你可以逐个手动替换文件，也可以借助 Git 更新整个项目。手动替换的方法很直观但效率较低，因此这里重点介绍 Git 方式 🐻。

### 使用 Git 更新 AstroPaper

**重要提示！**

> 只有在你了解如何解决合并冲突时，才执行以下步骤。否则，建议手动替换文件，或仅更新依赖。

首先，将 astro-paper 添加为项目的远程仓库：

```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```

切换到新分支以更新模板。如果你熟悉 Git 并且确定自己清楚后续操作，也可以跳过这一步：

```bash
git checkout -b build/update-astro-paper
```

然后运行以下命令拉取 astro-paper 的更改：

```bash
git pull astro-paper main
```

如果遇到 `fatal: refusing to merge unrelated histories` 错误，可以运行以下命令解决：

```bash
git pull astro-paper main --allow-unrelated-histories
```

运行上述命令后，项目中可能会出现冲突。你需要手动解决冲突，并根据自己的需求进行必要调整。

解决冲突后，请充分测试博客，确保一切正常。检查文章、组件以及你做过的自定义修改。

确认结果符合预期后，就可以将更新分支合并到主分支（仅当你在另一个分支中更新模板时需要）。恭喜！你已成功将模板更新到最新版本，博客也已准备好继续运行 🎉。

## 总结

本文分享了更新依赖和 AstroPaper 模板的一些经验和流程，希望这些内容能帮助你更高效地管理项目。

如果你有更新依赖或 AstroPaper 的其他方法或改进建议，欢迎在仓库中发起讨论、发送邮件或提交 Issue。非常期待你的意见和想法！

请谅解，我最近比较忙，可能无法及时回复，但我会尽快答复。😬

感谢你阅读本文，祝你的项目一切顺利！
