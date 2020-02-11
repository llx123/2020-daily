class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.$vm = vm;
    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el);
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDirective(name) {
    return name.includes('v-');
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment(), child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(fragment) {
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    })
  }
  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        let exp = attr.value;
        let dir = attrName.substring(2);
        CompileUtil[dir](node, this.$vm, exp);
      }
    })
  }
  compileText(node) {
    let exp = node.textContent;
    let reg = /\{\{(.*)\}\}/g;
    if (reg.test(exp)) {
      CompileUtil['text'](node, this.$vm, exp);
    }
  }
}

// 指令处理集合
CompileUtil = {
  getVal(vm, exp) {
    exp = exp.split('.');
    return exp.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  getTextVal(vm, exp) {
    return exp.replace(/\{\{(.*)\}\}/g, (...arg) => {
      return this.getVal(vm, arg[1]);
    });
  },
  setVal(vm, exp, value) {
    exp = exp.split('.');
    return exp.reduce((prev, next, currentIndex) => {
      if (currentIndex === exp.length - 1) {
        return prev[next] = value;
      }
    }, vm.$data);
  },
  text(node, vm, exp) {
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, exp);
    exp.replace(/\{\{(.*)\}\}/g, (...arg) => {
      new Watcher(vm, arg[1], (newVal) => {
        updateFn && updateFn(node, newVal);
      });
    });
    updateFn && updateFn(node, value);
  },
  model(node, vm, exp) {
    let updateFn = this.updater['modelUpdater'];
    new Watcher(vm, exp, (newVal) => {
      updateFn && updateFn(node, newVal);
    });
    node.addEventListener('input', (e) => {
      let val = e.target.value;
      if (val === this.getVal(vm, exp)) {
        return;
      }
      this.setVal(vm, exp, val);
    })
    updateFn && updateFn(node, this.getVal(vm, exp));
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}
