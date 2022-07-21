var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//Start game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Click button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Next level
function nextSequence() {
  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosesColour = buttonColours[randomNumber];
  gamePattern.push(randomChosesColour);
  $("#" +randomChosesColour ).fadeOut(100).fadeIn(100);
  playSound(randomChosesColour);
}

//Button pressed sound
function playSound (name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//Button pressed animation
function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Check answer
function checkAnswer (currentLevel) {
  //Check that the current element of the user array is equal to the game array
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("succes");
      //Check that the length of the game array is equal to the length of the user array
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
        nextSequence();
        }, 1000);
      }
    }
    else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

//Start Over
function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
