import { genImportPropsRegex, genLocalPropsRegex, IRegExpMatchArray } from "../utils/regex";
import { isFunction, isArray, isBasic } from "../utils/is";
import { readFileSync } from "fs";


export async function parseProps(code: string, id: string, _resolve: any) {
  const propsDeclaration = await matchPropsDeclaration(code, id, _resolve)

  if(!propsDeclaration) {
    return null;
  }

  let content = propsDeclaration[2]
  const source = propsDeclaration[0]

  async function recursionExtendsProps(propsDeclaration: RegExpMatchArray) {
    const declaration = propsDeclaration as IRegExpMatchArray;
    const _extends = propsDeclaration[1] || ""

    for (const _extend of _extends.split(',')) {
      const _id = declaration.cid ? declaration.cid : id;
      const _code = declaration['input'] || "";

      const extendsPropsDeclaration = await matchPropsDeclaration(_code, _id, _resolve, _extend)

      if (extendsPropsDeclaration) {
        await recursionExtendsProps(extendsPropsDeclaration);
        content += extendsPropsDeclaration[2]
      }else {
        continue;
      }
    }
  }

  await recursionExtendsProps(propsDeclaration)

  return {
    unresolved: source,
    resolved: removeQuotesFromTypeProperties(JSON.stringify(ts2vue3Props(content)))
  }
}

function ts2vue3Props(body: string | null) {
  if (!body) return null;
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
      // 处理数组
      if (isArray(propType) && !propTypes.includes('Array')) {
        propTypes.push("Array")
        continue;
      }

      // 处理函数
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

async function matchPropsDeclaration(code: string, id: string, resolve: any, propName = 'DefineProps') {
  let propsDeclaration: RegExpMatchArray | null = null;
  let cid: null | string = null;

  const importPropsRegex = genImportPropsRegex(propName);
  const localPropsRegex = genLocalPropsRegex(propName);


  propsDeclaration = code.match(localPropsRegex)

  if (!propsDeclaration) {
    const importMatched = code.match(importPropsRegex);
    if (!importMatched) return null;
    const absolute = await resolve(importMatched[1], id)
    cid = absolute.id;
    propsDeclaration = (await readFileSync(cid!, 'utf-8')).match(localPropsRegex)
    propsDeclaration && ((propsDeclaration as IRegExpMatchArray).cid = cid);
  }


  return propsDeclaration;
}

