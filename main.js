// get the total product price

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
let search = document.getElementById('search');

// make sure we get the right inputs
// console.log(title, price, taxes, ads, discount, count, submit)
function totalPrice(){

    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{

        total.innerHTML = '';
        total.style.background = '#af1919';
    }
}

// create function
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
        
    }

    if(title.value != '' && price.value != '' && category.value != '' && count.value < 100){
        if (mood === 'create'){
            if (newpro.count > 1){
                for(let i =0; i < newpro.count; i++)
                {
                    dataPro.push(newpro);
                }
            }else{
                dataPro.push(newpro);
            }
    
        }else{
            dataPro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}


// // clear data function
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}


// show data in the table function
function showData(){
    totalPrice()
    let table = '';
    for(let i = 0; i < dataPro.length; i++)
    {
        table += `
           <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>

            <td><button onclick = 'updateData( ${i})' id="update">update</button></td>

            <td><button onclick = 'deleteData( ${i} )' id="delete">delete</button></td>
          </tr>
          `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0){

        deleteAll.innerHTML = `
        <button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
    }else{
        deleteAll.innerHTML = '';
    }
    
}
showData();


// delete data function
function deleteData(i){

    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

// delete all data
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}

// update data
function updateData(i){
    
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    totalPrice()
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    category.value = dataPro[i].category
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}

// search function

// 1- define search mood

let searchMood = 'title';

function getSearchMood(id){
    if (id == 'searchtitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.focus();
    search.placeholder = 'search by ' + searchMood;
    search.value = '';
    showData();

}

// 2- do search

function searchElements(){

    let table = '';

    dataPro.forEach((item, i) => {
        if ((searchMood === 'title' && item.title.toLowerCase().includes(search.value.toLowerCase())) ||
            (searchMood !== 'title' && item.category.toLowerCase().includes(search.value.toLowerCase()))) {
                
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td>${item.taxes}</td>
                    <td>${item.ads}</td>
                    <td>${item.discount}</td>
                    <td>${item.total}</td>
                    <td>${item.category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `;
        }
    });
    document.getElementById('tbody').innerHTML = table;
        
    // for(let i = 0; i < dataPro.length; i++){


    //     if (searchMood == 'title'){
        

    //         if(dataPro[i].title.includes(search.value.toLowerCase())){

    //             table += `
    //                 <tr>
    //                     <td>${i}</td>
    //                     <td>${dataPro[i].title}</td>
    //                     <td>${dataPro[i].price}</td>
    //                     <td>${dataPro[i].taxes}</td>
    //                     <td>${dataPro[i].ads}</td>
    //                     <td>${dataPro[i].discount}</td>
    //                     <td>${dataPro[i].total}</td>
    //                     <td>${dataPro[i].category}</td>

    //                     <td><button onclick = 'updateData( ${i})' id="update">update</button></td>

    //                     <td><button onclick = 'deleteData( ${i} )' id="delete">delete</button></td>
    //                 </tr>
    //                 `;

    //         }
    //     }else{
    //         if(dataPro[i].category.includes(search.value.toLowerCase())){

    //             table += `
    //                 <tr>
    //                     <td>${i}</td>
    //                     <td>${dataPro[i].title}</td>
    //                     <td>${dataPro[i].price}</td>
    //                     <td>${dataPro[i].taxes}</td>
    //                     <td>${dataPro[i].ads}</td>
    //                     <td>${dataPro[i].discount}</td>
    //                     <td>${dataPro[i].total}</td>
    //                     <td>${dataPro[i].category}</td>

    //                     <td><button onclick = 'updateData( ${i})' id="update">update</button></td>

    //                     <td><button onclick = 'deleteData( ${i} )' id="delete">delete</button></td>
    //                 </tr>
    //                 `;
    //         }
    //     }   
    // }
    
}