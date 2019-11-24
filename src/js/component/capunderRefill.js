const buttonRefill = {
  data() {
    const d = document.createElement('button');
    d.className = 'capunder-refill';
    d.type = 'button';
    d.name = 'refill';

    const contents = document.createDocumentFragment();
    const img = document.createElement('img');
    img.src = 'dist/assets/image/material-arrow-drop-down.svg';
    img.alt = 'down arrow';
    contents.appendChild(document.createTextNode('refill'));
    contents.appendChild(document.createTextNode(' '));
    contents.appendChild(img);

    d.appendChild(contents);
    return d;
  },

  toggle() {
    const { el } = buttonRefill;
    if (document.body.contains(el)) {
      el.remove();
      buttonTake.init();
    }
  },

  addEvents() {
    const { el } = buttonRefill;

    el.addEventListener('touchend', (event) => {
      pillCollection.refill();
    }, false);
  },

  init() {
    buttonRefill.el = buttonRefill.data();
    capunder.el.appendChild(buttonRefill.el);
    buttonRefill.addEvents();
  }
};
