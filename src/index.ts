import { parseProps } from "./parser/props"
import { parseSetup } from "./parser/setup";

export function vitePluginVueact() {
  return {
    name: "transformTSX",
    transform(code: string, id: string) {
      // 1.识别tsx文件
      if (!id.endsWith('.tsx')) {
        return code
      }

      // 2. 解析props
      const props = parseProps(code);
      if (props) code = code.replace(props.before, '')


      // 3. 解析setup
      const setup = parseSetup(code, props ? props.after : undefined);
      if (!setup) return code


      if (props) {
        console.log(code.replace(setup.before, setup.after))
      }

      return code.replace(setup.before, setup.after)
    }
  }
}
