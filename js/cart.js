const cartProductsRow = document.querySelector(".cart-products");
const amount = document.querySelector(".amount");
const priceInfo = document.querySelector(".products__info");
const empty = document.querySelector(".empty_basket");
const totalPriceElement = document.querySelector("#total-amout");
const bookingButton = document.getElementById("booking");
const wholeProduct = document.querySelector(".whole-product");
const totalAmount1 = document.getElementById("total-amout-1");
const totalAmount2 = document.getElementById("total-amout-2");
const checkBoxCart = document.querySelector(".cart__order");

function getCartCard({ id, name, images, quantity, description, price }) {
  return `
    <div class="product">
    <label class="containerr">
        <input type="checkbox">
        <svg viewBox="0 0 64 64" height="2em" width="2em">
          <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
        </svg>
        <!-- <p>Выделить всё</p> -->
    </label>
    <div class="product_img">
        <!-- content -->
        <img src=".${images[0]}" alt="${name}">
    </div>
    <div class="product_info">
        <div class="title">
            <h4>${description}</h4>
            <p class="price">${price}₽ <span>за шт.</span></p>
        </div>
    </div>
    <div class="adding_card_left">
    <div class="quantity-field" >
    <button 
      class="value-button decrease-button" 
      onclick="decreaseQuantity(${id})" 
      title="Delete">-</button>
      <div class="number">${quantity}</div>
    <button 
      class="value-button increase-button" 
      onclick="increaseQuantity(${id})"
      title="Add"
    >+
    </button>
        <div class="main_price">
            <p class="display_price">${price}
                ₽</p>
        </div>
    </div>
  </div>
`;
}

function getCartProducts() {
  cartProductsRow.innerHTML = "";
  cartQuantityProducts.map((pr) => {
    cartProductsRow.innerHTML += getCartCard(pr);
  });
}

getCartProducts();

//totalprice
function getTotalPrice() {
  let totalPrice = 0;
  cartQuantityProducts.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice;
}
getTotalPrice();

bookingButton.addEventListener("click", function () {
  const totalPrice = getTotalPrice();

  if (totalPrice < 1000) {
    alert("Total price should be 1000 or more to proceed with booking.");
  } else {
    window.open("./delivering.html");
  }
});

function checkboxCart() {
  checkBoxCart.classList.toggle("animation_bottom");
}

// cartLength
function getCartLength() {
  wholeProduct.innerHTML = cartQuantityProducts.length;
  if (cartQuantityProducts.length === 0) {
    empty.classList.add("view");
  }
  if (cartQuantityProducts.length === 0) {
    priceInfo.classList.add("remove");
  }

  amount.textContent = cartQuantityProducts.length;

  const totalPrice = getTotalPrice();
  totalAmount1.innerHTML = totalPrice;
  totalAmount2.innerHTML = totalPrice;
  totalPriceElement.innerHTML = totalPrice;
}

getCartLength();

function increaseQuantity(id) {
  cartQuantityProducts = cartQuantityProducts.map((pr) => {
    if (pr.id === id) {
      pr.quantity++;
    }
    return pr;
  });
  getCardQuantity();
  getCartProducts();
  getCartLength();

  localStorage.setItem(CART, JSON.stringify(cartQuantityProducts));

  const totalPrice = getTotalPrice();
  totalAmount1.innerHTML = totalPrice;
  totalAmount2.innerHTML = totalPrice;
  totalPriceElement.innerHTML = totalPrice;
}

function decreaseQuantity(id) {
  let productInCart = cartQuantityProducts.find((pr) => pr.id === id);
  if (productInCart.quantity === 1) {
    cartQuantityProducts = cartQuantityProducts.filter((pr) => pr.id !== id);
  } else {
    cartQuantityProducts = cartQuantityProducts.map((pr) => {
      if (pr.id === id) {
        pr.quantity--;
      }
      return pr;
    });
    getCardQuantity();
    getCartProducts();
    getCartLength();
  }

  localStorage.setItem(CART, JSON.stringify(cartQuantityProducts));
  getCardQuantity();
  getCartProducts();
  getCartLength();

  const totalPrice = getTotalPrice();
  totalAmount1.innerHTML = totalPrice;
  totalAmount2.innerHTML = totalPrice;
  totalPriceElement.innerHTML = totalPrice;
}
