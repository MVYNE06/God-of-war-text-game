const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const gameDiv = document.getElementById("game");
const textElement = document.getElementById("text");
const choice1Btn = document.getElementById("choice1");
const choice2Btn = document.getElementById("choice2");
const restartBtn = document.getElementById("restart");
const bgMusic = document.getElementById("bg-music");

bgMusic.volume = 0.5;

const steps = {
  intro: {
    text: `The sky darkens with smoke. On the battlefield, Kratos, a Spartan general, stands bloodied and outnumbered.

The barbarian horde surrounds him, and defeat seems certain.

He tightens his grip on the Blades of Chaos.

"Is this how it ends?" he growls.`,
    choices: [
      { text: "Charge into the enemy line", next: "charge" },
      { text: "Defend and wait for an opening", next: "defend" }
    ]
  },
  charge: {
    text: `Kratos lets out a war cry and storms into the enemy ranks.

For a moment, he cuts through them with rage. But the numbers are too great. He is knocked to the ground.

Bleeding and beaten, Kratos looks to the sky.

"Ares... if you can hear me..."`,
    choices: [
      { text: "Call upon Ares", next: "ares" },
      { text: "Refuse", next: "refuse" }
    ]
  },
  defend: {
    text: `Kratos holds his ground, parrying strikes, but he is quickly surrounded.

His soldiers fall one by one. A blade pierces his side. He drops to his knees.

"No... not like this..."

He looks to the sky.

"Ares... hear me!"`,
    choices: [
      { text: "Call upon Ares", next: "ares" },
      { text: "Refuse", next: "refuse" }
    ]
  },
  ares: {
    text: `A crimson light fills the sky. Ares' voice thunders:

"Swear your loyalty, Spartan, and I shall give you the power to destroy your enemies."

Chains wrap around Kratos' arms. The Blades of Chaos burn into his skin.

He rises with newfound fury.

"I will have my revenge."

--- GAME OVER: The Ghost of Sparta is born ---`,
    choices: []
  },
  refuse: {
    text: `Kratos refuses to beg. He grips his blades one last time, but the barbarians overwhelm him.

As his vision fades, he whispers:
"Forgive me..."

--- GAME OVER: Kratos dies on the battlefield ---`,
    choices: []
  }
};

let currentStep = "intro";
let typingSpeed = 20;

function typeText(text, callback) {
  textElement.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    textElement.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, typingSpeed);
}

function showStep(stepName) {
  const step = steps[stepName];
  currentStep = stepName;

  choice1Btn.style.display = "none";
  choice2Btn.style.display = "none";
  restartBtn.style.display = "none";

  typeText(step.text, () => {
    if (step.choices.length === 2) {
      choice1Btn.textContent = step.choices[0].text;
      choice2Btn.textContent = step.choices[1].text;
      choice1Btn.style.display = "inline-block";
      choice2Btn.style.display = "inline-block";
    } else {
      restartBtn.style.display = "inline-block";
    }
  });
}

choice1Btn.addEventListener("click", () => {
  const nextStep = steps[currentStep].choices[0].next;
  showStep(nextStep);
});

choice2Btn.addEventListener("click", () => {
  const nextStep = steps[currentStep].choices[1].next;
  showStep(nextStep);
});

restartBtn.addEventListener("click", () => {
  bgMusic.currentTime = 0;
  showStep("intro");
});

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameDiv.style.display = "block";
  bgMusic.play().catch(err => {
    console.log("Autoplay blocked, user interaction required.");
  });
  showStep("intro");
});

