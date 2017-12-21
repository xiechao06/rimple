export default {
  patch(obj) {
    this.debug && console.info(
      `slot: slot ${this.tag} is about to be patched`, obj
    );
    this.val(Object.assign(this.val(), obj));
    return this;
  },
  omit(keys) {
    for (let field of keys) {
      delete this._value[field];
    }
    this.val(this._value);
    return this;
  },
  setProp(prop, value) {
    if (typeof value == 'function') {
      value = value.apply(this, [this.value[prop]]);
    }
    this.value[prop] = value;
    this.touch();
  },
  setPath(path, value) {
    let o = this.value;
    for (let seg of path.slice(0, -1)) {
      o[seg] = o[seg] || {};
      o = o[seg];
    }
    let lastSeg = path[path.length - 1];
    if (typeof value == 'function') {
      value = value.apply(this, [o[lastSeg]]);
    }
    o[lastSeg] = value;
    this.touch();
  }
};
