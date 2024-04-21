import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { vitePluginVueact } from "../dist/index.mjs"


export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    vue(),
    VueJsx(),
    AutoImport({
      imports: [
        'vue'
      ]
    }),
    vitePluginVueact()
  ]
})
