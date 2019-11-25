const getSizeOfElement = (element, dimension) => {
  let result;

  const el = document.createElement('div');
  el.className = element;
  el.style.visibility = 'hidden';
  el.style.position = 'absolute';
  document.body.appendChild(el);

  switch (dimension) {
    case 'width':
      result = el.getBoundingClientRect().width;
      break;
    case 'height':
      result = el.getBoundingClientRect().height;
      break;
    default:
      result = el.getBoundingClientRect().width;
  }

  el.remove();

  return result;
};

const getWidthOfElement = (element) => getSizeOfElement(element, 'width');
const getHeightOfElement = (element) => getSizeOfElement(element, 'height');
