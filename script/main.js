const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove()
  }, 500)
}

window.addEventListener("load", () => {
  createBalloons(30)
});
// age calc
function calculateAge(birthDateTime) {
  const now = new Date();
  const birth = new Date(birthDateTime);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  let hours = now.getHours() - birth.getHours();
  let minutes = now.getMinutes() - birth.getMinutes();
  let seconds = now.getSeconds() - birth.getSeconds();

  // Adjust time differences
  if (seconds < 0) {
    minutes -= 1;
    seconds += 60;
  }
  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  if (hours < 0) {
    days -= 1;
    hours += 24;
  }
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Days in the previous month
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

function getNextBirthDateTime(birthDateTime) {
  const now = new Date();
  const birth = new Date(birthDateTime);
  let nextBirth = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes(), birth.getSeconds());

  // If the birthday this year has passed, calculate for the next year
  if (nextBirth < now) {
    nextBirth = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes(), birth.getSeconds());
  }

  const timeDiff = nextBirth - now;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function displayCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateAgeAndTime() {
  const birthDateTime = "2000-01-26T06:44:00"; // Replace with your birth date and time (YYYY-MM-DDTHH:MM:SS)
  const age = calculateAge(birthDateTime);

  const now = new Date();
  const birth = new Date(birthDateTime);
  const isSameDate = now.getDate() === birth.getDate() && now.getMonth() === birth.getMonth();

  const wishMessage = document.getElementById("wishMessage");
  const result = document.getElementById("result");
  const timeDisplay = document.getElementById("time");

  if (isSameDate) {
    wishMessage.innerText = "Happy Birthday Priti!";
  } else {
    const nextBirthday = getNextBirthDateTime(birthDateTime);
    wishMessage.innerText = `Your next birthday is in ${nextBirthday.days} days, ${nextBirthday.hours} hours, ${nextBirthday.minutes} minutes, and ${nextBirthday.seconds} seconds.`;
  }

  result.innerText = `
    You are ${age.years} years, ${age.months} months, ${age.days} days, ${age.hours} hours, ${age.minutes} minutes, and ${age.seconds} seconds old.
  `;

  timeDisplay.innerText = `Current Time: ${displayCurrentTime()}`;
}

// Update age and time every second
setInterval(updateAgeAndTime, 1000);