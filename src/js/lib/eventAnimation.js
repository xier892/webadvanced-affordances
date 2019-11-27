const whichAnimationEvent = () => {
  const el = document.createElement('fakeelement');
  const animations = {
    animation: 'animationend',
    OAnimation: 'oTransitionEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitTransitionEnd'
  };

  for (let i = 0; i < Object.keys(animations).length; i++) {
    if (el.style[Object.keys(animations)[i]] !== undefined) {
      return Object.values(animations)[i];
    }
  }
};

const animationend = whichAnimationEvent();

const promiseAnimationEnd = (el) => new Promise((resolve) => {
  el.addEventListener(animationend, resolve);
});
