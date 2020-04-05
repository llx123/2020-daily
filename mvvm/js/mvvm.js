class MVVM {
  constructor(options = {}) {
    this.$el = options.el || document.body;
    this.$data = options.data;

    new Observer(this.$data);
    this.proxyData(this.$data);
    new Compile(this.$el, this);
  }
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      })
    })
  }
}