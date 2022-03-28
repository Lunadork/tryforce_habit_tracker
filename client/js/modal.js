let modalBtn = document.querySelector(".btn--log");
let modalClose = document.querySelector(".modal-close");
let modalBg = document.querySelector(".modal-bg");
modalBtn.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);

function toggleModal() {
  document.querySelector(".modal-bg").classList.toggle("bg-active");
}
