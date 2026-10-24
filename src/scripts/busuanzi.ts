// 不蒜子访问量统计（仅生产环境生效，本地开发不计入数据）
// 原理：astro:page-load 在首次加载和每次 ClientRouter 切换页面后都会触发，
// 此时重新注入不蒜子脚本，脚本内部发起 JSONP 请求并回填页脚的
// busuanzi_value_site_pv / busuanzi_value_site_uv 占位符。
// 若不蒜子服务不可用，请求失败时容器保持隐藏，不影响页面其他功能。
if (import.meta.env.PROD) {
  const SRC = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";

  document.addEventListener("astro:page-load", () => {
    document.head
      .querySelectorAll<HTMLScriptElement>(`script[src="${SRC}"]`)
      .forEach((el) => el.remove());

    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    document.head.appendChild(script);
  });
}
