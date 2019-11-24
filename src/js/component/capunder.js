const capunder = {
  data() {
    const d = document.createElement('section');
    d.className = 'capunder';
    return d;
  },

  state: 'full',

  setState() {
    capunder.state = (retrieveStorage('pillCount') > 0) ? 'full' : 'empty';
  },

  toggleButton() {
    capunder.setState();

    switch (capunder.state) {
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
    capunder.setState();
    capunder.el = capunder.data();
    document.getElementById('top').appendChild(capunder.el);
  }
};

capunder.init();
