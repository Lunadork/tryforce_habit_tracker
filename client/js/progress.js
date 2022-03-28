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
  progress.style.width = incremented + "%";
  renderExp();
});

function renderExp() {
  let currentValue = parseInt(progress.getAttribute("data-done"));
  if (currentValue > currentTarget) {
    return alert("Over Target!");
  }
  indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
    (currentValue / currentTarget) * 100
  )}%)`;
  console.log(currentValue);
}

renderExp();
