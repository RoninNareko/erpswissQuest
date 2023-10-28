let cartItems = [];
let cartTotal = 0;

export default function handleCartInteractions() {
  const cart = document.querySelector(".cart");
  const products = document.querySelectorAll(".product");
  const total = document.getElementById("total");

  function updateCart() {
    let cartItemsHTML = "";
    cartTotal = 0;

    const cartItemCount = document.querySelector(".cart-item-count");
    const itemCount = cartItems.length;

    cartItemCount.textContent = itemCount;

    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      cartTotal += itemTotal;
      cartItemsHTML += `<div class="cart-item">
        <img src="${item.image.src}" alt="${
        item.name
      }" class="cart-product-image">
        ${item.name} - $${item.price} x 
        <input type="number" class="quantity" value="${
          item.quantity
        }" min="1" data-name="${item.name}">
        = $${itemTotal.toFixed(2)}
        <button class="remove-from-cart" data-name="${
          item.name
        }">Remove</button>
      </div>
    `;
    });

    total.textContent = cartTotal.toFixed(2);
    const cartItemsList = document.querySelector(".cart-items-list");

    if (!cartItems.length) {
      cartItemsList.innerHTML = `<p>Select a product</p>`;
    } else {
      cartItemsList.innerHTML = cartItemsHTML;
    }

    document.querySelectorAll(".quantity").forEach((quantityInput) => {
      quantityInput.addEventListener("input", (e) => {
        const name = e.target.getAttribute("data-name");
        const newQuantity = parseInt(e.target.value, 10);

        const itemToUpdate = cartItems.find((item) => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity = newQuantity;
          updateCart();
        }
      });
    });
  }

  function addToCart(name, price, image) {
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name, price, image, quantity: 1 });
    }
    updateCart();
  }

  function removeFromCart(name) {
    const index = cartItems.findIndex((item) => item.name === name);
    if (index !== -1) {
      cartItems.splice(index, 1);
      updateCart();
    }
  }

  products.forEach((product, index) => {
    const addToCartButton = product.querySelector(".add-to-cart");
    const productName = product.querySelector("h6 a").textContent;
    const productPriceText = product.querySelector("span span").textContent;
    const productImage = product.querySelector(".card.product .card-img-top");
    const productPrice = parseFloat(productPriceText.replace("US$", ""));
    addToCartButton.addEventListener("click", () => {
      addToCart(productName, productPrice, productImage);
    });
  });

  cart.addEventListener("click", (e) => {
    if (e.target && e.target.className === "remove-from-cart") {
      const productName = e.target.getAttribute("data-name");
      removeFromCart(productName);
    }
  });
}
