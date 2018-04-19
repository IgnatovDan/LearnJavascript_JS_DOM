'use strict';

let myTimerWidgetLib = (function () {

  const formatMode_HH_mm_ss = 'HH:mm:ss';
  const formatMode_ss_sss = 'ss sss';
  const formatModes = new Array(formatMode_HH_mm_ss, formatMode_ss_sss);

  class timerWidget {

    constructor(timer) {
      if(!timer) {
        throw new Error('timer is null');
      }
      this._formatMode = formatModes[0];
      this._timer = timer;
      //this._update();
      this._timer.addStateChangedEventListener(() => this._tryUpdateElements());
    }
    
    getElement() {
      this.render();
      return this._element;
    }

    render() {
      this._ensureElements();
      this._tryUpdateElements();
    }

    _tryUpdateElements() {
      if(!this._element) {
        return;
      }

      this._formatEl.querySelector(`input[type=radio][value="${this._formatMode}"]`).checked = true;

      const {milliseconds, started} = this._timer.getState();

      switch(this._formatMode) {
        case formatMode_HH_mm_ss: {
          this._hoursEl.style.display = '';
          this._hoursEl.textContent = Math.floor(milliseconds / (60 * 60 * 1000)).toString().padStart(2, '0');
  
          this._minutesEl.style.display = '';
          this._minutesEl.textContent = (Math.floor(milliseconds / (60 * 1000)) % 60).toString().padStart(2, '0');
  
          this._secondsEl.textContent = Math.floor((milliseconds / 1000) % 60).toString().padStart(2, '0');

          this._milliSecondsEl.style.display = 'none';
          break;
        }
        case formatMode_ss_sss: {
          this._hoursEl.style.display = 'none';
          this._minutesEl.style.display = 'none';

          this._secondsEl.textContent = Math.floor(milliseconds / 1000).toString().padStart(2, '0');

          this._milliSecondsEl.style.display = '';
          this._milliSecondsEl.textContent = (milliseconds % 1000).toString().padStart(3, '0');
          break;
        }
      }

      if(started) {
        this._startBtn.style.display = 'none';
        this._pauseBtn.style.display = '';
      }
      else {
        this._startBtn.style.display = '';
        this._pauseBtn.style.display = 'none';
      }
    }

    _ensureElements() {
      if(this._element) {
        return;
      }
      this._element = document.createElement('div');
      this._element.classList.add('MyTimer');
      
      this._element.innerHTML = 
        '<span id="hours" class="timer__hours">00</span>' + 
        '<span id="minutes" class="timer__minutes">00</span>' + 
        '<span id="seconds" class="timer__seconds">00</span>' +
        '<span id="milliseconds" class="timer__milliseconds">000</span>' +
        
        '<fieldset class="timer__format"> Time format:' +
        formatModes.reduce(
          (result, item) => result + `<input type="radio" name="time-format" value="${item}">${item}</input>`, ""
        ) +
        '</fieldset>' +

        '<button id="startBtn" class="timer__startPauseBtn" style="display:none">Start</button>' +
        '<button id="pauseBtn" class="timer__startPauseBtn">Pause</button>' +
        '<button id="resetBtn" class="timer__resetBtn">Reset Timer</button>';

      this._hoursEl = this._element.querySelector('#hours');
      this._minutesEl = this._element.querySelector('#minutes');
      this._secondsEl = this._element.querySelector('#seconds');
      this._milliSecondsEl = this._element.querySelector('#milliseconds');

      this._formatEl = this._element.querySelector(".timer__format");
      this._formatEl.addEventListener('click',
        (e) => {
          //const inputEl = e.target.closest('change');
          if(e.target.checked) {
            this._setFormatMode(e.target.value);
          }
        }
      );
      this._startBtn = this._element.querySelector('#startBtn');
      this._startBtn.onclick = () => this._timer.start();

      this._pauseBtn = this._element.querySelector('#pauseBtn');
      this._pauseBtn.onclick = () => this._timer.pause();

      this._element.querySelector('#resetBtn').onclick = () => this._timer.reset();
    }

    _setFormatMode(formatMode) {
      this._formatMode = formatMode;
      this._tryUpdateElements();
    }
  }
  return { timerWidgetClass : timerWidget };
})();