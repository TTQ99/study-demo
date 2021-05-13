let a = function () { }
console.log(typeof a)
console.log('123' instanceof String)
function getType (target) {
  let type = typeof target
  if (type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(target).replace(/^\[object (\S+)\]$/, '$1')
}
console.log(getType([]))
console.log(getType({}))
console.log(getType(a))
console.log(getType(''))