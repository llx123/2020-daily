class MyPromise {
  constructor(fn) {
    this.states = {
      PENDING: 'pending',
      RESOLVE: 'resolve',
      REJECT: 'reject'
    }
    this.value = null;
    this.state = this.states.PENDING;
    this.resolveCallBacks = [];
    this.rejectCallBacks = [];
    MyPromise._this = this;
    try {
      fn(MyPromise.resolve, MyPromise.reject);
    } catch (error) {
      throw new Error(error);
    }
  }
  static resolve(value) {
    const _this = MyPromise._this;
    // 是否是实例调用
    const newPromise = _this instanceof MyPromise;
    if (newPromise && _this.state === _this.states.PENDING) {
      _this.state = _this.states.RESOLVE;
      _this.value = value;
      _this.resolveCallBacks.map(cb => _this.value = cb(_this.value));
    } else if (!newPromise) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: _this.states.resolve,
        value
      })
    }
  }
  static reject(value) {
    const _this = MyPromise._this;
    const newPromise = _this instanceof MyPromise;
    if (newPromise && _this.state === _this.states.PENDING) {
      _this.state = _this.states.REJECT;
      _this.value = value;
      _this.rejectCallBacks.map(cb => _this.value = cb(_this.value))
    } else if (!newPromise) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: _this.states.REJECT,
        value
      })
    }
  }
  then(fullfillCb, rejectCb) {
    const {
      PENDING,
      RESOLVE,
      REJECT
    } = this.states;
    const fCb = typeof fullfillCb === 'function' ? fullfillCb : c => c;
    const rCb = typeof rejectCb === 'function' ? rejectCb : c => {
      throw c;
    }
    switch (this.state) {
      case PENDING:
        this.resolveCallBacks.push(fCb);
        this.rejectCallBacks.push(rCb);
        break;
      case RESOLVE:
        this.value = fCb(this.value)
        break;
      case REJECT:
        this.value = rCb(this.value);
        break;
      default:
        break;
    }
    return this; // 链式调用
  }
}
