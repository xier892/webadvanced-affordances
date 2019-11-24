const pillCollection = {
  el: document.getElementById('pill-collection'),
  properties: {
    contents: []
  },

  take(n) {
    const { el, properties: { contents } } = pillCollection;
    const nn = Math.min(contents.length, n);

    for (let i = 1; i <= nn; i++) {
      contents[contents.length - i].withdraw();
    }

    contents.splice(contents.length - nn, nn);
    populateStorage('pillCount', Math.max(0, retrieveStorage('pillCount') - nn));

    capunder.toggleButton();
  },

  fill(n) {
    const { el, properties: { contents } } = pillCollection;

    for (let i = 0; i < n; i++) {
      const p = new Pill();
      contents.push(p);
      p.init(50 * i);
    }

    populateStorage('pillCount', contents.length);

    capunder.toggleButton();
  },

  refill() {
    buttonRefill.removeEvents();

    const { el, fill } = pillCollection;

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    fill(prescription.quantity);
    cap.close();
  },

  init() {
    if (retrieveStorage('pillCount') === null) {
      populateStorage('pillCount', prescription.quantity);
    }
    pillCollection.fill(retrieveStorage('pillCount'));
  }
};

pillCollection.init();
