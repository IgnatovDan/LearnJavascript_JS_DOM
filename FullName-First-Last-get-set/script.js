(function () {
  'use strict';

  //https://github.com/IgnatovDan/...
  
  function User(fullName) {
    this.fullName = fullName;
    const parseFullName = (fullName) => {
      const result = {firstName: '', lastName: ''};
      if(fullName !== '' && fullName !== null && fullName !== undefined) {
        const nameParts = fullName.split(' ');
        if(nameParts.length > 0) {
          result.firstName = nameParts[0];
        }
        if(nameParts.length > 1) {
          result.lastName = nameParts[1];
        }
      }
      return result;
    };
    Object.defineProperty(this, 'firstName', 
      {
        get: () => parseFullName(this.fullName).firstName,
        set: (val) => this.fullName = val + ' ' + this.lastName
      }
    );
    
    Object.defineProperty(this, 'lastName', 
      {
        get: () => parseFullName(this.fullName).lastName,
        set: (val) => this.fullName = this.firstName + ' ' + val
      }
    );
  }
  
  let tests = [
    () => new User('').firstName === '',
  
    () => new User('').fullName === '',
    () => new User('').firstName === '',
    () => new User('').lastName === '',
    
    () => new User('A').fullName === 'A',
    () => new User('A').firstName === 'A',
    () => new User('A').lastName === '',
  
    () => new User('A B').fullName === 'A B',
    () => new User('A B').firstName === 'A',
    () => new User('A B').lastName === 'B',
    
    () => {
      const user = new User('A B');
      user.fullName = 'C D';
      return (user.fullName === 'C D') 
        && (user.firstName === 'C') 
        && (user.lastName === 'D');
    },
    
    () => {
      const user = new User('A B');
      user.firstName = 'C';
      if(user.fullName !== 'C B') throw user.fullName + " !== 'C B'";
      if(user.firstName !== 'C') throw user.firstName + " !== 'C'";
      if(user.lastName !== 'B') throw user.lastName + " !== 'B'";
      return true;
    },
  
    () => {
      const user = new User('A B');
      user.lastName = 'D';
      if(user.fullName !== 'A D') throw user.fullName + " !== 'A D'";
      if(user.firstName !== 'A') throw user.firstName + " !== 'C'";
      if(user.lastName !== 'D') throw user.lastName + " !== 'D'";
      return true;
    },
  
    //TODO: more variants
    () => true
  ];
  
  let myscript1Element = document.getElementById('myscript1');
  myscript1Element.innerText = User.toString();
  
  let testResultsElement = document.getElementById('testresults1');
  testResultsElement.innerText = 'Starting tests...';
  let failedTests = '';
  tests.forEach((entry) => { 
    try {
      if(!entry()) {
        console.log('Failure: ' + entry);
        failedTests += '\n\nfailed: ' + entry.toString();
      }
    }
    catch(err) {
      console.log('Failure: ' + entry);
      failedTests += '\n\n' + err +': ' + entry.toString();
    }
  });
  
  testResultsElement.innerText += '\n ' + tests.length + ' tests are finished.\n Failed tests: ';
  if(failedTests !== '') {
    testResultsElement.innerText += '\n' + failedTests;
  }
  else {
    testResultsElement.innerText += '0.';
  }
  
})()
