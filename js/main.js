/*----- constants -----*/

/*----- app's state (variables) -----*/
let cpuClicks, userClicks, lastClick, numOfClicks, countClicks, canClick, lightOn;
/*----- cached element references -----*/
const RED = document.getElementById("red");
const GREEN = document.getElementById("green");
const YELLOW = document.getElementById("yellow");
const BLUE = document.getElementById("blue");
const START = document.querySelector("button");
const ALLCOLORS = [RED, GREEN, YELLOW, BLUE];
const COLORSWITCH = {
  red: {
    on: "darkred",
    off: "red",
  },
  green: {
    on: "darkgreen",
    off: "green",
  }, 
  yellow: {
    on: "peachpuff",
    off: "yellow",
  }, 
  blue: {
    on: "darkblue",
    off: "blue",
  },
};
/*----- event listeners -----*/
RED.addEventListener("click", function(){
  if(canClick){
    lastClick = RED;
    userClick();
  }
});
GREEN.addEventListener("click", function(){
  if(canClick){
    lastClick = GREEN;
    userClick();
  }
});
YELLOW.addEventListener("click", function(){
  if(canClick){
    lastClick = YELLOW;
    userClick();
  }
});
BLUE.addEventListener("click", function(){
  if(canClick){
    lastClick = BLUE;
    userClick();
  }
});
START.addEventListener("click", function(){
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
    console.log("You lose");
    init();
  }
  if(countClicks == cpuClicks.length){
    canClick = false;
    countClicks = 0;
    cpuClicks = [];
  }
}