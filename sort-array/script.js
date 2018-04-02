'use strict';

//Implement ANY sorting algorithm

function mySort(targetArray) {
    // не скупитесь на пробелы между словами и новые строки между блоками
    // улучшает читабельность
  
  if(!Array.isArray(targetArray)) {
    throw TypeError('The passed value is not an array.');
  }
  if(targetArray.length < 2) {
    return targetArray;
  }
  let shuffle = true;
  while(shuffle) {
    shuffle = false;
    let compared = false;
    // эту же конструкцию можно переписать на switch case default
    // не жалейте переменных
    
    //  const current = targetArray[i];
    //  const next = targetArray[i + 1];
    
    // и это все таки не shuffle, это swap
    
    // можно сделать отдельную функцию компаратор
    // которая будет принимать на вход два значения
    // и возвращать то что сейчас устанавливается в compared
    // а в теле этой функции только лишь свапать
    
    for(let i = 0; i < targetArray.length - 1; i++) {
      if(Number.isNaN(targetArray[i]) || Number.isNaN(targetArray[i + 1])) {
        compared = true;
        shuffle = Number.isNaN(targetArray[i]) && !Number.isNaN(targetArray[i + 1]);
      }
      if(!compared && ((targetArray[i] === null) || (targetArray[i + 1] === null))) {
        compared = true;
        shuffle = (targetArray[i] === null) && (targetArray[i + 1] !== null);
      }
      if(!compared && ((targetArray[i] === undefined) || (targetArray[i + 1] === undefined))) {
        compared = true;
        shuffle = (targetArray[i] === undefined) && (targetArray[i + 1] !== undefined);
      }
      if(!compared && (targetArray[i] > targetArray[i + 1])) {
        shuffle = true;
      }
      if(shuffle) {
        let currentVal = targetArray[i];
        targetArray[i] = targetArray[i + 1];
        targetArray[i + 1] = currentVal;
        break;
      }
    }
  }
  return targetArray;
}

let tests = [
  //empty
  () => mySort([]).toString() == new Array([]).sort().toString(),
  
  //null
  () => mySort([null]).toString() == new Array([null]).sort().toString(),
  () => mySort([null, null]).toString() == new Array([null, null]).sort().toString(),
  
  //undefined
  () => mySort([undefined]).toString() == new Array([undefined]).sort().toString(),
  () => mySort([undefined, undefined]).toString() == new Array([undefined, undefined]).sort().toString(),

  //Integer
  () => mySort([1]).toString() == new Array([1]).sort().toString(),
  () => mySort([1, 2]).toString() == new Array(1, 2).sort().toString(),
  () => mySort([2, 1]).toString() == new Array(2, 1).sort().toString(),
  () => mySort([1, 2, 3]).toString() == new Array(1, 2, 3).sort().toString(),
  () => mySort([2, 1, 3]).toString() == new Array(2, 1, 3).sort().toString(),
  () => mySort([2, 1, 4, 3]).toString() == new Array(2, 1, 4, 3).sort().toString(),
  () => mySort([1, NaN]).toString() == new Array(1, NaN).sort().toString(),
  () => mySort([NaN, NaN]).toString() == new Array(NaN, NaN).sort().toString(),
  () => mySort([NaN, 1]).toString() == new Array(NaN, 1).sort().toString(),

  //String
  () => mySort(['1']).toString() == new Array('1').sort().toString(),
  () => mySort(['1', '2']).toString() == new Array('1', '2').sort().toString(),
  () => mySort(['2', '1']).toString() == new Array('2', '1').sort().toString(),
  () => mySort(['1', '2', '3']).toString() == new Array('1', '2', '3').sort().toString(),
  () => mySort(['2', '1', '3']).toString() == new Array('2', '1', '3').sort().toString(),
  () => mySort(['2', '1', '4', '3']).toString() == new Array('2', '1', '4', '3').sort().toString(),
  () => mySort(['9', '11']).toString() == new Array('9', '11').sort().toString(),

  //Boolean
  //Symbol
  //Objects

  //Mixed types
  () => mySort([1, null]).toString() == new Array(1, null).sort().toString(),
  () => mySort([null, 1]).toString() == new Array(null, 1).sort().toString(),
  () => mySort([1, undefined]).toString() == new Array(1, undefined).sort().toString(),
  () => mySort([undefined, 1]).toString() == new Array(undefined, 1).sort().toString(),
  //TODO: more variants
  () => true
];

let myscript1Element = document.getElementById('myscript1');
myscript1Element.innerText = mySort.toString();

let testResultsElement = document.getElementById('testresults1');
testResultsElement.innerText = 'Starting tests...';
let failedTests = '';
tests.forEach((entry) => { 
  if(!entry()) {
    console.log('Failure: ' + entry);
    failedTests += '\n\n' + entry;
  }
});
testResultsElement.innerText += '\n ' + tests.length + ' tests are finished.\n Failed tests: ';
if(failedTests !== '') {
  testResultsElement.innerText += '\n' + failedTests;
}
else {
  testResultsElement.innerText += '0.';
}
