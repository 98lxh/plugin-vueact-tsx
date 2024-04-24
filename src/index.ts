import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";

export function vitePluginVueact() {
  return {
    name: "vite:vueact-tsx",
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) {
        return code;
      }

      let props:null | any = null;
      let setup:null | any = null;
      
      if(props = await parseProps(code, id, async (path, id) => (this as any).resolve(path, id))){
        code = code.replace(props.unresolved, '')
      }
      
      if(setup = parseSetup(code, props && props.resolved)){
        code = code.replace(setup.unresolved, setup.resolved)
      }

      return code; 
    }
  }
}


export * from "./types"
