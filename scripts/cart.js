let cart=JSON.parse(localStorage.getItem('cart-storage'));
if(!cart){
    cart=[];
}
let total_qty=0;


cart.forEach((cartElement)=>{
    total_qty+=cartElement.qty;
});

document.querySelector('.cart-qty').innerHTML=`${total_qty}`;
document.querySelector('.cart-qty-mobile').innerHTML=`${total_qty}`;

function addToCart(button){
    const i=Number(button.id);
    const quantity=Number(document.getElementById(`pdt-qty-${i}`).value);
    total_qty+=quantity;
    
    let found=false;
    cart.forEach((cartElement)=>{
        if(cartElement.product.id===products[i-1].id){
            cartElement.qty+=quantity;
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




