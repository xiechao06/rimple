(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('rimple', factory) :
	(global.rimple = factory());
}(this, (function () { 'use strict';

/**
 * these are a group of operations to mutate a slot with value type of boolean
 *
 * @lends Slot.prototype
 *
 * */
var booleanOps = {
  /**
   * toggle the Slot's value
   * @return {Slot} this
   * */
  toggle: function toggle() {
    return this.val(!this.val());
  },

  /**
   * make the Slot's value to be true
   * @return {Slot} this
   * */
  on: function on() {
    return this.val(true);
  },

  /**
   * make the Slot's value to be false
   * @return {Slot} this
   * */
  off: function off() {
    return this.val(false);
  }
};

/**
 * these are a group of operations to mutate a slot with value type of Object
 *
 * @lends Slot.prototype
 *
 * */
var objectOps = {
  /**
   * patch the object value
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Blue' });
   * $$s.patch({ name: 'Jerry', species: 'Mouse' });
   * console.log($$s.val()); // { name: 'Jerry', species: 'Mouse', colur: 'Blue' }
   *
   * @param {object} obj - object used to patch me
   * @return {Slot} this
   *
   * */
  patch: function patch(obj) {
    this.debug && console.info('slot: slot ' + this.tag() + ' is about to be patched', obj);
    return this.val(Object.assign(this.val(), obj));
  },

  /**
   * omit the keys
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Blue' });
   * $$s.omit(['color']);
   * console.log($$s.val(); // { name: 'Tom' }
   *
   * @return {Slot} this
   * */
  omit: function omit(keys) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var field = _step.value;

        delete this._value[field];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this.val(this._value);
  },

  /**
   * set the property of Slot's value
   * @example
   * const $$s = $$({ name: 'Tom', color: 'Red' });
   * $$s.setProp('color', 'Blue');
   * console.log($$s.val(); // { name: 'Tom', color: 'Red' }
   *
   * @return {Slot} this
   * */
  setProp: function setProp(prop, value) {
    if (typeof value == 'function') {
      value = value.apply(this, [this.value[prop]]);
    }
    this.value[prop] = value;
    this.touch();
    return this;
  },

  /**
   * set the deep property of Slot's value
   * @example
   * const $$s = $$({ name: 'Tom' });
   * $$s.setPath(['friend', 'name'], 'Jerry');
   * console.log($$s.val(); // { name: 'Tom', frien: { 'name': 'Red'} }
   *
   * @return {Slot} this
   * */
  setPath: function setPath(path, value) {
    var o = this.value;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = path.slice(0, -1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var seg = _step2.value;

        o[seg] = o[seg] || {};
        o = o[seg];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var lastSeg = path[path.length - 1];
    if (typeof value == 'function') {
      value = value.apply(this, [o[lastSeg]]);
    }
    o[lastSeg] = value;
    this.touch();
    return this;
  }
};

/**
 * these are a group of operations to mutate a slot with value type of number
 *
 * @lends Slot.prototype
 *
 * */
var numberOps = {

  /**
   * increment the slot's value, the slot's value should be of type number
   *
   * @param {number} cnt - the value to be added, default is 1
   * @return {Slot} this
   * */
  inc: function inc() {
    var cnt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.val(this.val() + cnt);
  },


  /**
   * decrement the slot's value, the slot's value should be of type number
   *
   * @param {number} cnt - the value to be deremented, default is 1
   * @return {Slot} this
   * */
  dec: function dec() {
    var cnt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.val(this.val() - cnt);
  },


  /**
   * get remainder the slot's value, the slot's value should be of type number
   *
   * @example
   * const $$s = $$(17).mod(7);
   * console.log($$s.val());  // output 3
   *
   * @param {number} n - the divisor
   * @return {Slot} this
   * */
  mod: function mod(n) {
    return this.val(this.val() % n);
  },

  /**
   * multiply the slot's value by n, the slot's value should be of type number
   *
   * @param {number} n - the multiplier
   * @return {Slot} this
   * */
  multiply: function multiply(n) {
    return this.val(this.val() * n);
  },


  /**
   * divides the slot's value by n, the slot's value should be of type number
   *
   * @param {number} n - the divisor
   * @return {Slot} this
   * */
  divide: function divide(n) {
    return this.val(this.val() / n);
  }
};

/**
 * these are a group of operations to mutate a slot with value type of array
 *
 * @lends Slot.prototype
 *
 * */
var listOps = {
  /**
   * concat the Slot's value with an array
   *
   * @param {array} arr
   * @return {Slot} this
   * */
  concat: function concat(arr) {
    return this.val(this.val().concat(arr));
  },

  /**
   * map the Slot's value with a function
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.map(it => it * 2).val()); // 2, 4, 6
   *
   * @param {function} fn
   * @return {Slot} this
   * */
  map: function map(fn) {
    return this.val(this.val().map(fn));
  },

  /**
   * filter the Slot's value with a function
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.filter(it => it % 2 == 0).val()); // 2, 4
   *
   * @param {function} fn
   * @return {Slot} this
   * */
  filter: function filter(fn) {
    var val = this.val();
    return this.val(val.filter(fn));
  },

  /**
   * slice the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.slice(1, 2).val()); // [2]
   *
   * @return {Slot} this
   * */
  slice: function slice() {
    var val = this.val();
    return this.val(val.slice.apply(val, Array.from(arguments)));
  },

  /**
   * shift the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3, 4]);
   * console.log($$s.shift().val()); // 2, 3, 4
   *
   * @return {Slot} this
   * */
  shift: function shift() {
    this.val().shift();
    this.touch();
    return this;
  },

  /**
   * shift the Slot's value
   *
   * @example
   * const $$s = $$([2, 3, 4]);
   * console.log($$s.unshift(1).val()); // 1, 2, 3, 4
   *
   * @return {Slot} this
   * */
  unshift: function unshift(o) {
    this.val().unshift(o);
    this.touch();
    return this;
  },

  /**
   * push the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.push(4).val()); // 1, 2, 3, 4
   *
   * @return {Slot} this
   * */
  push: function push(o) {
    this.val().push(o);
    this.touch();
    return this;
  },

  /**
   * push the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.pop().val()); // 1, 2
   *
   * @return {Slot} this
   * */
  pop: function pop() {
    this.val().pop();
    this.touch();
    return this;
  },

  /**
   * reverse the Slot's value
   *
   * @example
   * const $$s = $$([1, 2, 3]);
   * console.log($$s.pop().val()); // [3, 2, 1]
   *
   * @return {Slot} this
   * */
  reverse: function reverse() {
    this.val(this.val().reverse());
    return this;
  }
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _uniqueId = function _uniqueId() {
  var i = 1;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return prefix + i++;
  };
}();

var _isEmptyObj = function _isEmptyObj(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

var _objectValues = function _objectValues(obj) {
  if (Object.values) {
    return Object.values(obj);
  }
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

/**
 * @constructor
 *
 * @desc A Slot could be created in 2 methods:
 *
 *  * new Slot(value)
 *
 *  this will make a data slot
 *
 *  * new Slot(valueFunc, followings)
 *
 *  this will make a follower slot, where followings is an Array.
 *  if the element (say *following*) in observables is a:
 *
 *    * Slot
 *
 *      if *following* changed, *follower* will be re-evaludated by executing *valueFunc*,
 *      following.val() will be used as valueFunc's argument.
 *      its new value is the return value of *valueFunc*, and change will be propogated to
 *      *follower*'s followers.
 *
 *    * not Slot
 *
 *      when *follower* is re-evaluated, following will be used as *valueFunc*'s argument directly.
 *
 *  and valueFunc will accept 2 parameters:
 *
 *    * the current value of observables
 *    * mutation process context, it has two keys:
 *
 *      * roots - the mutation process roots, namely, those changed by clients (api caller)
 *        directly
 *
 *      * involved - the observed involed in this mutation process
 *
 *      the context is very useful if the evaluation function needs to return value
 *      according to which of its followings mutated
 *
 *  let's see two example:
 *
 *  ```javascript
 *
 *  const $$following = $$(1);
 *  const $$follower = $$((following, n) => following + n, [$$following, 2]);
 *  console.log($$follower.val()); // output 3, since n is always 2
 *
 *  $$following.inc();
 *  console.log($$follower.val()); // output 4, since n is always 2
 *  ```
 *
 *  ```javascript
 *
 *  const $$a = $$(1).tag('a');
 *  const $$b = $$(([a]) => a + 1, [$$a]).tag('b');
 *  const $$c = $$(2).tag('c');
 *  const $$d = $$(function ([a, b], {roots, involved}) {
 *    console.log(roots.map(it => it.tag())); // output [a]
 *    console.log(involved.map(it => it.tag())); // output [b]
 *    return a + b;
 *  });
 *
 *  // a is root of mutation proccess, and c is not changed in this mutation proccess
 *  $$a.inc();
 *
 *  ```
 *
 * */
var Slot = function Slot() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (!(this instanceof Slot)) {
    return new (Function.prototype.bind.apply(Slot, [null].concat(args)))();
  }
  this._id = _uniqueId();
  this._changeCbs = [];
  this._followings = [];
  this._followerMap = {};
  // offsprings are all direct or indirect followers
  this._offspringMap = {};
  this._offspringLevels = [];
  this._tag = '';
  Object.defineProperty(this, 'token', {
    get: function get() {
      return this._tag + '-' + this._id;
    }
  });
  Object.defineProperty(this, 'followings', {
    get: function get() {
      return this._followings;
    }
  });
  Object.defineProperty(this, 'followers', {
    get: function get() {
      return _objectValues(this._followerMaps);
    }
  });
  if (args.length <= 1) {
    this._value = args[0];
  } else {
    var valueFunc = args[0],
        followings = args[1],
        eager = args[2];

    this.follow(valueFunc, followings, eager);
  }
};

/**
 * test if slot observes others
 * @return {boolean} true if it observes others, else false
 * */
Slot.prototype.isTopmost = function isTopmost() {
  return !this._followings.length;
};

/**
 * Set/get tag of slot, useful when debugging.
 *
 * @example
 * // set tag will return this
 * const $$s = $$('foo').tag('bar');
 * console.log($$s.tag()); // output bar
 *
 * @param {(string|undefined)} v - if is string, set the tag of slot and return this,
 * else return the tag
 * @return {(string|Slot)}
 * */
Slot.prototype.tag = function tag(v) {
  if (v == void 0) {
    return this._tag;
  }
  this._tag = v;
  return this;
};

/**
 * set a handler to Slot to test if slot is mutated, here is an example:
 *
 * @example
 * let $$s1 = $$(true);
 * let $$s2 = $$(false);
 *
 * let $$s3 = $$((s1, s2) => s1 && s2, [$$s1, $$s2])
 * .mutationTester((oldV, newV) => oldV != newV);
 *
 * $$s4 = $$s3.makeFollower((s3) => !s3)
 * .change(function () {
 *    console.log('s4 changed!');
 * });
 *
 * // $$s2 will be changed to true, but $$s3 is not changed,
 * // neither $$s4 will be changed
 * $$s2.toggle();
 *
 *
 * @param {function} tester - a handler to test if slot is changed in one mutation
 * process, if a slot finds all its dependents are unmutation, the mutation process
 * stops from it.
 * A propriate tester will improve the performance dramatically sometimes.
 *
 * it access slot as *this* and slot's new value and old value as arguments,
 * and return true if slot is changed in mutation process, else false.
 *
 * */
Slot.prototype.mutationTester = function mutationTester(tester) {
  this._mutationTester = tester;
  return this;
};

/**
 * add a change handler
 *
 * !!!Warning, this is a very dangerous operation if you modify slots in
 * change handler, consider the following scenario:
 *
 * ```javascript
 *  let $$s1 = $$(1);
 *  let $$s2 = $$s1.makeFollower(it => it * 2);
 *  let $$s3 = $$s1.makeFollower(it => it * 3);
 *  $$s2.change(function () {
 *    $$s1.val(3); // forever loop
 *  ));
 *
 *  $$s1.val(2);
 * ```
 *
 *
 *  as a thumb of rule, don't set value for followings in change handler
 *
 * @param {function} proc - it will be invoked when slot is mutated in one
 * mutation process the same order as it is added, it accepts the following
 * parameters:
 *
 *   * new value of Slot
 *   * the old value of Slot
 *   * the mutation context
 *
 * for example, you could refresh the UI, when ever the final view changed
 *
 * @return {Slot} this
 *
 * */
Slot.prototype.change = function (proc) {
  this._changeCbs.push(proc);
  return this;
};

/**
 * remove the change handler
 *
 * @see {@link Slot#change}
 * */
Slot.prototype.offChange = function (proc) {
  this._changeCbs = this._changeCbs.filter(function (cb) {
    return cb != proc;
  });
};

/**
 * detach the target slot from its followings, and let its followers
 * connect me(this), just as if slot has been eliminated after the detachment.
 * this method is very useful if you want to change the dependent graph
 *
 * !!NOTE this method will not re-evaluate the slot and starts the mutation process
 * at once, so remember to call touch at last if you want to start a mutaion process
 *
 * @param {Slot} targetSlot
 * @return {Slot} this
 *
 * */
Slot.prototype.override = function override(targetSlot) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = targetSlot._followings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var following = _step.value;

      delete following._followerMap[targetSlot._id];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var followerId in targetSlot._followerMap) {
    var follower = targetSlot._followerMap[followerId];
    this._followerMap[followerId] = follower;
    for (var i = 0; i < follower._followings.length; ++i) {
      if (follower._followings[i]._id == targetSlot._id) {
        follower._followings[i] = this;
        break;
      }
    }
  }
  this._offspringMap = this._offspringLevels = void 0;
  // make ancestors _offspringMap obsolete, why not just calculate _offspringMap
  // for each ancestor? since this operation should be as quick as possible
  // and multiple override/replaceFollowing/connect operations could be batched,
  // since the calculation of springs of ancestors postponed to the moment
  // when ancestor is evaluated
  targetSlot._getAncestors().forEach(function (ancestor) {
    ancestor._offspringLevels = ancestor._offspringMap = void 0;
  });
  return this;
};

/**
 * replaceFollowing, why not just re-follow, since follow is a quite
 * expensive operation, while replaceFollowing only affect the replaced one
 *
 * !!NOTE this method will not re-evaluate the slot and starts the mutation process
 * at once, so remember to call touch at last if you want to start a mutaion process
 *
 * @param idx the index of following
 * @param following a slot or any object, if not provided, the "idx"th following will
 * not be followed anymore.
 *
 * @return {Slot} this
 */
Slot.prototype.replaceFollowing = function replaceFollowing(idx, following) {
  var args = [idx, 1];
  if (following != void 0) {
    args.push(following);
  }

  var _followings$splice$ap = this.followings.splice.apply(this.followings, args),
      _followings$splice$ap2 = _slicedToArray(_followings$splice$ap, 1),
      replaced = _followings$splice$ap2[0];
  // replace the same following, just return


  if (replaced == following) {
    return this;
  }
  if (replaced instanceof Slot) {
    delete replaced._followerMap[this.id];
    replaced._offspringLevels = replaced._offspringMap = void 0;
    replaced._getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  if (following instanceof Slot) {
    following._offspringLevels = following._offspringMap = void 0;
    // make ancestors _offspringMap obsolete
    following._getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  return this;
};

/**
 * this is the shortcut of replaceFollowing(idx)
 *
 * !!NOTE this method will not re-evaluate the slot and starts the mutation process
 * at once, so remember to call touch at last if you want to start a mutaion process
 *
 * @param {number} idx - the index of
 * */
Slot.prototype.removeFollowing = function removeFollowing(idx) {
  return this.replaceFollowing(idx);
};

// propogate from me
Slot.prototype._propogate = function (_ref) {
  var roots = _ref.roots;

  // if has only one follower, touch it
  var followers = _objectValues(this._followerMap);
  if (followers.length == 0) {
    return;
  }
  if (followers.length == 1) {
    followers[0].touch(true, { roots: roots, involved: [this] });
    return;
  }
  if (this._offspringLevels === void 0 || this._offspringMap === void 0) {
    this._setupOffsprings();
  }
  var cleanSlots = {};
  // mutate root is always considered to be dirty,
  // otherwise it won't propogate
  var mutateRoot = this;
  var changeCbArgs = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = this._offspringLevels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var level = _step2.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = level[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var follower = _step4.value;

          var involved = follower._followings.filter(function (following) {
            return following instanceof Slot && (following._id === mutateRoot._id || mutateRoot._offspringMap[following._id] && !cleanSlots[following._id]);
          });
          // clean follower will be untouched
          var dirty = involved.length > 0;
          if (!dirty) {
            cleanSlots[follower._id] = follower;
            continue;
          }
          follower.debug && console.info('slot: slot ' + follower._tag + ' will be refreshed');
          var context = { involved: involved, roots: roots };
          var oldV = follower._value;
          // DON'T CALL change callbacks
          if (follower.touch(false, context, false)) {
            changeCbArgs.push([follower, oldV, involved]);
          } else {
            cleanSlots[follower._id] = follower;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
    // call change callbacks at last
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  changeCbArgs.forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 3),
        slot = _ref3[0],
        oldV = _ref3[1],
        involved = _ref3[2];

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = slot._changeCbs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var cb = _step3.value;

        cb.apply(slot, [slot._value, oldV, { involved: involved, roots: roots }]);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  });
};

/**
 * get or set the value, if no argument is given, get the current value of Slot,
 * otherwise, set the value of Slot, *the mutation process* starts, and returns *this*
 *
 * @return {(any|Slot)}
 * */
Slot.prototype.val = function val() {
  if (arguments.length === 0) {
    if (this._value === void 0 && typeof this._valueFunc === 'function') {
      this._value = this._valueFunc.apply(this, [this._followings.map(function (it) {
        return it instanceof Slot ? it.val() : it;
      }), { roots: [this] }]);
    }
    return this._value;
  }
  return this.setV(arguments.length <= 0 ? undefined : arguments[0]);
};

/**
 * set the slot's value, and starts a *mutation process*
 *
 * @param {any} newV - the new value of slot,
 * */
Slot.prototype.setV = function setV(newV) {
  if (typeof this._mutationTester === 'function' && !this._mutationTester(this.value, newV)) {
    return this;
  }
  this.debug && console.info('slot: slot ' + this._tag + ' mutated -- ', this.value, '->', newV);
  var oldV = this._value;
  this._value = newV;
  this._propogate({ roots: [this] });
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = this._changeCbs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var cb = _step5.value;

      cb.apply(this, [this._value, oldV, {
        roots: [this]
      }]);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return this;
};

var _colletFollowers = function _colletFollowers(slots) {
  var ret = {};
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = slots[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var o = _step6.value;

      for (var k in o._followerMap) {
        var follower = o._followerMap[k];
        ret[follower._id] = follower;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return _objectValues(ret);
};

Slot.prototype._setupOffsprings = function () {
  this._offspringMap = {};
  this._offspringLevels = [];
  if (_isEmptyObj(this._followerMap)) {
    return this;
  }
  // level by level
  for (var _offspringMap = _objectValues(this._followerMap), level = 1; _offspringMap.length; _offspringMap = _colletFollowers(_offspringMap), ++level) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _offspringMap[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var i = _step7.value;

        if (!(i._id in this._offspringMap)) {
          this._offspringMap[i._id] = {
            slot: i,
            level: level
          };
        } else {
          this._offspringMap[i._id].level = Math.max(this._offspringMap[i._id].level, level);
        }
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }
  var currentLevel = 0;
  var slots = void 0;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = _objectValues(this._offspringMap).sort(function (a, b) {
      return a.level - b.level;
    })[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _ref4 = _step8.value;
      var slot = _ref4.slot;
      var _level = _ref4.level;

      if (_level > currentLevel) {
        slots = [];
        this._offspringLevels.push(slots);
        currentLevel = _level;
      }
      slots.push(slot);
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return this;
};

/**
 * touch a slot, that means, re-evaluate the slot's value forcely, and
 * starts *mutation process* and call change callbacks if neccessary.
 * usually, you don't need call this method, only when you need to mutate the
 * following graph (like override, replaceFollowing, follow)
 *
 * @param propogate - if starts a *mutation process*, default is true
 * @param context - if null, the touched slot is served as roots, default is null
 * @param callChangeCbs - if call change callbacks, default is true
 *
 * @return {boolean} - return true if this Slot is mutated, else false
 *
 * @see Slot#override
 * */
Slot.prototype.touch = function () {
  var propogate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var callChangeCbs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var oldValue = this._value;
  if (!context) {
    context = { roots: [this] };
  }
  if (this._valueFunc) {
    var _args = [this._followings.map(function (following) {
      return following instanceof Slot ? following.val() : following;
    }), context];
    this._value = this._valueFunc.apply(this, _args);
  }
  if (typeof this._mutationTester == 'function' && !this._mutationTester(oldValue, this._value)) {
    return false;
  }
  if (callChangeCbs) {
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = this._changeCbs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var cb = _step9.value;

        cb.apply(this, [this._value, oldValue, context]);
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9.return) {
          _iterator9.return();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  }
  propogate && this._propogate({ roots: context.roots });
  return true;
};

/**
 * make a follower slot of me. this following has only one followings it is me.
 * @example
 * const $$s1 = $$(1);
 * const $$s2 = $$s1.fork(n => n + 1);
 *
 * is equivalent to:
 *
 * @example
 * const $$s1 = $$(1);
 * const $$s2 = $$(([n]) => n + 1, [$$s1]);
 *
 * @param {function} func - the evaluation function
 * */
Slot.prototype.fork = function (func) {
  return Slot(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        following = _ref6[0];

    return func(following);
  }, [this]);
};

/**
 * unfollow all the followings if any and follow the new followings using the new
 * valueFunc, this method will mutate the following graph.
 *
 * !!NOTE this method will not re-evaluate the slot and starts the mutation process
 * at once, so remember to call touch at last if you want to start a mutaion process
 *
 * @param {function} valueFunc
 * @param {array} followings - please see Slot's constructor
 *
 * @return {Slot} this
 *
 * @see {@link Slot}
 * */
Slot.prototype.follow = function (valueFunc, followings) {
  // if connect to the same followings, nothing happens
  var connectTheSameFollowings = true;
  for (var i = 0; i < Math.max(followings.length, this._followings.length); ++i) {
    if (followings[i] != this._followings[i]) {
      connectTheSameFollowings = false;
      break;
    }
  }
  if (connectTheSameFollowings && valueFunc == this._valueFunc) {
    return this;
  }
  var self = this;
  // make my value invalid
  self._value = void 0;
  self._valueFunc = valueFunc;
  // affected followings slots
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = followings[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var _loop = function _loop(following) {
    if (following instanceof Slot) {
      if (followings.every(function (s) {
        return s !== following;
      })) {
        delete following._followerMap[self._id];
      }
    }
  };

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = self._followings[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var following = _step11.value;

      _loop(following);
    }
    // setup followings
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11.return) {
        _iterator11.return();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  self._followings = [];
  followings.forEach(function (slot) {
    self._followings.push(slot);
    if (slot instanceof Slot) {
      slot._followerMap[self._id] = self;
    }
  });
  // make ancestors' _offspringMap obsolete, it will be
  // recalculated until they are evaluated
  self._getAncestors().forEach(function (ancestor) {
    ancestor._offspringLevels = ancestor._offspringMap = void 0;
  });
  return self;
};

Slot.prototype._getAncestors = function _getAncestors() {
  var ancestors = {};
  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = this._followings[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var following = _step12.value;

      if (following instanceof Slot) {
        if (!ancestors[following._id]) {
          ancestors[following._id] = following;
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = following._getAncestors()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var ancestor = _step13.value;

              ancestors[ancestor._id] = ancestor;
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12.return) {
        _iterator12.return();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }

  return _objectValues(ancestors);
};

/**
 * shrink to a data slot with value *val*
 * @return {Slot} this
 * */
Slot.prototype.shrink = function (val) {
  this._valueFunc = void 0;
  return this.follow(void 0, []).val(val);
};

/**
 * mutate a group of slots by applying functions upon them, and starts a
 * *mutation proccess* whose roots are these slots to be changed
 *
 * @example
 * let $$p1 = $$(1).tag('p1');
 * let $$p2 = $$(2).tag('p2');
 * let $$p3 = $$p2.fork(it => it + 1).tag('p3');
 * let $$p4 = $$(function ([p1, p2, p3], { roots, involved }) {
 *   console.log(roots.map(it => it.tag())); // p1, p2
 *   console.log(involved.map(it => it.tag())); // p1, p2, p3
 *   return p1 + p2 + p3;
 * }, [$$p1, $$p2, $$p3]);
 * $$.mutateWith([
 *   [$$p1, n => n + 1],
 *   [$$p2, n => n + 2],
 * ]);
 * console.log($$p1.val(), $$p2.val(), $$p3.val(), $$p4.val()); // 2, 4, 5, 11
 *
 * @param {array} slotValuePairs - each element is an array, whose first value is
 * a Slot, and second is the function to be applied
 *
 * */
var mutateWith = function mutateWith(slotFnPairs) {
  return mutate(slotFnPairs.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        slot = _ref8[0],
        fn = _ref8[1];

    return [slot, fn && fn.apply(slot, [slot.val()])];
  }));
};

/**
 * mutate a group of slots, and starts a *mutation proccess* whose
 * roots are these slots to be changed
 *
 * @example
 * let $$p1 = $$(1).tag('p1');
 * let $$p2 = $$(2).tag('p2');
 * let $$p3 = $$p2.fork(it => it + 1).tag('p3');
 * let $$p4 = $$(function ([p1, p2, p3], { roots, involved }) {
 *   console.log(roots.map(it => it.tag())); // p1, p2
 *   console.log(involved.map(it => it.tag())); // p1, p2, p3
 *   return p1 + p2 + p3;
 * }, [$$p1, $$p2, $$p3]);
 * $$.mutate([
 *   [$$p1, 2],
 *   [$$p2, 4],
 * ]);
 * console.log($$p1.val(), $$p2.val(), $$p3.val(), $$p4.val()); // 2, 4, 5, 11
 *
 * @param {array} slotValuePairs - each element is an array, whose first value is
 * a Slot, and second is the new value of slots
 *
 * */
var mutate = function mutate(slotValuePairs) {
  var cleanSlots = {};
  var roots = slotValuePairs.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 1),
        slot = _ref10[0];

    return slot;
  });
  // mutate the targets directly
  slotValuePairs.forEach(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        slot = _ref12[0],
        value = _ref12[1];

    slot.debug && console.info('slot ' + slot._tag + ' mutationTester', slot._value, value);
    var oldValue = slot._value;
    if (value !== void 0) {
      slot._value = value;
      if (slot._mutationTester && !slot._mutationTester(oldValue, value)) {
        cleanSlots[slot._id] = slot;
        return;
      }
    }
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
      for (var _iterator14 = slot._changeCbs[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
        var cb = _step14.value;

        cb.call(slot, slot._value, oldValue, { roots: roots });
      }
    } catch (err) {
      _didIteratorError14 = true;
      _iteratorError14 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion14 && _iterator14.return) {
          _iterator14.return();
        }
      } finally {
        if (_didIteratorError14) {
          throw _iteratorError14;
        }
      }
    }
  });
  // related slots include roots
  var relatedSlots = {};
  var addToRelatedSlots = function addToRelatedSlots(slot, level) {
    if (slot._id in relatedSlots) {
      relatedSlots[slot._id].level = Math.max(level, relatedSlots[slot._id].level);
    } else {
      relatedSlots[slot._id] = {
        slot: slot,
        level: level
      };
    }
  };
  slotValuePairs.forEach(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 1),
        slot = _ref14[0];

    addToRelatedSlots(slot, 0);
    if (slot._offspringMap === void 0) {
      slot._setupOffsprings();
    }
    _objectValues(slot._offspringMap).forEach(function (_ref15) {
      var offspring = _ref15.slot,
          level = _ref15.level;

      addToRelatedSlots(offspring, level);
    });
  });
  // group _offspringMap by level, but omits level 0 (those mutated directly)
  // since they have been touched
  var slots = void 0;
  var levels = [];
  var currentLevel = 0;
  _objectValues(relatedSlots).sort(function (a, b) {
    return a.level - b.level;
  }).filter(function (it) {
    return it.level > 0;
  }).forEach(function (_ref16) {
    var slot = _ref16.slot,
        level = _ref16.level;

    if (level > currentLevel) {
      slots = [];
      levels.push(slots);
      currentLevel = level;
    }
    slots.push(slot);
  });
  var changeCbArgs = [];
  var _iteratorNormalCompletion15 = true;
  var _didIteratorError15 = false;
  var _iteratorError15 = undefined;

  try {
    for (var _iterator15 = levels[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
      var level = _step15.value;
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = level[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          var follower = _step17.value;

          var involved = follower._followings.filter(function (p) {
            return p instanceof Slot && relatedSlots[p._id] && !cleanSlots[p._id];
          });
          if (!involved.length) {
            cleanSlots[follower._id] = follower;
            continue;
          }
          follower.debug && console.info('slot: slot ' + follower._tag + ' will be refreshed');
          var context = { involved: involved, roots: roots };
          // DON'T use val(), val will reevaluate this slot
          var oldV = follower._value;
          // DON'T CALL change callbacks
          if (follower.touch(false, context, false)) {
            changeCbArgs.push([follower, oldV, involved]);
          } else {
            cleanSlots[follower._id] = follower;
          }
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }
    }
    // call change callbacks at last
  } catch (err) {
    _didIteratorError15 = true;
    _iteratorError15 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion15 && _iterator15.return) {
        _iterator15.return();
      }
    } finally {
      if (_didIteratorError15) {
        throw _iteratorError15;
      }
    }
  }

  changeCbArgs.forEach(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 3),
        slot = _ref18[0],
        oldV = _ref18[1],
        involved = _ref18[2];

    var _iteratorNormalCompletion16 = true;
    var _didIteratorError16 = false;
    var _iteratorError16 = undefined;

    try {
      for (var _iterator16 = slot._changeCbs[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
        var cb = _step16.value;

        cb.apply(slot, [slot._value, oldV, { involved: involved, roots: roots }]);
      }
    } catch (err) {
      _didIteratorError16 = true;
      _iteratorError16 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion16 && _iterator16.return) {
          _iterator16.return();
        }
      } finally {
        if (_didIteratorError16) {
          throw _iteratorError16;
        }
      }
    }
  });
};

/**
 * apply the function to me
 *
 * @example
 * const $$s = $$(1);
 * $$s.mutateWith(function (s, n) {
 *  return s + n;
 * }, [2]);
 * console.log($$s.val()); // output 3
 *
 * is equivalent to
 * @example
 * const $$s = $$(1);
 * $$s.val(function (s, n) { return s + n; }($$s.val(), 2));
 *
 * @param {function} func - the mutation function
 * @param {array} args - the extra arguments provided to func, default is []
 *
 * @return {Slot} this
 *
 * */
Slot.prototype.mutateWith = function mutateWith(func) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  args = [this._value].concat(args);
  return this.val(func.apply(this, args));
};

/**
 * add methods to Slot's prototype
 *
 * @example
 * $$.mixin({
 *   negate() {
 *     return this.val(-this.val());
 *   }
 * });
 * const $$s = $$(1).negate();
 * console.log($$s.val()); // output -1
 *
 * @param {object} mixins - the mixins to be added
 *
 * */
var mixin = function mixin(mixins) {
  Object.assign(Slot.prototype, mixins);
};

mixin(booleanOps);
mixin(objectOps);
mixin(numberOps);
mixin(listOps);

var index = {
  Slot: Slot,
  mutate: mutate,
  mutateWith: mutateWith,
  mixin: mixin
};

return index;

})));

//# sourceMappingURL=rimple.js.map
