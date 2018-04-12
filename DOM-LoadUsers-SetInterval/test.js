describe("makeFriendsList", function() {
  
  let friends = [
    {
      firstName: 'Artsiom',
      lastName: 'Mezin'
    },  
    {
      firstName: 'Ilia',
      lastName: 'Kantor'
    },  
    {
      firstName: 'Christopher',
      lastName: 'Michael'
    }
  ];
  
  let ul = makeFriendsList(friends);
  let lis = ul && ul.querySelectorAll('li');
  
  describe('объект списка', function () {
    it('функция должна возвращать HTML список', function() {
      assert.equal(ul && ul.constructor, HTMLUListElement, 'Результат вызова функции не HTMLUListElement');
    });
    
    it('должно быть равно число элментов в списке и число объектов в массиве', function() {
      assert.equal(lis.length, friends.length, 'Отличается длина списка и массива данных');
    });
  });
  
  describe('элементы списка', function () {
    [].forEach.call(lis, function (li, index) {
      let actualFirstName = li.innerHTML.includes(friends[index].firstName);
      let actualLastName = li.innerHTML.includes(friends[index].lastName);

      it(`Элемент ${index} должен содержать ${friends[index].firstName}`, function () {
        assert(actualFirstName, `Элемент номер ${index} не содержит firstName`);
      });
      
      it(`Элемент ${index} должен содержать ${friends[index].lastName}`, function () {
        assert(actualLastName, `Элемент номер ${index} не содержит lastName`);
      });
    });
    
  });
  


});
