const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

const { Slot } = rimple;

const counterSlot = Slot(1).tag('counter');

const viewSlot = Slot(function ([counter]) {
  return h('h1.counter', 'counter: ' + counter);
}, [counterSlot]);

const mount = function (viewSlot, container) {
  // maybe viewSlot is a getter, just access it once
  let oldVnode = viewSlot.val();
  let rootNode = createElement(oldVnode);
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

document.addEventListener('DOMContentLoaded', function () {
  mount(viewSlot, '.container');
  setInterval(function () {
    counterSlot.inc();
  }, 1000);
});
