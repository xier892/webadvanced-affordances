const bottle = {
  el: document.getElementById('bottle'),
  state: {
    capacity: 'full'
  },

  setState() {
    bottle.state.capacity = (retrieveStorage('pillCount') > 0) ? 'full' : 'empty';
  },

  init() {
    bottle.setState();
  }
};

bottle.init();
