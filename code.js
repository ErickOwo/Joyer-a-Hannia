
"use strict";

const navBtn = document.getElementById("nav-btn");
const navOverlay = document.querySelector(".nav-overlay");
const responsiveNav = document.querySelector(".responsive-nav");
let open = false;

const container = document.querySelector(".grid-container");

const discountCode = document.getElementById("discount-code");
const discountBtn = document.getElementById("use-code");

navBtn.addEventListener("click",()=>{
    if(!open){
        responsiveNav.style.animation = "openNav 1s forwards";
        navOverlay.style.animation = "displayOverlay 1s forwards";
        open = true;
    } else {
        responsiveNav.style.animation = "closeNav 1s forwards";
        navOverlay.style.animation = "removeOverlay 1s forwards";
        open = false;
    }
})

discountBtn.addEventListener("click", ()=>{
    if(discountCode.value == "rgp458092"){
        fillCamps(true);
        responsiveNav.style.animation = "closeNav 1s forwards";
        navOverlay.style.animation = "removeOverlay 1s forwards";
        open = false;
    }
})

const createHTMLCode = (img, product, type, price, code, size, index)=>{
    const item = document.createElement("DIV");
    const figure = document.createElement("FIGURE");
    const image = document.createElement("IMG");
    const info = document.createElement("DIV");
    const nameProduct = document.createElement("H3");
    const typeProduct = document.createElement("P");
    const priceProduct = document.createElement("P");
    const codeProduct = document.createElement("P");
    const sizeProduct = document.createElement("P");

    item.classList.add("grid-item");
    item.id = code;
    info.classList.add("info");
    nameProduct.classList.add("product-name");
    typeProduct.classList.add("type");
    priceProduct.classList.add("price");
    codeProduct.classList.add("code");
    sizeProduct.classList.add("size");

    image.setAttribute("src","images/"+img);
    nameProduct.textContent = product;
    typeProduct.textContent = type;
    priceProduct.textContent = "Q. " + price;
    codeProduct.textContent = code;
    sizeProduct.textContent = size;

    figure.appendChild(image);
    info.appendChild(nameProduct);
    info.appendChild(typeProduct);
    info.appendChild(priceProduct);
    info.appendChild(codeProduct);
    info.appendChild(sizeProduct);
    item.appendChild(figure);
    item.appendChild(info);

    item.tabIndex = index;
    return item;
}

const requestData = async ()=>{
    const request = await fetch("data.txt");
    const content = await request.json();
    const arr = await content.data;
    return arr;
}

const fillCamps = async (discount)=> {
    const arr = await requestData();
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    if(discount){
        for(let i=0; i < arr.length; i++){
            const element = createHTMLCode(arr[i].img, arr[i].product, arr[i].type, arr[i].discounted, arr[i].code, arr[i].size, i)
            fragment.appendChild(element);
        }
    } else {
        for(let i=0; i < arr.length; i++){
            const element = createHTMLCode(arr[i].img, arr[i].product, arr[i].type, arr[i].price, arr[i].code, arr[i].size, i)
            fragment.appendChild(element);
        }
    }
    container.appendChild(fragment);
}

fillCamps(false);
