'use strict'
var email = document.getElementById("username");
var password = document.getElementById("password");

var TOKEN = "";
const url = "http://localhost:80/testPhp/Auth/login";


async function login() {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "Email": `${email.value}`, "Password": `${password.value}` }),
    })
        .then((e) => e.json())
        .then((json) => json);
}

function HanldeError( message)
{
    document.getElementById("sign-Error").innerHTML=message;
    document.getElementById("sign-Error").style.display="block";
    return;
}

function Validate(email, password) {
    if (!email || email.trim() === '' || !password || password.trim() === '') {
      return false;
    }
 
    /* // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Check if password meets minimum requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return false;
    }
  */
    return true;
  }
addEventListener("submit", (e) => {
  e.preventDefault();

    if(!Validate(email.value,password.value))
    {
      HanldeError("Not valid email");
      return;
    }

    login().then(request => 
    {
        if(request["code"]==400)
            HanldeError("Password is wrong")

        if(request["code"]==404)
        HanldeError("No email were found!");

        if(request["token"]!=null)
        {
            TOKEN = request["token"];
            console.log(TOKEN);
             window.location.replace('../home/home.html');
        }
    })
    console.log(TOKEN);

   
    


})