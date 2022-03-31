const progress = document.querySelector(".progress--done");
let profile = document.querySelector(".profile");
progress.style.width = progress.getAttribute("data-done") + "%";
progress.style.opacity = 1;
let indicator = document.querySelector(".progress--indicator");
let currentTarget = 100;
let currentValue = parseInt(progress.getAttribute("data-done"));
let otherValuesAggregate = 0;
let currentXp = 0;
let currentLevel = 1;

function updateExpBar() {
  let current = progress.getAttribute("data-done");
  let incremented = parseInt(current) + 5;
  progress.setAttribute("data-done", incremented);
  renderExp();
  renderBar();
};

async function renderBar() {
  let currentValue = parseInt(progress.getAttribute("data-done"));

  progress.style.width = Math.floor((currentValue / currentTarget) * 100) + "%";
}

async function renderExp() {
    await refreshXp();
    while (currentXp >= currentTarget) {
      //otherValuesAggregate += currentTarget;
      currentTarget = Math.ceil(currentTarget * 1.5);
      document.querySelector("#playerLevel").textContent = `Level: ${++currentLevel}`;
      progress.style.width = 0;
      return renderExp();
    }
    progress.setAttribute("data-done", Math.abs(currentXp));
    indicator.innerHTML = `EXP: ${currentXp}/${currentTarget} (${Math.floor(
      (currentXp / currentTarget) * 100
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
