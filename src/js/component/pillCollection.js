const pillCollection = {
  el: document.getElementById('pill-collection'),
  properties: {
    contents: []
  },

  count() {
    return pillCollection.properties.contents.length;
  },

  take(n) {
    const { el, properties: { contents } } = pillCollection;
    const nn = Math.min(contents.length, n);

    if (!cap.state.open) {
      cap.remove();
    }

    for (let i = 1; i <= nn; i++) {
      contents[contents.length - i].withdraw();
    }

    contents.splice(contents.length - nn, nn);
    populateStorage('pillCount', Math.max(0, retrieveStorage('pillCount') - nn));

    bottle.prepare();
  },

  fill(quantity, options = {}) {
    const { el, properties: { contents } } = pillCollection;
    const { drop } = options;

    for (let i = 0; i < quantity; i++) {
      const p = new Pill();
      contents.push(p);
      p.init();
      if (drop) {
        p.drop(50 * i);
      } else {
        p.append();
      }
    }

    populateStorage('pillCount', contents.length);

    bottle.prepare();
  },

  refill() {
    buttonRefill.removeEvents();

    const { el, fill } = pillCollection;

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    label.exportInformation();
    fill(prescription.quantity, { drop: true });
    cap.close();
  },

  init() {
    if (!retrieveStorage('pillCount')) {
      populateStorage('pillCount', 0);
    }
    pillCollection.fill(retrieveStorage('pillCount'));
  }
};

pillCollection.init();
