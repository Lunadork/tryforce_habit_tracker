let habits = document.querySelectorAll(".habit");
habits.forEach((habit) => {
  let progress = habit.getElementsByClassName("progress--done")[0];
  let currentTarget = 2;
  let indicator = progress.previousElementSibling;

  renderExp();
  let incrementor = habit.firstElementChild.firstElementChild;
  let decrementor =
    habit.firstElementChild.firstElementChild.nextElementSibling;
  let deleteButton = habit.lastElementChild.lastElementChild;
  progress.style.width = progress.getAttribute("data-done") + "%";
  progress.style.opacity = 1;
  let currentValue = parseInt(progress.getAttribute("data-done"));

  incrementor.addEventListener("click", () => {
    let current = progress.getAttribute("data-done");
    if (current == currentTarget) {
      renderExp();
      renderBar();
    } else {
      let incremented = parseInt(current) + 1;
      progress.setAttribute("data-done", incremented);
      renderExp();
      renderBar();

      console.log(progress, indicator);
    }
  });
  decrementor.addEventListener("click", () => {
    let current = progress.getAttribute("data-done");
    if (current == 0) {
      renderExp();
      renderBar();
    } else {
      let incremented = parseInt(current) - 1;
      progress.setAttribute("data-done", incremented);
      renderExp();
      renderBar();

      console.log(progress, indicator);
    }
  });

  function renderBar() {
    let currentValue = parseInt(progress.getAttribute("data-done"));

    progress.style.width =
      Math.floor((currentValue / currentTarget) * 100) + "%";
  }

  function renderExp() {
    let currentValue = parseInt(progress.getAttribute("data-done"));
    if (currentValue == currentTarget) {
      console.log(currentValue, currentTarget);
      //   currentTarget = Math.ceil(currentTarget * 1.5);
      //   progress.style.width = 0;
      return (indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
        (currentValue / currentTarget) * 100
      )}%)`);
    }
    indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
      (currentValue / currentTarget) * 100
    )}%)`;
  }
});
