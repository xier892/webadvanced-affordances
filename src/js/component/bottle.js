const bottle = {
  el: document.getElementById('bottle'),
  state: {
    capacity: 'full'
  },

  setOpenState() {
    bottle.state.capacity = (retrieveStorage('pillCount') > 0) ? 'full' : 'empty';
  },

  init() {
    bottle.setOpenState();
  }
};

bottle.init();
