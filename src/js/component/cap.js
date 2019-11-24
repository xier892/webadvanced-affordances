const cap = {
  data() {
    const d = document.createElement('div');
    d.className = 'cap';
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= 12; i++) {
      const indent = document.createElement('div');
      indent.className = 'cap-indent';
      fragment.appendChild(indent);
    }
    d.appendChild(fragment);
    return d;
  },

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

  depress() {
    cap.el.classList.add('pressed');
  },

  move() {
    cap.el.classList.remove('pressed');
    cap.el.classList.add('dragging');
  },

  reset() {
    cap.el.classList.remove('pressed', 'dragging');
    cap.el.removeAttribute('style');
  },

  remove() {
    cap.el.classList.add('dragged');
    populateStorage('capState', 'open');
  },

  replace() {
    cap.el.classList.remove('dragged');
    removeStorage('capState');
  },

  addEvents() {
    const {
      el,
      depress,
      move,
      reset,
      remove,
      replace
    } = cap;
    let {
      properties: { width, height },
      state: {
        timer,
        clientX,
        clientY,
        deltaX,
        deltaY
      }
    } = cap;
    width = el.offsetWidth;
    height = el.offsetHeight;

    window.addEventListener('orientationchange', () => {
      width = el.offsetWidth;
      height = el.offsetHeight;
    });

    el.addEventListener('touchstart', (event) => {
      const { touches } = event;
      event.preventDefault();
      clientX = touches[0].clientX;
      clientY = touches[0].clientY;
      timer = setTimeout(depress, 250);
    }, false);

    el.addEventListener('touchmove', (event) => {
      const { target, touches } = event;
      if (timer) {
        clearTimeout(timer);
      }
      if (target.classList.contains('pressed') || target.classList.contains('dragging')) {
        move();
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
        remove();
      }
      reset();
      deltaX = 0;
      deltaY = 0;
    }, false);

    el.addEventListener('touchcancel', (event) => {
      if (timer) {
        clearTimeout(timer);
      }
      reset();
    }, false);
  },

  init() {
    cap.el = cap.data();

    document.getElementById('top').insertBefore(cap.el, document.getElementById('capunder'));

    switch (retrieveStorage('capState')) {
      case 'open':
        cap.remove();
        break;
      default:
    }

    cap.addEvents();
  },
};

cap.init();
