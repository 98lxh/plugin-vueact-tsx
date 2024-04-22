import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";

export function vitePluginVueact() {
  return {
    name: "vite:vueact-tsx",
    transform(code, id) {
      if (!id.endsWith('.tsx')) {
        return code
      }

      const props = parseProps(code);
      if (props) code = code.replace(props.unresolved, '')
        
      const setup = parseSetup(code, props && props.resolved);
      if (!setup) return code

      return code.replace(setup.unresolved, setup.resolved)
    }
  }
}


export * from "./types"
