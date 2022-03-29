const modalBtn = document.querySelector(".btn--log");
const modalClose = document.querySelector(".modal-close");
const modalSubmit = document.querySelector(".modal-submit");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const imageCont = document.querySelector(".image--container");
const profilePicture = document.querySelector("#profilePicture");

const imageData = [
  "./images/link.png",
  "./images/link2.png",
  "./images/zelda.png",
  "./images/zeldacdi.jpg",
];
let selectedImage = imageData[0];

modalBtn.addEventListener("click", toggleModal);

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
    image.src = imageData[i];
    image.classList.add("gif-image");
    image.id = i;
    image.addEventListener("click", (e) => {
      const children = document.querySelector(".modal--content").children;
      for (let item of children) {
        item.classList.remove("image--selected");
      }
      e.target.classList.add("image--selected");
      modalSubmit.style.display = "initial";
      selectedImage = image.src;
    });
    document.querySelector(".modal--content").append(image);
  }
}

if (imageCont) {
  imageCont.addEventListener("click", getTrending);
}

async function submitProfile() {
  profilePicture.src = await updateProfile(selectedImage);
  localStorage.setItem("image", selectedImage);
  toggleModal();
}

async function pageLoad() {
  //const pp = await getOne('users', localStorage.getItem('id')).profilepicture;
  //console.log(pp)
  //profilePicture.src = await getOne('users', localStorage.getItem('id')).profilepicture;
  //hacky fixes until doing it properly
  profilePicture.src = localStorage.getItem("image");
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
  <form action="" class="form--habit">
  <input
    type="text"
    class="form--control"
    placeholder="Habit Title"
  />
  <p class="errorText error--habit"></p>
  <input type="text" class="form--control" placeholder="Frequency - HH:MM:SS" />
  <p class="errorText error--time"></p>

  <select class="form--control" name="categories" id="categories">
    <option value="" disabled selected>Select Category</option>
    <option value="lifestyle">Lifestyle</option>
    <option value="fitness">Fitness</option>
    <option value="work">Work</option>
  </select>
  <input type="submit" value="Submit" />
</form>
`;
}

// Regex for time :^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$
