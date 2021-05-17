
function MyPromise (fn) {
  const self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  function resolve (value) {
    if (self.status === 'pending') {
      self.data = value
      self.status = 'resolved'
      self.onResolvedCallback.map(cb => cb(self.data))
    }
  }
  function reject (reason) {
    if (self.status === 'pending') {
      self.data = reason
      self.status = 'rejected'
      self.onRejectedCallback.map(cb => cb(self.data))
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  const self = this
  const promise2 = undefined
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) { }
  onRejected = typeof onRejected === 'function' ? onRejected : function (x) { }
  if (self.status === 'resolved') {
    return promise2 = new MyPromise(function (resolve, reject) {
      try {
        const x = onResolved(self.data)
        if (x instanceof MyPromise) {
          x.then(resolve, reject)
        }
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (self.status === 'rejected') {
    return promise2 = new MyPromise(function (resolve, reject) {
      try {
        const x = onRejected(self.data)
        if (x instanceof MyPromise) {
          x.then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  if (self.status === 'pending') {
    return new MyPromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          const x = onResolved(self.data)
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallback.push(function (reason) {
        try {
          const x = onRejected(self.data)
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

    })
  }
}

const fn = new MyPromise((resolve, reject) => {
  setTimeout(function () {
    reject(1992)
  }, 1000)
}).then(res => {
  console.log(res);
}, e => {
  console.log('error:' + e);
})