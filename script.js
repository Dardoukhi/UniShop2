
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
closeClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;

  const cartItems = cartContent.querySelectorAll(".cart-box");

  for (let item of cartItems) {
    if (item.querySelector(".cart-product-title").textContent === productTitle) {
      alert("This item is already in the cart.");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img"> 
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quantity">
        <button id="decrement">-</button>
        <span class="number">1</span>
        <button id="increment">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>`;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
  });

  cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = Number(numberElement.textContent);

    if (event.target.id === "decrement" && quantity > 1) {
      quantity--;
    } else if (event.target.id === "increment") {
      quantity++;
    }

    numberElement.textContent = quantity;
    updateTotalPrice();
  });

  updateCartCount(1);
  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPrixElement = document.querySelector(".total-price");
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");

    const price = Number(priceElement.textContent.replace("DH", "").replace(",", "").trim());
    const quantity = Number(quantityElement.textContent);

    total += price * quantity;
  });

  totalPrixElement.textContent = `${total} DH`;

  // UPDATE SHOP TOTAL
  document.querySelector(".shop-total-price").textContent = `${total} DH`;
};

let catItemCount = 0;

const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-count");

  catItemCount += change;

  if (catItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = catItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const searchToggle = document.querySelector("#search-toggle");
const searchInput = document.querySelector("#search-input");
const searchClose = document.querySelector("#search-close");
const products = document.querySelectorAll(".product-box");

searchToggle.addEventListener("click", () => {
  searchInput.classList.add("active");
  searchClose.classList.add("active");
  searchInput.focus();
});

searchClose.addEventListener("click", () => {
  searchInput.classList.remove("active");
  searchClose.classList.remove("active");
  searchInput.value = "";

  products.forEach(product => {
    product.style.display = "";
  });
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  products.forEach(product => {
    const productName = product.querySelector(".product-title").textContent.toLowerCase();

    product.style.display = productName.includes(searchValue) ? "" : "none";
  });
});

// PRODUCT FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const filterProducts = document.querySelectorAll(".product-box");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    const filterValue = button.dataset.filter;

    filterProducts.forEach(product => {
      const productCategory = product.dataset.category;

      if (filterValue === "all" || productCategory === filterValue) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });

  });
});

// SHOP TOTAL BUTTON

const shopTotalButton = document.querySelector(".shop-total-btn");

shopTotalButton.addEventListener("click", () => {
  cart.classList.add("active");
});
