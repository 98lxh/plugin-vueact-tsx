import { Plugin } from "vite";
import { parseEmits } from "./parser/emits";
import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";
import { ParserValue } from "./types";

export function vitePluginVueact(): Plugin {
  return {
    name: "vite:vueact-tsx",
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) {
        return code;
      }

      let props: null | ParserValue = null;
      let emits: null | ParserValue = null;
      let setup: null | ParserValue = null;

      if (props = await parseProps(code, id, async (path, id) => this.resolve(path, id))) {
        code = code.replace(props.unresolved, '')
      }

      if (emits = await parseEmits(code, id, async (path, id) => this.resolve(path, id))) {
        code = code.replace(emits.unresolved, '')
      }

      if (setup = parseSetup(code, props && props.resolved, emits && emits.resolved)) {
        code = code.replace(setup.unresolved, setup.resolved)
      }
      
      return code;
    }
  }
}


export * from "./types"
