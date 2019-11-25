const capunder = {
  toggleButton(s = 'full') {
    switch (s) {
      case 'empty':
        buttonTake.toggle();
        break;
      case 'full':
        buttonRefill.toggle();
        break;
      default:
        buttonRefill.toggle();
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
