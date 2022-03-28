let modalBtn = document.querySelector(".btn--log");
modalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  document.querySelector(".modal-bg").classList.add("bg-active");
}
