const label = {
  el: document.getElementById('label'),
  parent: document.getElementById('label-wrapper'),

  state: {},

  resetTransform() {
    const transformDistance = label.parent.scrollLeft - window.outerWidth;
    label.el.style.transform = `translate3d(${transformDistance}px, 0, 0)`;
  },

  toggle(s, delay = 0) {
    const { el, parent, state } = label;
    const scrollDistance = parent.scrollLeft;
    const transformDistance = scrollDistance - window.outerWidth;

    el.removeAttribute('style');
    el.style.transitionDelay = `${delay}ms`;

    if (s === 'show') {
      state.locked = true;
      parent.classList.add('locked');
      el.style.transform = `translate3d(${transformDistance}px, 0, 0)`;
      promiseTransitionEnd(el).then(() => {
        el.style.transitionDelay = '';
      });
      window.addEventListener('resize', label.resetTransform);
    } else {
      delete state.locked;
      window.removeEventListener('resize', label.resetTransform);
      el.style.transform = `translate3d(${scrollDistance}px, 0, 0)`;
      promiseTransitionEnd(el).then(() => {
        parent.scrollLeft = 0;
        parent.classList.remove('locked');
        el.style.transition = 'none';
        el.style.transform = '';
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
