function MySwingUIProgressBarAnimated({mySwingCore, targetDiv} = {}) {

  let updateMyProgressBarUISetTimeoutId = null;
  function render() {
    if(mySwingCore.getIsStarted()) {
      const valueDetails = mySwingCore.getValueDetails();
      const oneSideSwingTimeMs = valueDetails.swingRoundTripTimeMs / 2;
      let transitionDuration =  oneSideSwingTimeMs * (1 - valueDetails.currentValue));
      if(!valueDetails.swingDirection) {
        transitionDuration =  Math.round(oneSideSwingTimeMs * valueDetails.currentValue);
      }
      console.log('transitionDuration: '  + transitionDuration + '; oneSideSwingTimeMs: ' + oneSideSwingTimeMs + '; valueDetails.currentValue: ' + valueDetails.currentValue);
      targetDiv.style.transitionProperty = 'left';
      targetDiv.style.transitionDuration = transitionDuration + 'ms';
      targetDiv.style.transitionTimingFunction = 'linear';
  
      const progressLeft = Math.round((targetDiv.parentElement.clientWidth - targetDiv.getBoundingClientRect().width) * (1 - valueDetails.currentValue));
      targetDiv.style.left = progressLeft + 'px';

      //todo: '20 < refreshInterval < ...dynamic increase if browser is overloaded...'
      updateMyProgressBarUISetTimeoutId = setTimeout(render, transitionDuration);
    }
    else if(updateMyProgressBarUISetTimeoutId) {
      targetDiv.style.transitionProperty = '';
      targetDiv.style.transitionDuration = '';
      targetDiv.style.transitionTimingFunction = '';
  
      targetDiv.style.left = '0px';
      clearTimeout(updateMyProgressBarUISetTimeoutId);
    }
  }

  mySwingCore.addEventListener(MySwingCore.EVENTS_IS_STARTED_CHANGED, () => render());
  
  render();
}
