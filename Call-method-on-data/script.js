'use strict';
    debugger;

const elEntry = document.createElement('div');
document.body.appendChild(elEntry);

elEntry.innerText = "--------------------- CalculatorStatic.sum2(1, 2) ---------------------";

function CalculatorStatic() {}

CalculatorStatic.sum2 = function() {
    return [].reduce.call(arguments, (result, entry) => result + entry, 0);
}
elEntry.innerText += '\r\n' + CalculatorStatic.sum2(1, 2); //3



elEntry.innerText += '\r\n' + "--------------------- new Calculator(1, 2).sum() ---------------------";

function Calculator(...args) {
    this.args = args;
    this.sum = () => {
        return CalculatorStatic.sum2(...this.args);
    }
}
elEntry.innerText += '\r\n' + new Calculator(1, 2).sum(); //3



elEntry.innerText += '\r\n' + "--------------------- Calculator2(1, 2).sum() ---------------------";

function Calculator2(...args) {
    let result = {
    }
    result.sum = () => {
        return CalculatorStatic.sum2(...args);
    }
    return result;
}
elEntry.innerText += '\r\n' + Calculator2(1, 2).sum(); //3



elEntry.innerText += '\r\n' + "--------------------- sum.call([1, 2])---------------------";
function sum() {
    let result = 0;
    for(let i = 0; i < this.length; i++) {
        result += this[i];
    }
    return result;
}
elEntry.innerText += '\r\n' + sum.call([1, 2]); //3

