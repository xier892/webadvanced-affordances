const cap = {
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

  setOpenState(s) {
    cap.state.open = (s === 'open');
    populateStorage('capState', s);
  },

  depress() {
    cap.state.action = 'depressed';
    cap.el.classList.add('pressed');
  },

  move() {
    cap.state.action = 'dragging';
    cap.el.classList.add('dragging');
  },

  reset() {
    delete cap.state.action;
    cap.el.classList.remove('pressed', 'dragging');
    cap.el.removeAttribute('style');
  },

  remove() {
    cap.state.action = 'dragged';
    cap.el.classList.add('dragged');
    cap.setOpenState('open');
  },

  replace() {
    delete cap.state.action;
    cap.el.classList.remove('dragged');
    cap.setOpenState('closed');
  },

  addEvents() {
    const {
      el,
      properties,
      state,
      depress,
      move,
      reset,
      remove,
      replace
    } = cap;
    let { width, height } = properties;
    let {
      timer,
      clientX,
      clientY,
      deltaX,
      deltaY
    } = state;
    width = el.offsetWidth;
    height = el.offsetHeight;

    window.addEventListener('resize', () => {
      width = el.offsetWidth;
      height = el.offsetHeight;
    });
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
      if (state.action === 'depressed' || state.action === 'dragging') {
        move();
        deltaX = touches[0].clientX - clientX;
        deltaY = touches[0].clientY - clientY;
        const delta = Math.max((-deltaY) / width, deltaX / width);
        target.style.setProperty('--cap-rotate', `${(delta > 0) ? Math.max(0, delta * 80) : 0}deg`);
        target.style.setProperty('--cap-translate', `${(deltaY < 0) ? Math.max(-40, deltaY / 4) : 0}%`);
      }
    }, false);

    el.addEventListener('touchend', (event) => {
      if (timer) {
        clearTimeout(timer);
      }
      if (state.action === 'dragging' && deltaX >= width / 2.5 || -deltaY >= height / 2.5) {
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

  init() {
    cap.el = cap.data();
    switch (retrieveStorage('capState')) {
      case 'open':
        cap.remove();
        break;
      case 'closed':
        break;
      default:
        cap.remove();
    }

    document.getElementById('top').appendChild(cap.el);

    cap.addEvents();
  },
};

cap.init();
