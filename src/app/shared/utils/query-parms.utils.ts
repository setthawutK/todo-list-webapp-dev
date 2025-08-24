// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenObj(obj: Record<string, any>, prefix = '', visited = new WeakSet()): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ret: Record<string, any> = {};

  if (visited.has(obj)) return ret;
  visited.add(obj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) continue;

      if (Array.isArray(value)) {
        ret[newKey] = value.join(',');
      } else if (typeof value === 'object') {
        const nestedFlattened = flattenObj(value, newKey, visited);
        Object.assign(ret, nestedFlattened);
      } else {
        ret[newKey] = value;
      }
    }
  }

  return ret;
}
