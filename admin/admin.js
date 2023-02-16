const url = `http://localhost:80/testPhp/User`;
const urlProducts = `http://localhost:80/testPhp/Product`;
const urlSales = `http://localhost:80/testPhp/Sales`;
let tableBody=document.getElementById("table-Body");
let tableBodyProducts=document.getElementById("table-Body-Products");
let tableBodySales=document.getElementById("table-Body-Sales");

async function GetUser() {
    return await fetch(url, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}



async function GetProducts() {
    return await fetch(urlProducts, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}


async function GetSales() {
    return await fetch(urlSales, {
        method: 'GET',
    })
        .then((e) => e.json())
        .then((json) => json);
}

async function Display(data,parent) {
    console.log(data.length);
    data.forEach(person => {
      let tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td><input type="checkbox" class="user-checkbox" value="1"></td>
        <td>${person["Id"]}</td>
        <td>${person["Name"]}</td>
        <td>${person["Surname"]}</td>
        <td>${person["Email"]}</td>
        <td>${person["Age"]}</td>
        <td>${person["DateCreated"]}</td>
      `;
      parent.append(tableRow);
    });
}


async function DisplayProducts(data,parent) {
    console.log(data.length);
    data.forEach(prod => {
      let tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <tr>
      <td>${prod["Id"]}</td>
      <td>${prod["Name"]}</td>
      <td>${prod["CategoryId"]}</td>
      <td>${prod["Price"]}</td>
      <td>${prod["Quantity"]}</td>
  </tr>
      `;
      parent.append(tableRow);
    });
}


async function DisplaySales(data,parent) {
    console.log(data.length);
    data.forEach(prod => {
      let tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <tr>
      <td>${prod["Id"]}</td>
      <td>${prod["Amount"]}</td>
      <td>${prod["ProductName"]}</td>
      <td>${prod["UserId"]}</td>
      <td>${prod["DateCreated"]}</td>
  </tr>
      `;
      parent.append(tableRow);
    });
}

window.addEventListener("load",async (e)=>{
    e.preventDefault();
    const users=await GetUser();
    const products=await GetProducts();
    const sales=await GetSales();
    await Display(users,tableBody);
    await DisplayProducts(products,tableBodyProducts)
    await DisplaySales(sales,tableBodySales)
 console.log(sales);
  });
console.log(GetUser());



