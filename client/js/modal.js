let modalBtn = document.querySelector(".btn--log");
let modalClose = document.querySelector(".modal-close");
let modalBg = document.querySelector(".modal-bg");
let modal = document.querySelector(".modal");
let imageCont = document.querySelector(".image--container");

const imageData = ["/images/link.png", "/images/link2.png", "/images/zelda.png"];

modalBtn.addEventListener("click", toggleModal);

modalClose.addEventListener("click", toggleModal);

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
  document.querySelector(".modal--content").innerHTML = '';
  document.querySelector(".modal-submit").style.display = "none";
  toggleModal();
  for (let i = 0; i < imageData.length; i++) {
    let image = document.createElement("img");
    image.src = imageData[i];
    image.classList.add("gif-image");
    image.id = i;
    image.addEventListener('click', e => {
      const children = document.querySelector(".modal--content").children;
      for (let item of children) {
        item.classList.remove("image--selected");
      }
      e.target.classList.add("image--selected");
      document.querySelector(".modal-submit").style.display = "initial";
    });
    document.querySelector(".modal--content").append(image);
  }
}

if (imageCont) {
  imageCont.addEventListener("click", getTrending);
}
