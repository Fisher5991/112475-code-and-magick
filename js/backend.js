'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var STATUS_OK_CODE = 200;

  var configure = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 15000;

    return xhr;
  };

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = configure(onSuccess, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    load: function (onSuccess, onError) {
      var xhr = configure(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    }
  };
})();
