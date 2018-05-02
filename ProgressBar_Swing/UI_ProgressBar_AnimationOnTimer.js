function MySwingUIProgressBarAnimationOnTimer({mySwingCore, targetDiv} = {}) {
  debugger;
  const refreshIntervalMs = 20;

  let updateMyProgressBarUISetTimeoutId = null;
  function render() {
    const progressLeft = Math.round((targetDiv.parentElement.clientWidth - targetDiv.getBoundingClientRect().width) * mySwingCore.getValue());
    targetDiv.style.left = progressLeft + 'px';
    
    if(mySwingCore.getIsStarted()) {
      //todo: '20 < refreshInterval < ...dynamic increase if browser is overloaded...'
      updateMyProgressBarUISetTimeoutId = setTimeout(render, refreshIntervalMs);
    }
    else if(updateMyProgressBarUISetTimeoutId) {
      clearTimeout(updateMyProgressBarUISetTimeoutId);
    }
  }

  mySwingCore.addEventListener(MySwingCore.EVENTS_IS_STARTED_CHANGED, () => render());
  
  render();
}
