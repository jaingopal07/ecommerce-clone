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



function search(){
    const searched=document.querySelector('.search-bar').value.toLowerCase();
    if(last_searched===searched){
        return;
    }
    last_searched=searched;
    if(!searched){
        window.location.href="https://jaingopal07.github.io/amazon-clone/";
        return;
    }
    const searched_products=[];
    products.forEach((productElement)=>{
        const pdt_name=productElement.name.toLowerCase();
        if(find(pdt_name,searched)){
            searched_products.push(productElement);
        }
    })
    
    if(searched_products.length===0){
        document.querySelector('.empty-message').style.display='block';
    }

    makeProductGrid(searched_products);
}

document.querySelector('.search').addEventListener('click',()=>{
    search();
})

document.querySelector('.hamburger-menu-header').addEventListener('click',()=>{
    document.querySelector('.hamburger-menu-dropdown').style.display='grid';
});

document.getElementById('search-bar').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        search();
    }
    else if(event.key==='Escape'){
        document.getElementById('search-bar').value='';
    }
})
