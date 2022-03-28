let modalBtn = document.querySelector(".btn--log");
let modalClose = document.querySelector(".modal-close");
let modalBg = document.querySelector(".modal-bg");
let modal = document.querySelector(".modal");
let imageCont = document.querySelector(".image--container");

modalBtn.addEventListener("click", toggleModal);

modalClose.addEventListener("click", toggleModal);

function toggleModal() {
  document.querySelector(".modal-bg").classList.toggle("bg-active");
}

imageCont.addEventListener("click", getTrending);
function getTrending() {
  toggleModal();
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=8PiyixOfCPFFExgTLW5347Y8xbuMoYGk&q=zelda&limit=25&offset=0&rating=g&lang=en`
  )
    .then((res) => {
      return res.json();
    })
    .then(({ data }) => {
      data.forEach((gif) => {
        let image = document.createElement("img");
        image.src = gif.images["fixed_height_small"].url;
        image.classList.add("gif-image");
        document.querySelector(".modal--content").append(image);
      });
    })
    .catch((error) => {
      alert("Error: ", error);
    });
}
