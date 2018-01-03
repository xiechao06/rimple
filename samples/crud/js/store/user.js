import Countries from 'country-list';

if (!sessionStorage.getItem('users')) {
  let users = R.range(0, 16*4).map(function (idx) {
    return {
      id: idx + 1,
      name: chance.name(),
      age: '' + chance.age(),
      gender: chance.pick(['male', 'female']),
      nation: chance.pick(new Countries().getNames()),
      email: chance.email(),
    };
  });

  sessionStorage.setItem('users', JSON.stringify(users));
}


export default {
  get list() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(JSON.parse(sessionStorage.getItem('users')).reverse());
      }, 1000);
    });
  },
  fetchList({ page, pageSize }) {
    let users = JSON.parse(sessionStorage.getItem('users'));
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          data: users.reverse()
          .slice( (page - 1) * pageSize, page * pageSize ),
          totalCnt: users.length,
        });
      }, 300);
    });
  },
  get(id) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(R.find(it => it.id == id)(JSON.parse(sessionStorage.getItem('users'))));
      }, 300);
    });
  },
  save(obj) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let users = JSON.parse(sessionStorage.getItem('users'));
        if (obj.id) {
          let target = R.find(it => it.id == obj.id)(users);
          Object.assign(target, obj);
          sessionStorage.setItem('users', JSON.stringify(users));
        } else {
          obj.id = users.length + 1;
          sessionStorage.setItem('users', JSON.stringify(users.concat(obj)));
        }
        resolve(obj);
      }, 300);
    });
  }
};
