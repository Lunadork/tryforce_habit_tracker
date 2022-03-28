const progress = document.querySelector(".progress--done");
let profile = document.querySelector(".profile");
progress.style.width = progress.getAttribute("data-done") + "%";
progress.style.opacity = 1;
let indicator = document.querySelector(".progress--indicator");
let currentTarget = 100;
let currentValue = parseInt(progress.getAttribute("data-done"));

profile.addEventListener("click", (e) => {
  let current = progress.getAttribute("data-done");
  let incremented = parseInt(current) + 5;
  progress.setAttribute("data-done", incremented);
  renderExp();
  renderBar();
});

function renderBar() {
  let currentValue = parseInt(progress.getAttribute("data-done"));

  progress.style.width = Math.floor((currentValue / currentTarget) * 100) + "%";
}

function renderExp() {
  let currentValue = parseInt(progress.getAttribute("data-done"));
  if (currentValue > currentTarget) {
    progress.setAttribute("data-done", 0);
    currentTarget = currentTarget * 1.5;
    progress.style.width = 0;
    return renderExp();
  }
  indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
    (currentValue / currentTarget) * 100
  )}%)`;
}

renderExp();

document.querySelector(".btn--log").addEventListener("click", () => {
  document.location.href = "index.html";
});
