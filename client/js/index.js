let register = document.querySelector(".form--register");
let login = document.querySelector(".form--login");

register.addEventListener("submit", handleRegister);
login.addEventListener("submit", handleLogin);

function handleRegister(e) {
  e.preventDefault();

  let payload = { e: e, type: "register" };
  //kill the request if error in registration form
  if (!errorHandler(payload)) return;

  let data = {
    username: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
  };
  registerUser(data);
}

function handleLogin(e) {
  e.preventDefault();
  let payload = { e: e, type: "login" };

  //kill the request if error in login form
  if (!errorHandler(payload)) return;

  let data =
  {
    username: e.target[0].value,
    password: e.target[1].value
  };
  userLogin(data);
}

function errorHandler({ e, type }) {
  const failBorderStyle = "3px solid tomato";
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let username = e.target[0];
  let passed = true;
  if (type == "register") {
    let email = e.target[1];
    let password = e.target[2];
    let confirm = e.target[3];
    //this can be refactored further if we get bored
    if (password.value.length < 8) {
      password.style.border = failBorderStyle;
      password.nextElementSibling.textContent = "Password must be at least 8 characters!";
      passed = false;
    }
    if (username.value.length == 0) {
      username.style.border = failBorderStyle;
      username.nextElementSibling.textContent = "Username must not be empty!";
      passed = false;
    }
    if (/@/.test(username.value)) {
      username.style.border = failBorderStyle;
      username.nextElementSibling.textContent = "No @ in usernames please!";
      passed = false;
    }
    if (!email.value.match(validRegex)) {
      email.style.border = failBorderStyle;
      email.nextElementSibling.textContent = "Invalid email!";
      passed = false;
    }
    if (confirm.value !== password.value) {
      confirm.style.border = failBorderStyle;
      confirm.nextElementSibling.textContent = "Passwords must match!";
      passed = false;
    }
    return passed;
  //handle login form
  } else {
    let password = e.target[1];
    if (password.value.length == 0) {
      password.style.border = failBorderStyle;
      password.nextElementSibling.textContent = "Password must not be empty!";
      passed = false;
    }
    if (username.value.length == 0) {
      username.style.border = failBorderStyle;
      username.nextElementSibling.textContent = "Username/Email must not be empty!";
      passed = false;
    }
    return passed;
  }
}
