const setMaximumCapacity = () => Math.ceil((window.screen.availWidth / getWidthOfElement('pill transformedWidthTest')) * ((document.body.offsetHeight * 0.8) / getWidthOfElement('pill transformedWidthTest')));

const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setViewportHeight();

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
  setViewportHeight();
  SETTINGS.PRESCRIPTION_QTY_MAX = setMaximumCapacity();
});
window.addEventListener('orientationchange', () => {
  setViewportHeight();
  SETTINGS.PRESCRIPTION_QTY_MAX = setMaximumCapacity();
});
