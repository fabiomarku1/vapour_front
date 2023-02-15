
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

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



const editButton = document.querySelector('.edit-button');
const saveButton = document.querySelector('.save-button');

const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const ageInput = document.querySelector('#age');
const passwordLabel = document.querySelector('label[for="password"]');
const passwordInput = document.querySelector('#password');


editButton.addEventListener('click', () => {
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
});
