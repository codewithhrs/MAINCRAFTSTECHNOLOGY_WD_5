// PRODUCTS
const products = [
{id:1,name:"Laptop",price:50000,category:"electronics",img:"https://via.placeholder.com/150"},
{id:2,name:"Phone",price:20000,category:"electronics",img:"https://via.placeholder.com/150"},
{id:3,name:"T-Shirt",price:500,category:"fashion",img:"https://via.placeholder.com/150"},
{id:4,name:"Shoes",price:2000,category:"fashion",img:"https://via.placeholder.com/150"},
{id:5,name:"Rice",price:60,category:"grocery",img:"https://via.placeholder.com/150"},
{id:6,name:"Oil",price:120,category:"grocery",img:"https://via.placeholder.com/150"},
{id:7,name:"Headphones",price:1500,category:"electronics",img:"https://via.placeholder.com/150"},
{id:8,name:"Jacket",price:2500,category:"fashion",img:"https://via.placeholder.com/150"}
];

let currentPage = 1;
const perPage = 4;

// DISPLAY PRODUCTS
function showProducts(list){
const container = document.getElementById("products");
if(!container) return;

container.innerHTML="";

list.forEach(p=>{
container.innerHTML += `
<div class="card" onclick="openProduct(${p.id})">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
</div>`;
});
}

// PAGINATION
function paginate(list){
const start = (currentPage-1)*perPage;
const paginated = list.slice(start,start+perPage);
showProducts(paginated);

const pages = Math.ceil(list.length/perPage);
const pagination = document.getElementById("pagination");

if(!pagination) return;

pagination.innerHTML="";
for(let i=1;i<=pages;i++){
pagination.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
}
}

function changePage(p){
currentPage = p;
applyFilters();
}

// FILTERS
function applyFilters(){
let list = [...products];

let search = document.getElementById("search")?.value.toLowerCase();
let category = document.getElementById("category")?.value;
let sort = document.getElementById("sort")?.value;

if(search){
list = list.filter(p=>p.name.toLowerCase().includes(search));
}

if(category !== "all"){
list = list.filter(p=>p.category === category);
}

if(sort==="low") list.sort((a,b)=>a.price-b.price);
if(sort==="high") list.sort((a,b)=>b.price-a.price);
if(sort==="az") list.sort((a,b)=>a.name.localeCompare(b.name));

paginate(list);
}

// EVENTS
document.getElementById("search")?.addEventListener("input", applyFilters);
document.getElementById("category")?.addEventListener("change", applyFilters);
document.getElementById("sort")?.addEventListener("change", applyFilters);

// PRODUCT PAGE
function openProduct(id){
localStorage.setItem("productId",id);
window.location="product.html";
}

// PRODUCT DETAIL
const detail = document.getElementById("productDetail");
if(detail){
let id = localStorage.getItem("productId");
let p = products.find(x=>x.id==id);

detail.innerHTML = `
<h2>${p.name}</h2>
<img src="${p.img}">
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
`;
}

// CART
function addToCart(id){
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let item = cart.find(i=>i.id===id);
if(item) item.qty++;
else cart.push({id,qty:1});

localStorage.setItem("cart",JSON.stringify(cart));
alert("Added!");
}

// SHOW CART
const cartDiv = document.getElementById("cartItems");
if(cartDiv){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

cart.forEach(item=>{
let p = products.find(x=>x.id===item.id);
total += p.price * item.qty;

cartDiv.innerHTML += `
<div class="cart-item">
${p.name} x ${item.qty} = ₹${p.price * item.qty}
<button onclick="removeItem(${item.id})">Remove</button>
</div>`;
});

document.getElementById("total").innerText = "Total: ₹"+total;
}

// REMOVE
function removeItem(id){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.filter(i=>i.id!==id);
localStorage.setItem("cart",JSON.stringify(cart));
location.reload();
}

// INIT
applyFilters();
