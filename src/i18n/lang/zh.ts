import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首页",
    posts: "文章",
    tags: "标签",
    about: "关于",
    archives: "归档",
    search: "搜索",
  },
  post: {
    publishedAt: "发布于",
    updatedAt: "更新于",
    sharePostIntro: "分享这篇文章：",
    sharePostOn: "分享到 {{platform}}",
    sharePostViaEmail: "通过邮件分享这篇文章",
    wechatScanTitle: "微信扫码分享",
    wechatScanTip: "扫码或长按，更多选择",
    copied: "链接已复制",
    tagLabel: "标签",
    backToTop: "回到顶部",
    goBack: "返回",
    editPage: "编辑此页",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一页",
    next: "下一页",
    page: "页码",
  },
  home: {
    socialLinks: "社交链接",
    featured: "精选文章",
    recentPosts: "最新文章",
    allPosts: "查看全部文章",
  },
  footer: {
    copyright: "版权所有",
    allRightsReserved: "保留所有权利。",
    siteViews: "本站总浏览量",
    siteVisitors: "本站访客数",
    lastUpdated: "最近更新",
    present: "至今",
    justNow: "刚刚",
    minAgo: "分钟前",
    hourAgo: "小时前",
    dayAgo: "天前",
    monthAgo: "个月前",
    yearAgo: "年前",
  },
  pages: {
    tagTitle: "标签",
    tagDesc: "所有包含该标签的文章",

    tagsTitle: "全部标签",
    tagsDesc: "所有文章中使用的标签。",

    postsTitle: "文章",
    postsDesc: "我发布的全部文章。",

    archivesTitle: "归档",
    archivesDesc: "按时间归档的全部文章。",

    searchTitle: "搜索",
    searchDesc: "搜索任何文章……",
  },
  a11y: {
    skipToContent: "跳转到正文",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleTheme: "切换主题",
    searchPlaceholder: "搜索文章…",
    noResults: "没有找到结果",
    goToPreviousPage: "前往上一页",
    goToNextPage: "前往下一页",
  },
  notFound: {
    title: "404 页面不存在",
    message: "页面不存在",
    goHome: "返回首页",
  },
} satisfies UIStrings;
