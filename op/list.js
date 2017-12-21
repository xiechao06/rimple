export default {
  concat(l) {
    this.val(this.val().concat(l));
    return this;
  },
  map(fn) {
    this.val(this.val().map(fn));
    return this;
  },
  filter(fn) {
    let val = this.val();
    this.val(val.filter(fn));
    return this;
  },
  slice() {
    let val = this.val();
    this.val(val.slice.apply(val, Array.from(arguments)));
    return this;
  },
  shift() {
    this.val().shift();
    this.touch();
    return this;
  },
  unshift(o) {
    this.val().unshift(o);
    this.touch();
    return this;
  },
  push(o) {
    this.val().push(o);
    this.touch();
    return this;

  },
  pop() {
    this.val().pop();
    this.touch();
    return this;
  },
  reverse() {
    this.val(this.val().reverse());
    return this;
  }
};
