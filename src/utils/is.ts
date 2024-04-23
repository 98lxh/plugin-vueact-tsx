// 是否为基础类型
export const isBasic = (type: string) => ['string', 'number', 'boolean'].includes(type)

// 是否为数组
export function isArray(type: string) {
  if (type.indexOf('[]') !== -1 || type.indexOf('Array') !== -1) return true;
  return false
}

// 是否为函数
export function isFunction(str) {
  const functionPattern = /^(async\s+)?\bfunction\b|\bfunction\b|\(\s*\)\s*=>|\(\s*.*\s*\)\s*=>|\b\w+\s*=>/;
  return functionPattern.test(str.trim());
}
