async function registerUser(data)
{
   const options = 
   {
       method: 'POST',
       headers: {"Content-Type" : "application/json" },
       body: JSON.stringify
       ({
        "name" : data.userName,
        "email" : data.email,
        "password" : data.password
       })
   }

   try
   {
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
                "name" : data.userName,
                "password" : data.password
            })
        };
        const result = await fetch(`${fetchString}/auth/login`, options);
        const resultdata = await result.json();
        if (data.err)
        { 
            throw Error("Error: "+ data.err); 
        }
        else
        {
            loginPart2(resultdata);
        }
    } 
    catch (err) 
    {
        console.log(`Login failed for reason: ${err}`);
    }

}

function loginPart2(data)
{
    localStorage.setItem('Bearer', data.token)
    //Move to dashboard.
}