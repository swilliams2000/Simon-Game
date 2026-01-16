$(document).one("keydown", startGame);

const colors = ["green", "red", "blue", "yellow"];
let gamePattern = []; // Stores the sequence the game generates
let userPattern = []; // Stores the sequence the user clicks
let level = 0; // Tracks the current level

function startGame() {
  level = 1;
  gamePattern = [];
  nextLevel();
}

function nextLevel() {
  userPattern = []; // reset user's input
  $("#level-title").text("Level " + level);

  // Add a new random color to the game pattern
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gamePattern.push(randomColor);

  // Show the sequence to the player
  playSequence();
}

function playSequence() {
  let i = 0;

  const interval = setInterval(() => {
    const color = gamePattern[i];

    // Flash the button
    $("#" + color)
      .animate({ opacity: 0.3 }, 200)
      .animate({ opacity: 1 }, 200);

    // Play the corresponding sound
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();

    i++;

    if (i >= gamePattern.length) {
      clearInterval(interval); // done showing sequence
    }
  }, 600); // 600ms between flashes
}

$(".btn").on("click", function () {
  const userColor = $(this).attr("id");
  userPattern.push(userColor);

  // Play sound & flash
  let sound = new Audio("sounds/" + userColor + ".mp3");
  sound.play();

  animatePress(userColor);

  // Check the user's input
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] !== gamePattern[currentIndex]) {
    gameOver();
    return;
  }

  // If user finished sequence correctly
  if (userPattern.length === gamePattern.length) {
    level++;
    setTimeout(() => {
      nextLevel();
    }, 1000); // short delay before next level
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => $("body").removeClass("game-over"), 200);

  let sound = new Audio("sounds/wrong.mp3");
  sound.play();

  $("#level-title").text("Game Over, Press Any Key to Restart");

  // Restart game on next key press
  $(document).one("keydown", startGame);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
