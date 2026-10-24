# AstroPaper 中文定制版

一个基于 [AstroPaper](https://github.com/satnaing/astro-paper) v6.1.0 二次开发的中文博客模板。保留了主题的全部原有能力（静态搜索、归档、标签、RSS、Sitemap、深色模式等），并针对中文阅读与国内分享场景做了定制。

## 主要改动

- **全站中文界面**：i18n 机制保留，已附中文语言包，原有的英文包仍可使用
- **社交链接本土化**：GitHub、Gitee、微信、邮件；微信图标点击后弹出二维码，用于扫码加好友
- **文章分享本土化**：复制链接、QQ 空间、微博、邮件、微信二维码（按当前文章地址动态生成）
- **页脚信息**：版权 + 部署时间（浏览器端实时计算相对时间）+ 不蒜子访问统计（仅生产构建启用）
- **阅读体验**：正文字号与行高针对中文阅读调整，内容区加宽
- **图标体系**：全站统一为实心风格，颜色继承主题色，浅色/深色模式自动适配
- **主题修复**：修正了微信弹窗 `aria-controls` 与 `dialog` id 不一致导致无法弹出的问题

## 环境要求

- Node.js >= 22.12.0
- pnpm

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # 类型检查 + 构建 + 生成搜索索引
pnpm preview    # 预览构建结果
```

## 自定义

站点配置集中在 `astro-paper.config.ts`：

| 字段 | 说明 |
| --- | --- |
| `site.url` | 站点地址，影响 RSS、Sitemap、canonical 链接 |
| `site.title` | 站点名称，同时用于首页大标题 |
| `site.author` / `site.profile` | 作者与个人主页 |
| `posts.perPage` / `posts.perIndex` | 列表页每页文章数 / 首页文章数 |
| `socials` | 社交链接，`wechat` 项会渲染为二维码弹窗 |
| `shareLinks` | 文章底部的分享渠道 |

其他需要注意的地方：

- **微信二维码**：把好友二维码图片放到 `public/images/wechat-qrcode.jpg`。未放置时弹窗会显示「二维码暂未配置」的提示，不影响构建。
- **编辑此页**：`features.editPost.enabled` 改为 `true` 并填写你的仓库地址。
- **动态 OG 图片**：默认关闭（`dynamicOgImage: false`），因为它依赖构建时拉取 Google Fonts，网络受限的 CI 环境容易失败。
- **项目站点**：如果部署在 `用户名.github.io/仓库名`，需要在 `astro.config.ts` 中补充 `base: "/仓库名"`；用户站点或自定义域名无需设置。

## 写文章

- 文章放在 `src/content/posts/`，子目录会成为 URL 的一部分
- 常用 frontmatter：`author`、`pubDatetime`、`title`、`slug`、`featured`、`draft`、`tags`、`description`
- `draft: true` 的文章不会构建进站点，也不计入页脚的「最近更新」
- 主题自带的使用文档位于 `src/content/posts/` 根目录，可作参考，不需要时可直接删除

## 部署

仓库自带 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)：推送到 `main` 分支后自动构建并发布到 GitHub Pages（使用官方 `actions/deploy-pages`）。

启用步骤：仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

如果希望源码仓库私有、构建产物发布到另一个公开仓库，可改用 `peaceiris/actions-gh-pages`，配置 `external_repository` 与对应的访问令牌（PAT）。

## 目录结构

```
├── public/                 # 静态资源（favicon、默认 OG 图等）
├── src/
│   ├── assets/             # 图标与图片
│   ├── components/         # 页面组件
│   ├── content/            # 文章与「关于」页
│   ├── i18n/               # 语言包与类型
│   ├── layouts/            # 布局
│   ├── pages/              # 路由
│   ├── scripts/            # 客户端脚本（访问统计等）
│   ├── styles/             # 全局样式与主题变量
│   └── utils/              # 工具函数
├── astro-paper.config.ts   # 站点配置
└── astro.config.ts         # Astro 配置
```

## 版权

- 代码：MIT，见 [LICENSE](LICENSE)。基于 AstroPaper（Copyright (c) 2021 Sat Naing）二次开发，原始版权声明予以保留。
- 本仓库不包含原作者的个人博客内容。
