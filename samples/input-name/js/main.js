const { h, diff, patch, create } = require('virtual-dom');
const { Slot } = rimple;

const mount = function (viewSlot, container) {
  // maybe viewSlot is a getter, just access it once
  let oldVnode = viewSlot.val();
  let rootNode = create(oldVnode);
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  container.innerHTML = '';
  container.appendChild(rootNode);
  let onChange = function (vnode) {
    rootNode = patch(rootNode, diff(oldVnode, vnode));
    oldVnode = vnode;
  };
  viewSlot.change(onChange);
};

const usernameSlot = Slot({
  firstName: '',
  lastName: '',
});

usernameSlot.debug = true;

const inputElSlot = usernameSlot.fork(function ({ firstName, lastName }) {
  return h('.inputs', [
    h('input', {
      placeholder: 'input your first name',
      value: firstName,
      oninput() {
        usernameSlot.patch({ firstName: this.value });
      }
    }),
    h('input', {
      placeholder: 'input your last name',
      value: lastName,
      oninput() {
        usernameSlot.patch({ lastName: this.value });
      }
    }),
  ]);
});

const yourNameElSlot = usernameSlot.fork(function ({ firstName, lastName }) {
  return h('h2', [
    'your name is: ',
    h('span.fullname', {
      style: {
        textDecoration: 'underline',
      }
    }, [firstName, lastName].join(' '))
  ]);
});

const viewSlot = Slot(function ([inputs, yourNameEl]) {
  return h('div', [ inputs, yourNameEl ]);
}, [inputElSlot, yourNameElSlot]);

document.addEventListener('DOMContentLoaded', function () {
  mount(viewSlot, '.container');
});
