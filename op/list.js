/**
 * these are a group of operations to mutate a slot with value type of array
 *
 * @lends Slot.prototype
 *
 * */
export default {
  /**
   * concat the Slot's value with an array
   *
   * @param {array} arr
   * @return {Slot} this
   * */
  concat(arr) {
    return this.val([].concat(this.val()).concat(arr));
  },
  /**
   * map the Slot's value with a function
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.map(it => it * 2).val()); // 2, 4, 6
   *
   * @param {function} fn
   * @return {Slot} this
   * */
  map(fn) {
    return this.val(this.val().map(fn));
  },
  /**
   * filter the Slot's value with a function
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.filter(it => it % 2 == 0).val()); // 2, 4
   *
   * @param {function} fn
   * @return {Slot} this
   * */
  filter(fn) {
    let val = this.val();
    return this.val(val.filter(fn));
  },
  /**
   * slice the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.slice(1, 2).val()); // [2]
   *
   * @return {Slot} this
   * */
  slice() {
    let val = this.val();
    return this.val(val.slice.apply(val, Array.from(arguments)));
  },
  /**
   * shift the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.shift().val()); // 2, 3, 4
   *
   * @return {Slot} this
   * */
  shift() {
    this.val().shift();
    this.val([].concat(this.val()));
    return this;
  },
  /**
   * shift the Slot's value
   *
   * @example
   * const $$s = $$([2, 3, 4]);
   * console.log($$s.unshift(1).val()); // 1, 2, 3, 4
   *
   * @return {Slot} this
   * */
  unshift(o) {
    this.val().unshift(o);
    this.val([].concat(this.val()));
    return this;
  },
  /**
   * push the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.push(4).val()); // 1, 2, 3, 4
   *
   * @return {Slot} this
   * */
  push(o) {
    this.val().push(o);
    this.val([].concat(this.val()));
    return this;

  },
  /**
   * push the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.pop().val()); // 1, 2
   *
   * @return {Slot} this
   * */
  pop() {
    this.val().pop();
    this.val([].concat(this.val()));
    return this;
  },
  /**
   * reverse the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.pop().val()); // [3, 2, 1]
   *
   * @return {Slot} this
   * */
  reverse() {
    this.val([].concat(this.val().reverse()));
    return this;
  }
};
