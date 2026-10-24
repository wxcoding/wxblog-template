---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2026-06-03T00:00:00.000Z
title: 在 AstroPaper 博客文章中动态生成 OG 图片
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: true
tags:
  - docs
  - release
description: AstroPaper v1.4.0 新增功能：为博客文章动态生成 OG 图片。
---

这是 AstroPaper v1.4.0 引入的新功能，可以为博客文章动态生成 OG 图片。

![AstroPaper 博客文章的动态 OG 图片生成示例](/posts/dynamic-og-image-generation-in-astropaper-blog-posts/index.png)

## 目录

## 简介

OG 图片（也称社交分享图片）对社交媒体传播很重要。简单来说，当我们在 Facebook、Discord 等社交平台分享网站链接时，预览中显示的图片就是 OG 图片。

> 严格来说，Twitter 使用的社交分享图片并不叫 OG 图片。本文为方便起见，将各种社交分享图片统称为 OG 图片。

## 默认/静态 OG 图片（旧方式）

AstroPaper 原本就支持为文章指定 OG 图片：作者可以在 frontmatter 中设置 `ogImage`。如果没有设置，则会使用默认图片（本例中为 `public/default-og.jpg`）。问题在于默认图片是静态的，因此所有未单独指定图片的文章都会使用同一张图，即使文章标题和内容各不相同。

## 动态 OG 图片

为每篇文章动态生成 OG 图片，作者就不必逐篇手动指定图片，也能避免所有文章共用同一张默认图。

AstroPaper v1.4.0 使用 Vercel 的 [Satori](https://github.com/vercel/satori) 软件包生成动态 OG 图片。

在 AstroPaper v6 及更高版本中，基本思路不变：由 Satori 渲染 SVG，再通过 [Sharp](https://sharp.pixelplumbing.com/) 转换为 PNG。不同之处是字体现在来自 Astro 的 **Fonts** 配置，并通过 [`experimental_getFontFileURL()`](https://astro.build/blog/astro-620/) 加载，让 OG 图片生成可以复用网站的字体配置。

构建时会为符合以下条件的文章生成动态 OG 图片：

- frontmatter 中没有指定 OG 图片；
- 没有被标记为草稿。

## AstroPaper 动态 OG 图片的组成

动态 OG 图片包含_文章标题_、_作者名称_和_站点名称_。作者名称和站点名称分别读取自 `astro-paper.config.ts` 中的 `site.author` 和 `site.title`，文章标题则来自文章 frontmatter 的 `title`。

![动态 OG 图片示例](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符的显示问题

> [!CAUTION]
> 默认配置下，标题中的非拉丁字符可能无法正常显示。请将 Google 字体替换为覆盖目标文字的字体，并同时包含 **400** 和 **700** 两种字重。Satori 会分别为常规和粗体使用字体数据，缺少其中一种可能导致渲染异常。

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      // 示例：日文字符覆盖。请根据网站使用的文字选择字体。
      name: "Noto Sans JP",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [400, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
});
```

如果修改了 `cssVariable`，还要同步修改以下文件中的对应配置：

- `src/pages/og.png.ts`
- `src/pages/posts/[...slug]/index.png.ts`

> 更多信息请参阅[这个 PR](https://github.com/satnaing/astro-paper/pull/318)。

> [!WARNING] 注意事项
>
> - **构建耗时**会随内容数量增加，因为每篇符合条件的文章都会在构建时生成一张 PNG。v6 的生成速度更快（参见 PR [#632](https://github.com/satnaing/astro-paper/pull/632)），但如果网站内容很多，可以在 `astro-paper.config.ts` 中设置 `features.dynamicOgImage: false` 关闭此功能。
> - 暂不支持**从右向左书写的语言**。
> - 标题中的**表情符号**可能无法正确渲染。
