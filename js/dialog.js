'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.style.top = setupPrimaryCoords.x;
    setup.style.left = setupPrimaryCoords.y;
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (setupUserName !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var setupPrimaryCoords = {
    x: setup.style.top,
    y: setup.style.left
  };

  var dialogHandle = setup.querySelector('.setup-user-pic');
  dialogHandle.style.zIndex = 1;

  var onDialogMouseDown = function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onDialogMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onDialogMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDialogMouseMove);
      document.removeEventListener('mouseup', onDialogMouseUp);
    };

    document.addEventListener('mousemove', onDialogMouseMove);
    document.addEventListener('mouseup', onDialogMouseUp);
  };

  dialogHandle.addEventListener('mousedown', onDialogMouseDown);
})();
