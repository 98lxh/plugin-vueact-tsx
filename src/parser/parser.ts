import { readFileSync } from "fs";
import { genImportPropsRegex, genLocalPropsRegex, IRegExpMatchArray } from "../utils/regex";

export async function parser(code: string, id: string, _resolve: any, propName: string) {
  const propsDeclaration = await matchPropsDeclaration(code, id, _resolve, propName)

  if (!propsDeclaration) {
    return null;
  } else {
    let resolved = propsDeclaration[2]
    const unresolved = propsDeclaration[0]

    async function recursionExtendsProps(propsDeclaration: RegExpMatchArray) {
      const declaration = propsDeclaration as IRegExpMatchArray;

      const _extends = (propsDeclaration[1] || "").split(',').map(str => str.trim())

      for (const _extend of _extends) {
        const _id = declaration.cid ? declaration.cid : id;
        const _code = declaration['input'] || "";

        const extendsPropsDeclaration = await matchPropsDeclaration(_code, _id, _resolve, _extend)

        if (extendsPropsDeclaration) {
          await recursionExtendsProps(extendsPropsDeclaration);
          resolved += extendsPropsDeclaration[2]
        } else {
          continue;
        }
      }
    }

    await recursionExtendsProps(propsDeclaration)
    return { unresolved, resolved }
  }
}


async function matchPropsDeclaration(code: string, id: string, resolve: any, propName = '') {
  let propsDeclaration: RegExpMatchArray | null = null;
  let cid: null | string = null;

  const importPropsRegex = genImportPropsRegex(propName);
  const localPropsRegex = genLocalPropsRegex(propName);
  propsDeclaration = code.match(localPropsRegex)

  if (!propsDeclaration) {
    const importMatched = code.match(importPropsRegex);

    if (!importMatched) return null;

    const absolute = await resolve(importMatched[2], id)
    cid = absolute.id;
    propsDeclaration = (await readFileSync(cid!, 'utf-8')).match(localPropsRegex)
    propsDeclaration && ((propsDeclaration as IRegExpMatchArray).cid = cid);
  }


  return propsDeclaration;
}
