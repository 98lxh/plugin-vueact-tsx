import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";

export function vitePluginVueact() {
  return {
    name: "vite:vueact-tsx",
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) return code
      const props = await parseProps(code, id, async (path, id) => (this as any).resolve(path, id));
      if (props) code = code.replace(props.unresolved, '')
      const setup = parseSetup(code, props && props.resolved);
      if (!setup) return code
      return code.replace(setup.unresolved, setup.resolved)
    }
  }
}


export * from "./types"
