export const localPropsRegex = /(?:type|interface)\s+DefineProps\s*{([^}]*)}/s;
export const importPropsRegex = /import\s+\{\s*DefineProps\s*\}\s+from\s+['"](.+?)['"]/;

export const setupGenericsRegex =/(const)\s+(\w+):\s+FC<\w+>\s+=\s+function\s+\(([\w\,\s\{\}]+)\)\s+\{([\s\S]*)\}/;
export const setupRegex = /(function\s+([^\(\s]+)\s*\(([^)]*)\)\s*{([\s\S]*)})|(\(\s*([^)]*)\s*\)\s*=>\s*{([\s\S]*)})\s*$/g;
