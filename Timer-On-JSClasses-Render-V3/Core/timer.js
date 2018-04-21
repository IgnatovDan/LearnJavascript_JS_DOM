'use strict';

class Timer {
  constructor({stateChangedEventInterval = 1000} = {}) {
    this._stateChangedEventListeners = new Array();
    this._intervalID = null;
    this._elapsedMilliseconds = 0;
    this._lastUpdateElapsedMillisecondsDateTime = null;
    this._stateChangedEventInterval = stateChangedEventInterval;
  }

  start() {
    if(this._intervalID === null) {
      this._intervalID = setInterval(() => this._setIntervalHandler(), this.stateChangedEventInterval);
      this._updateElapsedMilliseconds();
      this._raiseStateChanged();
    }
  }

  pause() {
    if(this._intervalID) {
      this._updateElapsedMilliseconds();
      this._lastUpdateElapsedMillisecondsDateTime = null;
      this._clearInterval();
      this._raiseStateChanged();
    }
  }
  addStateChangedEventListener(listener) {
    this._stateChangedEventListeners.push(listener);
  }
  
  removeStateChangedEventListener(listener) {
    var index = this._stateChangedEventListeners.indexOf(listener); 
    if (index >= 0) this._stateChangedEventListeners.splice(index, 1);
  }
  
  reset() {
    this._elapsedMilliseconds = 0;
    this._lastUpdateElapsedMillisecondsDateTime = null;
    this._raiseStateChanged();
  }
  
  getState() {
    return { 
      milliseconds: this._elapsedMilliseconds,
      started: (this._intervalID !== null)
    };
  }

  _raiseStateChanged() {
    if(!this._stateChangedEventListeners) {
      return;
    }
    const state = this.getState();

    this._stateChangedEventListeners.forEach(
      listenerFunc => listenerFunc(state)
    );
  }

  _updateElapsedMilliseconds() {
    let deltaMilliseconds = 0;
    if(this._lastUpdateElapsedMillisecondsDateTime !== null) {
      deltaMilliseconds = Date.now() - this._lastUpdateElapsedMillisecondsDateTime;
    }
    this._lastUpdateElapsedMillisecondsDateTime = Date.now();
    this._elapsedMilliseconds += deltaMilliseconds;
  }

  _setIntervalHandler() {
    if(this._intervalID !== null) {
      this._updateElapsedMilliseconds();
      this._raiseStateChanged();
    }
  }

  _clearInterval() {
    if(this._intervalID) {
      clearInterval(this._intervalID); //cleared but one more queued call will be performed: https://stackoverflow.com/questions/47263656/will-clearinterval-stop-queued-interval-execution
      this._intervalID = null;
    }
  }
}