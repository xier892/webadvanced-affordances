const buttonTake = {
  state: {},

  toggle(promise = Promise.resolve()) {
    const { el } = buttonTake;
    el.disabled = true;
    rangeTake.toggle('close');
    promise.then(() => {
      setTimeout(() => {
        if (document.body.contains(el)) {
          rangeTake.el.remove();
          el.remove();
          buttonRefill.init();
        } else {
          el.removeAttribute('disabled');
        }
      }, 300);
    });
  },

  ignoreRecommendedDose(n) {
    const {
      PRESCRIPTION_DOSE_MIN,
      PRESCRIPTION_DOSE_MAX,
      PRESCRIPTION_QTY_MIN,
      PRESCRIPTION_QTY_MAX
    } = SETTINGS;

    buttonTake.state.ignoreRecommendedDose = true;

    if (n < PRESCRIPTION_DOSE_MIN) {
      buttonTake.state.newDose = PRESCRIPTION_DOSE_MIN;
    } else if (n > PRESCRIPTION_QTY_MAX) {
      buttonTake.state.newDose = PRESCRIPTION_QTY_MAX;
    } else if (n >= PRESCRIPTION_DOSE_MIN && n <= PRESCRIPTION_DOSE_MAX) {
      buttonTake.state.newDose = Math.max(Math.round(n), PRESCRIPTION_DOSE_MIN);
    } else {
      buttonTake.state.newDose = prescription.dose;
    }
  },

  resetToOriginalDose() {
    delete buttonTake.state.ignoreRecommendedDose;
    delete buttonTake.state.newDose;
  },

  addEvents() {
    const { el, state, resetToOriginalDose } = buttonTake;

    el.removeAttribute('disabled');

    el.addEventListener('touchstart', (event) => {
      event.preventDefault();
      delete state.ignoreDefaultAction;
      state.timer = setTimeout(() => {
        state.ignoreDefaultAction = true;
        event.target.blur();
        rangeTake.toggle();
      }, 350);
    }, false);

    el.addEventListener('touchend', (event) => {
      event.preventDefault();

      clearTimeout(state.timer);
      delete state.timer;

      if (!state.ignoreDefaultAction) {
        if (state.ignoreRecommendedDose) {
          pillCollection.take(state.newDose);
          resetToOriginalDose();
        } else {
          pillCollection.take(prescription.dose);
        }
        event.target.focus();
      }

      delete state.ignoreDefaultAction;
    }, false);

    el.addEventListener('touchcancel', () => {
      clearTimeout(state.timer);
      delete state.timer;
      delete state.ignoreDefaultAction;
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
rangeTake.init();
