import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnocssIcons from '@unocss/preset-icons';
import path from 'path';
// 自定义的插件 ReplaceSrcPlugin，它在打包时检查 HTML 文件，然后替换路径。请根据实际情况调整正则表达式或者其他替换逻辑。

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 这里更改打包相对绝对路径
  minify: true, // 是否压缩代码
  sourceMap: true, // 是否生成sourceMap
  plugins: [

    uni(),
    UnoCSS({
      // when `presets` is specified, the default preset will be disabled
      // so you could only use the pure CSS icons in addition to your
      // existing app without polluting other CSS
      presets: [
        UnocssIcons({
          // options
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
          },
        }),
        // presetUno() - if you want to use other atomic CSS as well
      ],
    }),
  ],
  server: { // ← ← ← ← ← ←
    // port: 8082,
    // proxy: {
    //   '/rss': {
    //     target: ENV_URL, //要访问的地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/rss/, ""),
    //     // secure: false
    //   }
    // },
    // https:true,
    host: '0.0.0.0', // ← 新增内容 ←
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },

});
