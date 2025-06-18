let cart=JSON.parse(localStorage.getItem('cart-storage'));
if(!cart){
    cart=[];
}

let total_qty;
let total_price;
let tax;
let shipping_amount;
const cartSummaryElement=document.querySelector('.cart-summary');
const today=new Date();
const future1=new Date(today);
future1.setDate(today.getDate()+9);
const future2=new Date(today);
future2.setDate(today.getDate()+5);
const future3=new Date(today);
future3.setDate(today.getDate()+1);

const delivery={
    0:`${future1.toLocaleString('default', { weekday: 'long' })}, ${future1.toLocaleString('default', { month: 'long' })} ${future1.getDate()}`,
    499:`${future2.toLocaleString('default', { weekday: 'long' })}, ${future2.toLocaleString('default', { month: 'long' })} ${future2.getDate()}`,
    999:`${future3.toLocaleString('default', { weekday: 'long' })}, ${future3.toLocaleString('default', { month: 'long' })} ${future3.getDate()}`
}

updateCartSummary();
updateValues();

cartSummaryElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    deleteButton(e.target);
  }
  if(e.target.classList.contains('save-button')){
    saveButton(e.target);
  }
  if(e.target.classList.contains('update-button')){
    updateButton(e.target);
  }
  if(e.target.classList.contains('delivery-option-input')){
    changeDelivery(e.target);
  }
});