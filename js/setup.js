'use strict';

var similarCharacters = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var mantleColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var template = document.querySelector('#similar-wizard-template').content;
var setupSimilarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var generateNumber = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var generateCharacters = function () {
  var charactersAmount = 4;
  for (var i = 0; i < charactersAmount; i++) {
    var character = {
      'name': names[generateNumber(0, names.length - 1)] + ' ' + secondNames[generateNumber(0, names.length - 1)],
      'coatColor': mantleColors[generateNumber(0, names.length - 1)],
      'eyesColor': eyesColors[generateNumber(0, names.length - 1)]
    };
    similarCharacters.push(character);
  }
};

var renderSimilarCharacters = function (dataCharacters) {
  var charactersTemplate = template.cloneNode(true);
  charactersTemplate.querySelector('.setup-similar-label').textContent = dataCharacters.name;
  charactersTemplate.querySelector('.wizard-coat').style.fill = dataCharacters.coatColor;
  charactersTemplate.querySelector('.wizard-eyes').style.fill = dataCharacters.coatColor;
  return charactersTemplate;
};

var addFragmentCharacters = function () {
  for (var i = 0; i < similarCharacters.length; i++) {
    fragment.appendChild(renderSimilarCharacters(similarCharacters[i]));
  }
};

generateCharacters();
addFragmentCharacters();
setupSimilarList.appendChild(fragment);
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');