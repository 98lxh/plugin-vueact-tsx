# vite-plugin-veact

## Install

使用 `pnpm` 安装

```shell
pnpm add --save-dev vite-plugin-veact
```

使用 `npm` 安装

```shell
npm install --save-dev vite-plugin-veact
```

使用 `yarn` 安装

```shell
yarn add --save-dev fighting-design
```

## Using in vite

```ts
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { vitePluginVueact } from "vite-plugin-veact";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    vitePluginVueact(),
    VueJsx(),
    AutoImport({ imports: [ 'vue' ] })
  ]
})
```

## Examples

---

source

```tsx
import { VNode } from "vue";

type DefineProps = {
  num: number;
  messsage: string;
  children?: VNode | string;
}
 
function SingleComponent(props: DefineProps) {
  return (
    <div>
      <p>{props.messsage}</p>
      <p>{props.children}</p>
      <p>{props.num}</p>
    </div>
  )
}

export default SingleComponent;
```

---

resolved

```tsx
import { defineComponent } from "vue";

const SingleComponent = defineComponent({
  name: "SingleComponent",
  props: {
    "num": { type: Number, "required": true },
    "messsage": { type: String, "required": true },
    "children": { type: [Object, String] }
  },
  setup(props) {
    return () => (
      <div>
        <p>{props.messsage}</p>
        <p>{props.children}</p>
        <p>{props.num}</p>
      </div>
    )
  }
})

export default SingleComponent;
```
