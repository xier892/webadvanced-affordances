const capunderAction = {
  data() {
    const d = document.createElement('div');
    d.className = 'capunder-action';
    return d;
  },

  init() {
    capunderAction.el = capunderAction.data();
    capunder.el.appendChild(capunderAction.el);
  }
};
