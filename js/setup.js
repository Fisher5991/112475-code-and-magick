'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var similarCharacters = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var generateCharacters = function () {
  var charactersAmount = 4; // Количество похожих персонажей - 4
  for (var i = 0; i < charactersAmount; i++) { //создаём каждого персонажа с помощью цикла
    var character = {
      name: names[generateNumber(0, names.length - 1)] + ' ' + secondNames[generateNumber(0, names.length - 1)],
      coatColor: coatColors[generateNumber(0, names.length - 1)],
      eyesColor: eyesColors[generateNumber(0, names.length - 1)]
    };
    similarCharacters.push(character); // добавляем каждого персонажа (объект) поочередно в массив всех персонажей
  }
  addFragmentCharacters(); // вызываем функцию для добавления персонажей в фрагмент
};

var renderSimilarCharacters = function (dataCharacters) { // передаём параметром данные персонажей
  var template = document.querySelector('#similar-wizard-template').content; // находим шаблон
  var charactersTemplate = template.cloneNode(true); // клонируем его (каждый раз при создании нового персонажа)
  charactersTemplate.querySelector('.setup-similar-label').textContent = dataCharacters.name; // добавляем данные персонажей с каждого объкта: имя, цвет плаща, цвет глаз
  charactersTemplate.querySelector('.wizard-coat').style.fill = dataCharacters.coatColor;
  charactersTemplate.querySelector('.wizard-eyes').style.fill = dataCharacters.eyesColor;
  return charactersTemplate; // возвращается готовый персонаж: 1-й, 2-й и т.д.
};

var addFragmentCharacters = function () {
  var setupSimilarList = document.querySelector('.setup-similar-list'); // находим в разметке div, куда будут добавляться персонажи
  var fragment = document.createDocumentFragment(); // создаём фрагмент
  for (var i = 0; i < similarCharacters.length; i++) {
    fragment.appendChild(renderSimilarCharacters(similarCharacters[i])); // поочередно добавляем в фрагмент добавленных в шаблон готовых персонажей: 1-го, 2-го и т.д.
  }
  setupSimilarList.appendChild(fragment); // добавляем в разметку фрагмент со всеми персонажами
};

generateCharacters(); // генерируем похожих персонажей

/* Задание 4-1 ----------------------------------------- */

var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var coatColorIndex = 1;
var eyesColorIndex = 1;
var fireballColorIndex = 1;

var openPopup = function () {
  setup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setupSimilar.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

var changeColor = function (objectColor, arrayColors, colorIndex, attribute) {
  if (colorIndex < arrayColors.length) {
    objectColor.style[attribute] = arrayColors[colorIndex];
  } else {
    colorIndex = 0;
    objectColor.style[attribute] = arrayColors[colorIndex];
  }
  colorIndex++;
  return colorIndex;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  coatColorIndex = changeColor(wizardCoat, coatColors, coatColorIndex, 'fill');
});

wizardEyes.addEventListener('click', function () {
  eyesColorIndex = changeColor(wizardEyes, eyesColors, eyesColorIndex, 'fill');
});

setupFireball.addEventListener('click', function () {
  fireballColorIndex = changeColor(setupFireball, fireballColors, fireballColorIndex, 'backgroundColor');
});

setupUserName.addEventListener('input', function (evt) {
  if (evt.target.value.length < 2) {
    evt.target.setCustomValidity('Имя должно состоять не менее чем из 2-х символов');
  } else {
    evt.target.setCustomValidity('');
  }
});