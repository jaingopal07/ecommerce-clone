import {products} from "../data/product.js";
import { cart } from "../data/cart.js";
import { searchWithKey } from "./navbar.js";

const productGridElement=document.querySelector('.product-grid');
let total_qty=0;

export function renderPage(){
    total_qty=0;
    cart.forEach((cartElement)=>{
        total_qty+=Number(cartElement.qty);
    });

    function makeProductGrid(products_local){
        productGridElement.innerHTML='';
        if(products_local.length===0){
            document.querySelector('.empty-message').style.display='block';
            return;
        }
        document.querySelector('.empty-message').style.display='none';
        products_local.forEach((productElement)=>{
            productGridElement.innerHTML+=
            `
                <div class="product-card">
                        <div class="product-image-cont">
                            <img src="Pdt_Img/${
                                productElement.img_src
                            }" class="product-image">
                        </div>
                        <div class="product-name limit-to-2-lines">
                            ${
                                productElement.name
                            }
                        </div>
                        <div class="product-rating-cont">
                            <img class="rating-stars" src="Stars/rating-${productElement.stars}.png">
                            <div class="product-rating-count">
                                ${productElement.reviews}
                            </div>
                        </div>
                        <div class="product-price">
                            $${productElement.price}
                        </div>
                        <div class="product-qty-cont">
                            <select class="pdt-qty" id="pdt-qty-${productElement.id}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div class="added-to-cart-cont">
                            <div class="added-to-cart" id="${productElement.id}">
                                <img class="added-to-cart-logo"  src="Logo/checkmark.png">
                                Added
                            </div>
                        </div>
                        <button class="add-to-cart-button" id="${productElement.id}">
                            Add to Cart
                        </button>
                    </div>
            `
        });
    }

    

    makeProductGrid(searched_products);

    document.querySelector('.cart-qty').innerHTML=`${total_qty}`;
    document.querySelector('.cart-qty-mobile').innerHTML=`${total_qty}`;

}


function addToCart(button){
    console.log('hi');
    const i=Number(button.id);
    const quantity=Number(document.getElementById(`pdt-qty-${i}`).value);
    total_qty+=quantity;
    
    let found=false;
    cart.forEach((cartElement)=>{
        if(cartElement.product.id===products[i-1].id){
            cartElement.qty=Number(cartElement.qty)+quantity;
            found=true;
        }
    });

    if(!found){
        const temp={
            product:products[i-1],
            qty:quantity,
            delivery:0
        };
        cart.push(temp);
    }
    
    localStorage.setItem('cart-storage', JSON.stringify(cart));
    document.querySelector('.cart-qty').innerHTML=`${total_qty}`;
    document.querySelector('.cart-qty-mobile').innerHTML=`${total_qty}`;
    document.querySelector(`.added-to-cart[id="${i}"]`).style.display='block';
    setTimeout(()=>{
        document.querySelector(`.added-to-cart[id="${i}"]`).style.display='none';
    },1000);
}

productGridElement.addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-to-cart-button')){
        addToCart(e.target);
    }
});
export let searched_products=products.slice();

window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const searched = params.get('search') || '';
    searchWithKey(searched);
    document.querySelector('.search-bar').value = searched;
    if(!searched){
        searchWithKey(searched);
    }
    else{
        searchWithKey(searched);
        document.querySelector('.search-bar').value=searched;
    }
    
    
});


if (window.location.search) {
    document.querySelector('.search-bar').value='';
    window.history.replaceState({}, '', window.location.pathname);
}

renderPage();
