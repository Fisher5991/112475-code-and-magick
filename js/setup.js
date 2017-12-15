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

  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');
  var similarCharacters = [];
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var generateCharacters = function () {
    var charactersAmount = 4; // количество похожих персонажей - 4
    for (var i = 0; i < charactersAmount; i++) { // создаём каждого персонажа с помощью цикла
      var character = {
        name: names[window.generateNumber(0, names.length - 1)] + ' ' + secondNames[window.generateNumber(0, names.length - 1)],
        coatColor: coatColors[window.generateNumber(0, names.length - 1)],
        eyesColor: eyesColors[window.generateNumber(0, names.length - 1)]
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

  setupSimilar.classList.remove('hidden');
})();

(function () {
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
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorIndex = 1;
  var eyesColorIndex = 1;
  var fireballColorIndex = 1;

  window.colorizeElement(wizardCoat, coatColors, coatColorIndex, 'fill');
  window.colorizeElement(wizardEyes, eyesColors, eyesColorIndex, 'fill');
  window.colorizeElement(setupFireball, fireballColors, fireballColorIndex, 'backgroundColor');

  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var artifactsElement = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItem = evt.target;
      artifactsElement.style.outline = '2px dashed red';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.closest('.setup-artifacts').style.outline = 'none';
    evt.target.appendChild(draggedItem.cloneNode(true));
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
