const rangeTake = {
  state: {
    open: false
  },
  properties: {},

  toggle(customToggleParameter) {
    let boolean = rangeTake.state.open;

    if (customToggleParameter === 'open') {
      boolean = false;
    } else if (customToggleParameter === 'close') {
      boolean = true;
    }

    switch (boolean) {
      case false:
        rangeTake.state.open = true;
        rangeTake.slider.value = prescription.dose;
        rangeTake.setProgressBar();
        rangeTake.setLabelText();
        rangeTake.el.classList.add('open');
        rangeTake.el.focus();
        break;
      case true:
        rangeTake.state.open = false;
        buttonTake.resetToOriginalDose();
        rangeTake.el.classList.remove('open');
        break;
      default:
    }
  },

  setProgressBar() {
    const { properties: { width }, slider } = rangeTake;
    const increment = width / (SETTINGS.PRESCRIPTION_DOSE_MAX - SETTINGS.PRESCRIPTION_DOSE_MIN);

    slider.style.setProperty('--progress-width', `${increment * (slider.value - SETTINGS.PRESCRIPTION_DOSE_MIN)}px`);
  },

  setLabelText(t = rangeTake.slider.value) {
    const { label } = rangeTake;

    while (label.firstChild) {
      label.removeChild(label.firstChild);
    }

    if (Number(t) !== prescription.dose) {
      label.classList.add('warning');
    } else {
      label.classList.remove('warning');
    }
    label.appendChild(document.createTextNode(t));
  },

  addEvents() {
    const {
      el,
      slider,
      label,
      state,
      properties,
      toggle,
      setProgressBar,
      setLabelText
    } = rangeTake;

    window.addEventListener('resize', () => {
      properties.width = slider.offsetWidth;
    }, false);

    slider.addEventListener('touchmove', () => {
      setProgressBar();
      setLabelText();
    }, false);

    slider.addEventListener('touchend', () => {
      setProgressBar();
      setLabelText();
      if (state.open) {
        buttonTake.ignoreRecommendedDose(slider.value);
      } else {
        buttonTake.resetToOriginalDose();
      }
    }, false);

    el.addEventListener('blur', () => {
      toggle('close');
    }, false);
  },

  data() {
    const d = document.createElement('div');
    d.className = 'capunder-range-container';
    d.tabIndex = '-1';

    const input = document.createElement('input');
    input.className = 'capunder-range';
    input.type = 'range';
    input.name = 'takerange';
    input.value = prescription.dose;
    input.setAttribute('min', SETTINGS.PRESCRIPTION_DOSE_MIN);
    input.setAttribute('max', SETTINGS.PRESCRIPTION_DOSE_MAX);

    const lbl = document.createElement('label');
    lbl.className = 'capunder-range-label';
    lbl.setAttribute('for', 'takerange');

    return { el: d, slider: input, label: lbl };
  },

  init() {
    const {
      setProgressBar,
      setLabelText,
      addEvents,
      data
    } = rangeTake;

    rangeTake.el = data().el;
    rangeTake.slider = data().slider;
    rangeTake.label = data().label;

    setLabelText();
    setProgressBar();
    addEvents();

    rangeTake.el.appendChild(rangeTake.slider);
    rangeTake.el.appendChild(rangeTake.label);
    capunderAction.el.appendChild(rangeTake.el);

    rangeTake.properties.width = rangeTake.slider.offsetWidth;
  }
};
