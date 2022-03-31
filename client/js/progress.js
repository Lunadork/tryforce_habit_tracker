const progress = document.querySelector(".progress--done");
console.log(progress);
let profile = document.querySelector(".profile");
progress.style.opacity = 1;
let indicator = document.querySelector(".progress--indicator");
let currentTarget = 100;
let previousTarget = 0;
let currentXp = 0;
let currentLevel;

function updateExpBar() {
  renderExp();
  renderBar();
}

async function renderBar() {
  console.log(currentXp, currentTarget);
  progress.style.width = Math.floor((currentXp / currentTarget) * 100) + "%";
  indicator.textContent = `EXP: ${currentXp}/${currentTarget} (${Math.floor(
    (currentXp / currentTarget) * 100
  )}%)`;
}

async function renderExp() {
  await refreshXp();
  // while (currentXp >= currentTarget) {
  //   previousTarget = currentTarget;
  //   currentTarget = Math.ceil(currentTarget * 1.5);
  //   document.querySelector(
  //     "#playerLevel"
  //   ).textContent = `Level: ${++currentLevel}`;
  //   renderBar();
  //   return renderExp();
  // }
  // while (currentXp <= previousTarget) {
  //   currentTarget = previousTarget;
  //   previousTarget = Math.ceil(currentTarget / 1.5);
  //   document.querySelector(
  //     "#playerLevel"
  //   ).textContent = `Level: ${--currentLevel}`;
  //   return renderExp();
  // }
  // indicator.innerHTML = `EXP: ${currentXp}/${currentTarget} (${Math.floor(
  //   ((currentXp - previousTarget) / (currentTarget - previousTarget)) * 100
  // )}%)`;
  renderBar();
}

async function refreshXp() {
  const userData = await getOne("users", localStorage.getItem("id"));
  if (
    userData.level >
    parseInt(document.querySelector("#playerLevel").textContent)
  ) {
    Toast.show("Levelled Up");
  }
  currentXp = userData.xp;
  currentTarget = userData.xptarget;
  document.querySelector(
    "#playerRupees"
  ).textContent = `Rupees: ${userData.rupees}`;
  document.querySelector("#playerLevel").textContent = `${userData.level}`;
}

renderExp();

document.querySelector(".btn--logOut").addEventListener("click", () => {
  document.location.href = "index.html";
});
