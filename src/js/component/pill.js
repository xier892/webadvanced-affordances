class Pill {
  append() {
    pillCollection.el.appendChild(this.el);
  }

  withdraw() {
    this.el.classList.add('withdrawn');
    this.el.style.setProperty('--z-rotation', getRandomInt(0, 0.5));
  }

  drop(delay = 0) {
    const add = () => {
      this.el.classList.add('easeOutBounce');
      promiseAnimationEnd(this.el).then(() => {
        this.el.classList.remove('easeOutBounce');
      });
      this.append();
    };

    if (delay > 0) {
      setTimeout(add, delay);
    } else {
      add();
    }
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
