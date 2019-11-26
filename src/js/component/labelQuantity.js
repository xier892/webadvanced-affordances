const labelQuantity = {
  el: document.getElementById('label-quantity'),
  elMax: document.getElementById('label-quantity-max'),
  elMaxNumber: document.getElementById('label-quantity-max-number'),
  state: {
    placeholder: prescription.quantity
  },

  value() {
    return labelQuantity.el.value;
  },

  placeholderValue() {
    return labelQuantity.state.placeholder;
  },

  input(n) {
    labelQuantity.el.value = n;
  },

  inputPlaceholder(n) {
    labelQuantity.state.placeholder = n;
    labelQuantity.el.placeholder = n;
    if (!n) {
      delete labelQuantity.state.placeholder;
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
      value,
      inputMax
    } = labelQuantity;
    switch (s) {
      case 'enable':
        el.removeAttribute('disabled');
        el.setAttribute('max', '999');
        break;
      case 'disable':
        el.disabled = true;
        el.setAttribute('max', value());
        break;
      default:
        el.removeAttribute('disabled');
        el.setAttribute('max', '999');
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

    el.setAttribute('max', '999');
    input(prescription.quantity);
    toggle('disable');

    addEvents();
  }
};

labelQuantity.init();
