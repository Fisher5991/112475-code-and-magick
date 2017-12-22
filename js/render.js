'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilar = setup.querySelector('.setup-similar');

  var renderSimilarCharacter = function (dataCharacters) { // ������� ���������� ������ ����������
    var template = document.querySelector('#similar-wizard-template').content; // ������� ������
    var charactersTemplate = template.cloneNode(true); // ��������� ��� (������ ��� ��� �������� ������ ���������)
    charactersTemplate.querySelector('.setup-similar-label').textContent = dataCharacters.name; // ��������� ������ ���������� � ������� ������: ���, ���� �����, ���� ����
    charactersTemplate.querySelector('.wizard-coat').style.fill = dataCharacters.colorCoat;
    charactersTemplate.querySelector('.wizard-eyes').style.fill = dataCharacters.colorEyes;
    return charactersTemplate; // ������������ ������� ��������: 1-�, 2-� � �.�.
  };

  var removeChildrens = function (elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    var WIZARDS_AMOUNT = wizards.length > 4 ? 4 : wizards.length;
    var setupSimilarList = document.querySelector('.setup-similar-list'); // ������� � �������� div, ���� ����� ����������� ���������
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderSimilarCharacter(wizards[i])); // ���������� ��������� � �������� ����������� � ������ ������� ����������: 1-��, 2-�� � �.�.
    }
    removeChildrens(setupSimilarList);
    setupSimilarList.appendChild(fragment); // ��������� � �������� �������� �� ����� �����������
    setupSimilar.classList.remove('hidden');
  };
})();
