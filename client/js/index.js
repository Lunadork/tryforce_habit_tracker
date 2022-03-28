let register = document.querySelector(".form--register");

register.addEventListener("submit", handleRegister);

function handleRegister(e) {
  e.preventDefault();
  errorHandler(e);
  let data = {
    userName: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
  };
  console.log(data);
}

function errorHandler(e) {
  let username = e.target[0];
  let email = e.target[1];
  let password = e.target[2];
  let confirm = e.target[3];

  if (password.value.length < 8) {
    password.style.border = "3px solid tomato";
    password.nextElementSibling.innerHTML =
      "Password must be atleast 8 characters!";
  }

  if (confirm.value !== password.value) {
    confirm.style.border = "3px solid tomato";
    confirm.nextElementSibling.innerHTML = "Passwords Must Match!";
  }
}
