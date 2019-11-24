const capunder = {
  data() {
    const d = document.createElement('section');
    d.className = 'capunder';
    return d;
  },

  toggleButton() {
    bottle.setState();

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

  init() {
    capunder.el = capunder.data();
    document.getElementById('top').appendChild(capunder.el);
  }
};

capunder.init();
