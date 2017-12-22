'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');

  var renderSimilarCharacter = function (dataCharacters) { // передаём параметром данные персонажей
    var template = document.querySelector('#similar-wizard-template').content; // находим шаблон
    var charactersTemplate = template.cloneNode(true); // клонируем его (каждый раз при создании нового персонажа)
    charactersTemplate.querySelector('.setup-similar-label').textContent = dataCharacters.name; // добавляем данные персонажей с каждого объкта: имя, цвет плаща, цвет глаз
    charactersTemplate.querySelector('.wizard-coat').style.fill = dataCharacters.colorCoat;
    charactersTemplate.querySelector('.wizard-eyes').style.fill = dataCharacters.colorEyes;
    return charactersTemplate; // возвращается готовый персонаж: 1-й, 2-й и т.д.
  };

  var removeChildrens = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    var WIZARDS_AMOUNT = wizards.length > 4 ? 4 : wizards.length;
    var setupSimilarList = document.querySelector('.setup-similar-list'); // находим в разметке div, куда будут добавляться персонажи
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderSimilarCharacter(wizards[i])); // поочередно добавляем в фрагмент добавленных в шаблон готовых персонажей: 1-го, 2-го и т.д.
    }
    removeChildrens(setupSimilarList);
    setupSimilarList.appendChild(fragment); // добавляем в разметку фрагмент со всеми персонажами
    setupSimilar.classList.remove('hidden');
  };
})();
