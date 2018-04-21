'use strict';

class MyTimer__btn_pause {

  constructor(timer) {
    if(!timer) throw new Error('timer is null');
    
    this._timer = timer;
    this._stateChangedEventListener = state => this._tryUpdateElement(state);
    this._timer.addStateChangedEventListener(this._stateChangedEventListener);
  }

  getElement() {
    if(!this._element) {
      this._element = document.createElement('button');
      
      this._element.classList.add('MyTimerWidget__ctrl-pause-button');
      this._element.innerText = 'Pause';
      this._clickEventListener = () => this._timer.pause();
      this._element.addEventListener('click', this._clickEventListener);

      this._tryUpdateElement(this._timer.getState());
    }
    return this._element;
  }

  dispose() {
    this._timer.removeStateChangedEventListener(this._stateChangedEventListener);
    if(this._clickEventListener) {
      this._element.removeEventListener('click', this._clickEventListener);
    }
    this._timer = null;
    this._element = null;
  }

  _tryUpdateElement(state) {
    if(!this._element) {
      return;
    }
    this._element.style.display = state.started ? '' : 'none';
  }
}