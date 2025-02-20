//approach-1
// let cardContainer = document.getElementById("cardContainer");
// let url = "https://fakestoreapi.com/products";
// let response = fetch(url);
// var productdata=[];
// response.then((v)=>{
//       return v.json()
// }).then((contests)=>{
       
//        console.log("inner one",productdata)
//        console.log("length ",productdata.length)
//        ihtml = ""

//        for(item in contests){
//         console.log(contests[item])
//         productdata.push(contests[item]);
//         ihtml +=`
//         <div class="card shadow-box mb-2" style="width: 18rem;">
//                   <div class="border-1 mt-2" style="height: 120px">  <img src="${contests[item].image}" class="card-img-top" alt="..." style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>
//                   <div class="card-body d-flex flex-column justify-content-between">
//                    <div>
//                     <p class="card-title"><strong>Item Name:</strong>  ${contests[item].title}</p>
//                     <p class="card-text mb-1"><strong>Description:</strong> ${contests[item].description}</p>
//                     <p class="card-text mt-1"><strong>Price:</strong> ${contests[item].price}</p>
//                    </div>
//                    <div> <a href="${contests[item].url}" class="btn btn-primary">Add to Cart</a></div>
//                   </div>
//                 </div>
//         `
//        }
//        cardContainer.innerHTML = ihtml;
// })




//  function searchValue(){
//     debugger;
//     if(productdata.length>0){
//         var search=document.getElementById("search").value;
//         productdatas= productdata.filter((item)=>item.title.includes(search))
//         ihtml='';
//         for(item in productdatas){
           
//             ihtml +=`
//             <div class="card shadow-box mb-2" style="width: 18rem;">
//                       <div class="border-1 mt-2" style="height: 120px">  <img src="${productdatas[item].image}" class="card-img-top" alt="..." style="max-width: 100%; max-height: 100%; object-fit: contain;"></div>
//                       <div class="card-body d-flex flex-column justify-content-between">
//                        <div>
//                         <p class="card-title"><strong>Item Name:</strong>  ${productdatas[item].title}</p>
//                         <p class="card-text mb-1"><strong>Description:</strong> ${productdatas[item].description}</p>
//                         <p class="card-text mt-1"><strong>Price:</strong> ${productdatas[item].price}</p>
//                        </div>
//                        <div> <a href="${productdatas[item].url}" class="btn btn-primary">Add to Cart</a></div>
//                       </div>
//                     </div>
//             `
//            }
//            cardContainer.innerHTML = ihtml;
          
//     }
//  }





//appoarch-2
let cardContainer = document.getElementById("cardContainer");
let url = "https://fakestoreapi.com/products";
let productdata = [];


function generateHTML(data) {
    let ihtml = "";
    for (let item of data) {
        ihtml += `
        <div class="card shadow-box mb-2" style="width: 18rem;">
            <div class="border-1 mt-2" style="height: 120px">
                <img src="${item.image}" class="card-img-top" alt="..." style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <p class="card-title"><strong>Item Name:</strong> ${item.title}</p>
                    <p class="card-text mb-1"><strong>Description:</strong> ${item.description}</p>
                    <p class="card-text mt-1"><strong>Price:</strong> ${item.price}</p>
                </div>
                <div>
                    <a href="${item.url}" class="btn btn-primary">Add to Cart</a>
                </div>
            </div>
        </div>
        `;
    }
    return ihtml;
}

// Fetch data from the API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        productdata = data; // Store the fetched data in the global variable
        console.log("Fetched data:", productdata);
        console.log("Number of items:", productdata.length);

        // Display all products initially
        cardContainer.innerHTML = generateHTML(productdata);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

// Search function
async function searchValue() {
    if (productdata.length > 0) {
        let search = document.getElementById("search").value.toLowerCase(); // Case-insensitive search
        let filteredData = productdata.filter((item) =>
            item.title.toLowerCase().includes(search) // Use includes() for partial matches
        );

        if (filteredData.length > 0) {
            // Display filtered products
            cardContainer.innerHTML = generateHTML(filteredData);
        } else {
            // Display a message if no items match the search
            cardContainer.innerHTML = `<p class="text-center">No items found for "${search}".</p>`;
        }
    } else {
        console.log("Product data is not yet available.");
    }
}