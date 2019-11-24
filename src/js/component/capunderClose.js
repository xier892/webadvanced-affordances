const buttonClose = {
  data() {
    const d = document.createElement('button');
    d.className = 'capunder-close';
    d.type = 'button';
    d.name = 'close';

    const img = document.createElement('img');
    img.src = 'dist/assets/image/open-collapse-down.svg';
    img.alt = 'close';

    d.appendChild(img);
    return d;
  },

  addEvents() {
    const { el } = buttonClose;
    el.addEventListener('touchend', (event) => {
      cap.replace();
    }, false);
  },

  init() {
    buttonClose.el = buttonClose.data();
    buttonClose.addEvents();
    capunder.el.appendChild(buttonClose.el);
  }
};

buttonClose.init();
