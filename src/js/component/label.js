const label = {
  el: document.getElementById('label'),

  toggle(s) {
    label.el.parentNode.scrollTo({
      top: 0,
      left: (s === 'show') ? label.el.parentNode.offsetWidth : 0,
      behavior: 'smooth'
    });
  },

  toggleInput(s) {
    labelDose.toggle(s);
    labelQuantity.toggle(s);
  },

  exportInformation() {
    updatePrescription({
      quantity: (labelQuantity.value()) ? labelQuantity.value() : labelQuantity.placeholderValue(),
      dose: labelDose.value()
    });
    label.toggle();
    labelQuantity.input(prescription.quantity);
    labelDose.select(prescription.dose);
    labelDate.setDate();
    label.toggleInput('disable');
  }
};
