const GLOBAL = {
  WIDTH: window.outerWidth,
  HEIGHT: window.innerHeight
};

const setMaximumCapacity = () => Math.ceil((GLOBAL.WIDTH / getWidthOfElement('pill transformedWidthTest')) * ((GLOBAL.HEIGHT * 0.8) / getWidthOfElement('pill transformedWidthTest')));

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
  GLOBAL.WIDTH = window.outerWidth;
  GLOBAL.HEIGHT = window.innerHeight;
  SETTINGS.PRESCRIPTION_QTY_MAX = setMaximumCapacity();
});
window.addEventListener('orientationchange', () => {
  GLOBAL.WIDTH = window.outerWidth;
  GLOBAL.HEIGHT = window.innerHeight;
  SETTINGS.PRESCRIPTION_QTY_MAX = setMaximumCapacity();
});
