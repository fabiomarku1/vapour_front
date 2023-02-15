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



// Get the card row element
const cardRow = document.getElementById("card-row");

// Check if there are any cards in the row
if (cardRow.children.length === 0) {
    const emptyPrompt = document.createElement("div");
    emptyPrompt.classList.add("col-sm-12", "mb-4", "empty-prompt", "text-center");
    emptyPrompt.textContent = "No games found.";
    emptyPrompt.setAttribute("style", "font-size: 1.5rem; height: 200px;");
    cardRow.appendChild(emptyPrompt);
}