/**
 * these are a group of operations to mutate a slot with value type of number
 *
 * @lends Slot.prototype
 *
 * */
const numberOps = {

  /**
   * increment the slot's value, the slot's value should be of type number
   *
   * @param {number} cnt - the value to be added, default is 1
   * @return {Slot} this
   * */
  inc(cnt=1) {
    return this.val(this.val() + cnt);
  },

  /**
   * decrement the slot's value, the slot's value should be of type number
   *
   * @param {number} cnt - the value to be deremented, default is 1
   * @return {Slot} this
   * */
  dec(cnt=1) {
    return this.val(this.val() - cnt);
  },

  /**
   * get remainder the slot's value, the slot's value should be of type number
   *
   * @example
   * const $$s = $$(17).mod(7);
   * console.log($$s.val());  // output 3
   *
   * @param {number} n - the divisor
   * @return {Slot} this
   * */
  mod(n) {
    return this.val(this.val() % n);
  },
  /**
   * multiply the slot's value by n, the slot's value should be of type number
   *
   * @param {number} n - the multiplier
   * @return {Slot} this
   * */
  multiply(n) {
    return this.val(this.val() * n);
  },

  /**
   * divides the slot's value by n, the slot's value should be of type number
   *
   * @param {number} n - the divisor
   * @return {Slot} this
   * */
  divide(n) {
    return this.val(this.val() / n);
  }
};

export default numberOps;
