/*----- constants -----*/

/*----- app's state (variables) -----*/
let cpuClicks, userClicks, lastClick, numOfClicks, countClicks, canClick, lightOn;
/*----- cached element references -----*/
const Body = document.querySelector("body");
const Red = document.getElementById("red");
const Green = document.getElementById("green");
const Yellow = document.getElementById("yellow");
const Blue = document.getElementById("blue");
const Start = document.querySelector("button");
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
Red.addEventListener("click", function(){
  if(canClick){
    lastClick = Red;
    userClick();
  }
});
Green.addEventListener("click", function(){
  if(canClick){
    lastClick = Green;
    userClick();
  }
});
Yellow.addEventListener("click", function(){
  if(canClick){
    lastClick = Yellow;
    userClick();
  }
});
Blue.addEventListener("click", function(){
  if(canClick){
    lastClick = Blue;
    userClick();
  }
});
Start.addEventListener("click", function(){
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
  }, 500);
});
Button.addEventListener("click", function(){
  init();
  Body.removeChild(Modal);
});
/*----- functions -----*/
function init(){
  userClicks = [];
  cpuClicks = [];
  numOfClicks = 5;
  countClicks = 0;
  canClick = false;
  lightOn = false;
}
init();

function renderColor(){
  if(lightOn){
    lastClick.style.backgroundColor = COLORSWITCH[lastClick.id].off;
    lightOn = false;
  } else {
    lastClick.style.backgroundColor = COLORSWITCH[lastClick.id].on;
    lightOn = true;
  }
}
function renderLose(){
  Modal.id = "modal";
  Body.appendChild(Modal);
  P.textContent = "YOU LOSE";
  Button.innerText = "Try Again";
  Modal.appendChild(P);
  Modal.appendChild(Button);
}
function userClick(){
  let i = 0;
  let intr = setInterval(function(){
    renderColor();
    if(i == 1){
      clearInterval(intr);
    }
    i++;
  }, 500);
  if(cpuClicks[countClicks] == lastClick){
    countClicks++;
  } else {
    renderLose();
  }
  if(countClicks == cpuClicks.length){
    canClick = false;
    countClicks = 0;
    cpuClicks = [];
  }
}