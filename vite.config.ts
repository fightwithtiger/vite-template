import { UserConfigExport, ConfigEnv } from 'vite';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVConsole } from 'vite-plugin-vconsole';
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log('mode', mode)
  return defineConfig({
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'pinia'
        ],
        dts: true,
        dirs: [
          './src/store',
          './src/composables'
        ],
        vueTemplate: true,
      }),
      Components({
        resolvers: [VantResolver()],
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
        '@': path.resolve(__dirname, 'src'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData:
            '@import "src/assets/less/variable.less";',
        },
      },
    },
  })
}
