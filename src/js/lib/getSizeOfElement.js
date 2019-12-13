const getSizeOfElement = (element, dimension) => {
  let result;

  const el = document.createElement('div');
  el.className = element;
  el.style.visibility = 'hidden';
  el.style.position = 'absolute';
  document.body.appendChild(el);
  const bounding = el.getBoundingClientRect();

  switch (dimension) {
    case 'width':
      result = bounding.right - bounding.left;
      break;
    case 'height':
      result = bounding.bottom - bounding.top;
      break;
    default:
  }

  el.remove();

  return result;
};

const getWidthOfElement = (element) => getSizeOfElement(element, 'width');
const getHeightOfElement = (element) => getSizeOfElement(element, 'height');
