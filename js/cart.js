let shoppingCart = document.getElementById('shopping-cart');
let label =  document.getElementById('label');

let basket = JSON.parse(localStorage.getItem("data")) || [];

/* total the items and add to the cart */
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x)=>{
                let {id, item} = x;
                let search = shopItemsData.find((y)=>y.id === id) || [];
                let {img, price, name} = search;
                return `
                <div class="cart-item">
                    <img width="100" src=${img}  alt="" />
                    
                    <div class="details">

                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price} </p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div> 

                        <div class="cart-buttons">
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                        </div> 
                        
                        <h3>$ ${item * search.price}</h3>
                        
                    </div>

                </div>
                `;
        })
        .join(""));
    } else { 
        shoppingCart.innerHTML = "";
        label.innerHTML = `   
        <h2>Cart is Empty</h2>
        <a href="menu.php">
            <button class= "HomeBtn"> Back To Menu</button>
        </a>
        `;
    }
};

generateCartItems();

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

    generateCartItems();
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
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

/* update the number of items when I increment or decrement
the number of items - when I click the plus or minus button  */
let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id)=>{
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    calculation();
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket
        .map((x) => {
            let {id, item} = x;
            let filterData = shopItemsData.find((x) => x.id === id);
            return filterData.price * item;

            // let search = shopItemsData.find((y) => y.id === id) || [];
            // return item * search.price;
        })
        .reduce((x,y) => x + y, 0);
        
        return (label.innerHTML = `
        <h2> Total Bill: $ ${amount}</h2
        <button class="out"> Checkout </button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `);
    } else return;
};

totalAmount();

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};


