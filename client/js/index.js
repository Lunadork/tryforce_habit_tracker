let register = document.querySelector(".form--register");
let login = document.querySelector(".form--login");

register.addEventListener("submit", handleRegister);
login.addEventListener("submit", handleLogin);

function handleRegister(e) {
  e.preventDefault();
  let payload = { e: e, type: "register" };
  errorHandler(payload);
  let data = {
    userName: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
  };
  registerUser(data);
}

function handleLogin(e) {
  e.preventDefault();
  let payload = { e: e, type: "login" };

  errorHandler(payload);

  document.location.href = "main.html";

  let data =
  {
    userName: e.target[0].value,
    password: e.target[1].value
  }
  
  userLogin(data);

}

function errorHandler({ e, type }) {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let username = e.target[0];
  if (type == "register") {
    let email = e.target[1];
    let password = e.target[2];
    let confirm = e.target[3];
    if (password.value.length < 8) {
      password.style.border = "3px solid tomato";
      password.nextElementSibling.innerHTML =
        "Password must be atleast 8 characters!";
    }
    if (username.value.length == 0) {
      username.style.border = "3px solid tomato";
      username.nextElementSibling.innerHTML = "Username must not be empty!";
    }
    if (!email.value.match(validRegex)) {
      email.style.border = "3px solid tomato";
      email.nextElementSibling.innerHTML = "Invalid Email!";
    }
    if (confirm.value !== password.value) {
      confirm.style.border = "3px solid tomato";
      confirm.nextElementSibling.innerHTML = "Passwords Must Match!";
    }
  } else {
    let password = e.target[1];
    if (password.value.length == 0) {
      password.style.border = "3px solid tomato";
      password.nextElementSibling.innerHTML = "Password must not be empty!";
    }
    if (username.value.length == 0) {
      username.style.border = "3px solid tomato";
      username.nextElementSibling.innerHTML =
        "Username/Email must not be empty!";
    }
  }
}
