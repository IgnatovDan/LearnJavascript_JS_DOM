'use strict';

timeLabelClasses.set('HH:mm:ss', MyTimer__lbl_HH_mm_ss);
timeLabelClasses.set('ss:sss', MyTimer__lbl_ss_sss);

class MyTimer {

  constructor(timer) {
    if(!timer) throw new Error('timer is null');
    this._timer = timer;
    this._disposeList = new Array();
  }
  
  getElement() {
    if(!this._element) {
      this._element = document.createElement('span');
      
      this._timeLabel = this._addDisposable(new MyTimer__lbl_HH_mm_ss(this._timer));
      //this._element.appendChild(this._addDisposable(new MyTimer__lbl_ss_sss(this._timer)).getElement());
      //this._element.appendChild(this._addDisposable(new MyTimer__lbl_HH_mm_ss(this._timer)).getElement());
      this._element.appendChild(this._timeLabel.getElement());

      this._element.appendChild(this._addDisposable(new MyTimer__format_selector(this)).getElement());

      this._element.appendChild(this._addDisposable(new MyTimer__btn_start(this._timer)).getElement());
      this._element.appendChild(this._addDisposable(new MyTimer__btn_pause(this._timer)).getElement());
      this._element.appendChild(this._addDisposable(new MyTimer__btn_reset(this._timer)).getElement());
    }
    return this._element;
  }

  setLabelType(labelClassKey) {
    const labelClass = timeLabelClasses.get(labelClassKey);
    if(!(this._timeLabel instanceof labelClass)) {
      this._timeLabel.getElement().remove();
      this._timeLabel.dispose();
      this._timeLabel = this._addDisposable(new labelClass(this._timer));
      this._element.insertBefore(this._timeLabel.getElement(), this._element.childNodes[0]);
    }
  }

  dispose() {
    this._timer = null;
    this._disposeList.forEach(item => item.dispose());
    this._disposeList.length = 0;
    if(this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  _addDisposable(disposable) {
    this._disposeList.push(disposable);
    return disposable;
  }
}