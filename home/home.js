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

function AppendData(data,parentDiv)
{
    data.forEach(e => {
        let div = document.createElement("div");
        div.className="col-sm-4 mb-4";
        div.innerHTML = `
        <div class="card">
            <img src="https://via.placeholder.com/350x200" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" id="game-title">${e["Name"]}</h5>
                <p class="card-text" id="game-tag">${e["Description"]}</p>
                <a href="#" class="btn btn-primary" id="buy-button">Buy Now</a>
            </div>
        </div>`;
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
     
   /* */
  });

  

