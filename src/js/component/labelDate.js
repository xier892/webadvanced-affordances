const labelDate = {
  el: document.getElementById('label-date-number'),

  getDate() {
    const date = new Date();
    const m = date.getMonth();
    const d = date.getDate();
    const y = date.getFullYear();

    return { month: m, day: d, year: y };
  },

  setDate(date = labelDate.getDate()) {
    const { el } = labelDate;
    populateStorage('date', JSON.stringify(date));

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    el.appendChild(document.createTextNode(`${date.month + 1}-${(`0${date.day}`).slice(-2)}-${date.year}`));
  },

  init() {
    if (retrieveStorage('date')) {
      labelDate.setDate(JSON.parse(retrieveStorage('date')));
    }
  }
};

labelDate.init();
