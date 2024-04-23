import { setupGenericsRegex, setupRegex } from "../utils/regex";

// 按照索引位置分割字符串
export function splitStringAtIndex(str: string, index: number) {
  if (index < 0 || index > str.length) {
    return [str, ""];
  }
  return [str.substring(0, index), str.substring(index)];
}

export function parseSetupBody(src: string) {
  const matched = src.match(/return/g);

  if (matched) {
    const lastIndex = src.lastIndexOf("return");
    return splitStringAtIndex(src, lastIndex + 6).join(` ()=> `);;
  } else {
    return src;
  }
}

export function parseSetup(code: string, props?: string) {
  let matched: null | any = null;
  let lastIndex = -1;

  while ((matched = setupRegex.exec(code)) !== null) {
    lastIndex = setupRegex.lastIndex;
  }

  setupRegex.lastIndex = 0;
  matched = setupRegex.exec(code);

  let body: string | null = null;
  let name: string | null = null;

  if (matched) {
    name = matched[2] || matched[6];
    body = `${matched[2] ? `(${matched[3]})` : `(${matched[5]})`} {${matched[4] || matched[7]}}`;
  } else {
    matched = code.match(setupGenericsRegex)
    if(!matched) return null;
    name = matched[2];
    body = `(${matched[3]}){${matched[4]}}`;
  }


  return {
    unresolved: matched[0],
    resolved: `const ${name} = defineComponent({
      name:"${name}",
      ${props ? `props:${props},` : ""}
      setup${parseSetupBody(body!)}
    })`
  }
}
