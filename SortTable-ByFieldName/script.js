'use strict';

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

/**
 * Компоратор для сортировки объектов в массиве по полю
 * @param {string} field
 * @return {number}
 */
function byField(field) {
  return (a, b) => { return a[field] > b[field] ? 1 : -1 };
}

/**
 * Отображает массив объектов в виде HTML таблицы
 * @param {Object[]} dataArray
 */
function printTable(dataArray) {
  let tableHTML = '<table><tr>';
  for(let propertyName in dataArray[0]) {
    tableHTML += '<th>' + propertyName + '</th>';
  }
  tableHTML += '</tr>';
  dataArray.forEach(
    item => {
      tableHTML += '<tr>';
      for(let propertyName in item) {
        tableHTML += '<td>' + item[propertyName] + '</td>';
      }
      tableHTML += '</tr>';
    }
  )
  tableHTML += '</table>';

  const tableElement = document.createElement('div');
  tableElement.innerHTML = tableHTML;
  document.body.appendChild(tableElement);
}

users.sort(byField('name'));
//users.sort(byField('age'));

printTable(users);
