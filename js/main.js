/*----- constants -----*/

/*----- app's state (variables) -----*/
let cpuClicks, userClicks, lastClick, counter, canClick, lightOn;
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

  }
});
GREEN.addEventListener("click", function(){
  if(canClick){

  }
});
YELLOW.addEventListener("click", function(){
  if(canClick){

  }
});
BLUE.addEventListener("click", function(){
  if(canClick){

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
      if(cpuClicks.length >= counter){
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
  counter = 5;
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