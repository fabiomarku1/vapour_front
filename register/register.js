'use strict'
const url = "http://localhost/vapour_back/Auth/register";
var email = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");

async function register() {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "Email": `${email.value}`, "Password": `${password.value}`, "ConfirmPassword": `${confirmPassword.value}` }),
    });
    const json = await response.json();
    return json;
}

function HanldeError(id, message) {
    document.getElementById(`${id}`).innerHTML = message;
    document.getElementById(`${id}`).style.display = "block";
    return;
}

function Validate() {
    if (password.value != confirmPassword.value) {
        HanldeError("confirm-Error", "Password doesn't match!");
        return false;
    }
    if (!email.value || email.value.trim() === '' || !password.value || password.value.trim() === '') {
        return false;
    }
    return true;
}

addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    if (!Validate()) {
        return;
    }
    register()
        .then(response => {
            if(response["code"]==400)
            {
                HanldeError("email-Error", response["message"]);
            }
         else {
                window.location.replace('../login/login.html');
                // Display success message or redirect to another page
            }
        })
        .catch(error => {
            HanldeError("email-Error", response["message"]);
            console.log(error);
            HanldeError("register-Error", "An error occurred while processing your request.");
        });
});
