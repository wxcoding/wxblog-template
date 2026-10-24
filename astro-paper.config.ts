import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    // 换成你自己的站点地址；本地预览可先保留示例值
    url: "https://example.com/",
    title: "示例博客",
    description: "一个基于 AstroPaper 定制的中文博客。",
    author: "Your Name",
    profile: "https://github.com/your-username",
    ogImage: "default-og.jpg",
    lang: "zh",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    // 动态 OG 图片依赖构建时拉取 Google Fonts，网络受限的 CI 环境可能失败，默认关闭
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      // 启用时改为 { enabled: true, url: "https://github.com/your-username/your-repo/edit/main/" }
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/your-username" },
    // { name: "gitee", url: "https://gitee.com/your-username" },
    // 微信：把好友二维码图片放到 public/images/wechat-qrcode.jpg 后即可使用
    { name: "wechat", url: "", linkTitle: "微信扫码加好友" },
    { name: "mail", url: "mailto:you@example.com" },
  ],
  shareLinks: [
    { name: "copy", url: "", linkTitle: "复制链接" },
    {
      name: "qqzone",
      url: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=",
      linkTitle: "分享到 QQ 空间",
    },
    {
      name: "weibo",
      url: "https://service.weibo.com/share/share.php?url=",
      linkTitle: "分享到微博",
    },
    { name: "mail", url: "mailto:?subject=分享文章&body=", linkTitle: "通过邮件分享这篇文章" },
    { name: "wechat", url: "", linkTitle: "微信扫码分享" },
  ],
});
