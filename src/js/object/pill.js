const pill = {
  data() {
    const d = document.createElement('div');
    d.className = 'pill';
    d.style.setProperty('--pill-rotation', `${getRandomInt(0, 360)}deg`);
    return d;
  },

  withdraw() {
    this.el.style.transform = `translateY(100vh) rotate3d(1, 0, ${getRandomInt(0, 0.5)}, 90deg)`;
  },

  init(delay = 0) {
    this.el = this.data();

    const add = () => {
      if (cap.state.open) {
        this.el.classList.add('easeOutBounce');
        setTimeout(() => {
          this.el.classList.remove('easeOutBounce');
        }, 500);
      }
      pillCollection.el.appendChild(this.el);
    };

    if (delay > 0) {
      setTimeout(add, delay);
    } else {
      add();
    }
  }
};

const Pill = () => {
  const methods = Object.create(pill);
  return methods;
};
