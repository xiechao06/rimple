const should = require('should');
require('should-spies');
const $$ = require('./dist/ripple.js');
const assert = require('assert');

describe('single one', function () {
  it('simple', function () {
    let $$s1 = $$(1);
    $$s1.val().should.eql(1);
    $$s1.tag('foo').tag().should.eql('foo');
    $$s1.isTopmost().should.ok();
    $$s1.val(2);
    $$s1.val().should.eql(2);
    assert.equal($$s1.val(void 0).val(), void 0);
  });
  it('changed', function () {
    let $$s1 = $$(1);
    let spy = should.spy();
    $$s1.change(spy);
    $$s1.val(2);
    spy.should.be.calledWith(2, 1, {roots: [$$s1]});
  });

  it('not changed', function () {
    let $$s1 = $$(1).mutatedTester(function () {
      return false;
    });
    let spy = should.spy();
    $$s1.change(spy);
    $$s1.val(2);
    spy.should.not.be.called();
  });
});

describe('watch', function () {
  it('watched by one slot', function () {
    let $$s1 = $$(1);
    let $$s2 = $$(function ([n]) {
      return n + 2;
    }, [$$s1]);
    $$s2.val().should.eql(3);
    $$s1.val(2);
    $$s2.val().should.eql(4);
    //eager
    var $$s3 = $$(function ([n1]) {
      return n1 + 9;
    }, [$$s1], true);
    $$s3.val().should.eql(11);
  });
  it('watched by slot and value', function () {
    let $$s1 = $$(1);
    let $$s2 = $$(function ([n1, n2]) {
      return n1 + n2;
    }, [$$s1, 9]);
    $$s2.val().should.eql(10);
    $$s1.val(2);
    $$s2.val().should.eql(11);
  });

  it('watched by multiple slots', function () {
    let $$s1 = $$(1).tag('s1');
    let $$s2 = $$(function ([s1]) {
      return s1 + 2;
    }, [$$s1]).tag('s2');
    $$s2.val().should.eql(3);
    $$s1.val(2);
    $$s2.val().should.eql(4);

    let spy = should.spy();
    let $$s3 = $$(spy, [$$s1]).tag('s3');
    $$s1.val(3);
    spy.should.be.calledWith([3], {
      roots: [$$s1],
      involvedParents: [$$s1],
    });
  });

  it('watched by grand children', function () {
    let $$s1 = $$(1).tag('s1');
    let $$s2 = $$(function ([s1]) {
      return s1 + 2;
    }, [$$s1]).tag('s2');

    let $$s3 = $$(function ([s1]) {
      return s1 + 3;
    }, [$$s1]).tag('s3');


    let $$s4 = $$(function ([s2, s3]) {
      return s2 + s3;
    }, [$$s2, $$s3]).tag('s4')

    $$s4.val().should.eql(7);

    $$s1.val(2);
    $$s4.val().should.eql(9);

    let spy = should.spy();
    let $$s5 = $$(spy, [$$s2, $$s3]).tag('s5');
    $$s1.touch();
    spy.should.be.calledWith([4, 5], {
      roots: [$$s1],
      involvedParents: [$$s2, $$s3],
    });

  });
})


// it('connect4', function () {
//   let $$s1 = $$(1, 's1');
//   let $$s2 = $$(2, 's2');
//   let $$s3 = $$(null, 's4').connect([$$s1, $$s2], function ([s1, s2]) {
//     return s1 + s2;
//   });

//   let $$s4 = $$(null, 's4').connect([$$s1, $$s3], function ([s1, s3]) {
//     return s1 + s3;
//   });

//   let $$s5 = $$(null, 's5').connect([$$s1, $$s4], function ([s1, s4]) {
//     return s1 + s4;
//   });


//   $$s1.val(2);
//   $$s5.val().should.eql(8);
// });

// it('connect5', function () {

//   let $$s1 = $$(1, 's1');
//   let $$s2 = $$(2, 's2');

//   let $$s3 = $$.connect([$$s1, $$s2], function ([s1, s2]) {
//     return s1 + s2;
//   }, 's3');

//   $$s3.val().should.eql(3);

//   $$s1.val(2);
//   $$s3.val().should.eql(4);
// });

// it('connect6', function () {

//   let $$s3 = $$.connect([1, 2], function ([s1, s2]) {
//     return s1 + s2;
//   }, 's3');

//   $$s3.val().should.eql(3);

//   $$s3.connect([void 0, 9], function ([, s2]) {
//     return s2;
//   });
//   $$s3.val().should.eql(9);
// });

// it('changed1', function () {
//   let $$s1 = $$(1, 's1');
//   let $$s2 = $$.connect([$$s1], function ([s1]) {
//     return s1 + 1;
//   }, function () {
//     return false;
//   });
//   let cnt = 0;
//   let $$s3 = $$.connect([$$s2], function([s2]) {
//     ++cnt;
//     return s2 + 1;
//   });
//   $$s3.val().should.eql(3);
//   cnt.should.eql(1);
//   $$s1.val(2);
//   // cnt.should.eql(1);
//   $$s3.val().should.eql(3);
// });

// it('changed2', function () {
//   let $$s1 = $$(1, 's1');
//   let $$s2 = $$.connect([$$s1], function ([s1]) {
//     return s1 + 1;
//   }, function () {
//     return false;
//   });
//   let $$s3 = $$.connect([$$s2], function([s2]) {
//     return s2 + 1;
//   });
//   let cnt = 0;
//   let $$s4 = $$.connect([$$s3, $$s2], function ([s3, s2]) {
//     cnt++;
//     return s3 + s2;
//   });
//   $$s4.val().should.eql(5);
//   cnt.should.eql(1);
//   $$s1.val(2);
//   cnt.should.eql(1);
//   $$s4.val().should.eql(5);
// });

// it('changed3', function () {
//   let $$s1 = $$(1, 's1');
//   let $$s2 = $$(2, 's2');
//   let $$s3 = $$.connect([$$s1], function ([s1]) {
//     return s1 + 1;
//   }, 's3', function () {
//     return false;
//   });
//   let $$s4 = $$.connect([$$s2], function([s2]) {
//     return s2 + 1;
//   }, 's4', function () {
//     return true;
//   });
//   let cnt = 0;
//   let $$s5 = $$.connect([$$s3, $$s4], function ([s3, s4]) {
//     cnt++;
//     return s3 + s4;
//   });
//   $$s5.val().should.eql(5);
//   cnt.should.eql(1);
//   $$.update([
//     [$$s1, 2],
//     [$$s2, 3]
//   ]);
//   cnt.should.eql(2);
//   $$s5.val().should.eql(7);
// });

// it('changed4', function () {
//   let $$s1 = $$(1, 's1', function () {
//     return false;
//   });
//   let $$s2 = $$(2, 's2', function () {
//     return false;
//   });
//   let $$s3 = $$.connect([$$s1], function ([s1]) {
//     return s1 + 1;
//   }, 's3', function () {
//     return false;
//   });
//   $$s3.val().should.eql(2);
//   $$.update([[$$s1, 2]]);
//   $$s3.val().should.eql(2);
//   let $$s4 = $$.connect([$$s2], function([s2]) {
//     return s2 + 1;
//   }, 's4', function () {
//     return false;
//   });
//   let cnt = 0;
//   let $$s5 = $$.connect([$$s3, $$s4], function ([s3, s4]) {
//     cnt++;
//     return s3 + s4;
//   });
//   $$s5.val().should.eql(5);
//   cnt.should.eql(1);
//   $$.update([
//     [$$s1, 2],
//     [$$s2, 3]
//   ]);
//   cnt.should.eql(1);
//   $$s5.val().should.eql(5);
// });

describe('touch', function () {

  it('a single slot', function () {
    // $$s1's value is void 0 initially, it will be changed to
    // 1 when touched
    let $$s1 = $$(1);
    let spy = should.spy();
    $$s1.change(spy);

    $$s1.touch().should.true();
    spy.should.be.calledWith(1, 1, {
      roots: [$$s1],
    });

    $$s1.offChange(spy);
    spy = should.spy();
    $$s1.mutatedTester(function (a, b) {
      return a != b;
    });
    $$s1.change(spy);
    $$s1.touch().should.false();
    spy.should.not.be.called();
  });

  it('stop propagation when not changed', function () {
    let $$s1 = $$(1).mutatedTester(function () {
      return false;
    });
    let spy = should.spy();
    let $$s2 = $$(spy, [$$s1]);
    $$s2.change(spy);

    $$s1.touch().should.false();
    spy.should.not.be.called();
  });

  it('propagate with one child', function () {
    let $$s1 = $$(1);
    let spy1 = should.spy(function ([s1]) {
      return s1 + 2;
    });
    let $$s2 = $$(spy1, [$$s1]).tag('s2');
    let spy2 = should.spy();
    $$s2.change(spy2);

    $$s1.touch().should.true();
    $$s2.val().should.eql(3);
    spy1.should.be.calledWith([1], {
      roots: [$$s1],
      involvedParents: [$$s1]
    });
    spy2.should.be.calledWith(3, void 0, {
      roots: [$$s1],
      involvedParents: [$$s1],
    });
  });

  it('propagate with many children', function () {
    let $$parent = $$(1);
    let $$child1 = $$(function ([p]) {
      return p + 1;
    }, [$$parent]);
    let spy1 = should.spy();
    $$child1.change(spy1);
    let $$child2 = $$(function ([p]) {
      return p + 2;
    }, [$$parent]);
    let spy2 = should.spy();
    $$child2.change(spy2);

    $$parent.touch().should.true();
    spy1.should.be.calledWith(2, void 0, {
      roots: [$$parent],
      involvedParents: [$$parent],
    });
    spy2.should.be.calledWith(3, void 0, {
      roots: [$$parent],
      involvedParents: [$$parent],
    });
  });

  it('propagation stopped when slot is clean', function () {

    let $$grandParent = $$('a');
    let $$parent1 = $$(function ([grandParent]) {
      return grandParent + 'b';
    }, [$$grandParent])
    .tag('parent1');
    // parent2 is always CLEAN
    let $$parent2 = $$(function ([grandParent]) {
      return grandParent + 'c';
    }, [$$grandParent])
    .mutatedTester(() => false)
    .tag('parent2');

    // parent3 is also CLEAN
    let $$parent3 = $$('d');

    let $$child1 = $$(
      function ([p1, p2, p3]) {
        return p1 + p2 + p3;
      },
      [$$parent1, $$parent2, $$parent3]
    );
    let spy1 = should.spy();
    $$child1.change(spy1);

    // child2 will not be propogated
    let $$child2 = $$(
      function ([p2, p3], { roots }) {
        roots.should.deepEqual([this]);
        return p2 + p3;
      },
      [$$parent2, $$parent3]
    ).tag('child2');
    let spy2 = should.spy();
    $$child2.change(spy2);

    $$grandParent.touch();
    spy1.should.be.called();
    spy2.should.not.be.called();
    $$child2.val().should.eql('acd');
  });
});

it('override', function () {
  let $$s1 = $$(1);
  let $$s2 = $$(([s1]) => s1 + 1, [$$s1]);
  $$s2.val().should.eql(2);
  let $$s3 = $$(([s2]) => s2 * 2, [$$s2]);
  $$s3.val().should.eql(4);
  let $$s1_ = $$(3);
  let $$s2_ = $$(([s1_]) => s1_ * 3, [$$s1_]); // 9
  $$s2_.override($$s2).touch();
  $$s3.val().should.eql(18);
  // s3 won't correspond with s1, s2's changes
  $$s1.val(2);
  $$s3.val().should.eql(18);
});

it('mixin', function () {
  $$.mixin({
    negate: function () {
      this.val(-this.val());
      return this;
    }
  });
  let slot = $$(1);
  slot.negate().val().should.eql(-1);
});

it('apply with', function () {
  let slot = $$(1);
  slot.applyWith(function (val) {
    return val + 1;
  }).val().should.eql(2);
});

describe('ops', function () {
  it('boolean', function () {
    let slot = $$(true);
    slot.toggle().val().should.false();
    slot.toggle().val().should.true();

    slot.on().val().should.true();
    slot.off().val().should.false();
  });
  it('object patch', function () {
    let slot = $$({
      a: 1,
    });
    slot.patch({ b: 2 }).val().should.deepEqual({
      a: 1, b: 2
    });
  });
  it('object omit', function () {
    let slot = $$({
      a: 1, b: 2,
    });
    slot.omit(['a']).val().should.deepEqual({ b: 2 });
  });
  it('dec', function () {
    let slot = $$(1);
    slot.dec().val().should.eql(0);
  });
  it('inc', function () {
    let slot = $$(1);
    slot.inc().val().should.eql(2);
  });
  it('mod', function () {
    let slot = $$(10);
    slot.mod(3).val().should.eql(1);
  });
  it('multiply', function () {
    let slot = $$(3);
    slot.multiply(12).val().should.eql(36);
  });
  it('divide', function () {
    let slot = $$(10);
    slot.divide(2).val().should.eql(5);
  });
  it('shift', function () {
    let slot = $$([1, 2, 3]);
    slot.shift().val().should.deepEqual([2, 3]);
  });
  it('unshift', function () {
    let slot = $$([2, 3]);
    slot.unshift(1).val().should.deepEqual([1, 2, 3]);
  });
  it('pop', function () {
    let slot = $$([1, 2, 3]);
    slot.pop(1).val().should.deepEqual([1, 2]);
  });
  it('push', function () {
    let slot = $$([1, 2, 3]);
    slot.push(4).val().should.deepEqual([1, 2, 3, 4]);
  });
  it('concat', function () {
    let slot = $$([1, 2]);
    slot.concat([3, 4]).val().should.deepEqual([1, 2, 3, 4]);
  });
  it('map', function () {
    let slot = $$([1, 2]);
    slot.map(it => it * 2).val().should.deepEqual([2, 4]);
  });
  it('slice', function () {
    let slot = $$([1, 2]);
    slot.slice(1).val().should.deepEqual([2]);
  });
  it('filter', function () {
    let slot = $$([1, 2]);
    slot.filter(it => it & 1 == 1).val().should.deepEqual([1]);
  });
  it('reverse', function () {
    let slot = $$([1, 2, 3]);
    slot.reverse().val().should.deepEqual([3, 2, 1]);
  });
  it('toLowerCase', function () {
    let slot = $$('ABC');
    slot.toLowerCase().val().should.eql('abc');
  });
  it('toUpperCase', function () {
    let slot = $$('abc');
    slot.toUpperCase().val().should.eql('ABC');
  });
});

describe('batch update', function () {
  it('simple', function () {
    let $$p1 = $$(1).tag('p1');
    let $$p2 = $$(2).tag('p2');
    let $$c1 = $$(function ([p1], { roots, involvedParents }) {
      roots.map(it => it.tag()).should.deepEqual(['p1', 'p2']);
      involvedParents.map(it => it.tag()).should.deepEqual(['p1']);
      return p1 * 2;
    }, [$$p1]).tag('c1');
    let $$c2 = $$(function ([p2], { roots, involvedParents }) {
      roots.map(it => it.tag()).should.deepEqual(['p1', 'p2']);
      involvedParents.map(it => it.tag()).should.deepEqual(['p2']);
      return p2 * 2;
    }, [$$p2]).tag('c2');
    $$.update([
      [$$p1, 2],
      [$$p2, 4],
    ]);
    $$c1.val().should.eql(4);
    $$c2.val().should.eql(8);
  });
  it('clean', function () {
    let $$p1 = $$(1).tag('p1');
    // $$p2 is always clean
    let $$p2 = $$(2).tag('p2').mutatedTester(() => false);
    let $$c1 = $$(function ([p1, p2], { roots, involvedParents }) {
      roots.map(it => it.tag()).should.deepEqual(['p1', 'p2']);
      involvedParents.map(it => it.tag()).should.deepEqual(['p1']);
      return p1 + p2;
    }, [$$p1, $$p2]).tag('c1');
    let $$c2 = $$(function ([p2], { roots }) {
      return p2 * 2;
    }, [$$p2]).tag('c2');
    let spy = should.spy();
    $$c2.change(spy);

    $$.update([
      [$$p1, 2],
      [$$p2, 4],
    ]);
    spy.should.not.be.called();
    $$c1.val().should.eql(6);
    $$c2.val().should.eql(8);
  });
});

it('shrink', function () {
  let $$s1 = $$(1);
  let $$s2 = $$(it => it * 2, [$$s1]);
  $$s2.val().should.equal(2);
  $$s2.shrink(-1);
  $$s1.val(2);
  $$s2.val().should.equal(-1);
});

// describe('update', function () {
//   it('abcd', function () {
//     let $$p1 = $$(1).tag('p1');
//     let $$p2 = $$(2).tag('p2');
//     let $$c1 = $$(function ([p1], { roots, involvedParents }) {
//       roots.map(it => it.tag()).should.deepEqual(['p1', 'p2']);
//       involvedParents.map(it => it.tag()).should.deepEqual(['p1']);
//       return p1 * 2;
//     }, [$$p1]).tag('c1');
//     let $$c2 = $$(function ([p2], { roots, involvedParents }) {
//       roots.map(it => it.tag()).should.deepEqual(['p1', 'p2']);
//       involvedParents.map(it => it.tag()).should.deepEqual(['p2']);
//       return p2 * 2;
//     }, [$$p2]).tag('c2');
//     $$.update([
//       [$$p1, 2],
//       [$$p2, 4],
//     ]);
//     $$c1.val().should.eql(4);
//     $$c2.val().should.eql(8);
//   });

// });

// it('updateBy', function () {
//   let $$p1 = $$(1, 'p1');
//   let $$p2 = $$(2, 'p2');
//   let $$c = $$.connect([$$p1, $$p2], function ([p1, p2]) {
//     return p1 + p2;
//   }).tag('c');
//   $$.updateBy([
//     [$$p1, R.add(1)],
//     [$$p2, R.add(2)],
//   ]);

//   $$c.val().should.eql(6);
// });

it('make child', function () {
  let $$parent = $$(1).tag('parent');
  let $$child = $$parent.makeChild(it => it * 2);
  $$child.val().should.eql(2);
  $$child.val(3);
  $$parent.val().should.eql(1);
});

describe('replace parent', function () {
  it('remove', function () {
    let $$p1 = $$(1);
    let $$c1 = $$(function () {}, [$$p1]);
    $$c1.replaceParent(0);
    $$c1.parents.should.empty();
    $$p1.children.should.empty();
  });
  it('replace', function () {
    let $$p1 = $$(1);
    let $$p2 = $$(2);
    let $$c1 = $$(([it]) => it * 2, [$$p1]);
    $$c1.replaceParent(0, $$p2);
    $$c1.val().should.eql(4);
    $$p1.children.should.empty();
  });
});
