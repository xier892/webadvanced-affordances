const bottle = {
  el: document.getElementById('bottle'),
  state: {
    capacity: 'full'
  },

  setOpenState(options) {
    if (options === 'fromStorage') {
      bottle.state.capacity = (retrieveStorage('pillCount') > 0) ? 'full' : 'empty';
    } else {
      bottle.state.capacity = (pillCollection.count() > 0) ? 'full' : 'empty';
    }
  },

  prepare(oncePillsRemoved = Promise.resolve()) {
    bottle.setOpenState();
    switch (bottle.state.capacity) {
      case 'empty':
        buttonTake.toggle(oncePillsRemoved);
        label.toggleInput('enable');
        oncePillsRemoved.then(() => {
          setTimeout(() => {
            label.toggle('show');
          }, 150);
        });
        break;
      case 'full':
        buttonRefill.toggle();
        break;
      default:
    }
  },

  empty() {
    bottle.el.classList.add('flipped');
    pillCollection.take(pillCollection.count()).then(() => {
      promiseTransitionEnd(bottle.el).then(() => {
        setTimeout(() => {
          bottle.el.classList.remove('flipped');
        }, 300);
      });
    });
  },

  init() {
    bottle.setOpenState('fromStorage');
  }
};

bottle.init();
