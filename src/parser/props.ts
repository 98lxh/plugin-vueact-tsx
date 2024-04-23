import { genImportPropsRegex, genLocalPropsRegex, IRegExpMatchArray } from "../utils/regex";
import { isFunction, isArray, isBasic } from "../utils/is";
import { readFileSync } from "fs";


export async function parseProps(code: string, id: string, resolve: any) {
  const propsDeclaration = await matchPropsDeclaration(code, id, resolve)
  if (!propsDeclaration) return null;
  let [source, _, sourceContent] = propsDeclaration;


  async function recursionExtendsProps(propsDeclaration: RegExpMatchArray) {
    const _extends = propsDeclaration[1] || ""

    for (const _extend of _extends.split(',')) {
      const _id = (propsDeclaration as IRegExpMatchArray).cid ? (propsDeclaration as IRegExpMatchArray).cid! : id;
      const _code = propsDeclaration['input'] || "";

      const extendsPropsDeclaration = await matchPropsDeclaration(_code, _id, resolve, _extend)
      if (!extendsPropsDeclaration) continue;
      if (extendsPropsDeclaration[1]) await recursionExtendsProps(extendsPropsDeclaration);
      sourceContent += extendsPropsDeclaration[2]
    }
  }

  await recursionExtendsProps(propsDeclaration)

  return {
    unresolved: source,
    resolved: removeQuotesFromTypeProperties(JSON.stringify(ts2vue3Props(sourceContent)))
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
  }

  (propsDeclaration as IRegExpMatchArray).cid = cid;
  return propsDeclaration;
}

