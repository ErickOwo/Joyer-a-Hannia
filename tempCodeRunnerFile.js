const fillCamps = ()=> {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const arr = requestData();
    console.log(arr);
    for(let i=0; i < arr.length; i++){
        const element = createHTMLCode(arr[i].img, arr[i].product, arr[i].type, arr[i].price, arr[i].code, arr[i].size, i)
        fragment.appendChild(element);
    }
    container.appendChild(fragment);
}
