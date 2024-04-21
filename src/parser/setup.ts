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
  const regex = /(function\s+([^\(\s]+)\s*\(([^)]*)\)\s*{([\s\S]*)})|(\(\s*([^)]*)\s*\)\s*=>\s*{([\s\S]*)})\s*$/g;
  let matched: null | any = null;
  let lastIndex = -1;

  while ((matched = regex.exec(code)) !== null) {
    lastIndex = regex.lastIndex;
  }

  regex.lastIndex = 0;
  matched = regex.exec(code);


  if (!matched) return null;
  let body: string | null = null;
  let name: string | null = null;

  if (matched) {
    // 函数名
    name = matched[2] || matched[6];
    // 函数体
    body = `${matched[2] ? `(${matched[3]})` : `(${matched[5]})`} {${matched[4] || matched[7]}}`; // 构建函数签名和函数体
  }

  return {
    before: matched[0],
    after: `const ${name} = defineComponent({
      name:"${name}",
      ${props ? `props:${props},` : ""}
      setup${parseSetupBody(body!)}
    })`
  }
}
