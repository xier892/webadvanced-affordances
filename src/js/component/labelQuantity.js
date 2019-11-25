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
      inputPlaceholder(value());
      input('');
      inputMax(SETTINGS.PRESCRIPTION_QTY_MAX);
      elMax.style.opacity = '1';
    });

    el.addEventListener('blur', () => {
      if (!value()) {
        input(placeholderValue());
      } else {
        inputPlaceholder();
      }
      elMax.removeAttribute('style');
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
