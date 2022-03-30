const modalBtn = document.querySelector(".btn--log");
const modalClose = document.querySelector(".modal-close");
const modalSubmit = document.querySelector(".modal-submit");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const imageCont = document.querySelector(".image--container");
const profilePicture = document.querySelector("#profilePicture");

let imageData = [];
let selectedImage = 0;
const id = parseInt(localStorage.getItem("id"));

modalBtn ? modalBtn.addEventListener("click", toggleModal) : null;

modalClose.addEventListener("click", toggleModal);

modalSubmit.addEventListener("click", submitProfile);

function toggleModal() {
  document.querySelector(".modal-bg").classList.toggle("bg-active");
}

//code graveyard :(
//function getTrending() {
//  toggleModal();
//  fetch(
//    `https://api.giphy.com/v1/gifs/search?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&q=zelda&limit=25&offset=0&rating=g&lang=en`
//  )
//    .then((res) => {
//      return res.json();
//    })
//    .then(({ data }) => {
//      data.forEach((gif) => {
//        let image = document.createElement("img");
//        image.src = gif.images["fixed_height_small"].url;
//        image.classList.add("gif-image");
//        document.querySelector(".modal--content").append(image);
//      });
//    })
//    .catch((error) => {
//      alert("Error: ", error);
//    });
//}

function getTrending() {
  const modalHeader =
    document.querySelector(".modal--header").firstElementChild;
  document.querySelector(".modal--content").innerHTML = "";
  modalHeader.textContent = "Select Profile Picture";
  modalSubmit.style.display = "none";
  toggleModal();
  for (let i = 0; i < imageData.length; i++) {
    let image = document.createElement("img");
    image.src = `${window.location.protocol}//${window.location.host}/${imageData[i].src}`;
    image.classList.add("gif-image");
    image.id = i + 1;
    image.addEventListener("click", (e) => {
      modalSubmit.style.display = "initial";
      const children = document.querySelector(".modal--content").children;
      for (let item of children) {
        item.classList.remove("image--selected");
      }
      e.target.classList.add("image--selected");

      selectedImage = image.id;
    });
    document.querySelector(".modal--content").append(image);
  }
}

if (imageCont) {
  imageCont.addEventListener("click", getTrending);
}

async function submitProfile() {
  //yikes, you can totally spoof other users to change their profile pics
  profilePicture.src = await updateProfile(id, selectedImage);
  location.reload();
}

async function pageLoad() {
  imageData = await getAllPfps();
  const userData = await getOne("users", id);
  profilePicture.src = imageData.find((e) => e.id == userData.profilepic).src;
  document.querySelector("#playerName").textContent = userData.username;
}

pageLoad();

let add = document.querySelector(".btn--add");

add.addEventListener("click", toggleForm);

function toggleForm() {
  const modalHeader =
    document.querySelector(".modal--header").firstElementChild;

  toggleModal();
  modalSubmit.style.display = "none";
  modalHeader.textContent = "Add a Habit";
  document.querySelector(".modal--content").innerHTML = `
  <form class="form--habit">
    <input type="text" class="form--control" placeholder="Habit Title" name="title" id="newHabitTitle" />
    <p class="errorText error--habit"></p>
    <input type="number" class="form--control" name="frequency" id="newHabitFrequency" placeholder="Frequency" />
    <p class="errorText error--time"></p>

    <select class="form--control" name="categories" required id="newHabitCategories">
      <option value="" disabled selected>Select Category</option>
      <option value="lifestyle">Lifestyle</option>
      <option value="fitness">Fitness</option>
      <option value="work">Work</option>
    </select>
    <input type="submit" value="Submit" id="newHabitSubmit" />
  </form>
`;
  let newHabitSubmit = document.querySelector("#newHabitSubmit");
  newHabitSubmit.addEventListener("click", async (e) => {
    const newHabitTitle = document.querySelector("#newHabitTitle");
    const newHabitFrequency = document.querySelector("#newHabitFrequency");
    const newHabitCategories = document.querySelector("#newHabitCategories");
    let result = await createHabit(
      newHabitTitle.value,
      newHabitFrequency.value,
      newHabitCategories.value,
      id
    );
    if (result.success) {
      location.reload();
    } else {
      switch (result.error) {
        case "invalid format":
          break;
      }
    }
  });
}

// Regex for time :^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$
