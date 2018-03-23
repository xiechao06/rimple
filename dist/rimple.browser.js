var rimple = (function (exports) {
'use strict';

var booleanOps = {
  toggle: function toggle() {
    return this.val(!this.val());
  },
  on: function on() {
    return this.val(true);
  },
  off: function off() {
    return this.val(false);
  }
};

var patch = {
  patch: function patch(obj) {
    this.debug && console.info('slot: slot ' + this.tag() + ' is about to be patched', obj);
    return this.val(Object.assign({}, this.val(), obj));
  },
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

    return this.val(Object.assign({}, this._value));
  },
  set: function set(prop, value) {
    if (typeof value == 'function') {
      value = value.apply(this, [this._value[prop]]);
    }
    this._value[prop] = value;
    this.val(Array.isArray(this._value) ? [].concat(this._value) : Object.assign({}, this._value));
    return this;
  },
  setIn: function setIn(path, value) {
    var o = this._value;
    for (var i = 0; i < path.length - 1; ++i) {
      var seg = path[i];
      var nextSeg = path[i + 1];
      o[seg] = o[seg] || (Number.isInteger(nextSeg) ? [] : {});
      o = o[seg];
    }
    var lastSeg = path[path.length - 1];
    if (typeof value == 'function') {
      value = value.apply(this, [o[lastSeg]]);
    }
    o[lastSeg] = value;
    this.val(Object.assign({}, this._value));
    return this;
  }
};

patch.assoc = patch.set;
patch.assocIn = patch.setIn;

var numberOps = {
  inc: function inc() {
    var cnt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.val(this.val() + cnt);
  },
  dec: function dec() {
    var cnt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return this.val(this.val() - cnt);
  },
  mod: function mod(n) {
    return this.val(this.val() % n);
  },
  multiply: function multiply(n) {
    return this.val(this.val() * n);
  },
  divide: function divide(n) {
    return this.val(this.val() / n);
  }
};

var listOps = {
  concat: function concat(arr) {
    return this.val([].concat(this.val()).concat(arr));
  },
  map: function map(fn) {
    return this.val(this.val().map(fn));
  },
  filter: function filter(fn) {
    var val = this.val();
    return this.val(val.filter(fn));
  },
  slice: function slice() {
    var val = this.val();
    return this.val(val.slice.apply(val, Array.from(arguments)));
  },
  shift: function shift() {
    this.val().shift();
    this.val([].concat(this.val()));
    return this;
  },
  unshift: function unshift(o) {
    this.val().unshift(o);
    this.val([].concat(this.val()));
    return this;
  },
  push: function push(o) {
    this.val().push(o);
    this.val([].concat(this.val()));
    return this;
  },
  pop: function pop() {
    this.val().pop();
    this.val([].concat(this.val()));
    return this;
  },
  reverse: function reverse() {
    this.val([].concat(this.val().reverse()));
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
      return _objectValues(this._followerMap);
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

Slot.prototype.isTopmost = function isTopmost() {
  return !this._followings.length;
};

Slot.prototype.tag = function tag(v) {
  if (v == void 0) {
    return this._tag;
  }
  this._tag = v;
  return this;
};

Slot.prototype.mutationTester = function mutationTester(tester) {
  this._mutationTester = tester;
  return this;
};

Slot.prototype.change = function (proc) {
  this._changeCbs.push(proc);
  return this;
};

Slot.prototype.offChange = function (proc) {
  this._changeCbs = this._changeCbs.filter(function (cb) {
    return cb != proc;
  });
};

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

  targetSlot._getAncestors().forEach(function (ancestor) {
    ancestor._offspringLevels = ancestor._offspringMap = void 0;
  });
  return this;
};

Slot.prototype.replaceFollowing = function replaceFollowing(idx, following) {
  var args = [idx, 1];
  if (following != void 0) {
    args.push(following);
  }

  var _followings$splice$ap = this.followings.splice.apply(this.followings, args),
      _followings$splice$ap2 = _slicedToArray(_followings$splice$ap, 1),
      replaced = _followings$splice$ap2[0];

  if (replaced == following) {
    return this;
  }
  if (replaced instanceof Slot) {
    delete replaced._followerMap[this._id];
    replaced._offspringLevels = replaced._offspringMap = void 0;
    replaced._getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  if (following instanceof Slot) {
    following._offspringLevels = following._offspringMap = void 0;

    following._getAncestors().forEach(function (ancestor) {
      ancestor._offspringLevels = ancestor._offspringMap = void 0;
    });
  }
  return this;
};

Slot.prototype.removeFollowing = function removeFollowing(idx) {
  return this.replaceFollowing(idx);
};

Slot.prototype._propogate = function (_ref) {
  var roots = _ref.roots;

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

          var dirty = involved.length > 0;
          if (!dirty) {
            cleanSlots[follower._id] = follower;
            continue;
          }
          follower.debug && console.info('slot: slot ' + follower._tag + ' will be refreshed');
          var context = { involved: involved, roots: roots };
          var oldV = follower._value;

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

Slot.prototype.setV = function setV(newV) {
  if (typeof this._mutationTester === 'function' && !this._mutationTester(this._value, newV)) {
    return this;
  }
  this.debug && console.info('slot: slot ' + this._tag + ' mutated -- ', this._value, '->', newV);
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
      var _slot = _ref4.slot;
      var _level = _ref4.level;

      if (_level > currentLevel) {
        slots = [];
        this._offspringLevels.push(slots);
        currentLevel = _level;
      }
      slots.push(_slot);
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

Slot.prototype.fork = function (func) {
  return Slot(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        following = _ref6[0];

    return func(following);
  }, [this]);
};

Slot.prototype.follow = function (valueFunc, followings) {
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

  self._value = void 0;
  self._valueFunc = valueFunc;

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

Slot.prototype.shrink = function (val) {
  this._valueFunc = void 0;
  return this.follow(void 0, []).val(val);
};

var mutateWith = function mutateWith(slotFnPairs) {
  return mutate(slotFnPairs.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        slot = _ref8[0],
        fn = _ref8[1];

    return [slot, fn && fn.apply(slot, [slot.val()])];
  }));
};

var mutate = function mutate(slotValuePairs) {
  var cleanSlots = {};
  var roots = slotValuePairs.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 1),
        slot = _ref10[0];

    return slot;
  });

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

          var oldV = follower._value;

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

Slot.prototype.mutateWith = function mutateWith(func) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  args = [this._value].concat(args);
  return this.val(func.apply(this, args));
};

var mixin = function mixin(mixins) {
  Object.assign(Slot.prototype, mixins);
};

var immSlot = function immSlot(value) {
  return Slot(value).mutationTester(function (a, b) {
    return a !== b;
  });
};

mixin(booleanOps);
mixin(patch);
mixin(numberOps);
mixin(listOps);

var slot = Slot;

exports.Slot = Slot;
exports.mutateWith = mutateWith;
exports.mutate = mutate;
exports.mixin = mixin;
exports.immSlot = immSlot;
exports.slot = slot;

return exports;

}({}));

//# sourceMappingURL=rimple.browser.js.map
