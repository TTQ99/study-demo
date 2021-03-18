const clone = (target) => {
  console.log(target)
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

function car (val) {
  this.type = 'a'
  this.name = val.name
}

const fit = new car({ name: 'fit' })
console.log(fit)