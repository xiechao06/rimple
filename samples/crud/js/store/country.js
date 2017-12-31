import Countries from 'country-list';

export default {
  get list() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new Countries().getNames());
      }, 300);
    });
  }
};
