import { generateSitemap as sitemap } from 'sitemap-ts'
import { description, docsVersion, github, keywords, name, site } from './utils/meta'
import sidebar from './utils/sidebar'
import socialLinks from './utils/link'
import algolia from './utils/algolia'

export default {
  outDir: '../dist',
  base: '/docs/',
  title: name,
  description,
  lastUpdated: true,
  useWebFonts: false,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true,
  },
  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
  },
  themeConfig: {
    logo: './logo.svg',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '归档',
    lastUpdatedText: '最后一次更新于',
    ditLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    footer: {
      message: `用心去做高质量的前端技术网站，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐⭐</a> 你的点赞支持是我不断前进的动力！！！`,
      copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">MIT License</a> | 版权所有 © 2023-${new Date().getFullYear()} <a target="_blank" href="${github}">Winter Wang and WinDocs contributors</a>`,
    },
    nav: [
      { text: '基础知识', link: '/basics/' },
      { text: '前端进阶', link: '/advance/' },
      { text: '前端工程化', link: '/engineering/' },
      {
        text: '前端专栏',
        items: [
          { text: '🔥 前端算法', link: '/code/algorithm/' },
          { text: '🔥 设计模式', link: '/code/design_patterns/' },
          { text: '🔥 函数式编程', link: '/code/functional_programming/' },
          { text: '📋 面试', link: '/code/interview/' },
        ],
      },
      {
        text: `v${docsVersion}`,
        items: [
          // { text: '🔋 备用站点', link: 'https://chodocs.netlify.app/' },
          { text: '🔋 阅读指南', link: '/guide/' },
          { text: '🧱 关于我', link: '/guide/aboutme' },
          { text: '🔑 参与贡献', link: '/contributing/' },
          { text: '🎉 更新日志', link: `${github}/releases` },
        ],
      },
    ],
    algolia,
    sidebar,
    socialLinks,
  },
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'keywords', content: keywords }],
    ['meta', { name: 'author', content: 'winter wang' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { name: 'application-name', content: name }],
    ['meta', { name: 'apple-mobile-web-app-title', content: name }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],

    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#9013fe' }],
    ['meta', { name: 'theme-color', content: '#9013fe' }],
    // webfont
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    // og
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
  ],
  async buildEnd() {
    await sitemap({ hostname: site })
  },
}
