'use strict';

class MyTimer__format_selector {

  constructor(myTimer) {
    if(!myTimer) throw new Error('myTimer is null');
    
    this._myTimer = myTimer;
  }

  dispose() {
    if(this._clickEventListener) {
      this._element.removeEventListener('change', this._changeEventListener);
    }
    this._myTimer = null;
    this._element = null;
  }

  getElement() {
    if(!this._element) {
      this._element = document.createElement('select');
      this._changeEventListener = () => this._myTimer.setLabelType(event.target.value);
      this._element.addEventListener('change', this._changeEventListener);

      let html = '';
      const firstKey = '';
      timeLabelClasses.forEach((val, key) => html += `<option value="${key}">${key}</input>`);
      this._element.innerHTML = html;

      this._myTimer.setLabelType(this._element.value);
    }
    return this._element;
  }
}