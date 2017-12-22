'use strict';

(function () {
  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var similarWizards = [];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorIndex = 1;
  var eyesColorIndex = 1;
  var fireballColorIndex = 1;
  var coatColorCurrent;
  var eyesColorCurrent;
  var fireballColorCurrent;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColorCurrent) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColorCurrent) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(similarWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var colorizeElement = function (objectColor, arrayColors, colorIndex, colorCurrent, attribute) {
    objectColor.addEventListener('click', function () {
      if (colorIndex >= arrayColors.length) {
        colorIndex = 0;
      }
      objectColor.style[attribute] = arrayColors[colorIndex];
      colorCurrent = arrayColors[colorIndex];
      colorIndex++;
      updateWizards();
      return colorIndex;
    });
  };

  var successHandler = function (wizards) {
    similarWizards = wizards;
    updateWizards();
  };

  var setupWizardForm = setup.querySelector('.setup-wizard-form');
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(setupWizardForm), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };

  setupWizardForm.addEventListener('submit', onFormSubmit);

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 100px; height: 100px; padding-right: 15px; padding-left: 15px; padding-top: 30px; border-radius: 50%; text-align: center; background-color: darkorange;';
    node.style.border = '10px solid red';
    node.style.position = 'absolute';
    node.style.top = '10px';
    node.style.left = '50%';
    node.style.transform = 'translate(-50%)';
    node.style.fontSize = '14px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
  colorizeElement(wizardCoat, coatColors, coatColorIndex, coatColorCurrent, 'fill');
  colorizeElement(wizardEyes, eyesColors, eyesColorIndex, eyesColorCurrent, 'fill');
  colorizeElement(setupFireball, fireballColors, fireballColorIndex, fireballColorCurrent, 'backgroundColor');
})();
