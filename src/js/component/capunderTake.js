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
    el.disabled = true;
    setTimeout(() => {
      if (document.body.contains(el)) {
        el.remove();
        buttonRefill.init();
      } else {
        el.removeAttribute('disabled');
      }
    }, 300);
  },

  addEvents() {
    const { el } = buttonTake;
    el.removeAttribute('disabled');
    el.addEventListener('touchend', (event) => {
      pillCollection.take(prescription.dose);
    }, false);
  },

  init() {
    buttonTake.el = buttonTake.data();
    buttonTake.el.disabled = true;
    capunder.el.appendChild(buttonTake.el);
    setTimeout(buttonTake.addEvents, retrieveStorage('pillCount', prescription.quantity) * 50 + 500);
  }
};

buttonTake.init();
