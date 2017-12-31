import { h } from 'virtual-dom';
import countryStore from './store/country';
import userStore from './store/user';
import router from './router';

const $$loading = $$('.loading');
const $$obj = $$({});
const $$nations = $$([]);
const $$message = $$('');

const onsubmit = function onsubmit() {
  $$loading.val('.loading');
  let obj = $$obj.val();
  userStore.save(obj)
  .then(function () {
    $$.update([
      [$$loading, ''],
      [$$message, 'submit succeeded!'],
    ]);
    $$loading.val('');
    setTimeout(function () {
      $$message.val('');
    }, 2000);
    router.navigate('/user/' + obj.id);
  });
  return false;
};

export default {
  get $$view() {
    return $$(function ([loading, obj, nations, message]) {
      let { name, age, nation, gender, email } = obj;
      return h('.app' + loading, [
        h('h2', obj.id && 'editing user: ' + obj.name || 'creating user'),
        h('.message' + (message?  '': '.hidden'), message),
        h('form.form', {
          onsubmit,
        }, [
          h('.field', [
            h('label', 'Name'),
            h('input', {
              oninput() {
                $$obj.patch({ name: this.value });
              },
              value: name
            }),
          ]),
          h('.field', [
            h('label', 'Age'),
            h('input', {
              oninput() {
                $$obj.patch({ age: this.value });
              },
              value: age,
              type: 'number'
            })
          ]),
          h('.field', [
            h('input', {
              type: 'radio',
              name: 'gender',
              value: 'male',
              checked: {
                male: 'true'
              }[gender],
              onclick() {
                $$obj.patch({ gender: 'male' });
              }
            }),
            h('label', 'male'),
            h('input', {
              type: 'radio',
              name: 'gender',
              value: 'female',
              checked: {
                female: 'true'
              }[gender],
              onclick() {
                $$obj.patch({ gender: 'female' });
              }
            }),
            h('label', 'female'),
          ]),
          h('.field', [
            h('label', 'nation'),
            h('select', {
              onchange() {
                $$obj.patch({ nation: this.value });
              }
            }, [''].concat(nations).map(function (_nation) {
              return h('option', {
                value: _nation,
                selected: nation == _nation? 'true': ''
              }, _nation || '---');
            })),
          ]),
          h('.field', [
            h('label', 'email'),
            h('input', {
              type: 'email',
              oninput() {
                $$obj.patch({ email: this.value });
              },
              value: email,
            })
          ]),
          h('hr'),
          h('input', {
            type: 'submit',
            value: 'Submit',
          }),
          h('button', {
            onclick() {
              router.navigate('/users');
              return false;
            }
          }, 'back')
        ]),
      ]);
    }, [$$loading, $$obj, $$nations, $$message]);
  },
  init({ id }={}) {
    Promise.all([
      countryStore.list,
      id? userStore.get(id): Promise.resolve({})
    ])
    .then(function ([countries, obj]) {
      $$.update([
        [$$loading, ''],
        [$$nations, countries],
        [$$obj, obj],
      ]);
    });

  }
};
