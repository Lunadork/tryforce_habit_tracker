const fetchString = `http://localhost:3000`;


async function getAll(type)
{
    try
    {
        const res = await fetch(`${fetchString}/${type}/`);
        const data = await res.json();
        return data;
    }
    catch (err)
    {
        console.log(err);
    }
}

async function getOne(type, id)
{
    try
    {
        const response = await fetch(`${fetchString}/${type}/${id}`);
        const data = await response.json();
        return data;
    }
    catch (err)
    {
        console.log(err);
    }
}

async function getHabitsForUser(id)
{
    try
    {
        const response = await fetch (`${fetchString}/users/${id}/habits`);
        const data = await response.json();
        return data;
    }
    catch (err)
    {
        console.log(err);
    }
}





