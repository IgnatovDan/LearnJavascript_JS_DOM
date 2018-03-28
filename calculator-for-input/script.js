'use strict';

// Создайте калькулятор для введённых значений
//https://learn.javascript.ru/task/calculator-for-input

function MyParseStringToInt(str) {
  if(str === "" || str === null || isNaN(str)) {
    return Number.NaN;
  }
  return parseInt(str, 10);
  /*let rex = /^\d+$/;
  if(!rex.test(str)) {
    return Number.NaN;
  }
  else {
    return parseInt(str);
  }*/
}

[
  () => Number.isNaN(MyParseStringToInt(null)),
  () => Number.isNaN(MyParseStringToInt(undefined)),
  () => Number.isNaN(MyParseStringToInt('')),
  () => Number.isNaN(MyParseStringToInt('NaN')),
  () => Number.isNaN(MyParseStringToInt('a')),
  () => Number.isNaN(MyParseStringToInt(' ')),
  () => Number.isNaN(MyParseStringToInt('null')),
  () => Number.isNaN(MyParseStringToInt('undefined')),
  () => Number.isNaN(MyParseStringToInt('Infinity')),
  () => Number.isNaN(MyParseStringToInt('false')),
  () => Number.isNaN(MyParseStringToInt('true')),

  () => !Number.isNaN(MyParseStringToInt('0')) && MyParseStringToInt('0') === 0,
  () => !Number.isNaN(MyParseStringToInt('1')) && MyParseStringToInt('1') === 1,
  () => !Number.isNaN(MyParseStringToInt('100')) && MyParseStringToInt('100') === 100,
  () => !Number.isNaN(MyParseStringToInt('-1')) && MyParseStringToInt('-1') === -1,
  () => !Number.isNaN(MyParseStringToInt('+1')) && MyParseStringToInt('+1') === 1,

  () => !Number.isNaN(MyParseStringToInt('010')) && MyParseStringToInt('010') === 10,

  () => !Number.isNaN(MyParseStringToInt(' 1')) && MyParseStringToInt(' 1') === 1,
  () => !Number.isNaN(MyParseStringToInt(' 1')) && MyParseStringToInt(' 1 ') === 1,

  () => Number.isNaN(MyParseStringToInt('1asdf')),
  () => Number.isNaN(MyParseStringToInt('1,21')),
  () => Number.isNaN(MyParseStringToInt('1.21')),
  () => Number.isNaN(MyParseStringToInt('1-21')),
  () => Number.isNaN(MyParseStringToInt('1 21')),
  () => Number.isNaN(MyParseStringToInt('0x10')),
  () => true
].forEach((entry) => { if(!entry()) console.log('Failure: ' + entry);});

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
