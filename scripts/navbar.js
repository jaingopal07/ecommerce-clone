import { products } from "../data/product.js";
import {renderPage,searched_products} from "./grid.js"
let last_searched='';

function find(name,key){
    let i=1,temp=-1;
    const kmp=[-1];
    while(i<key.length){
        if(key[i]===key[temp+1]){
            temp++;
            kmp.push(temp);
        }
        else{
            while(temp!=-1&&key[i]!=key[temp+1]){
                temp=kmp[temp];
            }
            if(temp!=-1){
                temp++;
                kmp.push(temp);
            }
            else{
                if(key[0]===key[i]){
                    temp++;
                }
                kmp.push(temp);
            }
        }
        i++;
    }
    i=0;
    let j=0;
    let len=key.length;
    while(i<name.length){
        if(name[i]===key[j]){
            i++;
            j++;
            if(j===len){
                return true;
            }
            continue;
        }
        while(j!=0&&name[i]!=key[j]){
            j=kmp[j-1]+1;
        }
        if(name[i]===key[j]){
            i++;
            j++;
        }
        else{
            i++;
            j=0;
        }
    }
    return false;
}

export function searchWithKey(searched){
    if(!searched){
        window.location.assign("https://jaingopal07.github.io/ecommerce-clone/");
        return;
    }
    searched_products.length=0;
    products.forEach((productElement)=>{
        const pdt_name=productElement.name.toLowerCase();
        if(find(pdt_name,searched)){
            searched_products.push(productElement);
        }
    })
    
    const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searched)}`;
    window.history.pushState({}, '', newUrl);
    renderPage();
}

function search(){
    const searched=navbarElement.querySelector('.search-bar').value.toLowerCase();
    if(last_searched===searched){
        return;
    }
    last_searched=searched;
    searchWithKey(searched);
}

const navbarElement = document.querySelector('.navbar');

navbarElement.addEventListener('click', (e) => {
    if (e.target.closest('.search')) {
        search();
    }
    else if(e.target.classList.contains('hamburger-menu-header')){
        if(document.querySelector('.hamburger-menu-dropdown').style.display==='grid'){
            document.querySelector('.hamburger-menu-dropdown').style.display='none';
        }
        else{
            document.querySelector('.hamburger-menu-dropdown').style.display='grid';
        }
        
    }
});

navbarElement.addEventListener('keydown',(e)=>{
    if(e.target.id==='search-bar'){
        if(e.key==='Enter'){
            search();
        }
        else if(e.key==='Escape'){
            document.getElementById('search-bar').value='';
        }
    }
})
