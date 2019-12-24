/*----- constants -----*/
const WIN = 3;
/*----- app's state (variables) -----*/
let cpuClicks, lastClick, numOfClicks, 
countClicks, canClick, lightOn, score, clickSound;
/*----- cached element references -----*/
const Body = document.querySelector("body");
const Red = document.getElementById("red");
const Green = document.getElementById("green");
const Yellow = document.getElementById("yellow");
const Blue = document.getElementById("blue");
const Start = document.querySelector("button");
const Score = document.querySelector("span");
const Play = document.getElementById("play");
const Modal = document.createElement("div");
const Button = document.createElement("button");
const P = document.createElement("p");
const ALLCOLORS = [Red, Green, Yellow, Blue];
const COLORSWITCH = {
  red: {
    on: "darkRed",
    off: "Red",
  },
  green: {
    on: "darkGreen",
    off: "Green",
  }, 
  yellow: {
    on: "peachpuff",
    off: "Yellow",
  }, 
  blue: {
    on: "darkBlue",
    off: "Blue",
  },
};
/*----- event listeners -----*/
Play.addEventListener("click", function(){
  Body.removeChild(modal);
});
Red.addEventListener("click", function(){
  if(canClick){
    lastClick = Red;
    canClick = false;
    userClick();
  }
});
Green.addEventListener("click", function(){
  if(canClick){
    lastClick = Green;
    canClick = false;
    userClick();
  }
});
Yellow.addEventListener("click", function(){
  if(canClick){
    lastClick = Yellow;
    canClick = false;
    userClick();
  }
});
Blue.addEventListener("click", function(){
  if(canClick){
    lastClick = Blue;
    canClick = false;
    userClick();
  }
});
Start.addEventListener("click", function(){
  Start.disabled = true;
  let intr = setInterval(function(){
    if(!lightOn) {
      lastClick = ALLCOLORS[Math.floor(Math.random()*4)];
      cpuClicks.push(lastClick);
      renderColor();
    } else {
      renderColor();
      if(cpuClicks.length >= numOfClicks){
        canClick = true;
        clearInterval(intr);
      }
    }
  }, 400);
});
Button.addEventListener("click", function(){
  Body.removeChild(Modal);
});
/*----- functions -----*/
function init(){
  Modal.id = "modal";
  cpuClicks = [];
  numOfClicks = 2;
  countClicks = 0;
  score = 0;
  canClick = false;
  lightOn = false;
  Start.disabled = false;
  Score.innerText = 0;
  clickSound = new sound("click.mp3");
}
init();

function renderColor(){
  if(lightOn){
    lastClick.style.backgroundColor = COLORSWITCH[lastClick.id].off;
    lightOn = false;
  } else {
    clickSound.play();
    lastClick.style.backgroundColor = COLORSWITCH[lastClick.id].on;
    lightOn = true;
  }
}
function renderScore(){
  Body.appendChild(Modal);
  P.innerHTML = `GOOD JOB<br>You scored ${score} out of 3`;
  Button.innerText = "Continue";
  Modal.appendChild(P);
  Modal.appendChild(Button);
  Score.innerText = score;
}
function renderLose(){
  Body.appendChild(Modal);
  P.textContent = "YOU LOSE";
  Button.innerText = "Try Again";
  Modal.appendChild(P);
  Modal.appendChild(Button);
  init();
}
function renderWin(){
  Body.appendChild(Modal);
  P.textContent = "YOU WIN";
  Button.innerText = "Play Again";
  Modal.appendChild(P);
  Modal.appendChild(Button);
  init();
}
function userClick(){
  let i = 0;
  setTimeout(function(){
    renderColor();
  }, 400);
  renderColor();
  canClick = true;
  if(cpuClicks[countClicks] == lastClick){
    countClicks++;
  } else {
    renderLose();
    return;
  }
  if(countClicks == cpuClicks.length){
    score++;
    if(score == WIN){
      renderWin();
    } else {
      renderScore();
      canClick = false;
      countClicks = 0;
      numOfClicks += 2;
      cpuClicks = [];
      Start.disabled = false;
    }
  }
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}