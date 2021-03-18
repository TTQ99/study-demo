// 原型链继承

function Car () {
  this.name = 'car'
}
function aCar () {
  this.type = 'a'
}

aCar.prototype = new Car()
const fit = new aCar()
console.log(fit)
console.log(fit.name)
console.log(fit.hasOwnProperty('name'))