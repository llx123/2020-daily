class MVVM {
  constructor(options = {}) {
    new Compile(options.el || document.body, this)
  }
}