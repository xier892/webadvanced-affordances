const buttonTake = {
  toggle(promise = Promise.resolve()) {
    const { el } = buttonTake;
    el.disabled = true;
    promise.then(() => {
      setTimeout(() => {
        if (document.body.contains(el)) {
          el.remove();
          buttonRefill.init();
        } else {
          el.removeAttribute('disabled');
        }
      }, 300);
    });
  },

  addEvents() {
    const { el } = buttonTake;
    el.removeAttribute('disabled');
    el.addEventListener('touchend', (event) => {
      pillCollection.take(prescription.dose);
    }, false);
  },

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

  init(options = '') {
    buttonTake.el = buttonTake.data();
    if (options === 'disabled') {
      buttonTake.el.disabled = true;
    } else {
      buttonTake.addEvents();
    }
    capunderAction.el.appendChild(buttonTake.el);
  }
};

capunderAction.init();
buttonTake.init();
