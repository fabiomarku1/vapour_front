
let email = document.getElementById("username");
let password = document.getElementById("password");

 var _UserId="";
 var _TOKEN = "";
//  export {_UserId};


const url = "http://localhost:80/vapour_back/Auth/login";


async function login() {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ "Email": `${email.value}`, "Password": `${password.value}` }),
  })
    .then((e) => e.json())
    .then((json) => json);
}

function HanldeError(message) {
  document.getElementById("sign-Error").innerHTML = message;
  document.getElementById("sign-Error").style.display = "block";
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
addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!Validate(email.value, password.value)) {
    HanldeError("Not valid email");
    return;
  }

  const request = await login();

  if (request["code"] == 400)
    HanldeError("Password is wrong")

  if (request["code"] == 404)
    HanldeError("No email were found!");

  if (request["token"] != null) 
  {
    _TOKEN = request["token"];
    let decodedData = jwt_decode(_TOKEN)
    _UserId = decodedData["Id"];

    window.localStorage.setItem("token",_TOKEN);
    window.localStorage.setItem("userId",_UserId);
   
    if(decodedData["Role"]=="Admin")
    {
      window.location.replace("../admin/admin.html");
    }
    else

     window.location.replace('../home/home.html');

  }
})


