// function displayCartItems() {
//     let cartContainer = document.getElementById("cartContainer");
    
//     cartContainer.innerHTML = ""; // Clear existing content

//     let items = Object.keys(localStorage);
//     if (items.length === 0) {
//       cartContainer.innerHTML = `<div class="col-md-12">
//       <p class="text-center">Your cart is empty.</p>
//       </div>`;

//        // Hide bill section when cart is empty
//        document.getElementById("billSection").innerHTML = ""; 
//        return;
     
//     }

//     items.forEach((itemId) => {
//       let product = JSON.parse(localStorage.getItem(itemId));

//       if (product) {
//         let itemHTML = `

//                    <div class="col-6 col-md">
//           <div class="text-center"><h3>Your Cart Items</h3></div>
//           <div
//             class="row bg-body-secondary justify-content-around pt-2 ms-2"
//           >

//             <div class="card container-fluid shadow-box mb-2 position: relative;" >
//                          <div  class="row pb-2">

//                             <div  class="col-md-3">
//                                 <div class="border-1 mt-2" style="height: 120px">
//                                   <img src="${
//                                     product.image
//                                   }" class="card-img-top" alt="..." style="max-width: 100%; max-height: 100%; object-fit: contain;">
//                                 </div>
//                             </div>

                       
//                        <div  class="col-md-9">

//                         <div class="row border-bottom">
//                             <div class="card-body d-flex flex-column justify-content-between">

//                               <div>
//                                 <p class="card-title fs-5"><strong>${
//                                   product.title
//                                 }</strong></p>
//                                 <p class="card-text">${truncateText(
//                                   product.description,
//                                   50
//                                 )}</p>
//                                 <p class="card-text fs-6"><strong>Price:$</strong> ${
//                                   product.price
//                                 }</p>
//                               </div>
                               
//                                 <button onclick="removeFromCart('${itemId}')" class="btn" style="position: absolute; top: -18px; right: -15px;">
//                                     <i class="fa-solid fa-xmark"></i></button>
                             
//                             </div>
//                         </div>

//                            <div class="row d-flex flex-nowrap ps-1 cartqut">
//                                 <span class="card-title mt-1" style="width:55px">Qty:</span>
//                                  <input type="button" value="-" class="text-primary" onclick="updateQuantity('${itemId}', 'decrease')">
//                                  <input type="text" value="${
//                                    product.quantity
//                                  }" id="quantity-${itemId}" readonly>
//                                  <input type="button" value="+" class="text-primary" onclick="updateQuantity('${itemId}', 'increase')">
//                                  <div class="w-50 text-end">
//                                   <p class="card-title ps-1 mt-1 fs-6"><strong>Total: $</strong><span id="price-${itemId}">${(
//           product.price * product.quantity
//         ).toFixed(2)}</span></p>
//                                   </div>
//                            </div>

//                        </div>                
//               </div>
//           </div>
//             <!-- Cart items will be dynamically inserted here -->
//           </div>
//         </div>
            
                   
//                 `;
//         cartContainer.innerHTML += itemHTML;
       
//       }
//     });
//   }

//   //total_Bill_section
//   function displayCheckout() {
//     let items = Object.keys(localStorage);
//     let totalPrice = 0; // Initialize total price

//     items.forEach((itemId) => {
//       let product = JSON.parse(localStorage.getItem(itemId));

//       if (product) {
//         // Calculate total price for this item
//         let itemTotalPrice = product.price * product.quantity;
//         totalPrice += itemTotalPrice; // Add to the overall total price
//       }
//     });

//     // Display the total price on the right side
   
//         displayTotalPrice(totalPrice);

//   }

//   //Display total price on the right side
//     function displayTotalPrice(totalPrice) {
//          //cartContainer = document.getElementById("cartContainer");
//          cartContainer.innerHTML = `


//         <div class="col-6 col-md">
//           <div class="row bg-body-danger">
//             <div class="text-center"><h3>Bill-Section</h3></div>
//             <div
//               class="row bg-body-secondary justify-content-around pt-2 ms-2"
//             >
 
//              <div class="card container-fluid shadow-box mb-2">
//       <div class="card-body">
//                 <button type="button" class="btn btn-primary w-100">CheckOut</button>
//         <div class="text-center">
//                     <p class="card-text fs-4 mt-2"><strong>Total Bill: $${totalPrice.toFixed(
//           2
//         )}</strong></p>
//                 </div>
//       </div>
//     </div>

//               <!-- Cart items will be dynamically inserted here -->
//             </div>
//           </div>
//         </div>
//     `;
//       }
  

//   //for description trim
//   function truncateText(text, maxLength) {
//     if (text.length > maxLength) {
//       return text.substring(0, maxLength) + "...";
//     }
//     return text;
//   }

//   function removeFromCart(itemId) {
//     localStorage.removeItem(itemId);
//     displayCartItems(); // Refresh the cart after removal
//     displayCheckout();
//   }

//   window.onload = displayCartItems; // Load cart items when the page loads

//   // Update quantity and price
//   function updateQuantity(itemId, action) {
//     let product = JSON.parse(localStorage.getItem(itemId));
//     if (!product) return;

//     if (action === "increase") {
//       product.quantity += 1;
//     } else if (action === "decrease" && product.quantity > 1) {
//       product.quantity -= 1;
//     }

//     // Save updated quantity back to localStorage
//     localStorage.setItem(itemId, JSON.stringify(product));
//     //after + and - for update value
//     displayCheckout();

//     // Update the UI
//     document.getElementById(`quantity-${itemId}`).value = product.quantity;
//     document.getElementById(`price-${itemId}`).textContent = (
//       product.price * product.quantity
//     ).toFixed(2);
//   }

//   // Load cart items when the page loads
//   window.onload = displayCartItems;
//   displayCheckout();







  function displayCartItems() {
    let cartContainer = document.getElementById("cartContainer");
    let emptyContainer = document.getElementById("empty");
    let billContainer = document.getElementById("billContainer"); // Separate bill section
    cartContainer.innerHTML = ""; // Clear existing cart items
    billContainer.innerHTML = ""; // Clear bill section initially

    let items = Object.keys(localStorage);
    if (items.length === 0) {
        emptyContainer.innerHTML = `
            <div class="col-md-12">
                <p class="text-center">Your cart is empty.</p>
            </div>`;
        return; 
    }

    items.forEach((itemId) => {
        let product = JSON.parse(localStorage.getItem(itemId));

        if (product) {
            let itemHTML = `
                <div class="col-md-12">
                    <div class="card container-fluid shadow-box mb-2" >
                        <div class="row">
                            <div class="col-md-3">
                                <div class="border-1 mt-2" style="height: 120px">
                                    <img src="${product.image}" class="card-img-top" alt="..." style="max-width: 100%; max-height: 100%; object-fit: contain;">
                                </div>
                            </div>

                            <div class="col-md-9">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <p class="card-title fs-5"><strong>${product.title}</strong></p>
                                        <p class="card-text">${truncateText(product.description, 50)}</p>
                                        <p class="card-text fs-6"><strong>Price: $</strong>${product.price}</p>
                                    </div>
                                    <button onclick="removeFromCart('${itemId}')" class="btn position-absolute" style="top: -18px; right: -15px;">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <div class="row d-flex flex-nowrap ps-1 cartqut">
                                    <span class="card-title mt-1 ms-2" style="width:55px">Qty:</span>
                                    <input type="button" value="-" class="text-primary" onclick="updateQuantity('${itemId}', 'decrease')">
                                    <input type="text" value="${product.quantity}" id="quantity-${itemId}" readonly>
                                    <input type="button" value="+" class="text-primary" onclick="updateQuantity('${itemId}', 'increase')">
                                    <div class="w-50 text-end">
                                        <p class="card-title ps-1 mt-1 fs-6"><strong>Total: $</strong><span id="price-${itemId}">${(product.price * product.quantity).toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            cartContainer.innerHTML += itemHTML;
        }
    });

    displayCheckout(); // Call checkout display function after rendering cart items
}

// Function to display the checkout section if cart is not empty
function displayCheckout() {
    let billContainer = document.getElementById("billContainer");
    let items = Object.keys(localStorage);
    let totalPrice = 0;

    if (items.length === 0) {
        billContainer.innerHTML = ""; // Clear bill section if cart is empty
        return;
    }

    items.forEach((itemId) => {
        let product = JSON.parse(localStorage.getItem(itemId));
        if (product) {
            totalPrice += product.price * product.quantity;
        }
    });

    billContainer.innerHTML = `
        <div class="col-md-12 d-flex justify-content-end">
            <div class="row bg-body-danger w-50">
               
                <div class="row bg-body-secondary  pt-2 ms-2">
                    <div class="card container-fluid shadow-box mb-2">
                        <div class="card-body">
                           
                            <div class="text-center">
                                <p class="card-text fs-4 mt-2"><strong>Total Bill: $${totalPrice.toFixed(2)}</strong></p>
                            </div>
                             <button type="button" class="btn btn-primary w-100">CheckOut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// Function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    localStorage.removeItem(itemId);
    displayCartItems(); // Refresh cart
}

// Function to update quantity and price
function updateQuantity(itemId, action) {
    let product = JSON.parse(localStorage.getItem(itemId));
    if (!product) return;

    if (action === "increase") {
        product.quantity += 1;
    } else if (action === "decrease" && product.quantity > 1) {
        product.quantity -= 1;
    }

    localStorage.setItem(itemId, JSON.stringify(product));

    document.getElementById(`quantity-${itemId}`).value = product.quantity;
    document.getElementById(`price-${itemId}`).textContent = (product.price * product.quantity).toFixed(2);

    displayCheckout(); // Update total bill
}

// Load cart items and bill section on page load
window.onload = function () {
    displayCartItems();
};
