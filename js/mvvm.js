class MVVM {
  constructor(options = {}) {
    this.$data = options.data;
    new Compile(options.el || document.body, this)
  }
}