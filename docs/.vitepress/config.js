import { defineConfig } from "vitepress";
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  title: "xy-ui",
  cleanUrls: true,
  description: "hello world",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],
  lastUpdated: true,
  themeConfig: {
    outlineTitle: '目录',
    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/xboxyan" }],
    footer: {
      message: "MIT License.",
      copyright: "Copyright © 2023～present xboxyan",
    },

    sidebar: {
      "/components/": [
        {
          text: '通用',
          items: [
            { text: "button 按钮", link: "/components/button" },
            { text: "icon 图标", link: "/components/icon" },
            { text: "tips 提示", link: "/components/tips" },
            { text: "loading 加载", link: "/components/loading" },
            { text: "popover 悬浮", link: "/components/popover" },
          ]
        },
        {
          text: '表单',
          items: [
            { text: "select 选择器", link: "/components/select" },
            { text: "switch 开关", link: "/components/switch" },
            { text: "slider 滑动输入", link: "/components/slider" },
            { text: "checkbox 多选框", link: "/components/checkbox" },
            { text: "radio 单选框", link: "/components/radio" },
            { text: "rate 评分", link: "/components/rate" },
          ]
        },
        {
          text: '反馈',
          items: [
            { text: "progress 进度条", link: "/components/progress" },
            { text: "popconfirm 确认弹出框", link: "/components/popconfirm" },
            { text: "message 提示信息", link: "/components/message" },
            { text: "dialog 弹窗", link: "/components/dialog" },
          ]
        }
      ],
    },
  },
  // srcExclude: '../../components',
  vite: {
    plugins:[pagefindPlugin({
      customSearchQuery(input){
        // 将搜索的每个中文单字两侧加上空格
        return input.replace(/[\u4e00-\u9fa5]/g, ' $& ')
        .replace(/\s+/g,' ')
        .trim();
      },
      btnPlaceholder: '搜索',
      placeholder: '搜索文档',
      emptyText: '空空如也',
      heading: '共计: {{searchResult}} 条结果'
    })],
    publicDir: '../public',
    // optimizeDeps: {
    //   entries: '!../../components'
    // },
    build: {
      // outDir: 'aaa',
      // sourcemap: true,
      assetsDir: 'public',
    },
    server: {
      host: true,
      // port: 3000,
      // open: true,
      proxy: {
        '/so': {
          target: 'http://139.159.245.209:5000', // 代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/so/, '')
        }
      }
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('xy-')
      }
    }
  },
});