const label = {
  el: document.getElementById('label'),
  parent: document.getElementById('label-wrapper'),

  state: {},

  resetTransform() {
    label.el.style.setProperty('--slideIn-end', `${label.parent.scrollLeft - GLOBAL.WIDTH}px`);
  },

  toggle(s, delay = 0) {
    const { el, parent, state } = label;
    const scrollDistance = parent.scrollLeft;

    el.style.animationDelay = `${delay}ms`;

    if (s === 'show') {
      state.locked = true;
      parent.classList.add('locked');
      el.style.setProperty('--slideIn-end', `${scrollDistance - GLOBAL.WIDTH}px`);
      el.classList.add('slideIn');
      window.addEventListener('resize', label.resetTransform);
    } else {
      delete state.locked;
      window.removeEventListener('resize', label.resetTransform);
      el.style.setProperty('--slideOut-start', `${scrollDistance - GLOBAL.WIDTH}px`);
      el.style.setProperty('--slideOut-end', `${scrollDistance}px`);
      el.classList.add('slideOut');
      promiseAnimationEnd(el).then(() => {
        el.classList.remove('slideIn', 'slideOut');
        el.removeAttribute('style');
        parent.scrollLeft = 0;
        parent.classList.remove('locked');
      });
    }
  },

  toggleInput(s) {
    labelDose.toggle(s);
    labelQuantity.toggle(s);
  },

  exportInformation() {
    updatePrescription({
      quantity: (labelQuantity.value() && RegExp('^[0-9]*$').test(labelQuantity.value())) ? labelQuantity.value() : labelQuantity.placeholderValue(),
      dose: labelDose.value()
    });
    label.toggle();
    labelQuantity.input(prescription.quantity);
    labelQuantity.inputPlaceholder();
    labelDose.select(prescription.dose);
    labelDate.setDate();
    label.toggleInput('disable');
  }
};
