class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(name, cb) {
    if (this.events[ name ]) {
      this.events[ name ].push(cb)
    } else {
      this.events[ name ] = [ cb ]
    }
  }
  off(name, cb) {
    if (this.events[ name ]) {
      this.events[ name ] = this.events[ name ].filter(_ => _ != cb)
    }
  }
  once(name, fn) {
    var runOnce = () => {
      fn.apply(this, arguments)
      this.off(name, runOnce)
    }
    this.on(name, runOnce)
    return this
  }
  emit(name, ...args) {
    if (this.events[ name ]) {
      this.events[ name ].forEach(fn => {
        fn.apply(this, args)
      })
    }
  }
}