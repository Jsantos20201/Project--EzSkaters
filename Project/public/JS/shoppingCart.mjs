import { getFromLocalStorage } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getFromLocalStorage("cartItems");
  renderCartItems(cartItems);
}

function renderCartItems(items) {
  const cartContainer = document.querySelector(".cart-items");

  if (items && items.length > 0) {
    const cartItemsHTML = items
      .map((item) => {
        // Check if 'name' and 'price' properties exist and are not null
        if (item && item.name && item.price) {
          return `
          <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <p>Name: ${item.name}</p>
                <p>Price: $${item.price}</p>
                <p>Qty: ${item.quantity}</p>
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
              </div>
          </div>
          `;
        }
        // Return an empty string if necessary properties are missing
        return '';
      })
      .join("");

    // Calculate total cost and tax
    const totalPrice = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const taxRate = 0.1; // Assuming 10% tax rate
    const tax = totalPrice * taxRate;
    const totalWithTax = totalPrice + tax;

    // HTML content for displaying total cost and tax
    const totalHTML = `
      <div class="total-section">
        <p>Total: $${totalPrice.toFixed(2)}</p>
        <p>Tax (10%): $${tax.toFixed(2)}</p>
        <p>Total with Tax: $${totalWithTax.toFixed(2)}</p>
        <a href="checkout.html" class="checkout-btn">Checkout</a>
      </div>
    `;

    // Set the HTML content of the cart container
    cartContainer.innerHTML = cartItemsHTML + totalHTML; // Added totalHTML here

    // Add event listeners to remove items from the cart
    const removeButtons = cartContainer.querySelectorAll(".remove-from-cart-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.dataset.id;
        removeFromCart(itemId);
        // Remove the entire item div when a product is removed
        button.closest('.cart-item').remove();
      });
    });
  } else {
    // If cart is empty, display a message
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}
 
 function removeFromCart(itemId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const removedItem = cartItems.find((item) => item.id === itemId);

  const updatedCart = cartItems.filter((item) => item.id !== itemId);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));

  const cartContainer = document.querySelector(".cart-items");
  const itemToRemove = cartContainer.querySelector(`[data-id="${itemId}"]`);
  const imageToRemove = cartContainer.querySelector(`[src="${removedItem.image}"]`);

  if (itemToRemove && itemToRemove.parentElement) {
    itemToRemove.parentElement.remove();
  }
  if (imageToRemove) {
    const imageParent = imageToRemove.parentElement;
    if (imageParent) {
      imageParent.remove();
    }
  }
}