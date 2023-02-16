
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector("button.btn-primary");
    const tbody = document.querySelector("table.games tbody");

    addButton.addEventListener("click", function () {
        if (addButton.classList.contains("btn-primary")) {
            addButton.classList.remove("btn-primary");
            addButton.classList.add("btn-success");
            addButton.textContent = "Confirm";

            let newRow = document.createElement("tr");
            newRow.innerHTML = `
          <td></td>
          <td><input type="text" class="form-control"></td>
          <td><input type="text" class="form-control"></td>
          <td><input type="number" step="0.01" class="form-control"></td>
          <td><input type="number" class="form-control"></td>
        `;
            const gameIds = Array.from(tbody.querySelectorAll("tr")).map(row => Number(row.cells[0].innerHTML));
            const newGameId = Math.max(...gameIds) + 1;
        
            newRow.cells[0].innerHTML = newGameId;
            tbody.appendChild(newRow);
        } else {
            let lastRow = tbody.lastElementChild;
            let inputs = lastRow.querySelectorAll("input");
            let game = {
                title: inputs[0].value,
                category: inputs[1].value,
                price: parseFloat(inputs[2].value),
                quantity: parseInt(inputs[3].value)
            };
            if (game.title.trim() === "" || game.category.trim() === "" || isNaN(game.price) || isNaN(game.quantity)) {
                alert("Please fill in all the fields correctly.");
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/add-game");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            lastRow.innerHTML = `
                  <td>${response.gameId}</td>
                  <td>${game.title}</td>
                  <td>${game.category}</td>
                  <td>${game.price.toFixed(2)}</td>
                  <td>${game.quantity}</td>
                `;
                            addButton.classList.remove("btn-success");
                            addButton.classList.add("btn-primary");
                            addButton.textContent = "Add";
                            alert("New game has been added.");
                        } else {
                            alert("Error adding game.");
                        }
                    } else {
                        alert("Error adding game.");
                    }
                };
                xhr.send(JSON.stringify(game));
            }
        }
    });
});


