export let cart=JSON.parse(localStorage.getItem('cart-storage'));
if(!cart){
    cart=[];
}