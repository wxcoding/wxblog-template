---
title: 我是如何使用 React 开发终端风格作品集网站的
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: true
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description: "示例文章：使用 React、TypeScript 和 Styled Components 开发终端风格网站，包含自动补全、多主题和命令提示等功能。"
timezone: "Asia/Yangon"
---

> 本文译自作者的[原博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)，收录于此是为了演示如何使用 AstroPaper 主题撰写博客文章。

本文介绍如何使用 React、TypeScript 和 Styled Components 开发终端风格的网站，包含自动补全、多主题和命令提示等功能。

![Sat Naing 的终端风格作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目录

## 简介

最近我开发并发布了个人作品集和博客，也很高兴收到了一些不错的反馈。今天想介绍一个新的终端风格作品集网站，它使用 React 和 TypeScript 开发，创意来自 CodePen 和 YouTube。

## 技术栈

这是一个纯前端项目，不包含后端代码。UI/UX 使用 Figma 设计。前端界面方面，我选择了 React，而不是原生 JavaScript 或 Next.js。为什么呢？

- 首先，我希望编写声明式代码。使用原生 JavaScript 命令式地管理 HTML DOM 非常繁琐。
- 其次，因为它是 React！它快速而可靠。
- 最后，我并不太需要 Next.js 提供的 SEO、路由和图片优化功能。

当然，项目还使用了 TypeScript 进行类型检查。

样式方面，我采用了与以往不同的方案。我没有选择原生 CSS、Sass 或 Tailwind CSS 这样的工具类框架，而是使用 CSS-in-JS 方案（Styled Components）。虽然我早就听说过 Styled Components，但之前从未实际使用过，所以这个项目中的 Styled Components 写法和结构可能不够整洁。

这个项目不需要非常复杂的状态管理。我只使用 Context API 来支持多种主题，并避免层层传递属性。

下面快速总结一下项目使用的技术栈：

- 前端：[React](https://reactjs.org/ "React 网站")、[TypeScript](https://www.typescriptlang.org/ "TypeScript 网站")
- 样式：[Styled Components](https://styled-components.com/ "Styled Components 网站")
- UI/UX：[Figma](https://figma.com/ "Figma 网站")
- 状态管理：[Context API](https://reactjs.org/docs/context.html "React Context API")
- 部署：[Netlify](https://www.netlify.com/ "Netlify 网站")

## 功能特性

以下是这个项目的一些功能。

### 多种主题

用户可以切换多种主题。撰写本文时，网站提供 5 种主题，未来可能还会增加。选中的主题会保存在本地存储中，因此刷新页面后仍会保持不变。

![切换不同主题](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令行自动补全

为了尽可能还原真实终端的使用体验，我添加了命令行自动补全功能。输入部分命令后，只需按下 `Tab` 或 `Ctrl + i` 即可自动补全。

![命令行自动补全演示](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 历史命令

用户可以按上下方向键返回或浏览之前输入过的命令。

![使用上方向键浏览历史命令](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看/清除命令历史

在命令行中输入 `history` 可以查看之前输入的命令。输入 `clear` 或按下 `Ctrl + l` 可以清除命令历史和终端屏幕内容。

![使用 clear 命令或 Ctrl + L 清除终端](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 结语

这是一个非常有趣的项目。它的特别之处在于，虽然属于前端项目，但我需要把重点放在逻辑而不是用户界面上。

## 项目链接

- Website: [https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- Repo: [https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
