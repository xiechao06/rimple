export default {
  toLowerCase() {
    this.val(this.val().toLowerCase());
    return this;
  },
  toUpperCase() {
    this.val(this.val().toUpperCase());
    return this;
  },
};
