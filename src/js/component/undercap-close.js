const closeButton = {
  el: document.getElementsByClassName('undercap-close')[0],

  addEvents() {
    const { el } = closeButton;
    el.addEventListener('touchend', (event) => {
      cap.replace();
    }, false);
  }
};

closeButton.addEvents();
