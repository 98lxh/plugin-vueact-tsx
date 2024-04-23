import { importPropsRegex, localPropsRegex } from "../utils/regex";
import { isFunction, isArray, isBasic } from "../utils/is";
import { readFileSync } from "fs";

function ts2vue3Props(body: string | null) {
  if(!body) return null;
  // 提取属性定义并处理每一行
  const lines = body.trim().split(/\s*;\s*/);
  const vueProps = {};
  for (const line of lines) {
    if (!line) continue
    // 提取键、类型和可选标记
    let [propName, propType] = line.split(/\s*:\s*/);
    const isOptional = propName.endsWith('?');
    propName = (propName || "").replace('?', '');

    const propTypes: string[] = [];
    for (propType of propType.split(/\s*\|\s*/)) {
      // 处理数组array
      if (isArray(propType) && !propTypes.includes('Array')) {
        propTypes.push("Array")
        continue;
      }

      if (isFunction(propType) && !propTypes.includes('Function')) {
        propTypes.push("Function")
        continue;
      }

      // 基础数据类型
      if (isBasic(propType)) {
        propTypes.push(propType.charAt(0).toUpperCase() + propType.slice(1))
        continue;
      }

      propTypes.push('Object')
    }

    vueProps[propName] = {  type: propTypes.length === 1 ? propTypes[0] : propTypes };
    if (!isOptional)  vueProps[propName].required = true;
  }

  return vueProps;
}


  const getImportProps = (code: string) => code.match(importPropsRegex);
  const getPropsDeclaration = (code: string) => code.match(localPropsRegex);

  
  function removeQuotesFromTypeProperties(str) {
    return str.replace(/"type":(\s*"\w+"|\s*\[\s*"\w+"\s*(,\s*"\w+"\s*)*])/g, function (match) {
      return match.replace(/"/g, '');
    });
  }
   
export async function parseProps(code: string, id: string, resolve: any) {
    let propsDeclaration: RegExpMatchArray | null = null;
    propsDeclaration = getPropsDeclaration(code);

    if(!propsDeclaration){
      const importMatched = getImportProps(code);
      if(!importMatched) return null;
      const absolute = await resolve(importMatched[1], id)
      propsDeclaration = getPropsDeclaration(await readFileSync(absolute.id, 'utf-8'))
    }
    if(!propsDeclaration) return null;

    return {
      unresolved: propsDeclaration[0],
      resolved: removeQuotesFromTypeProperties(JSON.stringify(ts2vue3Props(propsDeclaration[1])))
    }

}
