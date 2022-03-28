const progress = document.querySelector(".progress--done");
let profile = document.querySelector(".profile");
progress.style.width = progress.getAttribute("data-done") + "%";
progress.style.opacity = 1;
let indicator = document.querySelector(".progress--indicator");
indicator.innerHTML = "0%";

profile.addEventListener("click", (e) => {
  let current = progress.getAttribute("data-done");
  let incremented = parseInt(current) + 5;
  progress.setAttribute("data-done", incremented);
  console.log(incremented);
  progress.style.width = incremented + "%";
  document.querySelector(".progress--indicator").textContent =
    incremented + "%";
});
