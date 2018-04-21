'use strict';

class MyTimer__lbl_HH_mm_ss {

  constructor(timer) {
    if(!timer) throw new Error('timer is null');

    this._timer = timer;
    this._stateChangedEventListener = (state) => this._tryUpdateElement(state);
    this._timer.addStateChangedEventListener(this._stateChangedEventListener);
  }

  getElement() {
    if(!this._element) {
      this._element = document.createElement('span');
      
      this._element.innerHTML = 
      '<span class="myTimer__hours">00</span>' + 
      ':<span class="myTimer__minutes">00</span>' + 
      ':<span class="myTimer__seconds">00</span>';

      this._hoursEl = this._element.querySelector('.myTimer__hours');
      this._minutesEl = this._element.querySelector('.myTimer__minutes');
      this._secondsEl = this._element.querySelector('.myTimer__seconds');

      this._tryUpdateElement(this._timer.getState());
    }
    return this._element;
  }

  dispose() {
    if(this._timer) {
      this._timer.removeStateChangedEventListener(this._stateChangedEventListener);
      this._timer = null;
    }
    this._element = null;
    this._hoursEl = null;
    this._minutesEl = null;
    this._secondsEl = null;
  }

  _tryUpdateElement(state) {
    if(!this._element) {
      return;
    }
    const milliseconds = state.milliseconds;

    this._hoursEl.textContent = Math.floor(milliseconds / (60 * 60 * 1000)).toString().padStart(2, '0');
    this._minutesEl.textContent = (Math.floor(milliseconds / (60 * 1000)) % 60).toString().padStart(2, '0');
    this._secondsEl.textContent = Math.floor((milliseconds / 1000) % 60).toString().padStart(2, '0');
  }
}