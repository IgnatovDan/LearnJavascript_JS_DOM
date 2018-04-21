'use strict';

class MyTimer__lbl_ss_sss {

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
      '<span class="myTimer__seconds">00</span>:<span class="myTimer__milli-seconds">00</span>';

      this._secondsEl = this._element.querySelector('.myTimer__seconds');
      this._milliSecondsEl = this._element.querySelector('.myTimer__milli-seconds');

      this._tryUpdateElement(this._timer.getState());
    }
    return this._element;
  }

  dispose() {
    this._timer.removeStateChangedEventListener(this._stateChangedEventListener);
    this._timer = null;
    this._minutesEl = null;
    this._secondsEl = null;
  }

  _tryUpdateElement(state) {
    if(!this._element) {
      return;
    }
    const milliseconds = state.milliseconds;

    this._secondsEl.textContent = Math.floor(milliseconds / 1000).toString().padStart(2, '0');
    this._milliSecondsEl.textContent = (milliseconds % 1000).toString().padStart(3, '0');
  }
}