'use strict';

function highlight(table) {
  console.log(table);
  
  let tbody = table.getElementsByTagName('tbody')[0];
  let trs = tbody.getElementsByTagName('tr');

    Array.from(trs).forEach(
        (row) => {
            const statusCell = row.getElementsByTagName('td')[3];
            if(!statusCell.dataset.available) {
                row.hidden = true;
            }
            else if(statusCell.dataset.available === "true") {
                row.classList.add('available');
            }
            
            const genderCell = row.getElementsByTagName('td')[2];
            if(genderCell.textContent === 'm') {
                row.classList.add('male');
            }
            else if(genderCell.textContent === 'f') {
                row.classList.add('female');
            }
            
            const ageCell = row.getElementsByTagName('td')[1];
            if(Number(ageCell.textContent) < 18) {
                row.style.textDecoration = 'line-through';
            }
        }
    );

  console.log(trs);
}

highlight(document.querySelector('.js-teachers')); 

