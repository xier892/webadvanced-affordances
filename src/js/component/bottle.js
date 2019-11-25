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

  prepare() {
    bottle.setOpenState();
    switch (bottle.state.capacity) {
      case 'empty':
        capunder.toggleButton('empty');
        label.toggleInput('enable');
        setTimeout(() => {
          label.toggle('show');
        }, 150);
        break;
      case 'full':
        capunder.toggleButton('full');
        break;
      default:
        capunder.toggleButton('full');
    }
  },

  init() {
    bottle.setOpenState('fromStorage');
  }
};

bottle.init();
