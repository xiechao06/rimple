import listApp from './list-app';
import objectApp from './object-app';
import {mount} from './mount';
import router from './router';

router.on(function () {
  router.navigate('/users');
})
.on('/users', function () {
  mount(listApp.$$view, '.container', {
    onMount: listApp.onMount,
  });
})
.on('/user', function () {
  mount(objectApp.$$view, '.container', {
    onMount: function () {
      objectApp.init.apply(null);
    }
  });
})
.on('/user/:id', function (params) {
  mount(objectApp.$$view, '.container', {
    onMount: function () {
      objectApp.init.apply(null, [params]);
    }
  });
})
.resolve();
