// Code goes here
'use strict';

function MySwingCore({swingRoundTripTimeMs} = {}) {
  const events = {};
  if(!swingRoundTripTimeMs) {
    swingRoundTripTimeMs = 6000;
  }
  let startDateTime = null;
  let isStarted = false;

  //mixin?  
  function _triggerEvent(eventName, events) {
    const eventListeners = events[eventName];
    if(eventListeners) {
      eventListeners.forEach(item => item());
    }
  }
  
  this.addEventListener = function(eventName, listener) {
    let eventListeners = events[eventName];
    if(!eventListeners) {
      eventListeners = [];
      events[eventName] = eventListeners;
    }
    eventListeners.push(listener);
  }
  
  this.start = function() {
    isStarted = true;
    startDateTime = new Date();
    _triggerEvent(MySwingCore.EVENTS_IS_STARTED_CHANGED, events);
  }
  
  this.stop = function() {
    startDateTime = null;
    isStarted = false;
    _triggerEvent(MySwingCore.EVENTS_IS_STARTED_CHANGED, events);
  }
  
  this.getIsStarted = function() {
    return isStarted;
  }
  
  this.getSwingingTimeMs = function() {
    if(startDateTime) {
      return new Date() - startDateTime;
    }
    else {
      return 0;
    }
  }
  
  this.getValueDetails = function() {
    const currentRoundtripPosition = this.getSwingingTimeMs() % swingRoundTripTimeMs;
    const swingDirection = (currentRoundtripPosition < (swingRoundTripTimeMs / 2));
    let value = (currentRoundtripPosition % (swingRoundTripTimeMs / 2)) / (swingRoundTripTimeMs / 2);
    if(!swingDirection) {
      value = 1 - value;
    }
    return {
      value,
      swingDirection,
      swingRoundTripTimeMs
    }
  }
  
  this.getValue = function() {
    if(startDateTime) {
      return this.getValueDetails().value;
    }
    else {
      return 0;
    }
  }
}

MySwingCore.EVENTS_IS_STARTED_CHANGED = 'isStartedChanged';
