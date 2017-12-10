'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupUserName = setup.querySelector('.setup-user-name');

  window.validation = function () {
    setupUserName.addEventListener('input', function (evt) {
      if (evt.target.value.length < 2) {
        evt.target.setCustomValidity('Имя должно состоять не менее чем из 2-х символов');
      } else {
        evt.target.setCustomValidity('');
      }
    });
  }
})();