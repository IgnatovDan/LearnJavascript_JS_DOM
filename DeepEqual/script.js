'use strict';

// Denis Ignatov

function DeepEqual(obj1, obj2, maxRecursionDepth = 10) {
  //"Default function parameters" ECMAScript 6 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

  let result = false;
  if(maxRecursionDepth < 1) {
    result = true;
  }
  else if(obj1 === obj2) { 
    result = true; 
  }
  else if(Number.isNaN(obj1) && Number.isNaN(obj2)) { 
    result = true; 
  }
  else if(obj1 !== null && obj2 !== null && typeof(obj1) === 'object' && typeof(obj2) === 'object') {
    let obj1Properties = Object.keys(obj1);
    let obj2Properties = Object.keys(obj2);
    if(obj1Properties.length != obj2Properties.length) {
      result = false;
    }
    else {
      result = true;
      for(let obj1PropName of obj1Properties) {
        if(!obj2Properties.includes(obj1PropName)) {
          result = false;
          break;
        }
        if(!DeepEqual(obj1[obj1PropName], obj2[obj1PropName], maxRecursionDepth - 1)) {
          result = false;
          break;
        }
      }
    }
  }
  return result;
}

let symbol1 = Symbol();
let symbol1_ = symbol1;
let symbol2 = Symbol();

let obj1 = {};
let obj1_ = obj1;

let objRecursion1 = {};
let objRecursion2 = {};
objRecursion1.reference = objRecursion2;
objRecursion2.reference = objRecursion1;

function func1() {}
function func2() {}

let tests = [
  //undefined
  () => DeepEqual(undefined, undefined) === true,
  
  //null
  () => DeepEqual(null, null) === true,
  
  //string
  () => DeepEqual('a', 'a') === true,
  () => DeepEqual('a', 'b') === false,
  () => DeepEqual(new String('a'), new String('a')) === (new String('a') === new String('a')), //TODO: why 'FALSE' here???
  () => DeepEqual(new String('a'), new String('b')) === (new String('a') === new String('b')),
  
  //number
  () => DeepEqual(1, 1) === true,
  () => DeepEqual(1, 2) === false,
  () => DeepEqual(NaN, NaN) === true,
  () => DeepEqual(1, NaN) === false,
  () => DeepEqual(new Number(1), new Number(1)) === true,
  () => DeepEqual(new Number(1), new Number(2)) === (new Number(1) === new Number(2)), //TODO

  //bool
  () => DeepEqual(true, true) === true,
  () => DeepEqual(true, false) === false,
  () => DeepEqual(new Boolean(true), new Boolean(true)) === true,

  () => DeepEqual(new Boolean(true), new Boolean(false)) === (new Boolean(true) === new Boolean(false)),

  //symbol
  //TODO: global, local, names - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  () => DeepEqual(Symbol(), Symbol()) === false,
  () => DeepEqual(symbol1, symbol1) === true,
  () => DeepEqual(symbol1, symbol2) === false,
  () => DeepEqual(symbol1, symbol1_) === true,
  () => DeepEqual(new Object(symbol1), new Object(symbol1)) === true,
  () => DeepEqual(new Object(symbol1), new Object(symbol2)) === (new Object(symbol1) === new Object(symbol2)),

  //mix 
  //TODO: check other combinations
  () => DeepEqual(undefined, null) === false,
  () => DeepEqual(null, NaN) === false,
  () => DeepEqual(undefined, NaN) === false,
  () => DeepEqual('1', 1) === false,
  () => DeepEqual('1', true) === false,
  () => DeepEqual(1, true) === false,

  //object - functions are compared by native javascript '===' rules
  () => DeepEqual(func1, func1) === true,
  () => DeepEqual(func1, func2) === false,
  () => DeepEqual({ a: function() {}}, { a: function() {}}) === false, 
  () => DeepEqual({ a: func1}, { a: func1}) === true, 

  //object - objects
  () => DeepEqual({}, {}) === true, 
  () => DeepEqual(obj1, obj1) === true,
  () => DeepEqual(obj1, obj1_) === true,
  () => DeepEqual({a: 1}, { a: 1}) === true, 
  () => DeepEqual({a: 1}, { a: '1'}) === false, 
  () => DeepEqual({a: 1}, { a: 2}) === false, 
  () => DeepEqual({a: 1}, { b: 1}) === false, 
  () => DeepEqual({a: 1}, { a: 1, b: 1}) === false, 
  () => DeepEqual({a: 1, b: 1}, { a: 1, b: 1}) === true, 
  () => DeepEqual({a: 1, b: 1}, { a: 1}) === false, 

  //object - nested objects
  () => DeepEqual({a: {}}, { a: {}}) === true, 
  () => DeepEqual({a: {a: 1}}, { a: {a: 1}}) === true, 
  () => DeepEqual({a: {a: 1}}, { a: {a: '1'}}) === false, 
  () => DeepEqual({a: {a: 1}}, { a: {a: 2}}) === false, 
  () => DeepEqual({a: {a: 1}}, { a: {b: 2}}) === false, 

  //object - Symbol properties are ignored
  () => DeepEqual({[Symbol()]: 1}, { [Symbol()]: 1}) === true, 
  () => DeepEqual({[Symbol('a')]: 1}, { [Symbol('a')]: 1}) === true, 
  () => DeepEqual({[symbol1]: 1}, { [symbol1]: 1}) === true, 
  () => DeepEqual({[symbol1]: 1}, { [symbol2]: 1}) === true, 
  
  //object - recursion
  () => DeepEqual(objRecursion1, objRecursion2) === true, 
  () => DeepEqual(objRecursion1, objRecursion1) === true, 
  () => DeepEqual(objRecursion2, objRecursion2) === true, 
  
  //object - prototypes
  // TODO: what behavior is expected for 'prototypes'?
  
  //object - date, array, map, set
  // TODO: what behavior is expected?

  () => true // to avoid that annoying 'Unexpected token (' compilation error when I copupasted the last entry without the ','
];

var headerElement = document.getElementById('header1');
headerElement.innerHTML = 'Hello World!';

var testresults1Element = document.getElementById('testresults1');

console.log('starting ' + tests.length + ' tests...');
testresults1Element.innerText = 'starting ' + tests.length + ' tests...\n';
let results = "";
let failedTests = 0;
tests.forEach(entry => { 
  if(!entry()) {
    failedTests++; 
    results += entry.toString() + '\n';
    testresults1Element.innerText += 'F';
  }
  else {
    testresults1Element.innerText += '.';
  }
}); 

console.log(tests.length + ' tests are finished.');
testresults1Element.innerText += '\n' + tests.length + ' tests are finished.';
if(failedTests > 0) {
  console.log(failedTests + ' failed tests:\n' + results); 
  testresults1Element.innerText += '\n' + failedTests + ' failed tests:\n' + results;
}