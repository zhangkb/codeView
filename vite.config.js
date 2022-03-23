/*
 * @Author         : zhangKangbo
 * @Date           : 2022-03-23 09:22:20
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-23 15:30:20
 * @FilePath       : \codeView\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import path from 'path'   // 需安装此模块
import prism from 'markdown-it-prism'
import Pages from 'vite-plugin-pages'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true,
      markdownItUses: [
        prism,
      ],
    }),
    Pages({
      pagesDir: 'pages',
      extensions: ['vue', 'md'],
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})


