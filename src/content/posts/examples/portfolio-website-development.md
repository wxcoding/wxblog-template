---
title: 我是如何开发个人作品集网站和博客的
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: true
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description: "示例文章：分享我使用 Next.js 和无头 CMS 开发首个个人作品集网站与博客的经历。"
timezone: "Asia/Yangon"
---

> 本文译自作者的[原博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)，收录于此是为了演示如何使用 AstroPaper 主题撰写博客文章。

本文分享我使用 Next.js 和无头 CMS 开发首个个人作品集网站与博客的经历。

![Building portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## 开发动机

从大学时期起，我就一直想用自己的域名（**satnaing.dev**）建立个人网站，但直到这个项目才真正实现。此前我做过一些 Web 应用开发项目，却一直没有着手完成这件事。

你可能会问：“那博客呢？”博客也在我的项目清单中放了很久。我一直想用一些新技术搭建博客，但工作和其他项目占用了不少时间，所以始终没有开始。

如今，我更注重项目质量而不是数量。项目完成后，我通常会在 GitHub 仓库中写好 README，但在我看来，README 更适合介绍技术方面的内容。我还想记录自己的经历和遇到的挑战，因此决定建立个人博客。而且到这个阶段，我也积累了足够的经验和信心来开发这个项目。

## 技术栈

前端方面，我原本想使用 [React](https://reactjs.org/ "React 官方网站")。但仅使用 React 不利于 SEO，而且还需要考虑路由、图片优化等因素，所以我选择 [Next.js](https://nextjs.org/ "Next.js 官方网站") 作为主要前端框架，并使用 TypeScript 进行类型检查。（听说习惯 TypeScript 之后就会爱上它 😉）

样式方面，我使用 [Tailwind CSS](https://tailwindcss.com/ "Tailwind CSS 官方网站")。我很喜欢 Tailwind 带来的开发体验，而且与 MUI 或 React Bootstrap 等组件 UI 库相比，它提供了更大的灵活性。

项目的所有内容都存放在 GitHub 仓库中。由于我很熟悉 Markdown，因此所有博客文章（包括本文）都使用 Markdown 编写。为了更方便地编辑 Markdown 和 frontmatter，我使用了 [Forestry](https://forestry.io/ "Forestry 官方网站") 无头 CMS。它是基于 Git 的 CMS，可以管理 Markdown 和其他内容，因此我既能用 Markdown 编写，也能使用所见即所得编辑器，还可以轻松填写 frontmatter。

图片和资源上传并存储在 [Cloudinary](https://cloudinary.com/ "Cloudinary 官方网站") 中。我通过 Forestry 连接 Cloudinary，并直接在控制面板中管理这些资源。

总结一下，这个项目使用了以下技术栈：

- 前端：Next.js（TypeScript）
- 样式：Tailwind CSS
- Animations: GSAP
- CMS: Forestry Headless CMS
- Deployment: Vercel

## 功能特性

以下是我的作品集网站和博客的一些功能：

### SEO 友好

整个项目都以 SEO 为重点进行开发。我使用了恰当的 meta 标签、描述和标题层级。目前这个网站已被 Google 收录。

> You can search this website on google by using keywords like 'sat naing dev'

![searching satnaing.dev on google](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev is indexed")

此外，由于正确使用了 meta 标签，网站链接分享到社交媒体时也能正确显示预览。

![satnaing.dev card layout when shared to Facebook](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "Card layout when shared to Facebook")

### 动态站点地图

站点地图对 SEO 很重要，因此网站的每个页面都应该包含在 sitemap.xml 中。我设置了自动生成站点地图的功能，每当新增内容、标签或分类时都会更新。

### 浅色和深色主题

近年来深色主题越来越流行，许多网站都已内置深色模式。我的网站当然也同时支持浅色和深色主题。

### 完全易访问

这个网站充分考虑了易访问性，用户可以仅使用键盘浏览。我采用了多项无障碍最佳实践，例如为图片添加 alt 文本、不跳过标题层级、使用语义化 HTML 标签，以及正确设置 aria 属性。

### 搜索框、分类和标签

读者可以通过搜索框查找所有博客内容，也可以按分类和标签筛选，从而快速找到自己想看的内容。

### 性能和 Lighthouse 评分

得益于合理的开发方式和最佳实践，这个网站取得了不错的性能和 Lighthouse 评分。以下是该网站的 Lighthouse 评分：

![satnaing.dev Lighthouse score](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse score")

### 动画

最初，我使用 [Framer Motion](https://www.framer.com/motion/ "Framer Motion") 为网站添加动画和微交互。但尝试制作复杂动画和视差效果时，我发现它不太容易集成（也可能是我不太熟悉它）。因此，我决定使用 [GSAP](https://greensock.com/ "GSAP 动画库")处理所有动画。它是最受欢迎的动画库之一，能够实现复杂且高级的动画。网站几乎每个页面都可以看到动画和微交互。

![animations at satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev website")

## 结语

总的来说，这个项目让我积累了开发静态博客（SSG）的经验，也增强了我的信心。我了解了基于 Git 的 CMS 及其与 Next.js 的协作方式，还学习了 SEO、动态站点地图生成和 Google 收录流程。未来我会继续打造更好的项目，敬请期待！✌🏻

最后，我还想感谢我的朋友 [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyaw 的 Facebook 账号")（@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHa Facebook 页面")），他为网站首页的 Hero 区域绘制了精美插画。

## 项目链接

- Website: [https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- Blog: [https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- Repo: [https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")
