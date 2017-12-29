const { h, diff, patch, create } = require('virtual-dom');

const mount = function ($$view, container) {
  // maybe $$view is a getter, just access it once
  let oldVnode = $$view.val();
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
  $$view.change(onChange);
};

const $$username = $$({
  firstName: '',
  lastName: '',
});

$$username.debug = true;

const $$inputs = $$username.makeChild(function ({ firstName, lastName }) {
  return h('.inputs', [
    h('input', {
      placeholder: 'input your first name',
      value: firstName,
      oninput() {
        $$username.patch({ firstName: this.value });
      }
    }),
    h('input', {
      placeholder: 'input your last name',
      value: lastName,
      oninput() {
        $$username.patch({ lastName: this.value });
      }
    }),
  ]);
});

const $$yourNameEl = $$username.makeChild(function ({ firstName, lastName }) {
  return h('h2', [
    'your name is: ',
    h('span.fullname', {
      style: {
        textDecoration: 'underline',
      }
    }, [firstName, lastName].join(' '))
  ]);
});

const $$view = $$(function ([inputs, yourNameEl]) {
  return h('div', [ inputs, yourNameEl ]);
}, [$$inputs, $$yourNameEl]);

document.addEventListener('DOMContentLoaded', function () {
  mount($$view, '.container');
});
