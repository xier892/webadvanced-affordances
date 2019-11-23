const cap = {
  el: document.getElementsByClassName('cap')[0],
  properties: {
    width: 0,
    height: 0
  },
  state: {
    timer: 0,
    clientX: 0,
    clientY: 0,
    deltaX: 0,
    deltaY: 0
  },

  replace() {
    cap.el.classList.remove('dragged');
  },
  addEvents() {
    const { el, properties } = cap;
    let { width, height } = properties;
    width = el.offsetWidth;
    height = el.offsetHeight;
    let {
      timer,
      clientX,
      clientY,
      deltaX,
      deltaY
    } = cap.state;

    window.addEventListener('orientationchange', () => {
      width = el.offsetWidth;
      height = el.offsetHeight;
    });

    el.addEventListener('touchstart', (event) => {
      const { target, touches } = event;
      event.preventDefault();
      clientX = touches[0].clientX;
      clientY = touches[0].clientY;
      timer = setTimeout(() => {
        target.classList.add('pressed');
      }, 250);
    }, false);

    el.addEventListener('touchmove', (event) => {
      const { target, touches, changedTouches } = event;
      if (timer) {
        clearTimeout(timer);
      }
      if (target.classList.contains('pressed') || target.classList.contains('dragging')) {
        target.classList.remove('pressed');
        target.classList.add('dragging');
        deltaX = touches[0].clientX - clientX;
        deltaY = touches[0].clientY - clientY;
        const delta = Math.max((-deltaY) / width, deltaX / width);
        target.style.setProperty('--cap-rotate', `${(delta > 0) ? Math.max(0, delta * 80) : 0}deg`);
        target.style.setProperty('--cap-translate', `${(deltaY < 0) ? Math.max(-40, deltaY / 4) : 0}%`);
      }
    }, false);

    el.addEventListener('touchend', (event) => {
      const { target } = event;
      if (timer) {
        clearTimeout(timer);
      }
      if (target.classList.contains('dragging') && deltaX >= width / 2.5 || -deltaY >= height / 2.5) {
        target.classList.add('dragged');
      }
      target.classList.remove('pressed', 'dragging');
      target.removeAttribute('style');
      deltaX = 0;
      deltaY = 0;
    }, false);

    el.addEventListener('touchcancel', (event) => {
      const { target } = event;
      if (timer) {
        clearTimeout(timer);
      }
      target.classList.remove('pressed', 'dragging');
      target.removeAttribute('style');
    }, false);
  }
};

cap.addEvents();
