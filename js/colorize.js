'use strict';

(function () {
  window.colorize = function (objectColor, arrayColors, colorIndex, attribute) {
    objectColor.addEventListener('click', function () {
      if (colorIndex < arrayColors.length) {
        objectColor.style[attribute] = arrayColors[colorIndex];
      } else {
        colorIndex = 0;
        objectColor.style[attribute] = arrayColors[colorIndex];
      }
      colorIndex++;
      return colorIndex;
    });
  }
})();