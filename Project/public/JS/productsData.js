import { setInLocalStorage, getFromLocalStorage } from "./utils.mjs";

// Function to fetch and combine product data from three JSON files
async function fetchAndCombineData() {
  try {
    const responseGear = await fetch("/public/json/gear.json");
    const gearData = await responseGear.json();

    const responseSkateboards = await fetch("/public/json/skateboard.json");
    const skateboardsData = await responseSkateboards.json();

    const responseAccessories = await fetch("/public/json/accessories.json");
    const accessoriesData = await responseAccessories.json();

    // Combine data from all three categories
    const combinedData = [...gearData, ...skateboardsData, ...accessoriesData];

    // Store the combined data in localStorage
    setInLocalStorage("combinedProductsData", combinedData);
    console.log("Combined products data stored in localStorage");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
}

// Call the function to fetch and combine data
fetchAndCombineData();

const combinedProductsData = getFromLocalStorage("combinedProductsData");

// Select the container where products will be displayed
const productsContainer = document.getElementById("products-container");

// Function to create HTML elements for each product
function displayProducts() {
  combinedProductsData.forEach((product) => {
    // Create elements for each product
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Add product details to the HTML
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart-btn" 
        data-product-id="${product.id}" 
        data-product-name="${product.name}" 
        data-product-price="${product.price}"
        data-product-image="${product.image}"
      >Add to Cart</button>
    `;

    // Append the product element to the container
    productsContainer.appendChild(productDiv);

    // Handle "Add to Cart" button click
    const addToCartBtn = productDiv.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      // Add your logic here to handle adding the product to the cart
      // This could involve updating local storage or triggering a cart-related function
      console.log(`Added ${product.name} to cart`);
    });
  });
}

// Call the function to display products
displayProducts();

// Function to filter products based on category
function filterProducts(category) {
  // Retrieve combined products data from local storage
  const combinedProductsData = getFromLocalStorage("combinedProductsData");

  // Filter products based on the selected category
  const filteredProducts = category === 'all' ? combinedProductsData : combinedProductsData.filter(product => product.category === category);

  // Clear existing products from the container
  productsContainer.innerHTML = '';

  // Display filtered products in the UI
  filteredProducts.forEach(product => {
    // Create elements for each product
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Add product details to the HTML (same as your displayProducts function)

    // Append the product element to the container
    productsContainer.appendChild(productDiv);

    // Handle "Add to Cart" button click
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      // Add your logic here to handle adding the product to the cart
      // This could involve updating local storage or triggering a cart-related function
      console.log(`Added ${product.name} to cart`);
    });

    productDiv.appendChild(addToCartBtn);
  });
}

// Event listener for changes in the filter dropdown
document.getElementById("category-filter").addEventListener("change", function() {
  const selectedCategory = this.value;
  filterProducts(selectedCategory);
});

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Add event listener to each button
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const productName = button.getAttribute("data-product-name");
    const productPrice = button.getAttribute("data-product-price");
    const productImageURL = button.getAttribute("data-product-image");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = cartItems.findIndex((item) => item.id === productId);

    if (existingItemIndex === -1) {
      cartItems.push({ 
        id: productId, 
        name: productName, 
        price: productPrice,
        quantity: 1,
        image: productImageURL
      });
    } else {
      cartItems[existingItemIndex].quantity++;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    console.log(`Added ${productName} to cart`);
  });
});