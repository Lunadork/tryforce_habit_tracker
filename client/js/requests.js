const fetchString = `http://localhost:3000`;

async function getAll(type) {
  try {
    const res = await fetch(`${fetchString}/${type}/`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

async function getAllPfps() {
  try {
    const res = await fetch(`${fetchString}/pfp`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

async function getOnePfp(id) {
  try {
    const res = await fetch(`${fetchString}/pfp/${id}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

async function registerUser(data) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.username,
      email: data.email,
      password: data.password,
    }),
  };

  try {
    const response = await fetch(`${fetchString}/users`, options);
    const { id, err } = await response.json();
    if (err) {
      throw Error(err);
    } else {
      alert(`User ${id} created!  Please proceed to log in with these details`);
    }
  } catch (err) {
    console.log(err);
  }
}

//TO AMEND WITH PROPER INTAKE OF DATA DEPENDING ON HOW WE DO IT
async function createHabit(e) {}

async function getAll(type) {
  try {
    const res = await fetch(`${fetchString}/${type}/`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getOne(type, id) {
  try {
    const response = await fetch(`${fetchString}/${type}/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getHabitsForUser(id) {
  try {
    const response = await fetch(`${fetchString}/users/${id}/habits`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function updateProfile(id, profilePic) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      profilePic: profilePic
    }),
  };
    const response = await fetch(`${fetchString}/users/${id}}`, options);
    const json = await response.json();
    return json.profilepic;
}

async function getLevels() {
  try {
    const res = await fetch(`${fetchString}/game/levels`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getLevelsById(id) {
  try {
    const response = await fetch(`${fetchString}/game/levels/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
