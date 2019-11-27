class Pill {
  withdraw() {
    this.el.classList.add('withdrawn');
    this.el.style.setProperty('--z-rotation', getRandomInt(0, 0.5));
  }

  drop(delay = 0) {
    this.el.style.animationDelay = `${delay}ms`;
    this.el.classList.add('easeOutBounce');
    return this.el;
  }

  static data() {
    const d = document.createElement('div');
    d.className = 'pill';
    d.style.setProperty('--pill-rotation', `${getRandomInt(0, 360)}deg`);
    return d;
  }

  init() {
    this.el = this.constructor.data();
  }
}
