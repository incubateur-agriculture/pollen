import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const portMap = {
  'intra-produit-hero': 5174,
  'intra-bdc-liste': 5175,
  'intra-bdc-infos': 5176,
  'intra-produit-selecteur': 5177,
}

const getAppConfig = (mode) => {
  const appName = mode || 'intra-produit-hero'
  const port = portMap[appName] || 5173

  return {
    root: `src/${appName}`,
    outDir: `dist/${appName}`,
    port: port
  }
}

export default defineConfig(({ mode }) => {
  const appConfig = getAppConfig(mode)

  return {
    base: "./",
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.endsWith('-chart') || tag === 'data-box'
          }
        }
      })
    ],
    root: appConfig.root,
    build: {
      outDir: `../../${appConfig.outDir}`,
      emptyOutDir: true
    },
    css: {
      lightningcss: {
        errorRecovery: true
      }
    },
    server: {
      port: appConfig.port,
      strictPort: false
    },
    resolve: {
      alias: {
        '@': `${__dirname}${appConfig.root}/src`,
        '@components': `${__dirname}src/components`,
        '@styles': `${__dirname}src/css`,
        '@services': `${__dirname}src/services`
      }
    }
  }
})
