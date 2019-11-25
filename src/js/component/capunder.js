const capunder = {
  toggleButton() {
    bottle.setOpenState();

    switch (bottle.state.capacity) {
      case 'empty':
        buttonTake.toggle();
        break;
      case 'full':
        buttonRefill.toggle();
        break;
      default:
    }
  },

  data() {
    const d = document.createElement('section');
    d.className = 'capunder';
    return d;
  },

  init() {
    capunder.el = capunder.data();
    document.getElementById('top').appendChild(capunder.el);
  }
};

capunder.init();
