const labelQuantity = {
  el: document.getElementById('label-quantity'),
  elMax: document.getElementById('label-quantity-max'),
  elMaxNumber: document.getElementById('label-quantity-max-number'),

  value() {
    return labelQuantity.el.value;
  },

  placeholderValue() {
    return labelQuantity.el.placeholder;
  },

  input(n) {
    labelQuantity.el.value = n;
  },

  inputPlaceholder(n) {
    labelQuantity.el.placeholder = n;
    if (!n) {
      labelQuantity.el.removeAttribute('placeholder');
    }
  },

  inputMax(n) {
    const { elMaxNumber } = labelQuantity;
    while (elMaxNumber.firstChild) {
      elMaxNumber.removeChild(elMaxNumber.firstChild);
    }
    elMaxNumber.appendChild(document.createTextNode(n));
  },

  toggle(s) {
    const {
      el,
      elMax,
      elMaxNumber,
      inputMax
    } = labelQuantity;
    switch (s) {
      case 'enable':
        el.removeAttribute('disabled');
        break;
      case 'disable':
        el.disabled = true;
        break;
      default:
        el.removeAttribute('disabled');
    }
  },

  addEvents() {
    const {
      el,
      elMax,
      value,
      placeholderValue,
      input,
      inputPlaceholder,
      inputMax
    } = labelQuantity;

    el.addEventListener('focus', () => {
      if (value() && RegExp('^[0-9]*$').test(value())) {
        inputPlaceholder(value());
      }
      input('');
      inputMax(SETTINGS.PRESCRIPTION_QTY_MAX);
      elMax.classList.add('visible');
    });

    el.addEventListener('blur', () => {
      if (!value() || !RegExp(/^\d*\.?\d*$/).test(value())) {
        input(placeholderValue());
      } else if (!RegExp('^[0-9]*$').test(value())
      || value() < SETTINGS.PRESCRIPTION_QTY_MIN
      || value() > SETTINGS.PRESCRIPTION_QTY_MAX) {
        const v = Math.round(value());
        if (v < SETTINGS.PRESCRIPTION_QTY_MIN) {
          input(SETTINGS.PRESCRIPTION_QTY_MIN);
          inputPlaceholder(SETTINGS.PRESCRIPTION_QTY_MIN);
        } else if (v > SETTINGS.PRESCRIPTION_QTY_MAX) {
          input(SETTINGS.PRESCRIPTION_QTY_MAX);
          inputPlaceholder(SETTINGS.PRESCRIPTION_QTY_MAX);
        } else {
          input(v);
          inputPlaceholder(v);
        }
      } else {
        inputPlaceholder(value());
      }
      elMax.classList.remove('visible');
      inputMax(SETTINGS.PRESCRIPTION_QTY_MAX);
    });
  },

  init() {
    const {
      el,
      input,
      inputMax,
      toggle,
      addEvents
    } = labelQuantity;

    el.setAttribute('min', SETTINGS.PRESCRIPTION_QTY_MIN);
    el.setAttribute('max', SETTINGS.PRESCRIPTION_QTY_MAX);
    input(prescription.quantity);
    toggle('disable');

    addEvents();
  }
};

labelQuantity.init();
