// 是否为基础类型
const isBasic = (type: string) => ['string', 'number', 'boolean'].includes(type)

// 是否为数组
function isArray(type: string) {
  if (type.indexOf('[]') !== -1 || type.indexOf('Array') !== -1) return true;
  return false
}

// 是否为函数
function isFunction(str) {
  const functionPattern = /^(async\s+)?\bfunction\b|\bfunction\b|\(\s*\)\s*=>|\(\s*.*\s*\)\s*=>|\b\w+\s*=>/;
  return functionPattern.test(str.trim());
}

// 首字母大写
function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeQuotesFromTypeProperties(str) {
  return str.replace(/"type":(\s*"\w+"|\s*\[\s*"\w+"\s*(,\s*"\w+"\s*)*])/g, function (match) {
    return match.replace(/"/g, '');
  });
}
export function parseProps(content: string) {
  const matched = content.match(/type DefineProps = \{([\s\S]*?)\};/);
  if (!matched) return null;

  // 提取属性定义并处理每一行
  const lines = matched[1].trim().split(/\s*;\s*/);
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
        propTypes.push(capitalizeFirstLetter(propType))
        continue;
      }

      propTypes.push('Object')
    }

    vueProps[propName] = {
      type: propTypes.length === 1 ? propTypes[0] : propTypes
    };

    if (!isOptional) {
      vueProps[propName].required = true;
    }
  }

  return {
    before: matched[0],
    after: removeQuotesFromTypeProperties(JSON.stringify(vueProps))
  }
}
