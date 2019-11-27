const pillCollection = {
  el: document.getElementById('pill-collection'),
  properties: {
    contents: []
  },

  count() {
    return pillCollection.properties.contents.length;
  },

  updatePillCount() {
    populateStorage('pillCount', Math.max(0, pillCollection.count()));
  },

  take(n) {
    const { el, properties: { contents }, updatePillCount } = pillCollection;
    const pillsTaken = Math.min(contents.length, n);
    const transitionPromises = [];

    if (!cap.state.open) {
      cap.remove();
    }

    for (let i = 1; i <= pillsTaken; i++) {
      const p = contents[contents.length - 1];
      p.withdraw();
      transitionPromises.push(promiseTransitionEnd(p.el));
      contents.splice(contents.length - 1, 1);
      updatePillCount();
    }

    bottle.prepare(Promise.all(transitionPromises));
  },

  fill(quantity, options = {}) {
    const { el, properties: { contents }, updatePillCount } = pillCollection;
    const { drop } = options;
    const animationPromises = [];

    for (let i = 0; i < quantity; i++) {
      const p = new Pill();
      contents.push(p);
      p.init();
      if (drop) {
        p.drop(50 * i);
        animationPromises.push(promiseAnimationEnd(p.el));
      } else {
        p.append();
      }
    }

    updatePillCount();

    bottle.prepare();

    return Promise.all(animationPromises);
  },

  refill() {
    buttonRefill.removeEvents();

    const { el, fill } = pillCollection;

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    label.exportInformation();
    fill(prescription.quantity, { drop: true }).then(() => {
      cap.replace();
      promiseTransitionEnd(cap.el).then(buttonTake.addEvents);
    });
  },

  init() {
    if (!retrieveStorage('pillCount')) {
      populateStorage('pillCount', 0);
    }
    pillCollection.fill(retrieveStorage('pillCount'));
  }
};

pillCollection.init();
