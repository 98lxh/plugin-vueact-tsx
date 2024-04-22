import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { vitePluginVueact } from "./../src/index";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";


export default defineConfig({
  server: {
    port: 3230
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue(),
    vitePluginVueact(),
    VueJsx(),
    AutoImport({ imports: [ 'vue' ] })
  ]
})
