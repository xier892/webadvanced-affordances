const pillCollection = {
  el: document.getElementById('pill-collection'),
  properties: {
    contents: []
  },

  take(n) {
    const { el, properties: { contents } } = pillCollection;

    for (let i = 1; i <= n; i++) {
      contents[contents.length - i].withdraw();
    }

    contents.splice(contents.length - n, n);
    populateStorage('pillCount', Math.max(0, retrieveStorage('pillCount') - n));

    capunder.toggleButton();
  },

  fill(n) {
    const { el, properties: { contents } } = pillCollection;

    for (let i = 0; i < n; i++) {
      const p = new Pill();
      p.init();
      contents.push(p);
      setTimeout(() => {
        el.appendChild(p.el);
      }, 50 * i);
    }

    populateStorage('pillCount', contents.length);

    capunder.toggleButton();
  },

  refill() {
    pillCollection.fill(prescription.quantity);
  },

  init() {
    if (retrieveStorage('pillCount') === null) {
      populateStorage('pillCount', prescription.quantity);
    }
    pillCollection.fill(retrieveStorage('pillCount'));
  }
};

pillCollection.init();
