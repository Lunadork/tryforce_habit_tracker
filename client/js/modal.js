const modalBtn = document.querySelector(".btn--log");
const modalClose = document.querySelector(".modal-close");
const modalSubmit = document.querySelector(".modal-submit");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const imageCont = document.querySelector(".image--container");
const profilePicture = document.querySelector("#profilePicture");

let imageData = [];
let selectedImage = 0;
const id = parseInt(localStorage.getItem('id'));

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
  document.querySelector(".modal--content").innerHTML = "";
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
  const userData = await getOne('users', id);
  profilePicture.src = imageData.find(e => e.id == userData.profilepic).src;
}

pageLoad();
