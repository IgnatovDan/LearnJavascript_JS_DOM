function MySwingUIPercentsLabel({mySwingCore, targetLabel} = {}) {
  const refreshIntervalMs = 100;

  let updateMyProgressBarUISetTimeoutId = null;
  function render() {
    targetLabel.innerText = Math.round(mySwingCore.getValue() * 100).toString();

    if(mySwingCore.getIsStarted()) {
      //todo: '100 < refreshInterval < ...dynamic increase if browser is overloaded...'
      updateMyProgressBarUISetTimeoutId = setTimeout(render, refreshIntervalMs);
    }
    else if(updateMyProgressBarUISetTimeoutId) {
      clearTimeout(updateMyProgressBarUISetTimeoutId);
    }
  }

  mySwingCore.addEventListener(MySwingCore.EVENTS_IS_STARTED_CHANGED, () => render());
  
  render();
}
