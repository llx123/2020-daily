class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }
    // 数据劫持
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]);
    })
  }
  defineReactive(obj, key, val) {
    let that = this;
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          that.observe(newVal);
          val = newVal;
          dep.notify();
        }
      }
    })
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}