const capunderMenu = {
  data() {
    const d = document.createElement('ul');
    d.className = 'capunder-menu';
    return d;
  },

  init() {
    capunderMenu.el = capunderMenu.data();
    capunderAction.el.appendChild(capunderMenu.el);
  }
};
