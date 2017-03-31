'use strict';

const canvas = document.getElementsByTagName('canvas')[0],
    context = canvas.getContext('2d');

const wheelsCenter = { x: 100, y: 300 };

context.fillStyle = 'rgb(144, 202, 215)';
context.strokeStyle = 'rgb(51, 126, 145)';
context.lineWidth = 3;

// drawing back wheel of the bike
context.beginPath();
context.arc(wheelsCenter.x, wheelsCenter.y, 50, 0, 2 * Math.PI);
context.fill();
context.stroke();

context.beginPath();
context.moveTo(wheelsCenter.x, wheelsCenter.y);
context.lineTo(wheelsCenter.x + 150, wheelsCenter.y);
context.lineTo(wheelsCenter.x + 250, wheelsCenter.y - 80);
context.lineTo(wheelsCenter.x + 100, wheelsCenter.y - 80);
context.closePath();
context.stroke();

context.beginPath();
context.arc(wheelsCenter.x + 150, wheelsCenter.y, 20, 0, Math.PI * 2);
context.stroke();

context.beginPath();
context.arc(wheelsCenter.x + 150, wheelsCenter.y, 20, 0, 210 * Math.PI / 180);
context.lineTo(wheelsCenter.x + 110, wheelsCenter.y - 30);
context.stroke();

context.beginPath();
context.arc(wheelsCenter.x + 150, wheelsCenter.y, 20, 0, 45 * Math.PI / 180);
context.lineTo(wheelsCenter.x + 180, wheelsCenter.y + 33);
context.stroke();

context.beginPath();
context.moveTo(wheelsCenter.x + 150, wheelsCenter.y);
context.lineTo(wheelsCenter.x + 70, wheelsCenter.y - 100);
context.lineTo(wheelsCenter.x + 70, wheelsCenter.y - 100);
context.lineTo(wheelsCenter.x + 90, wheelsCenter.y - 100);
context.moveTo(wheelsCenter.x + 70, wheelsCenter.y - 100);
context.lineTo(wheelsCenter.x + 50, wheelsCenter.y - 100);
context.stroke();

context.beginPath();
context.arc(wheelsCenter.x + 270, wheelsCenter.y, 50, 0, 2 * Math.PI);
context.fill();
context.stroke();

context.beginPath();
context.moveTo(wheelsCenter.x + 270, wheelsCenter.y);
context.lineTo(wheelsCenter.x + 247, wheelsCenter.y - 120);
context.lineTo(wheelsCenter.x + 200, wheelsCenter.y - 110);
context.moveTo(wheelsCenter.x + 247, wheelsCenter.y - 120);
context.lineTo(wheelsCenter.x + 257, wheelsCenter.y - 160);
context.stroke();