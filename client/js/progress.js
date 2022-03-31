const progress = document.querySelector(".progress--done");
let profile = document.querySelector(".profile");
progress.style.opacity = 1;
let indicator = document.querySelector(".progress--indicator");
let currentTarget = 100;
let previousTarget = 0;
let currentXp = 0;
let currentLevel = 1;

function updateExpBar() {
  renderExp();
  renderBar();
};

async function renderBar() {
  progress.style.width = Math.floor(((currentXp - previousTarget) / (currentTarget - previousTarget)) * 100) + "%";
}

async function renderExp() {
    await refreshXp();
    while (currentXp >= currentTarget) {
      previousTarget = currentTarget;
      currentTarget = Math.ceil(currentTarget * 1.5);
      document.querySelector("#playerLevel").textContent = `Level: ${++currentLevel}`;
      progress.style.width = 0;
      return renderExp();
    }
    indicator.innerHTML = `EXP: ${currentXp}/${currentTarget} (${Math.floor(
      ((currentXp - previousTarget) / (currentTarget - previousTarget)) * 100
    )}%)`;
    renderBar();
  }

async function refreshXp() {
  const userData = await getOne('users', localStorage.getItem('id'));
  currentXp = userData.xp;
}

renderExp();

document.querySelector(".btn--logOut").addEventListener("click", () => {
  document.location.href = "index.html";
});
