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
        console.log(fetchString);
        const response = await fetch(`${fetchString}/auth/register`, options);
        if (response.ok) {
            return {success: true};
        } else {
            return {success: false, message: await response.text()};
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
        if (resultData.success) {
            //this is actually horrific practice. onwards!!
            localStorage.setItem('Bearer', resultData.token)
            localStorage.setItem('id', resultData.id)
            return true;
        }
        return false;
    } 
    catch (err) 
    {
        console.log(`Login failed for reason: ${err}`);
    }

}