/*----- constants -----*/

/*----- app's state (variables) -----*/
let cpuClicks, userClicks, counter, canClick, lightOn;
/*----- cached element references -----*/
const RED = document.querySelector(".red");
const GREEN = document.querySelector(".green");
const YELLOW = document.querySelector(".yellow");
const BLUE = document.querySelector(".blue");
const START = document.querySelector("button");
const COLORS = [RED, GREEN, YELLOW, BLUE];
/*----- event listeners -----*/
RED.addEventListener("click", function(){
  if (canClick) {
    userClicks.push(RED);
  } else {
    RED.style.backgroundColor = "darkred";
    setTimeout(function(){
      RED.style.backgroundColor = "red";
    }, 1000);
  }
});
GREEN.addEventListener("click", function(){
  if (canClick) {
    userClicks.push(GREEN);
  } else {
    GREEN.style.backgroundColor = "darkgreen";
    setTimeout(function(){
      GREEN.style.backgroundColor = "green";
    }, 1000);
  }
});
YELLOW.addEventListener("click", function(){
  if (canClick) {
    userClicks.push(YELLOW);
  } else {
    YELLOW.style.backgroundColor = "peachpuff";
    setTimeout(function(){
      YELLOW.style.backgroundColor = "yellow";
    }, 1000);
  }
});
BLUE.addEventListener("click", function(){
  if (canClick) {
    userClicks.push(BLUE);
  } else if (lightOn) {
    BLUE.style.backgroundColor = "blue";
    lightOn = false;
    cpuClicks
  } else {
    BLUE.style.backgroundColor = "darkblue";
    lightOn = true;
  }
});
START.addEventListener("click", function(){
  canClick = false;
  lightOn = false;
  let intr = setInterval(function(){
      let randomColor = COLORS[Math.floor(Math.random()*4)];
        cpuClicks.push(randomColor);
      randomColor.click();
      if(cpuClicks.length >= counter){
        canClick = true;
        clearInterval(intr);
      }
    }, 1000);
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

function renderLight(){
  
}