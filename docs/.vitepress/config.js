import { defineConfig } from "vitepress";
import vue from '@vitejs/plugin-vue'
// import { importAssertionsPlugin } from 'rollup-plugin-import-assert'
// import { importAssertions } from 'acorn-import-assertions';

export default defineConfig({
  title: "xy-ui",
  cleanUrls: true,
  description: "hello world",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "logo.svg" }]],
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/" },
      { text: "前端总结", link: "/javascript/" },
      { text: "生活感悟", link: "/life/" },
      { text: "我的掘金", link: "https://juejin.cn/user/2242659452477016" },
      { text: "关于我", link: "/me/" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/xboxyan" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-07-27～present aehyok",
    },

    sidebar: {
      "/components/": [
        {
          text: '通用',
          items: [
            { text: "button", link: "/components/button" },
            { text: "tips", link: "/components/tips" },
          ]
        },
        {
          text: '表单',
          items: [
            { text: "switch", link: "/components/switch" },
          ]
        }
      ],
      "/javascript/": [
        {
          text: 'JavaScript积累',
          items: [
            { text: "社会", link: "/javascript/" },
            { text: "2022-06年中总结", link: "/life/2022-06" },
            { text: "2021-12年终总结", link: "/life/2021-12" },
          ]
        }
      ],
      "/daily/": [
        {
          text: "2023年每日笔记",
          items: [
            { text: "current", link: "/daily/" },
            { text: "2023-01", link: "/daily/2023-01" },
          ],
        },
        {
          text: "2022年每日笔记",
          items: [
            { text: "2022-12", link: "/daily/2022-12" },
            { text: "2022-11", link: "/daily/2022-11" },
            { text: "2022-10", link: "/daily/2022-10" },
            { text: "2022-09", link: "/daily/2022-09" },
            { text: "2022-08", link: "/daily/2022-08" },
            { text: "2022-07", link: "/daily/2022-07" },
            { text: "2022-06", link: "/daily/2022-06" },
            { text: "2022-05", link: "/daily/2022-05" },
            { text: "2022-04", link: "/daily/2022-04" },
            { text: "2022-03", link: "/daily/2022-03" },
            { text: "2022-02", link: "/daily/2022-02" },
            { text: "2022-01", link: "/daily/2022-01" },
          ],
        },
        {
          text: "2021年每日笔记",
          items: [
            { text: "2021-12", link: "/daily/2021-12" },
            { text: "2021-11", link: "/daily/2021-11" },
            { text: "2021-10", link: "/daily/2021-10" },
            { text: "2021-09", link: "/daily/2021-09" },
            { text: "2021-08", link: "/daily/2021-08" },
            { text: "2021-07", link: "/daily/2021-07" },
            { text: "2021-06", link: "/daily/2021-06" },
            { text: "2021-05", link: "/daily/2021-05" },
            { text: "2021-04", link: "/daily/2021-04" },
            { text: "2021-03", link: "/daily/2021-03" },
            { text: "2021-02", link: "/daily/2021-02" },
            { text: "2021-01", link: "/daily/2021-01" },
          ],
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      disabled: false,
      exclude: '../components'
    },
    
    // publicDir:'components',
    // plugins: [
    //   vue({
    //     template: {
    //       compilerOptions: {
    //         // 将所有带短横线的标签名都视为自定义元素
    //         isCustomElement: (tag) => tag.includes('xy-')
    //       }
    //     }
    //   })
    // ],
    // acornInjectPlugins: [ importAssertions ],
    // plugins: [ importAssertionsPlugin() ],
    // output: {
    //   format: 'esm',
    //   dir: 'lib' // only necessary to enable dynamic imports
    // },
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