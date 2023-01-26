var canv = document.getElementById("gameCanvas"),
  alertBoxContent = document.getElementById("alertBoxContent"),
  c = canv.getContext("2d");
var pressedKeys = {},
  KEYS = {
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    // SPACE: 32
  };
const TWO_PI = 2 * Math.PI;
function normalizeRot(rot) {
  // converts angle to its equivalent from interval [-pi; pi]
  return rot - TWO_PI * Math.floor((rot + Math.PI) / TWO_PI);
}

document.onkeydown = function (e) {
  pressedKeys[e.keyCode] = true;
};
document.onkeyup = function (e) {
  pressedKeys[e.keyCode] = false;
};
var tank = {
  x: 25, // rotate origin (centre)
  y: parseInt(400 * Math.random()),
  w: 31,
  h: 23,
  rot: 0,
  speed: 1,
  rSpeed: Math.PI / 90,
};
var otherTank = [];
(tankFi = Math.atan(tank.h / tank.w)),
  (tankDg = Math.sqrt(tank.w * tank.w + tank.h * tank.h) / 2); // half the diagonal

function getTankSkeletonPolygon() {
  var rotMinusFi = tank.rot - tankFi,
    rotPlusFi = tank.rot + tankFi;
  return {
    x: tank.x,
    y: tank.y,
    points: [
      {
        x: Math.cos(rotMinusFi) * tankDg,
        y: Math.sin(rotMinusFi) * tankDg,
      },
      {
        x: Math.cos(rotPlusFi) * tankDg,
        y: Math.sin(rotPlusFi) * tankDg,
      },
      {
        x: Math.cos(rotMinusFi + Math.PI) * tankDg,
        y: Math.sin(rotMinusFi + Math.PI) * tankDg,
      },
      {
        x: Math.cos(rotPlusFi + Math.PI) * tankDg,
        y: Math.sin(rotPlusFi + Math.PI) * tankDg,
      },
    ],
  };
}

function drawTankSkeleton() {
  var skPoly = getTankSkeletonPolygon();
  c.beginPath();
  for (var i = 0, plen = skPoly.points.length; i < plen; i++) {
    var pFunc = i === 0 ? c.moveTo : c.lineTo;
    pFunc.call(c, skPoly.x + skPoly.points[i].x, skPoly.y + skPoly.points[i].y);
  }
  c.closePath();
  c.strokeStyle = "#000";
  c.fillStyle = "#0062b6";
  c.stroke();
  c.fill();
}

function drawTank() {
  drawTankSkeleton();
}

var gameRunning = true;
function gameCycle() {
  c.clearRect(0, 0, canv.width, canv.height);
  // if(pressedKeys[KEYS.ARROW_LEFT] || pressedKeys[KEYS.ARROW_RIGHT]) {
  // 	var dir = (pressedKeys[KEYS.ARROW_LEFT]) ? -1 : 1;
  // }
  if (pressedKeys[KEYS.ARROW_UP] || pressedKeys[KEYS.ARROW_DOWN]) {
    var dir = pressedKeys[KEYS.ARROW_DOWN] ? -1 : 1;
    tank.x += tank.speed * dir * Math.cos(tank.rot);
    tank.y += tank.speed * dir * Math.sin(tank.rot);
  }
  drawTank();
  if (gameRunning) window.requestAnimationFrame(gameCycle);
}
gameCycle();
