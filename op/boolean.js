/**
 * these are a group of operations to mutate a slot with value type of boolean
 *
 * @lends Slot.prototype
 *
 * */
export default {
  /**
   * toggle the Slot's value
   * @return {Slot} this
   * */
  toggle() {
    return this.val(!this.val());
  },
  /**
   * make the Slot's value to be true
   * @return {Slot} this
   * */
  on() {
    return this.val(true);
  },
  /**
   * make the Slot's value to be false
   * @return {Slot} this
   * */
  off() {
    return this.val(false);
  }
};

