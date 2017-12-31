import { h } from 'virtual-dom';
import userStore from './store/user';
import router from './router';
import qs from 'query-string';

const $$list = $$([]).tag('list');
const $$loading = $$('.loading');
const $$paginator = $$('');

const paginator = function ({ page, pageSize, totalCnt }) {
  return h('.paginator', R.range(1, Math.floor((totalCnt - 1) / pageSize) + 2).map(function (idx) {
    let href = '/users?page=' + idx + '&pageSize=16';
    return h('a.link' + (page == idx? '.active': ''), {
      href,
      onclick() {
        router.navigate(href);
        return false;
      }
    }, '' + idx);
  }));
};

export default {
  get $$view() {
    return $$(function ([loading, list, paginator]) {
      return h('.list.app' + loading, [
        h('h2', [
          'list of users',
          h('a.new', {
            href: '/user' ,
          }, 'create user')
        ]),
        h('table.table', [
          h('thead', h('tr', [
            h('th', 'name'),
            h('th', 'age'),
            h('th', 'nation'),
            h('th', 'gender'),
            h('th', 'email'),
          ])),
          h('tbody', list.map(function ({ id, name, age, nation, gender, email }) {
            let href = '/user/' + id;
            return h('tr', [
              h('td', h('a', {
                href,
                onclick() {
                  router.navigate(href);
                  return false;
                }
              }, name)),
              h('td', age),
              h('td', nation),
              h('td', gender),
              h('td', email)
            ]);
          }))
        ]),
        paginator,
      ]);
    }, [$$loading, $$list, $$paginator])
    .tag('list-view');
  },
  onMount() {
    let { page=1, pageSize=16 } = qs.parse(location.search);
    $$loading.val('.loading');
    userStore.fetchList({ page, pageSize })
    .then(function ({ totalCnt, data }) {
      $$.update([
        [$$loading, ''],
        [$$list, data],
        [$$paginator, paginator({ page, pageSize, totalCnt })]
      ]);
    });
  }
};
