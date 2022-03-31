function renderHabits() {
  let habits = document.querySelectorAll(".habit");
  habits.forEach((habit) => {
    let progress = habit.getElementsByClassName("progress--done")[0];

    // Getting daily counter using frequency (86400 seconds in 24 hrs)
    let currentTarget = habit.getAttribute("data-frequency");

    let indicator = progress.previousElementSibling;
    let overallProgress = habit.getElementsByClassName("progress--done")[1];
    let overallIndicator = overallProgress.previousElementSibling;

    renderExp();
    renderBar();
    renderExpIndicator();
    renderBarText();

    if (habit.getAttribute("completed") == true) {
      overallProgress.setAttribute("data-done", 1);
    } else {
      overallProgress.setAttribute("data-done", 0);
    }
    renderOverall();

    let incrementor = habit.firstElementChild.firstElementChild;
    let decrementor =
      habit.firstElementChild.firstElementChild.nextElementSibling;
    let deleteButton = habit.lastElementChild.lastElementChild;
    let deleteButtonTarget = document.querySelectorAll("#red--option");

    incrementor.addEventListener("click", async () => {
      try {
        if (habit.getAttribute("completed") == 'true') {
          return;
        }
        let current = progress.getAttribute("data-done");
        let resp = await updateHabitTimesDone(habit.id, "increment", localStorage.getItem('id'));
        if (resp.completed == true) {
          progress.setAttribute("data-done", resp.timesdone);
          overallProgress.setAttribute("data-done", 1);
          habit.setAttribute("completed", true);

          if (!habit.parentElement.classList.contains("habits--completed")) {
            habit.classList.add("appended");
          }
          document.querySelector(".habits--completed").append(habit);
          setTimeout(() => {
            habit.classList.remove("appended");
          }, 250);
          renderExpIndicator();
          renderExp();
          updateExpBar();
          renderBar();
          renderBarText();
          renderOverallTimeout();
        } else {
          let incremented = parseInt(current) + 1;
          progress.setAttribute("data-done", incremented);
          renderExpIndicator();
          renderExp();
          renderBar();
          renderBarText();
          updateExpBar();
        }
      } catch (error) {
        Alert("Error", error);
      }
    });
    decrementor.addEventListener("click", async () => {
      try {
        let current = progress.getAttribute("data-done");
        if (current == 0) {
          return;
        }
        let resp = await updateHabitTimesDone(habit.id, "decrement", localStorage.getItem('id'));
        if (habit.getAttribute("completed") == "true") {
          habit.setAttribute("completed", false);
          overallProgress.setAttribute("data-done", 0);

          if (habit.parentElement.classList.contains("habits--completed")) {
            habit.classList.add("appended");
          }
          document.querySelector(".habits--container").append(habit);
          setTimeout(() => {
            habit.classList.remove("appended");
          }, 250);

          renderOverallTimeout();
        }
        if (resp.timesdone == 0) {
          progress.setAttribute("data-done", resp.timesdone);
          renderExpIndicator();
          renderExp();
          renderBar();
          renderBarText();
          updateExpBar();
        } else {
          let incremented = parseInt(current) - 1;
          progress.setAttribute("data-done", incremented);
          renderExpIndicator();
          renderExp();
          renderBar();
          renderBarText();
          updateExpBar();
        }
      } catch (error) {
        Alert("Error", error);
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
        habit.classList.add("deleted");
        setTimeout(() => {
          habit.remove();
        }, 100);
      } else {
        alert("Error Removing");
      }
    });

    function renderBarText() {
      progress.style.opacity = 1;
      let currentValue = parseInt(progress.getAttribute("data-done"));

      progress.style.width =
        Math.floor((currentValue / currentTarget) * 100) + "%";
    }
    function renderOverall() {
      let percent = overallProgress.getAttribute("data-done") * 100;
      overallProgress.style.width = `${percent}%`;
      overallProgress.style.opacity = "100%";
      overallIndicator.innerHTML = `${percent}%`;
    }

    function renderOverallTimeout() {
      setTimeout(() => {
        let percent = overallProgress.getAttribute("data-done") * 100;
        overallProgress.style.width = `${percent}%`;
        overallProgress.style.opacity = "100%";
        overallIndicator.innerHTML = `${percent}%`;
      }, 100);
    }

    //this renders the text for the first value 'daily tracker'
    function renderExpIndicator() {
      let currentValue = parseInt(progress.getAttribute("data-done"));
      indicator.innerHTML = `${currentValue}/${currentTarget} (${Math.floor(
        (currentValue / currentTarget) * 100
      )}%)`;
    }
  });
}