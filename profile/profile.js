
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');


const editButton = document.querySelector('.edit-button');
let saveButton = document.querySelector('.save-button');

const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const ageInput = document.querySelector('#age');
const passwordLabel = document.querySelector('label[for="password"]');
const passwordInput = document.querySelector('#password');
const email=document.getElementById("email");

dropdownToggles.forEach((dropdownToggle) => {
    const dropdownMenu = dropdownToggle.nextElementSibling;

    dropdownMenu.style.display = 'none';

    dropdownToggle.addEventListener('mouseover', () => {
        dropdownMenu.style.display = 'block';
    });

});

for (let i = 0; i < dropdownMenus.length; i++) {
    dropdownMenus[i].addEventListener('mouseleave', function () {
        this.style.display = 'none';
    });
}

for (let i = 0; i < dropdownToggles.length; i++) {
    dropdownToggles[i].addEventListener('click', function (event) {
        event.preventDefault();

        for (let j = 0; j < dropdownMenus.length; j++) {
            dropdownMenus[j].style.display = 'none';
        }

        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
}


const userId=window.localStorage.getItem("userId");

const url = `http://localhost:80/vapour_back/User/${userId}`;

async function GetUser() {
    return await fetch(url, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}

async function UpdateUser() {
    return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            "Email": `${email.value}`,
            "Name": `${nameInput.value}`,
            "Surname": `${surnameInput.value}`,
            "Age": `${ageInput.value}`
        }),
    })
        .then((e) => e.json())
        .then((json) => json);
}

window.addEventListener("load", async e => {
    e.preventDefault();
  
    const user = await GetUser();

    nameInput.value=user["Name"];
    surnameInput.value=user["Surname"];
    ageInput.value=user["Age"];
    email.value=`${user["Email"]}`;
  });

editButton.addEventListener('click', async (e) => {
    e.preventDefault();
    editButton.setAttribute('hidden', true);
    saveButton.removeAttribute('hidden');

    nameInput.disabled = false;
    surnameInput.disabled = false;

    ageInput.disabled = false;
    ageInput.min = 0;
    ageInput.max = 130;
    ageInput.step = 1;

    passwordLabel.textContent = 'Old Password:';
    passwordInput.value = '';
    passwordInput.disabled = false;

    const newPasswordDiv = document.createElement('div');
    newPasswordDiv.classList.add('info-row');
    newPasswordDiv.innerHTML = '<label for="new-password">New Password: </label><input type="password" id="new-password" name="new-password">';

    const confirmPasswordDiv = document.createElement('div');
    confirmPasswordDiv.classList.add('info-row');
    confirmPasswordDiv.innerHTML = '<label for="confirm-password">Confirm Password: </label><input type="password" id="confirm-password" name="confirm-password">';

    const oldPasswordDiv = passwordInput.parentElement;
    oldPasswordDiv.insertAdjacentElement('afterend', newPasswordDiv);
    newPasswordDiv.insertAdjacentElement('afterend', confirmPasswordDiv);

    saveButton.addEventListener("click", async (e)=>{
        await UpdateUser();
        window.location.reload();
    } )
});



  

