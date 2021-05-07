const clone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

// test

const a = { a: 1, b: { c: 12 } }

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === "function") && obj !== null
const deepClone = (obj, hash = new WeakMap()) => {
  if (obj.constructor === Date) return new Date(obj)
  if (obj.constructor === RegExp) return new RegExp(obj)
  // 解决循环引用
  if (hash.has(obj)) return hash.get(obj)

  let allDesc = Object.getOwnPropertyDescriptors(obj)
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  hash.set(obj, cloneObj)
  console.log(Reflect.ownKeys(obj))

  for (const key of Reflect.ownKeys(obj)) {
    console.log(key)
    if (isComplexDataType(obj[key] && obj[key] !== 'function')) {
      cloneObj[key] = deepClone(obj[key], hash)
    } else {
      cloneObj[key] = obj[key]
    }
  }
  return cloneObj
}
const b = deepClone(new Date())
console.log(b);


const ttq = new WeakMap()
const o = { a: { c: 123 } }
console.log(deepClone(o));

console.log(ttq.get(o));
console.log(ttq.has(o));
console.log(typeof null);