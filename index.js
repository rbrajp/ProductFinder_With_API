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
let cartItems = []; // To store items added to the cart

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
                    <p class="card-text">${truncateText(item.description, 100)}</p>
                    <p class="card-text mt-1"><strong>Price:$</strong> ${item.price}</p>
                </div>
               
                 <div>
                    <button onclick="addToCart(${item.id})" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
    }
    return ihtml;
}

//for description trim
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } 
     return text;
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

//for Cart-icon funtionality

// Function to add an item to the cart
// function addToCart(productId) {
//     // Find the product in the productdata array
//     let product = productdata.find((item) => item.id === productId);
//     console.log("hhh", product)
//     const productStr = JSON.stringify(product);//
//     localStorage.setItem(productId, productStr)//
//     if (product) {
//         // Add the product to the cart
//         cartItems.push(product);
//         // Update the cart icon
//         updateCartIcon();
//         console.log("Added to cart:", product.title);
//     }
// }


function addToCart(productId) {
    let product = productdata.find((item) => item.id === productId);

    if (product) {
        product.quantity=1;
        const productStr = JSON.stringify(product);
        localStorage.setItem(productId, productStr);
        updateCartIcon();
        console.log("Added to cart:", product.title);
    }
}



// function updateCartIcon() {
//     let cartCount = Object.keys(localStorage).length; // Count items in localStorage
//     let cartIcon = document.getElementById("cart-icon");
//     cartIcon.innerHTML = `<a href="Cart.html"><i class="fa-solid fa-cart-shopping"></i> <span class="cart-count">${cartCount}</span></a>`;
// }

// window.onload = updateCartIcon;


//Function to update the cart icon
function updateCartIcon() {
    let cartCount = Object.keys(localStorage).length; // Count items in localStorage
    let cartIcon = document.getElementById("cart-icon");
    // Display the number of items in the cart
    cartIcon.innerHTML = `<a href="Cart.html"><i class="fa-solid fa-cart-shopping"></i> <span class="cart-count">${cartCount}</span></a>`;
}


window.onload = updateCartIcon;





