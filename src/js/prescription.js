const prescription = {};
const defaultPrescription = JSON.stringify({
  quantity: 15,
  dose: 1
});

if (retrieveStorage('prescription') === null) {
  populateStorage('prescription', defaultPrescription);
}

const updatePrescription = (obj) => {
  const { quantity, dose } = obj;
  prescription.quantity = quantity;
  prescription.dose = dose;
  populateStorage('prescription', JSON.stringify(obj));
};

updatePrescription(JSON.parse(retrieveStorage('prescription', defaultPrescription)));
