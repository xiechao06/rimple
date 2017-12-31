import { create, patch, diff } from 'virtual-dom';

let mountMap = {};

let uniqueId = function () {
  let id = new Date().getTime();
  return function () {
    return '' + id++;
  };
}();

export const mount = function mount($$view, container, opts) {
  let timestamp = $$view.val();
  let rootNode = create(timestamp);
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  let mountId = container.getAttribute('data-mount-id');
  if (!mountId) {
    mountId = uniqueId();
    container.setAttribute('data-mount-id', mountId);
  } else {
    unmount(mountId);
  }
  container.innerHTML = '';
  container.appendChild(rootNode);
  let { onMount, onUpdated } = opts;
  let onChange = function onChange(vnode) {
    rootNode = patch(rootNode, diff(timestamp, vnode));
    timestamp = vnode;
    onUpdated && onUpdated.apply($$view, [rootNode]);
  };
  $$view.change(onChange);
  if (typeof onMount == 'function') {
    onMount.apply($$view, [rootNode]);
  }
  mountMap[mountId] = {
    container,
    $$view,
    onChange,
    onUnmount: opts.onUnmount,
  };
};

export const unmount = function unmount(mountId) {
  // it should be unmounted only once after mounted
  if (mountMap[mountId]) {
    let { $$view, onChange, onUnmount, rootNode } = mountMap[mountId];
    $$view.offChange(onChange);
    typeof onUnmount === 'function' && onUnmount.apply(this, [rootNode]);
  }
};

export const clear = function clear(container) {
  if (typeof container === 'string') {
    container = document.querySelector(container);
  }
  let mountId = container.getAttribute('data-mount-id');
  if (mountId) {
    unmount(mountId);
  }
  container.setAttribute('data-mount-id', '');
  container.innerHTML = '';
};

export default { mount, unmount, clear };

