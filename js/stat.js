'use strict';

var textColor = '#000000';
var histogramHeight = 150;
var barWidth = 40;
var indent = 50 + barWidth;
var initialX = 140;
var initialY = 100;
var lineHeight = 10;

var getMaxElement = function (arr) {
  var max = -1;

  for (var i = 0; i < arr.length; i++) {
    var time = arr[i];
    if (time > max) {
      max = time;
    }
  }
  return max;
};

var drawHistogram = function (i, ctx, names, times) {
  var step = histogramHeight / (getMaxElement(times));
  ctx.fillStyle = textColor;
  ctx.fillText(names[i], initialX + indent * i, 270);
  ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY + (histogramHeight - times[i] * step) - lineHeight);
  ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + generateOpacity(0.1, 0.9) + ')';
  ctx.fillRect(initialX + indent * i, initialY + (histogramHeight - times[i] * step), barWidth, times[i] * step);
};

var drawHistograms = function (ctx, names, times) {
  for (var i = 0; i < times.length; i++) {
    drawHistogram(i, ctx, names, times);
  }
}

var generateOpacity = function (minNumber, maxNumber) {
  return Math.random() * (maxNumber - minNumber) + minNumber;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#ffffff';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = textColor;
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  drawHistograms(ctx, names, times);
};
