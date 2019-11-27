const whichTransitionEvent = () => {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (let i = 0; i < Object.keys(transitions).length; i++) {
    if (el.style[Object.keys(transitions)[i]] !== undefined) {
      return Object.values(transitions)[i];
    }
  }
};

const transitionend = whichTransitionEvent();

const promiseTransitionEnd = (el) => new Promise((resolve) => {
  el.addEventListener(transitionend, resolve);
});
