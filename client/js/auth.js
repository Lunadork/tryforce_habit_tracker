async function registerUser(data)
{
   const options = 
   {
       method: 'POST',
       headers: {"Content-Type" : "application/json" },
       body: JSON.stringify
       ({
        "username" : data.username,
        "email" : data.email,
        "password" : data.password
       })
   }

   try
   {
       console.log(fetchString)
        const response = await fetch(`${fetchString}/auth/register`, options)
        const {id, err } = await response.json();
        if(err)
        {
            throw Error (err);
        }
        else
        {
            alert(`User ${id} created! Please proceed to log in with these details`);
        }
   }
   catch (err)
   {
       console.log(err);
   }
}


async function userLogin(data)
{
    try 
    {
        const options = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify
            ({
                "username" : data.username,
                "password" : data.password
            })
        };
        const result = await fetch(`${fetchString}/auth/login`, options);
        const resultData = await result.json();
        if (data.err)
        { 
            throw Error("Error: "+ data.err); 
        }
        else
        {
            localStorage.setItem('Bearer', data.token)
        }
    } 
    catch (err) 
    {
        console.log(`Login failed for reason: ${err}`);
    }

}