import booleanOps from './op/boolean';
import objectOps from './op/object';
import numberOps from './op/number';
import listOps from './op/list';
import stringOps from './op/string';

const _uniqueId = function _uniqueId() {
  let i = 1;
  return function (prefix='') {
    return prefix + i++;
  };
}();

const _isEmptyObj = function _isEmptyObj(obj) {
  for(const key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

const _objectValues = function _objectValues(obj) {
  if (Object.values) {
    return Object.values(obj);
  }
  const values = [];
  for (let key in obj){
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

const Slot = function Slot(...args) {
  if (!(this instanceof Slot)) {
    return new Slot(...args);
  }
  this._id = _uniqueId();
  this._onChangeCbs = [];
  this._parents = [];
  this._childMap = {};
  this._offspringMap = {};
  this._offspringLevels = [];
  this._tag = '';
  Object.defineProperty(this, 'token', {
    get: function get() {
      return this._tag + '-' + this._id;
    }
  });
  Object.defineProperty(this, 'parents', {
    get: function get() {
      return this._parents;
    }
  });
  Object.defineProperty(this, 'children', {
    get: function get() {
      return _objectValues(this._childMaps);
    }
  });
  if (args.length <= 1) {
    this._value = args[0];
  } else {
    const [valueFunc, parents, eager] = args;
    this.watch(valueFunc, parents, eager);
  }
};

Slot.prototype.isTopmost = function isTopmost() {
  return !this._parents.length;
}


// var Slot = function (initial, tag, mutatedTester) {
//   if (!(this instanceof Slot)) {
//     return new Slot();
//   }
//   this.id = _uniqueId();
//   this.value = initial;
//   this._onChangeCbs = [];
//   this.parents = [];
//   this_childMap = {};
//   this._offspringMap = {};
//   this._offspringLevels = [];
//   this._tag = tag;
//   this.token = this.tag + '-' + this.id;
//   this.mutatedTester = mutatedTester;
// };

Slot.prototype.tag = function tag(v) {
  if (v == void 0) {
    return this._tag;
  }
  this._tag = v;
  return this;
};

Slot.prototype.mutatedTester = function mutatedTester(tester) {
  this._mutatedTester = tester;
  return this;
}

Slot.prototype.isRoot = function () {
  return this.parents.length == 0;
};

Slot.prototype.hasChildren = function (id) {
  if (id == void 0) {
    return _objectValues(this_childMap).length > 0;
  }
  return !!this_childMap[id];
};

/* *
 * add a change hanlder
 *
 * !!!Warning, this is a very dangerous operation if you modify slots in
 * change handler, consider the following scenario:
 *
 *  let $$s1 = $$(1);
 *  let $$s2 = $$s1.makeChild(it => it * 2);
 *  let $$s3 = $$s1.makeChild(it => it * 3);
 *  let $$s4 = $$();
 *  $$s2.change(function () {
 *    $$s1.val(3); // forever loop
 *  ));
 *
 *  $$s1.val(2);
 *
 *  as a thumb of rule, don't set value for parents in change handler
 *
 * */
Slot.prototype.change = function (proc) {
  this._onChangeCbs.push(proc);
  return this;
};

/**
 * detach the target slot from its parents, and let its children
 * connect me, just as slot has been eliminated
 * note! I won't respond with target slot's parents' change
 * */
Slot.prototype.override = function override(slot) {
  for (let parent of slot._parents) {
    delete parent._childMap[slot._id];
  }
  for (let childId in slot._childMap) {
    let child = slot._childMap[childId];
    this._childMap[childId] = child;
    for (let i = 0; i < child._parents.length; ++i) {
      if (child._parents[i]._id == slot._id) {
        child._parents[i] = this;
        break;
      }
    }
  }
  this._offspringMap = this._offspringLevels = void 0;
  // make ancestors _offspringMap obsolete, why not just calculate _offspringMap
  // for each ancestor? since this operation should be as quick as possible
  // and multiple override/replaceParent/connect operations could be batched,
  // since the calculation of springs of ancestors postponed to the moment
  // when ancestor is evaluated
  slot.getAncestors().forEach(function (ancestor) {
    ancestor._offspringLevels = ancestor._offspringMap = void 0;
  });
  return this;
};


/**
 * replaceParent, why not just re-connect, since connect is a quite
 * expensive operation, whilst replaceParent only affect the replaced one
 *
 * @param idx the index of parent
 * @param parent a slot or any object, if not provided, the "idx"th parent will
 * be unconnected
 */
Slot.prototype.replaceParent = function replaceParent(idx, parent) {
  let args = [idx, 1];
  if (parent != void 0) {
    args.push(parent);
  }
  let [replaced] = this.parents.splice.apply(this.parents, args);
  // replace the same parent, just return
  if (replaced == parent) {
    return this;
  }
  if (replaced instanceof Slot) {
    delete replaced._childMap[this.id];
    replaced._offspringLevels = replaced._offspringMap = void 0;
    replaced.getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  if (parent instanceof Slot) {
    parent._offspringLevels = parent._offspringMap = void 0;
    // make ancestors _offspringMap obsolete
    parent.getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  return this;
};

Slot.prototype.removeParent = function removeParent(idx) {
  return this.replaceParent(idx);
}

Slot.prototype.offChange = function (proc) {
  this._onChangeCbs = this._onChangeCbs.filter(cb => cb != proc);
};

// propogate from me
Slot.prototype._propogate = function ({ roots }) {
  // if has only one child, touch it
  let children = _objectValues(this._childMap);
  if (children.length == 0) {
    return;
  }
  if (children.length == 1) {
    children[0].touch(true, { roots, involvedParents: [this] });
    return;
  }
  if (this._offspringLevels === void 0 || this._offspringMap === void 0) {
    this._setupOffsprings();
  }
  let cleanSlots = {};
  // update root is always considered to be dirty,
  // otherwise it won't propogate
  let updateRoot = this;
  let changeCbArgs = [];
  for (let level of this._offspringLevels) {
    for (let child of level) {
      let involvedParents = child._parents.filter(function (parent) {
        return parent instanceof Slot &&
          (parent._id === updateRoot._id ||
           (updateRoot._offspringMap[parent._id] && !cleanSlots[parent._id]));
      });
      // clean child will be untouched
      let dirty = involvedParents.length > 0;
      if (!dirty) {
        cleanSlots[child._id] = child;
        continue;
      }
      child.debug && console.info(`slot: slot ${child._tag} will be refreshed`);
      let context = {involvedParents, roots};
      let oldV = child._value;
      // DON'T CALL change callbacks
      if (child.touch(false, context, false)) {
        changeCbArgs.push([child, oldV, involvedParents]);
      } else {
        cleanSlots[child._id] = child;
      }
    }
  }
  // call change callbacks at last
  changeCbArgs.forEach(function ([slot, oldV, involvedParents]) {
    for (let cb of slot._onChangeCbs) {
      cb.apply(slot, [slot._value, oldV, { involvedParents, roots }]);
    }
  });
};

Slot.prototype.val = function val(...args) {
  if (args.length === 0) {
    if (this._value === void 0 && typeof this._valueFunc === 'function') {
      this._value = this._valueFunc.apply(
        this, [
          this._parents.map(it => it instanceof Slot? it.val(): it),
          { roots: [ this ] },
        ]
      );
    }
    return this._value;
  }
  return this.setV(args[0]);
};

Slot.prototype.setV = function setV(newV) {
  if (typeof this._mutatedTester === 'function' && !this._mutatedTester(this.value, newV)) {
    return this;
  }
  this.debug && console.info(
    `slot: slot ${this._tag} updated -- `, this.value, '->', newV
  );
  let oldV = this._value;
  this._value = newV;
  this._propogate({ roots: [this] });
  for (let cb of this._onChangeCbs) {
    cb.apply(this, [this._value, oldV, {
      roots: [this],
    }]);
  }
  return this;
};

Slot.prototype.update = function () {
  if (this.valueFunc) {
    this.value = this.valueFunc.apply(
      this,
      [this.parents.map(parent => parent instanceof Slot? parent.val(): parent)]
    );
  }
  this.val(this.value);
};

const _colletChildren = function _colletChildren(slots) {
  let ret = {};
  for (let o of slots) {
    for (let k in o._childMap) {
      let child = o._childMap[k];
      ret[child._id] = child;
    }
  }
  return _objectValues(ret);
};

Slot.prototype._setupOffsprings = function () {
  this._offspringMap = {};
  this._offspringLevels = [];
  if (_isEmptyObj(this._childMap)) {
    return this;
  }
  // level by level
  for (
    let _offspringMap = _objectValues(this._childMap), level = 1;
    _offspringMap.length;
    _offspringMap = _colletChildren(_offspringMap), ++level
  )  {
    for (let i of _offspringMap) {
      if (!(i._id in this._offspringMap)) {
        this._offspringMap[i._id] = {
          slot: i,
          level: level
        };
      } else {
        this._offspringMap[i._id].level = Math.max(
          this._offspringMap[i._id].level, level
        );
      }
    }
  }
  let currentLevel = 0;
  let slots;
  for (
    let { slot, level } of
    _objectValues(this._offspringMap).sort((a, b) => a.level - b.level)
  ) {
    if (level > currentLevel) {
      slots = [];
      this._offspringLevels.push(slots);
      currentLevel = level;
    }
    slots.push(slot);
  }
  return this;
};

/**
 * make a slot change but its value is not mutatedTester
 *
 * @param context - if null, the touched slot is served as roots
 * @param propogate - if propogate the touch event
 * */
Slot.prototype.touch = function (propogate=true, context=null, callCbs=true) {
  let oldValue = this._value;
  if (!context) {
    context = { roots: [this] };
  }
  if (this._valueFunc) {
    let args = [
      this._parents.map(parent => parent instanceof Slot? parent.val(): parent),
      context,
    ];
    this._value = this._valueFunc.apply(this, args);
  }
  if (typeof this._mutatedTester == 'function' && !this._mutatedTester(oldValue, this._value)) {
    return false;
  }
  if (callCbs) {
    for (let cb of this._onChangeCbs) {
      cb.apply(this, [this._value, oldValue, context]);
    }
  }
  propogate && this._propogate({ roots: context.roots });
  return true;
};

Slot.prototype.makeChild = function (f, mutatedTester) {
  return Slot(function ([parent]) {
    return f(parent);
  }, [this]).mutatedTester(mutatedTester);
};

Slot.prototype.watch = function (valueFunc, parents, eager) {
  // if connect to the same parents, nothing happens
  let connectTheSameParents = true;
  for (let i = 0; i < Math.max(parents.length, this._parents.length); ++i) {
    if (parents[i] != this._parents[i]) {
      connectTheSameParents = false;
      break;
    }
  }
  if (connectTheSameParents && (valueFunc == this.valueFunc)) {
    return this;
  }
  let self = this;
  // make my value invalid
  self._value = void 0;
  self._valueFunc = valueFunc;
  // affected parents slots
  let affected = {};
  for (let slot of parents) {
    if (slot instanceof Slot) {
      affected[slot._id] = slot;
    }
  }
  for (let parent of self._parents) {
    if (parent instanceof Slot) {
      if (parents.every(function (s) {
        return s !== parent;
      })) {
        affected[parent._id] = parent;
        delete parent._childMap[self._id];
      }
    }
  }
  // setup parents
  self._parents = [];
  parents.forEach(function (slot) {
    self._parents.push(slot);
    if (slot instanceof Slot) {
      slot._childMap[self._id] = self;
    }
  });
  // initialize
  if (eager && self._parents.length) {
    self._value = self._valueFunc.apply(
      self, [
        self._parents
        .map(parent => parent instanceof Slot? parent.val(): parent),
        function (parents) {
          return { roots: parents, involvedParents: parents };
        }(self._parents.filter(it => it instanceof Slot)),
      ]
    );
  }
  // make ancestors' _offspringMap obsolete, it will be
  // recalculated until they are evaluated
  self.getAncestors().forEach(function (ancestor) {
    ancestor._offspringLevels = ancestor._offspringMap = void 0;
  });
  return self;
};

Slot.prototype.getAncestors = function() {
  let ancestors = {};
  for (let parent of this._parents) {
    if (parent instanceof Slot) {
      if (!ancestors[parent._id]) {
        ancestors[parent._id] = parent;
        for (let ancestor of parent.getAncestors()) {
          ancestors[ancestor._id] = ancestor;
        }
      }
    }
  }
  return _objectValues(ancestors);
};

// opposite operation to watch
Slot.prototype.shrink = function (val) {
  return this.watch(void 0, []).val(val);
};


// /**
//  * note! a child has only one chance to setup its parents
//  * */
// const watch = function watch(
//   slots, valueFunc, mutatedTester, lazy=true
// ) {
//   return (new Slot()).watch(slots, valueFunc, mutatedTester, lazy);
// };

const updateBy = function (slotFnPairs) {
  return update(slotFnPairs.map(function ([slot, fn]) {
    return [slot, fn && fn.apply(slot, [slot.value])];
  }));
};

const update = function (slotValuePairs) {
  let cleanSlots = {};
  let roots = slotValuePairs.map(([slot]) => slot);
  slotValuePairs.forEach(function ([slot, value]) {
    slot.debug && console.info(`slot ${slot._tag} mutatedTester`, slot._value, value);
    let oldValue = slot._value;
    if (value !== void 0) {
      slot._value = value;
      if (slot._mutatedTester && !slot._mutatedTester(oldValue, value)) {
        cleanSlots[slot._id] = slot;
        return;
      }
    }
    for (let cb of slot._onChangeCbs) {
      cb.call(slot, slot._value, oldValue, { roots });
    }
  });
  // related slots include roots
  let relatedSlots = {};
  let addToRelatedSlots = function (slot, level) {
    if (slot._id in relatedSlots) {
      relatedSlots[slot._id].level = Math.max(
        level, relatedSlots[slot._id].level
      );
    } else {
      relatedSlots[slot._id] = {
        slot,
        level,
      };
    }
  };
  slotValuePairs.forEach(function ([slot]) {
    addToRelatedSlots(slot, 0);
    if (slot._offspringMap === void 0) {
      slot._setupOffsprings();
    }
    _objectValues(slot._offspringMap).forEach(function ({slot: offspring, level}) {
      addToRelatedSlots(offspring, level);
    });
  });
  // group _offspringMap by level, but omits level 0 (those updated directly)
  // since they should not be touched
  let slots;
  let levels = [];
  let currentLevel = 0;
  _objectValues(relatedSlots)
  .sort((a, b) => a.level - b.level)
  .filter(it => it.level > 0)
  .forEach(function ({slot, level}) {
    if (level > currentLevel) {
      slots = [];
      levels.push(slots);
      currentLevel = level;
    }
    slots.push(slot);
  });
  let changeCbArgs = [];
  for (let level of levels) {
    for (let child of level) {
      let involvedParents = child._parents.filter(function (p) {
        return p instanceof Slot && relatedSlots[p._id] && !cleanSlots[p._id];
      });
      if (!involvedParents.length) {
        cleanSlots[child._id] = child;
        continue;
      }
      child.debug && console.info(
        `slot: slot ${child._tag} will be refreshed`
      );
      let context = { involvedParents, roots };
      // DON'T use val(), val will reevaluate this slot
      let oldV = child._value;
      // DON'T CALL change callbacks
      if (child.touch(false, context, false)) {
        changeCbArgs.push([child, oldV, involvedParents]);
      } else {
        cleanSlots[child._id] = child;
      }
    }
  }
  // call change callbacks at last
  changeCbArgs.forEach(function ([slot, oldV, involvedParents]) {
    for (let cb of slot._onChangeCbs) {
      cb.apply(slot, [slot._value, oldV, { involvedParents, roots }]);
    }
  });
};

Slot.prototype.applyWith = function applyWith(f, args=[]) {
  args = [this._value].concat(args);
  return this.val(f.apply(this, args));
};

export default (function ($$) {
  $$.Slot = Slot;
  $$.slot = function (...args) {
    return new Slot(args);
  };
  $$.update = update;
  $$.updateBy = updateBy;
  $$.mixin = function mixin(mixins) {
    Object.assign(Slot.prototype, mixins);
  };
  $$.mixin(booleanOps);
  $$.mixin(objectOps);
  $$.mixin(numberOps);
  $$.mixin(listOps);
  $$.mixin(stringOps);
  return $$;
})(Slot);
