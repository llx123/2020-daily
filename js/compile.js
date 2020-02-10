class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.$vm = vm;
    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el);
      this.compile(this.$fragment);
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
        this.compileText();
      }
    })
  }
  compileElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {

      }
    })
  }
  compileText(node) {
    let text = node.textContent;
    let reg = /\{\{(.*)\}\}/g;
    if (reg.text(text)) {

    }
  }
}

// 指令处理集合
CompileUtil = {
  text() { },
  model() { },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}
