let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
        let {id, name, img, price} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img width="218" src=${img} alt="">
            <div class="details">
                <h5>${name}</h5>
                <div class="price-quantity">
                    <h5>$ ${price}</h5>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div> `; 
    
    })
    .join(""));
};

generateShop();

/* increment the number of items */
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);

    /* save the cart data, so when I 
    refresh the page the cart does not
    get empty */
    localStorage.setItem("data", JSON.stringify(basket)); 
};

/* decrement the number of items */
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0)

    localStorage.setItem("data", JSON.stringify(basket));
};

/* update the number of items when I increment or decrement
the number of items - when I click the plus or minus button  */
let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

/* total the items and add to the cart */
let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();