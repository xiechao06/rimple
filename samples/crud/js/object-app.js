import { h } from 'virtual-dom';
import countryStore from './store/country';
import userStore from './store/user';
import router from './router';

const { Slot } = rimple;

const loadingSlot = Slot('.loading');
const objSlot = Slot({});
const nationListSlot = Slot([]);
const messageSlot = Slot('');

const onsubmit = function onsubmit() {
  loadingSlot.val('.loading');
  let obj = objSlot.val();
  userStore.save(obj)
  .then(function () {
    rimple.mutate([
      [loadingSlot, ''],
      [messageSlot, 'submit succeeded!'],
    ]);
    loadingSlot.val('');
    setTimeout(function () {
      messageSlot.val('');
    }, 2000);
    router.navigate('/user/' + obj.id);
  });
  return false;
};

export default {
  get $$view() {
    return Slot(function ([loading, obj, nations, message]) {
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
                objSlot.patch({ name: this.value });
              },
              value: name
            }),
          ]),
          h('.field', [
            h('label', 'Age'),
            h('input', {
              oninput() {
                objSlot.patch({ age: this.value });
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
                objSlot.patch({ gender: 'male' });
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
                objSlot.patch({ gender: 'female' });
              }
            }),
            h('label', 'female'),
          ]),
          h('.field', [
            h('label', 'nation'),
            h('select', {
              onchange() {
                objSlot.patch({ nation: this.value });
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
                objSlot.patch({ email: this.value });
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
    }, [loadingSlot, objSlot, nationListSlot, messageSlot]);
  },
  init({ id }={}) {
    Promise.all([
      countryStore.list,
      id? userStore.get(id): Promise.resolve({})
    ])
    .then(function ([countries, obj]) {
      rimple.mutate([
        [loadingSlot, ''],
        [nationListSlot, countries],
        [objSlot, obj],
      ]);
    });

  }
};
