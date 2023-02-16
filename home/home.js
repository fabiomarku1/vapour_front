let popularDiv=document.getElementById("popular-div");
let newRelease=document.getElementById("new-div")

let cardDiv = document.getElementById("featured-div");
let popularParentDiv=document.getElementById("container-popular");
let NewParentDiv=document.getElementById("container-newRelease");

const url = "http://localhost:80/testPhp/Product";


async function GetProducts() {
    return await fetch(url, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}

async function GetAllProducts() {
    const result = await GetProducts();
    const allProducts = [].concat(...result);
    return allProducts;
}


/*
function AppendData(data,parentDiv)
{
    data.forEach(e => {
        let div = document.createElement("div");
        div.className="col-sm-4 mb-4";
        div.innerHTML = `
        <div class="card">
            <img src="../images/Grand_Theft_Auto_V.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" id="game-title">${e["Name"]}</h5>
                <p class="card-text" id="game-tag">${e["Description"]}</p>
                <a href="../buy/buy.html" class="btn btn-primary" id="sub" >Buy Now</a>
            </div>
        </div>`;
    
     
        parentDiv.appendChild(div);
      });
}
*/

function AppendData(data, parentDiv) {
    data.forEach(e => {
      let div = document.createElement("div");
      div.className = "col-sm-4 mb-4";
      div.innerHTML = `
        <div class="card">
          <img src="../images/Grand_Theft_Auto_V.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title" id="game-title">${e["Name"]}</h5>
            <p class="card-text" id="game-tag">${e["Description"]}</p>
            <a href="#" class="btn btn-primary buy-btn">Buy Now</a>
          </div>
        </div>`;
  
      const buyButton = div.querySelector(".buy-btn");
      buyButton.addEventListener("click", () => {
        // Store the game information in session storage
        sessionStorage.setItem("gameId",e["Id"] );
        // Redirect to the game info page
        window.location.href = "../buy/buy.html";
      });
  
      parentDiv.appendChild(div);
    });
  }
window.addEventListener("load", async e => {
    e.preventDefault();
  
    const dataForFeatured = await GetAllProducts();
    const dataForPopular=await GetAllProducts();
    const dataForNew=await GetAllProducts();

    AppendData(dataForFeatured,cardDiv);
    AppendData(dataForPopular,popularDiv);
    AppendData(dataForNew,newRelease);
     
 

   
  });
/* 
  const buyButton = document.querySelector("#sub");
  buyButton.addEventListener("click", redirectToGameInfo);

  function redirectToGameInfo() {
    // Get the game information from the card
    const gameId = event.target.parentNode.parentNode.id;
    const gameTitle = event.target.parentNode.querySelector("#game-title").innerText;
    const gameTag = event.target.parentNode.querySelector("#game-tag").innerText;
    
    // Store the game information in local storage to access it in the next page
    localStorage.setItem("gameId", gameId);
    localStorage.setItem("gameTitle", gameTitle);
    localStorage.setItem("gameTag", gameTag);
    
    // Redirect to the game info page
    //window.location.href = "../game-info/game-info.html";
  }
  
  // Add a click event listener to the "Buy Now" button
*/

  

