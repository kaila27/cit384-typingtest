const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var hund = 0;
var sec = 0;
var min = 0;
var displayHund = 0;
var displaySec = 0;
var displayMin = 0;
var time;
var timeInterval;
var userText = "";
var status = true;
var scores = [];
var x = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):

// Run a standard minute/second/hundredths timer:
function timer() {
  hund++;

  if (hund === 100) {
    hund = 0;
    sec++;
  }
  if (sec === 60) {
    sec = 0;
    min++;
  }

  //add the leadinng zeros
  if (hund < 10) {
    displayHund = "0" + hund.toString();
  } else {
    displayHund = hund;
  }

  if (sec < 10) {
    displaySec = "0" + sec.toString();
  } else {
    displaySec = sec;
  }

  if (min < 10) {
    displayMin = "0" + min.toString();
  } else {
    displayMin = min;
  }

  document.querySelector(".timer").innerHTML =
    displayMin + ":" + displaySec + ":" + displayHund;
}

// Match the text entered with the provided text on the page:
function matchText(words) {
  //checks input from text is acceptable
  if (
    (words.keyCode >= 48 && words.keyCode <= 90) ||
    (words.keyCode >= 97 && words.keyCode <= 122) ||
    words.keyCode == 32 ||
    (words.keyCode >= 186 && words.keyCode <= 192) ||
    (words.keyCode >= 219 && words.keyCode <= 222)
  ) {
    userText += words.key;
  }

  //deletes character if backspace is pressed and decreases check value
  if (words.keyCode == "08") {
    userText = userText.substring(0, userText.length - 1);
    x = userText.length;
  }

  if (userText == "") {
    document.querySelector(".test-wrapper").style.borderColor = "grey";
  }

  if (userText.localeCompare(originText) == 0) {
    document.querySelector("#test-area").value = originText;
    stopTimer();
    document.querySelector("#test-area").disables = true;
  }

  if (
    originText[x] == userText[x] &&
    originText[x] != "" &&
    originText[x] != null
  ) {
    document.querySelector(".test-wrapper").style.borderColor = "green";
    x = userText.length;
  } else if (
    (userText != "" && userText[x] != originText[x]) ||
    userText.length >= originText.length
  ) {
    document.querySelector(".test-wrapper").style.borderColor = "red";
  }

  //starts timer when user starts typing
  if (userText.length > 0 && userText.localeCompare(originText) != 0) {
    startTimer();
  }
}

// Start the timer:
function startTimer() {
  if (status) {
    timeInterval = setInterval(timer, 10);
    status = false;
  }
}

function stopTimer() {
  clearInterval(timeInterval);
  time = document.querySelector(".timer").innerHTML;
  scores.push(time);
  highScores();
}

function highScores() {
  scores.sort();
  if (scores[0] == null) {
    document.querySelector(".score1").innerHTML == null;
  } else {
    document.querySelector(".score1").innerHTML = scores[0];
  }

  if (scores[1] == null) {
    document.querySelector(".score2").innerHTML == null;
  } else {
    document.querySelector(".score2").innerHTML = scores[1];
  }

  if (scores[2] == null) {
    document.querySelector(".score3").innerHTML == null;
  } else {
    document.querySelector(".score3").innerHTML = scores[2];
  }
}

// Reset everything:
function reset() {
  userText = "";
  x = 0;
  timeInterval;
  status = true;
  time;
  sec = 0;
  min = 0;
  hund = 0;
  clearInterval(timeInterval);
  document.querySelector("#test-area").value = null;
  document.getElementById("#test-area").disables = false;
  document.querySelector(".test-wrapper").style.borderColor = "grey";
  document.querySelector(".timer").innerHTML = "00:00:00";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keydown", matchText);
resetButton.addEventListener("click", reset);
