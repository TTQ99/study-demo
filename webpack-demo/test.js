let arr = [1]
for (let a = 0; a < arr.length; a++) {
  if (a < 10) {
    arr.push(a + 1)
  }
}

console.log(arr)