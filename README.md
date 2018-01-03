# rimple

[API](https://xiechao06.github.io/rimple).

A deadly simple reactive frontend library.

## PURPOSE

Synchronize the state among ui/component/state. Acts the similar role as:

  * [redux](https://redux.js.org)
  * [rxjs](https://github.com/ReactiveX/rxjs)
  * [mobx](https://github.com/mobxjs/mobx)

With a very simple idea:

```
UI/Component/State won't be differentiated anymore, they follows/connects/watches
others, forms a following graph where each node is called SLOT. when one node's 
followings mutation, it is re-evaluated accordingly, and propogates the mutation 
further, just like how interconnected digital circuit components work.
```

## HOW IT LOOK LIKES

```javascript
// display a counter and a countdown counter

const $$counter = Slot(0);

// counterEl follows counterSlot
const $$counterEl = Slot(function ([counter]) {
  return h('.counter', '' + counter);
}, [$$counter]);

// counterEl follows counterSlot
const $$countdownCount = Slot(0);
const $$countdownCounterEl = Slot(function ([counter]) {
  return h('.counter.countdown', '' + counter);
}, [$$countdownCounter]);

const $$view = $$(function (el1, el2) {
  return h('.app', [el1, el2]);
}, [$$counterEl, $$countdownCounterEl]);

mount($$view, '.container');

setInterval(function () {
  $$counter.inc();
  $$countdownCounter.dec();
}, 1000);
```

here's another [codepen](https://codepen.io/xiechao06/pen/JMJOaZ).

## FEATURES

 * SIMPLE
  
  *rimple* just provides one paradigm which is easily understandable.

 * EXPLICITY

  Once you are familiar with this paradigm, you could understand why and how 
  page redraw occurs.

 * EFFICIENCY

  *ripple* will find the most effient propogation path in one mutation process, 
  and guarantees:

  ```
  in one mutaion proccess, a slot will be re-evaluated ONCE only after all of
  its followings re-evaluated.
  ```
  To understande this, here's an example:

  ![](https://user-images.githubusercontent.com/2888536/34474580-c5a1a54a-efbb-11e7-92bf-b7e60d6d35a1.png)

  Let's assume A is mutated, and a mutaion process starts, if we adopt a breadth-first
  algorithm, the mutation process will be executed in following steps:

  1. B (because of A's mutation, but this is INCORRECT, since C has the wrong value)
  2. C (because of A)
  3. B (because of B's mutation)
  
  but in *ripple*, step 1 will be SKIPPED, actually ripple adopts a level-by-level 
  algorithm to execute the mutation process

 * ORTHOGONAL TO OTHER LIBS

  since *rimple* focuses on state synchronizing, it works smoothly with
  [navigo](https://github.com/krasimir/navigo),
  [virtual-dom](https://github.com/Matt-Esch/virtual-dom), 
  [snabbdom](https://github.com/snabbdom/snabbdom),
  even with REACT, but I recommend using pure virtual dom implentation personally.


 * ENCOURAGE PURE FUNCTION AS EVALUATION FUNCTION



## USAGE

```
$ npm install rimple
```
then add the following codes to you html files:

```html
<script src="path/to/rimple/dist/rimple.min.js">
```

Then you could access `rimple` by:

```javascript
console.log(rimple); // output {Slot: ƒ, mutate: ƒ, mutateWith: ƒ, mixin: ƒ}
```

Or in node environment: 

```javascript
var rimple = require('rimple');
```

## TEST
clone this repository, and run:

```
- $ npm install
- $ npm test
```

## SAMPLES

cd into the samples directories, and each sample's read README.md


## [中文文档](https://github.com/xiechao06/rimple/wiki/%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3)
