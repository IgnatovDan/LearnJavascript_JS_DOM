function MySwingUITotalTimeLabel({mySwingCore, targetLabel} = {}) {
  refreshIntervalMs = 200;

  let updateMyProgressBarUISetTimeoutId = null;
  function render() {
    targetLabel.innerText = mySwingCore.getSwingingTimeMs().toString();

    if(mySwingCore.getIsStarted()) {
      //todo: '200 < refreshInterval < ...dynamic increase if browser is overloaded...'
      updateMyProgressBarUISetTimeoutId = setTimeout(render, refreshIntervalMs);
    }
    else if(updateMyProgressBarUISetTimeoutId) {
      clearTimeout(updateMyProgressBarUISetTimeoutId);
    }
  }

  mySwingCore.addEventListener(MySwingCore.EVENTS_IS_STARTED_CHANGED, () => render());
  
  render();
}
