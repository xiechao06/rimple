export default {
  toggle() {
    this.val(!this.val());
    return this;
  },
  on() {
    this.val(true);
    return this;
  },
  off() {
    this.val(false);
    return this;
  }
};

