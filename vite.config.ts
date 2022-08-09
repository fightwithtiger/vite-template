import { UserConfigExport, ConfigEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVConsole } from 'vite-plugin-vconsole'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  return defineConfig({
    plugins: [
      vue({
        reactivityTransform: true
      }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
          'pinia'
        ],
        dts: true,
        dirs: [
          './src/store',
          './src/composables'
        ],
        vueTemplate: true,
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        dts: true,
        resolvers: [VantResolver(), AntDesignVueResolver()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // entry file
        localEnabled: false, // dev environment
        enabled: mode !== 'prod', // build production
        config: { // vconsole options
          maxLogNumber: 1000,
          theme: 'light'
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData:
            '@import "src/assets/less/variable.less";'
        }
      }
    },
    server: {
      port: 4000, // 设置服务启动端口号
      open: false // 设置服务启动时是否自动打开浏览器
    }
  })
}
