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
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // Adjust months and years if needed
  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in the previous month
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function getNextBirthday(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

  // If the birthday this year has passed, calculate for the next year
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }

  const timeDiff = nextBirthday - today;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30); // Approximation
  const remainingDays = days % 30;

  return { months, days: remainingDays };
}

// Predefined birth date
const birthDate = "1998-01-19"; // Replace with your birth date (YYYY-MM-DD)
const age = calculateAge(birthDate);

// Check if today is the birthday
const today = new Date();
const birth = new Date(birthDate);
const isBirthday = today.getDate() === birth.getDate() && today.getMonth() === birth.getMonth();

const wishMessage = document.getElementById("wishMessage");
const result = document.getElementById("result");

if (isBirthday) {
  wishMessage.innerText = "Happy Birthday Shivam!";
} else {
  const nextBirthday = getNextBirthday(birthDate);
  wishMessage.innerText = `Your next birthday is in ${nextBirthday.months} months and ${nextBirthday.days} days.`;
}

result.innerText = 
  `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;