const labelDose = {
  el: document.getElementById('label-dose'),

  value() {
    const { el } = labelDose;
    return el.options[el.selectedIndex].text;
  },

  select(n) {
    labelDose.el.selectedIndex = n - 1;
  },

  toggle(s) {
    switch (s) {
      case 'enable':
        labelDose.el.removeAttribute('disabled');
        break;
      case 'disable':
        labelDose.el.disabled = true;
        break;
      default:
        labelDose.el.removeAttribute('disabled');
    }
  },

  init() {
    const {
      el,
      select,
      toggle
    } = labelDose;
    const fragment = document.createDocumentFragment();

    for (let i = SETTINGS.PRESCRIPTION_DOSE_MIN; i <= SETTINGS.PRESCRIPTION_DOSE_MAX; i++) {
      const option = document.createElement('option');
      option.appendChild(document.createTextNode(i));
      option.value = i;
      fragment.appendChild(option);
    }

    el.appendChild(fragment);
    select(prescription.dose);
    toggle('disable');
  }
};

labelDose.init();
