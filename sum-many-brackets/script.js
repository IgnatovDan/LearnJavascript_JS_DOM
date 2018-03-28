'use strict';
debugger;
function sum(val) {
  let a = val;
  let result = function resultCore(val_) {
    a += val_;
    return resultCore;
  };
  result.toString = ()=> a;
  return result;
}

let tests = [
  () => sum(0) == 0,
  () => sum(0)(0) == 0,
  () => sum(1) == 1,
  () => sum(1)(1) == 2,
  () => sum(1)(1)(1) == 3,
  () => sum(1)(2) == 3,
  () => sum(1)(2)(3) == 6,
  () => sum(5)(-1)(2) == 6,
  () => sum(6)(-1)(-2)(-3) == 0,
  () => sum(0)(1)(2)(3)(4)(5) == 15,
  () => true
];

let myscript1Element = document.getElementById('myscript1');
myscript1Element.innerText = sum.toString();

let testResultsElement = document.getElementById('testresults1');
testResultsElement.innerText = 'Starting tests...';
let failedTests = '';
tests.forEach((entry) => { 
  if(!entry()) {
    console.log('Failure: ' + entry);
    failedTests += '\n\n' + entry;
  }
});
testResultsElement.innerText += '\n ' + tests.length + ' tests are finished';
if(failedTests !== '') {
  testResultsElement.innerText += '\n Failed tests:\n' + failedTests;
}
  
let values = [];

while(true) {
  let userNumber = MyParseStringToInt(prompt());
  if(Number.isNaN(userNumber)) {
    break;
  }
  values.push(userNumber);
}

let summary = values.reduce((entry, result) => entry + result, 0);
alert(summary);
