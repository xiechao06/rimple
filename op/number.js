export default {
  inc(cnt=1) {
    this.val(this.val() + cnt);
    return this;
  },
  dec(cnt=1) {
    this.val(this.val() - cnt);
    return this;
  },
  mod(n) {
    this.val(this.val() % n);
    return this;
  },
  multiply(n) {
    this.val(this.val() * n);
    return this;
  },
  divide(n) {
    this.val(this.val() / n);
    return this;
  }
};
