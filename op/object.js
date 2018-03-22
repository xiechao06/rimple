/**
 * these are a group of operations to mutate a slot with value type of Object
 *
 * @lends Slot.prototype
 *
 * */
const patch = {
  /**
   * patch the object value
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Blue' });
   * $$s.patch({ name: 'Jerry', species: 'Mouse' });
   * console.log($$s.val()); // { name: 'Jerry', species: 'Mouse', colur: 'Blue' }
   *
   * @param {object} obj - object used to patch me
   * @return {Slot} this
   *
   * */
  patch(obj) {
    this.debug && console.info(
      `slot: slot ${this.tag()} is about to be patched`, obj
    );
    return this.val(Object.assign({}, this.val(), obj));
  },
  /**
   * omit the keys
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Blue' });
   * $$s.omit(['color']);
   * console.log($$s.val(); // { name: 'Tom' }
   *
   * @return {Slot} this
   * */
  omit(keys) {
    for (let field of keys) {
      delete this._value[field];
    }
    return this.val(Object.assign({}, this._value));
  },
  /**
   * set the property of Slot's value
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Red' });
   * $$s.set('color', 'Blue');
   * console.log($$s.val(); // { name: 'Tom', color: 'Red' }
   *
   * @return {Slot} this
   * */
  set(prop, value) {
    if (typeof value == 'function') {
      value = value.apply(this, [this._value[prop]]);
    }
    this._value[prop] = value;
    this.val(
      Array.isArray(this._value)?
        [].concat(this._value):
        Object.assign({}, this._value)
    );
    return this;
  },
  /**
   * set the deep property of Slot's value
   * @example
   * const $$s = $$({ name: 'Tom' });
   * $$s.setIn(['friend', 'name'], 'Jerry');
   * console.log($$s.val(); // { name: 'Tom', frien: { 'name': 'Red'} }
   *
   * @example
   * const s = slot({});
   * s.setIn(['a', 1], 'abc'); // { a: [, 'abc'] }
   *
   * @return {Slot} this
   * */
  setIn(path, value) {
    let o = this._value;
    for (let i = 0; i < path.length - 1; ++i) {
      let seg = path[i];
      let nextSeg = path[i + 1];
      o[seg] = o[seg] || (Number.isInteger(nextSeg)? []: {});
      o = o[seg];
    }
    let lastSeg = path[path.length - 1];
    if (typeof value == 'function') {
      value = value.apply(this, [o[lastSeg]]);
    }
    o[lastSeg] = value;
    this.val(Object.assign({}, this._value));
    return this;
  }
};

patch.assoc = patch.set;
patch.assocIn = patch.setIn;

export default patch;
