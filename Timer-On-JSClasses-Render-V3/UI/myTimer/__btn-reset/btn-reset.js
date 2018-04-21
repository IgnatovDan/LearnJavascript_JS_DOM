'use strict';

class MyTimer__btn_reset {

  constructor(timer) {
    if(!timer) throw new Error('timer is null');
    
    this._timer = timer;
  }

  dispose() {
    if(this._clickEventListener) {
      this._element.removeEventListener('click', this._clickEventListener);
    }
    this._timer = null;
    this._element = null;
  }

  getElement() {
    if(!this._element) {
      this._element = document.createElement('button');
      
      this._element.classList.add('timer__ctrl-reset-button');
      this._element.innerText = 'Reset';
      this._clickEventListener = () => this._timer.reset();
      this._element.addEventListener('click', this._clickEventListener);
    }
    return this._element;
  }
}