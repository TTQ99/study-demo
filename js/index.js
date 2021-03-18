// console.log(1231);
// if (1) {
//   var a = 123
//   let d = 321
//   console.log(d);
// }
// console.log(a);


// 解构

// const [a,b,v] = [1,2,3]
// console.log(a,b,v); 1 2 3

// const [a,,b] = [1,2,3]
// console.log(a,b); 1 3

// const [a,...b] = [1,2,3]
// console.log(a,b); 1 [2,3]

// const [a,,b] = [1,2]
// console.log(b); undefind

// const [a,,b = 4] = [1,2]
// console.log(b); 4


// 剩余参数

function fn () {
  // console.log(arguments) //[Arguments] { '0': 1, '1': 2, '2': 3 }
}

// function fn (...arguments){
//   console.log(arguments)  // [1,2,3]
// }

fn(1, 2, 3)

const sun = n => n - 1


require('./extend')