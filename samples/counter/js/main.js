const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

const $$counter = $$(1).tag('counter');

const $$view = $$(function ([counter]) {
  return h('h1.counter', 'counter: ' + counter);
}, [$$counter]);

const mount = function ($$view, container) {
  // maybe $$view is a getter, just access it once
  let oldVnode = $$view.val();
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
  $$view.change(onChange);
};

document.addEventListener('DOMContentLoaded', function () {
  mount($$view, '.container');
  setInterval(function () {
    $$counter.inc();
  }, 1000);
});
