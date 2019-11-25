const prescription = {};
SETTINGS.DEFAULT_PRESCRIPTION = JSON.stringify({
  quantity: Math.min(15, SETTINGS.PRESCRIPTION_QTY_MAX),
  dose: 1
});

if (!retrieveStorage('prescription')) {
  populateStorage('prescription', SETTINGS.DEFAULT_PRESCRIPTION);
}

const updatePrescription = (obj, options = {}) => {
  const { quantity, dose } = obj;
  const { skipValidation } = options;
  const {
    DEFAULT_PRESCRIPTION,
    PRESCRIPTION_DOSE_MIN,
    PRESCRIPTION_DOSE_MAX,
    PRESCRIPTION_QTY_MIN,
    PRESCRIPTION_QTY_MAX
  } = SETTINGS;
  const fallback = JSON.parse(DEFAULT_PRESCRIPTION);

  if (skipValidation) {
    prescription.dose = dose;
    prescription.quantity = quantity;
  } else {
    if (dose < PRESCRIPTION_DOSE_MIN) {
      prescription.dose = PRESCRIPTION_DOSE_MIN;
    } else if (dose > PRESCRIPTION_QTY_MAX) {
      prescription.dose = PRESCRIPTION_QTY_MAX;
    } else if (dose >= PRESCRIPTION_DOSE_MIN && dose <= PRESCRIPTION_DOSE_MAX) {
      prescription.dose = Math.max(Math.round(dose), PRESCRIPTION_DOSE_MIN);
    } else {
      prescription.dose = fallback.dose;
    }

    if (quantity < PRESCRIPTION_QTY_MIN) {
      prescription.quantity = PRESCRIPTION_QTY_MIN;
    } else if (quantity > PRESCRIPTION_QTY_MAX) {
      prescription.quantity = PRESCRIPTION_QTY_MAX;
    } else if (quantity >= PRESCRIPTION_QTY_MIN && quantity <= PRESCRIPTION_QTY_MAX) {
      prescription.quantity = Math.max(prescription.dose, Math.round(quantity));
    } else {
      prescription.quantity = fallback.quantity;
    }
  }

  populateStorage('prescription', JSON.stringify(prescription));
};

updatePrescription(JSON.parse(retrieveStorage('prescription', SETTINGS.DEFAULT_PRESCRIPTION)), { skipValidation: true });
