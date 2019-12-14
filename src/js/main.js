const setMaximumCapacity = () => Math.ceil((window.screen.availWidth / getWidthOfElement('pill transformTest')) * ((document.documentElement.offsetHeight * 0.8) / getHeightOfElement('pill transformTest')));

const SETTINGS = {
  PRESCRIPTION_DOSE_MIN: 1,
  PRESCRIPTION_DOSE_MAX: 5,
  PRESCRIPTION_QTY_MIN: 1,
  PRESCRIPTION_QTY_MAX: setMaximumCapacity()
};

window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

window.addEventListener('resize', () => {
  SETTINGS.PRESCRIPTION_QTY_MAX = setMaximumCapacity();
});
