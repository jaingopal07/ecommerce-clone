function updateValues(){
    total_qty=0;
    total_price=0;
    shipping_amount=0;
    cart.forEach((element)=>{
        total_qty+=Number(element.qty);
        total_price+=(element.product.price*100)*element.qty;
        shipping_amount+=Number(element.delivery);
    });
    tax=Math.round((total_price+shipping_amount)/10);
    shipping_amount/=100;
    total_price/=100;
    tax/=100;
    updatePricing();
    updatePage();
}

function updatePage(){
    if(total_qty===0){
    document.querySelector('.empty-cart-summary').style.display='block';
    document.querySelector('.cart-summary').style.display='none';
    }
    else{
        document.querySelector('.empty-cart-summary').style.display='none';
        document.querySelector('.cart-summary').style.display='block';
    }
    document.querySelectorAll('.no-of-items').forEach((numberElement)=>{
        numberElement.innerHTML=`${total_qty}`;
    })
}

function updatePricing(){
    document.getElementById('order-cost-bef-tax').innerHTML=`$${total_price.toFixed(2)}`;
    document.getElementById('shipping-cost').innerHTML=`$${shipping_amount.toFixed(2)}`;
    document.getElementById('total-before-tax').innerHTML=`$${((total_price*100+shipping_amount*100)/100).toFixed(2)}`;
    document.getElementById('tax-amount').innerHTML=`$${tax.toFixed(2)}`;
    document.getElementById('total-order-value').innerHTML=`$${((total_price*100+shipping_amount*100+tax*100)/100).toFixed(2)}`;
}

function addInCartSummary(pdtElement,index){
    index=Number(index);
    cartSummaryElement.insertAdjacentHTML('beforeend',
        `
        <div class="product-card product-${index}" id="pdt-${index}">
            <div class="delivery-date-cont">
                Delivery date: <span class="selected-date-${index}" id="pdt-${index}">${delivery[`${pdtElement.delivery}`]}</span>
            </div>
            <div class="cart-item-detail-grid">
                <img class="product-image" src="Pdt_Img/${pdtElement.product.img_src}">
                <div class="cart-item-details">
                    <div class="product-name">
                        ${pdtElement.product.name}
                    </div>
                    <div class="product-price">
                        $${pdtElement.product.price}
                    </div>
                    <div class="quantity-container" id="qty-cont-pdt-${index}">
                        Quantity: <span class="quantity-${index}" id="pdt-${index}">${pdtElement.qty} </span> <span class="update-button" id="pdt-${index}">Update </span><span class="delete-button" id="pdt-${index}">Delete</span>
                    </div>
                    <div class="quantity-container-updating" id="qty-cont-updating-pdt-${index}">
                        Quantity:
                        <input type="number" value="${pdtElement.qty}" class="input-qty input-qty-${index}" id="updated-qty-pdt-${index}">
                        <span class="save-button" id="pdt-${index}">Save</span>
                        <span class="delete-button" id="pdt-${index}">Delete</span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="choose-delivery-option">
                        Choose a delivery option:
                    </div>
                    <label class="delivery-option">
                        <input type="radio" name="delivery-options-${index}" class="delivery-option-input" value="0" id="pdt-000-${index}" >
                        <div class="change-delivery-date">
                            <div class="delivery-option-date">
                                ${delivery[0]}
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </label>
                    <label class="delivery-option">
                        <input type="radio" name="delivery-options-${index}" class="delivery-option-input" value="499" id="pdt-499-${index}">
                        <div class="change-delivery-date">
                            <div class="delivery-option-date">
                                ${delivery[499]}
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </label>
                    <label class="delivery-option">
                        <input type="radio" name="delivery-options-${index}" class="delivery-option-input" value="999" id="pdt-999-${index}">
                        <div class="change-delivery-date">
                            <div class="delivery-option-date">
                                ${delivery[999]}
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    `
    )
}

function updateCartSummary(){
    cartSummaryElement.innerHTML='';
    cart.forEach((pdtElement,index)=>{
        addInCartSummary(pdtElement,index);
        const radios=document.getElementsByName(`delivery-options-${index}`);
        radios.forEach(radio=>{
            if(Number(radio.value)===Number(pdtElement.delivery)){
                radio.checked=true;
            }
        });
    });
}

function updateButton(button){
    const buttonId=button.id;
    document.querySelector(`#qty-cont-${buttonId}`).style.display='none';
    document.querySelector(`#qty-cont-updating-${buttonId}`).style.display='block';
}

function saveButton(button){
   const buttonID=button.id;
    const ind=Number(buttonID.slice(4));
    const updated_qty=document.querySelector(`.input-qty-${ind}`).value;
    const init_qty=cart[ind].qty;
    cart[ind].qty=updated_qty;
    document.querySelector(`.quantity-${ind}`).innerHTML=cart[ind].qty;
    total_qty+=cart[ind].qty-init_qty;
    total_price*=100;
    total_price+=(cart[ind].product.price*100)*(cart[ind].qty-init_qty);
    shipping_amount*=100;
    tax=Math.round((total_price+shipping_amount)/10);
    total_price/=100;
    shipping_amount/=100;
    tax/=100;
    updatePricing();
    updatePage();
    localStorage.setItem('cart-storage', JSON.stringify(cart));
    document.querySelector(`#qty-cont-${buttonID}`).style.display='block';
    document.querySelector(`#qty-cont-updating-${buttonID}`).style.display='none';
}

function deleteButton(button){
    const buttonID=button.id;
    const ind=Number(buttonID.slice(4));
    cart.splice(ind,1);
    updateCartSummary();
    updateValues(); 
    localStorage.setItem('cart-storage', JSON.stringify(cart));
}

function changeDelivery(button){
    const buttonId=button.id;
    const ind=Number(buttonId.slice(8));
    const val=Number(button.value);
    const init_val=cart[ind].delivery;
    cart[ind].delivery=val;
    document.querySelector(`.selected-date-${ind}`).innerHTML=delivery[`${cart[ind].delivery}`];
    shipping_amount=((shipping_amount*100)+val-init_val);
    total_price*=100;
    tax=Math.round((total_price+shipping_amount)/10);
    tax/=100;
    total_price/=100;
    shipping_amount/=100;
    updatePricing();
    localStorage.setItem('cart-storage', JSON.stringify(cart));
}