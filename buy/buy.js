
const productId = sessionStorage.getItem("gameId");
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const title = document.getElementById('title');
const genre = document.getElementById("Description");
const image = document.getElementById("image");




window.addEventListener("load", async (e) => {
    e.preventDefault();
    const product = await GetProduct();
    image.value = product["Image"];
    genre.value = product["Description"];
    title.value = product["Name"];
    priceInput.value = product["Price"];
    sessionStorage.setItem("price", product["Price"]);
})

const url = `http://localhost:80/testPhp/Product/${productId}`;

async function GetProduct() {
    return await fetch(url, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}

async function GetAllProducts() {
    const result = await GetProducts();
    return result;
}


const urlSales = `http://localhost:80/testPhp/Sales`;

async function CreateSale() {
    const userId=localStorage.getItem("userId");
    const amount=localStorage.getItem("amount");

    let data=JSON.stringify({
        "Amount":amount,
        "ProductName": `${title.value}`,
        "UserId": `${userId}}`
    });

    return await fetch(urlSales, {
        method: 'POST',
        body: data,
    })
        .then((e) => e.json())
        .then((json) => json);
}
const confirmButton = document.getElementById('confirm-button');

quantityInput.addEventListener('input', async (e) => {

    const price = sessionStorage.getItem("price");

    if (quantityInput.value > price) {
        window.alert("There are not enough quantity for this product!");
        quantityInput.value = 0;
    }
    const quantity = quantityInput.value;
    const newPrice = price * quantity;
    priceInput.value = '$' + newPrice.toFixed(2);
    localStorage.setItem("amount",newPrice.toFixed(2));

    

});

confirmButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    await CreateSale();
    window.location.href = 'thankyou.html';
    sessionStorage.removeItem("amount");
});