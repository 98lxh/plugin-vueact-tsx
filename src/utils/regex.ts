export const localPropsRegex = /(?:type|interface)\s+DefineProps(?:\s+extends\s+([a-zA-Z][\w]*(?:\s*,\s*[a-zA-Z][\w]*)*))?\s*{([^}]*)}/s;
export const importPropsRegex = /import\s+\{\s*DefineProps\s*\}\s+from\s+['"](.+?)['"]/;

export const setupGenericsRegex = /(const)\s+(\w+):\s+FC<[\w,\s]+>\s+=\s+function\s+\(([\w\,\s\{\}]+)\)\s+\{([\s\S]*)\}/;
export const setupRegex = /(function\s+([A-Z][^\(\s]+)\s*\(([^)]*)\)\s*{([\s\S]*)})|(\(\s*([^)]*)\s*\)\s*=>\s*{([\s\S]*)})\s*$/g;


export const emitsRegex = /name:\s+'([^']+)'/g;

export function genLocalPropsRegex(interfaceName = '') {
  const pattern = `(?:type|interface)\\s+${interfaceName}(?:\\s+extends\\s+([a-zA-Z][\\w]*(?:\\s*,\\s*[a-zA-Z][\\w]*)*))?\\s*{([^}]*)}`;
  return new RegExp(pattern, 's');
}

export const genImportPropsRegex = (interfaceName = '') => {
  const pattern = `import\\s+\\{([^}]*(?:\\b${interfaceName}\\b)[^}]*)\\}\\s+from\\s+['"](.+?)['"]`;
  return new RegExp(pattern, 's');
}

export type IRegExpMatchArray = RegExpMatchArray & { cid: null | string }
