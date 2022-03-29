const fetchString = `http://localhost:3000`;

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

async function updateProfile(imageUrl) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: imageUrl
    }),
  };
    const response = await fetch(`${fetchString}/users/${localStorage.getItem('id')}`, options);
    const json = await response.json();
    return json.profilepic;
}

async function getLevels()
{
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
