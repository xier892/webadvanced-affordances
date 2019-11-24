const pill = {
  data() {
    const d = document.createElement('div');
    d.className = 'pill';
    d.style.setProperty('--pill-rotation', `${getRandomInt(0, 360)}deg`);
    return d;
  },

  withdraw() {
    this.el.className = 'pill';
    this.el.style.transform = `translateY(100vh) rotate3d(1, 0, ${getRandomInt(0, 0.5)}, 90deg)`;
    setTimeout(() => {
      this.el.remove();
    }, 300);
  },

  init() {
    this.el = this.data();
    this.el.classList.add('easeOutBounce');
    setTimeout(() => {
      this.el.classList.remove('easeOutBounce');
    }, 2000);
  }
};

const Pill = () => {
  const methods = Object.create(pill);
  return methods;
};
