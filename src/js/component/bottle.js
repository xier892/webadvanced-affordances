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

  prepare(promise = Promise.resolve()) {
    bottle.setOpenState();
    switch (bottle.state.capacity) {
      case 'empty':
        capunder.toggleButton('empty', promise);
        label.toggleInput('enable');
        promise.then(() => {
          setTimeout(() => {
            label.toggle('show');
          }, 150);
        });
        break;
      case 'full':
        capunder.toggleButton('full');
        break;
      default:
        capunder.toggleButton('full');
    }
  },

  empty() {
    bottle.el.classList.add('flipped');
    pillCollection.take(pillCollection.count()).then(() => {
      setTimeout(() => {
        bottle.el.classList.remove('flipped');
      }, 300);
    });
  },

  init() {
    bottle.setOpenState('fromStorage');
  }
};

bottle.init();
