import { Plugin } from "vite";
import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";
import { resolve } from "path";

export function vitePluginVueact(): Plugin {
  return {
    name: "vite:vueact-tsx",
    async transform(code, id, opts) {
      if (!id.endsWith('.tsx')) return code

      const props = await parseProps(code, id, async (path,id) => this.resolve(path,id));
      if (props) code = code.replace(props.unresolved, '')

      const setup = parseSetup(code, props && props.resolved);
      if (!setup) return code

      return code.replace(setup.unresolved, setup.resolved)
    }
  }
}


export * from "./types"
