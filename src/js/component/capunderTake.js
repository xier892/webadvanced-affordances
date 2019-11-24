const buttonTake = {
  data() {
    const d = document.createElement('button');
    d.className = 'capunder-take';
    d.type = 'button';
    d.name = 'take';

    const contents = document.createDocumentFragment();
    const img = document.createElement('img');
    img.src = 'dist/assets/image/material-arrow-drop-up.svg';
    img.alt = 'up arrow';
    contents.appendChild(document.createTextNode('take'));
    contents.appendChild(document.createTextNode(' '));
    contents.appendChild(img);

    d.appendChild(contents);
    return d;
  },

  toggle() {
    const { el } = buttonTake;
    if (document.body.contains(el)) {
      el.remove();
      buttonRefill.init();
    }
  },

  addEvents() {
    const { el } = buttonTake;
    el.addEventListener('touchend', (event) => {
      pillCollection.take(prescription.dose);
    }, false);
  },

  init() {
    buttonTake.el = buttonTake.data();
    capunder.el.appendChild(buttonTake.el);
    buttonTake.addEvents();
  }
};

buttonTake.init();
