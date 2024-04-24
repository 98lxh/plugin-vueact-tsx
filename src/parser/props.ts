import { isFunction, isArray, isBasic } from "../utils/is";
import { parser } from "./parser";


export async function parseProps(code: string, id: string, _resolve: any) {
  const propsDeclaration = await parser(code, id, _resolve, 'DefineProps');
  if (!propsDeclaration) return null
  return {
    ...propsDeclaration,
    resolved: removeQuotesFromTypeProperties(JSON.stringify(ts2vue3Props(propsDeclaration.resolved)))
  }
}

function ts2vue3Props(resolved: string | null) {
  if (!resolved) return null;
  const lines = resolved.trim().split(/\s*;\s*/);
  const vueProps = {};

  for (const line of lines) {
    if (!line) continue
    let [propName, propType] = line.split(/\s*:\s*/);
    const isOptional = propName.endsWith('?');
    propName = (propName || "").replace('?', '');

    const propTypes: string[] = [];
    for (propType of propType.split(/\s*\|\s*/)) {
      if (isArray(propType) && !propTypes.includes('Array')) {
        propTypes.push("Array")
        continue;
      }

      if (isFunction(propType) && !propTypes.includes('Function')) {
        propTypes.push("Function")
        continue;
      }

      if (isBasic(propType)) {
        propTypes.push(propType.charAt(0).toUpperCase() + propType.slice(1))
        continue;
      }

      propTypes.push('Object')
    }

    vueProps[propName] = { type: propTypes.length === 1 ? propTypes[0] : propTypes };
    if (!isOptional) vueProps[propName].required = true;
  }

  return vueProps;
}

function removeQuotesFromTypeProperties(str) {
  return str.replace(/"type":(\s*"\w+"|\s*\[\s*"\w+"\s*(,\s*"\w+"\s*)*])/g, function (match) {
    return match.replace(/"/g, '');
  });
}
