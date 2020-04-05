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
  }
}