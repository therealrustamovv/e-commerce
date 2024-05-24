// get raiting
function getRating(rating) {
  let res = "";
  let star_count = 0;
  let full_star = parseInt(rating);
  let rest_star = rating - full_star;
  star_count = full_star;
  res = Array(full_star)
    .fill("<img  src='../assets/images/full-star.svg'>")
    .join("");
  if (0.25 <= rest_star && rest_star <= 0.5) {
    star_count++;
    res += "<img src='../assets/images/half-star.svg'>";
  }
  if (0.5 < rest_star) {
    star_count++;
    res += "<img src='./assets/images/full-star.svg'>";
  }
  free_star = 5 - star_count;
  res += Array(free_star)
    .fill("<img src='../assets/images/free-star.svg'>")
    .join("");
  return res;
}

// favorite
const favouriteNumber = document.querySelector(".cart-favourite");
const favouriteNumberMobile = document.querySelector(".cart-favourite-mobile");

let favoriteProductsJson = localStorage.getItem(FAVOURITE);
let favoriteProducts = JSON.parse(favoriteProductsJson) || [];

function getFavoriteNumber() {
  favouriteNumber.textContent = favoriteProducts.length;
  favouriteNumberMobile.textContent = favoriteProducts.length;
}
getFavoriteNumber();
// end

function getProductsCard(
  { id, name, category, description, price, rating, discount, images },
  which
) {
  let productInCart = cartQuantityProducts.find((pr) => pr.id === id);

  let checkFavourite = favoriteProducts.find((pr) => pr.id === id);

  return `
    <div class="action__card">
      <div class="action__card__top">
        <a href="./product.html">
          <img onclick='getImg(${id})' src=".${
    images[0]
  }" alt="${name}" class="action__card__img">
        </a>
        <button onclick="addToFavourite(${id}, '${which}')" class="action__btns ${
    checkFavourite ? "action__btn__danger" : "action__btn"
  }">
        ${
          checkFavourite
            ? `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#414141" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>`
        }
        </button>
      </div>
      <div class="action__card__bottom">
        <div class="action__card__center">
          <div class="action__card__exam">
            <h2 class="action__card__exam__title">${price}₽</h2>
            <p class="action__card__exam__text">С картой</p>
            <h3 class="action__card__exam__name">${name}</h3>
          </div>
          <div class="action__card__exam">
            <h2 class="action__card__exam__title2">50,50₽</h2>
            <p class="action__card__exam__text">Обычная</p>
          </div>
        </div>
          <h2 class="action__card__title">${description}</h2>
          <div class="action__card__stars">
            <div class="raiting">
              ${getRating(rating)}
            </div>
          </div>
         ${
           productInCart
             ? `<div class="btn-group" role="group">
                      <button type="button" class="btn btn-success" onclick="decreaseQuantity(${id})">-</button>
                      <span type="button" class="btn btn-primary">${productInCart.quantity}</span>
                      <button type="button" class="btn btn-success" onclick="increaseQuantity(${id})">+</button>
                    </div>`
             : `<button onclick="addToCart(${id})" class="action__card__btn">В корзину</button>`
         }
      </div>
    </div>
  `;
}

function getImg(id) {
  localStorage.setItem("product", id);
}

// favourite start
function addToFavourite(id, which) {
  let checkFavourite = favoriteProducts.find((pr) => pr.id === id);
  let product = products.find((pr) => pr.id === id);
  if (checkFavourite) {
    favoriteProducts = favoriteProducts.filter((pr) => pr.id !== id);
  } else {
    favoriteProducts.push(product);
  }
  localStorage.setItem(FAVOURITE, JSON.stringify(favoriteProducts));
  if (which === "all") {
    getProducts();
  } else if (which === "favourite") {
    getFavouriteProducts();
  }
  getFavoriteNumber();
}
