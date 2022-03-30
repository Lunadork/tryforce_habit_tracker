function renderHabits() {
  let habits = document.querySelectorAll(".habit");
  habits.forEach((habit) => {
    let progress = habit.getElementsByClassName("progress--done")[0];

    // Getting daily counter using frequency (86400 seconds in 24 hrs)
    let currentTarget = habit.getAttribute("data-frequency");

    let indicator = progress.previousElementSibling;
    let overallProgress = habit.getElementsByClassName("progress--done")[1];
    let overallIndicator = overallProgress.previousElementSibling;

    overallProgress.style.width = "100%";
    overallProgress.style.opacity = "100%";

    renderExp();
    renderBar();
    renderOverall();

    let incrementor = habit.firstElementChild.firstElementChild;
    let decrementor =
      habit.firstElementChild.firstElementChild.nextElementSibling;
    let deleteButton = habit.lastElementChild.lastElementChild;
    let deleteButtonTarget = document.querySelectorAll("#red--option");

    incrementor.addEventListener("click", async () => {
      try {
        let current = progress.getAttribute("data-done");
        let resp = await updateHabitTimesDone(habit.id, "increment");
        if (resp.completed == true) {
          console.log(resp.timesdone);
          progress.setAttribute("data-done", resp.timesdone);
          renderExp();
          renderBar();
        } else {
          console.log("undef", resp.timesdone);
          let incremented = parseInt(current) + 1;
          progress.setAttribute("data-done", incremented);
          renderExp();
          renderBar();
        }
      } catch (error) {
        Alert("Error", error);
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
      }
    });

    deleteButton.addEventListener("click", async (e) => {
      //prepare for vomit code
      let habitId;
      if (e.target.hasAttribute("habit")) {
        habitId = e.target.getAttribute("habit");
      } else if (e.target.parentNode.hasAttribute("habit")) {
        habitId = e.target.parentNode.getAttribute("habit");
      } else {
        habitId = e.target.parentNode.parentNode.getAttribute("habit");
      }
      let resp = await deleteHabit(habitId);
      if (resp.status == 204) {
        habit.remove();
      } else {
        alert("Error Removing");
      }
    });

    function renderBar() {
      progress.style.opacity = 1;
      let currentValue = parseInt(progress.getAttribute("data-done"));

      progress.style.width =
        Math.floor((currentValue / currentTarget) * 100) + "%";
    }
    function renderOverall() {
      overallIndicator.innerHTML = `100%`;
    }

    function renderExp() {
      let currentValue = parseInt(progress.getAttribute("data-done"));
      indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
        (currentValue / currentTarget) * 100
      )}%)`;
    }
  });
}
