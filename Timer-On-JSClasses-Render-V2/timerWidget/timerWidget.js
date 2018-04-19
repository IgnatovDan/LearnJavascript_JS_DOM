'use strict';

let myTimerWidgetLib = (function () {

  const formatMode_dd_mm_ss = 'dd:mm:ss';
  const formatMode_mm_ss = 'mm:ss';
  const formatMode_ss = 'ss';

  class timerWidget {

    constructor(timer) {
      if(!timer) {
        throw new Error('timer is null');
      }
      this._formatMode = formatMode_dd_mm_ss;
      this._timer = timer;
      this._update();
      this._timer.addStateChangedEventListener(state => this._update());
    }
    
    getElement() {
      this.render();
      return this._element;
    }

    start() {
      this._timer.start();
    }
    
    render() {
      if(!this._element) {
        this._element = document.createElement('div');
        this._element.classList.add('MyTimer');
        
        this._element.innerHTML = 
          '<span id="hours" class="timer__hours">00</span>' + 
          '<span id="minutes" class="timer__minutes">00</span>' + 
          '<span id="seconds" class="timer__seconds">00</span>' +
          
          '<span> Time format:' +
            `<input type="radio" name="time-format" value="${formatMode_dd_mm_ss}" checked>${formatMode_dd_mm_ss}</input>` +
            //`<input type="radio" name="time-format" value="${formatMode_mm_ss}">${formatMode_mm_ss}</input>` +
            `<input type="radio" name="time-format" value="${formatMode_ss}">${formatMode_ss}</input>` +
          '</span>' +

          '<button id="startBtn" class="timer__startPauseBtn" style="display:none">Start</button>' +
          '<button id="pauseBtn" class="timer__startPauseBtn">Pause</button>' +
          '<button id="resetBtn" class="timer__resetBtn">Reset Timer</button>';

          this._element.querySelectorAll('input[type=radio][name="time-format"]').forEach(
            (inputEl) => { 
              inputEl.onclick = (e) => {
                this._setFormatMode(e.target.value)
              }
            }
        );
        this._element.querySelector('#startBtn').onclick = () => this._timer.start();
        this._element.querySelector('#pauseBtn').onclick = () => this._timer.pause();
        this._element.querySelector('#resetBtn').onclick = () => this._timer.reset();
        this._update();
      }
    }

    _setFormatMode(formatMode) {
      this._formatMode = formatMode;
      this._update();
    }

    _update() {
      if(!this._timer || !this._element) {
        return;
      }

      const {milliseconds, started} = this._timer.getState();

      const _hoursEl = this._element.querySelector('#hours');
      const _minutesEl = this._element.querySelector('#minutes');
      const _secondsEl = this._element.querySelector('#seconds');
      //debugger;
      if(this._formatMode === formatMode_dd_mm_ss) {
        const elapsed = new Date(milliseconds);
        const hours = elapsed.getUTCHours();
        const minutes = elapsed.getMinutes();
        const seconds = elapsed.getSeconds();

        _hoursEl.style.display = '';
        _hoursEl.textContent = hours.toString().padStart(2, '0');

        _minutesEl.style.display = '';
        _minutesEl.textContent = minutes.toString().padStart(2, '0');

        _secondsEl.textContent = seconds.toString().padStart(2, '0');
      }
      else if(this._formatMode === formatMode_ss) {
        _hoursEl.style.display = 'none';
        _minutesEl.style.display = 'none';
        _secondsEl.textContent = Math.floor(milliseconds / 1000).toString().padStart(2, '0');
        _secondsEl.classList.remove();
      }

      const startBtn = this._element.querySelector('#startBtn');
      const pauseBtn = this._element.querySelector('#pauseBtn');
      if(startBtn && pauseBtn) {
        if(started) {
          startBtn.style.display = 'none';
          pauseBtn.style.display = '';
        }
        else {
          startBtn.style.display = '';
          pauseBtn.style.display = 'none';
        }
      }
    }
  }
  return { timerWidgetClass : timerWidget };
})();