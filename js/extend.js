// 原型链继承

// function Car () {
//   this.name = 'car'
// }

// function aCar () {
//   this.type = 'a'
// }

// aCar.prototype = new Car()
// const fit = new aCar()
// console.log(fit)
// console.log(fit.name)
// console.log(fit.hasOwnProperty('name'))

// 构造函数继承

function Car () {
  this.name = "car"
}

Car.prototype.getName = () => {
  return this.name
}

function aCar () {
  Car.call(this)
  this.type = "a"
}

const fit = new aCar()

console.log(fit);
console.log(fit.getName());