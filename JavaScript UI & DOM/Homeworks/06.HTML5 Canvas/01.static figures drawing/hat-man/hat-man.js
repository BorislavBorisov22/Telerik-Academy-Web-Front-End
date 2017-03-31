'use strict';

const canvas = document.getElementsByTagName('canvas')[0],
    context = canvas.getContext('2d');

context.lineWidth = 3;

// drawing the mans head contour
context.beginPath();
context.fillStyle = 'rgb(144, 202, 215)';
context.strokeStyle = 'rgb(34, 84, 95)';
context.arc(300, 300, 100, 328 * Math.PI / 180, 213 * Math.PI / 180);
context.fill();
context.stroke();

// drawing left eye of the man
context.fillStyle = context.strokeStyle;
context.beginPath();
context.ellipse(250, 290, 20, 15, 0, 0, 2 * Math.PI);
context.stroke();

context.beginPath();
context.ellipse(240, 290, 5, 10, 3, 0, 2 * Math.PI);
context.fill();
context.stroke();

// drawing the right eye of the man
context.fillStyle = context.strokeStyle;
context.beginPath();
context.ellipse(330, 290, 20, 15, 0, 0, 2 * Math.PI);
context.stroke();

context.beginPath();
context.ellipse(320, 290, 5, 10, 3, 0, 2 * Math.PI);
context.fill();
context.stroke();

// drawing the nose of the man
context.beginPath();
context.moveTo(270, 340);
context.lineTo(305, 340);
context.moveTo(270, 340);
context.lineTo(290, 290);
context.stroke();

// drawing the mouth of the man
context.beginPath();
context.ellipse(280, 370, 35, 15, 10 * Math.PI / 180, 0, 2 * Math.PI);
context.stroke();

// drawing the hat of the hat man :)
context.fillStyle = 'rgb(57, 102, 147)';
context.strokeStyle = context.fillStyle;

// filling up the top of the hat with a blue color
context.beginPath();
context.moveTo(360, 75);
context.lineTo(360, 220);
context.lineTo(240, 220);
context.closePath();
context.fill();
context.stroke();

context.strokeStyle = 'black';

context.save();

// drawing the bottom ellipse of the hat
context.beginPath();
context.scale(1, 0.5);
context.arc(300, 440, 100, 307 * Math.PI / 180, 232 * Math.PI / 180);
context.fill();
context.stroke();

context.restore();

context.save();

// drawing top of the hat ellipse
context.beginPath();
context.scale(1, 0.5);
context.arc(300, 150, 60, 0, 2 * Math.PI);
context.fill();
context.stroke();

context.restore();

// drawing right side of the hat
context.beginPath();
context.moveTo(360, 75);
context.lineTo(360, 220);
context.fill();
context.stroke();

context.save();

// drawing left side of the hat
context.beginPath();
context.scale(1, 0.5);
context.arc(300, 150, 60, 0, Math.PI);

context.restore();

context.lineTo(240, 220);
context.fill();
context.stroke();

// drawing the small curve between the
context.beginPath();
context.moveTo(240, 220);
context.quadraticCurveTo(300, 260, 360, 220);
context.fill();
context.stroke();

// drawing the mans head

context.restore();