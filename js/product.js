const actionBoxFirst = document.querySelector(".action__box__first");

const discountProducts = products.filter((el) => el.discount).slice(-4);
const actionBoxSecond = document.querySelector(".action__box__second");
const newProducts = products.slice(-4);
const actionBoxThird = document.querySelector(".action__box__third");
const broadRow = document.querySelector(".broad__row");
const headerYou = document.querySelector(".header__you");
const headerCategorie = document.querySelector(".header__categorie");
let curImg = 0;
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
    res += "<img src='../assets/images/full-star.svg'>";
  }
  free_star = 5 - star_count;
  res += Array(free_star)
    .fill("<img src='../assets/images/free-star.svg'>")
    .join("");
  return res;
}

let save = JSON.parse(localStorage.getItem("product"));

function getHeaderProduct({
  id,
  name,
  category,
  description,
  price,
  rating,
  discount,
  images,
}) {
  let productInCart = cartQuantityProducts.find((pr) => pr.id === id);

  localStorage.setItem("productIs", name);
  localStorage.setItem("productCategory", category);

  headerYou.textContent = localStorage.getItem("productIs");
  headerCategorie.textContent = localStorage.getItem("productCategory");

  return `
    <div class="broad__info">
          <h2 class="broad__title">
            ${description}
          </h2>
          <div class="broad__top">
            <p class="broad__top__text">${category}</p>
            <div class="broad__top__exam">
              <div class="stars">
                ${getRating(rating)}
              </div>
              <p class="broad__top__underline">${rating} отзыва</p>
            </div>
            <div class="broad__top__end">
              <div class="broad__top__card">
                <i class="fa-solid fa-share-nodes broad__top__icon"></i>
                <h2 class="broad__top__title">Поделиться</h2>
              </div>
              <div class="broad__top__card">
                <i class="fa-solid fa-heart broad__top__icon"></i>
                <h2 class="broad__top__title">В избраное</h2>
              </div>
            </div>
          </div>
          <div class="broad__bottom">
            <div class="broad__left">
              <div class="broad__left__row">
                <img onclick="checkImg(0)" src=".${
                  images[0]
                }" alt="${name}" class="broad__left__min" />
                <img onclick="checkImg(1)" src=".${
                  images[1]
                }" alt="${name}" class="broad__left__min" />
                <img onclick="checkImg(2)" src=".${
                  images[2]
                }" alt="${name}" class="broad__left__min" />
                <img onclick="checkImg(3)" src=".${
                  images[3]
                }" alt="${name}" class="broad__left__min" />
                <img onclick="checkImg(4)" src=".${
                  images[4]
                }" alt="${name}" class="broad__left__min" />
              </div>
              <div class="broad__max">
                <img script src=".${
                  images[curImg]
                }" alt="product-max" class="broad__left__max" />
                <p class="broad__reg">-20%</p>
              </div>
            </div>
            <div class="broad__right">
              <div class="broad__right__column">
                <div class="broad__right__card">
                  <h2 class="broad__right__title">${price * 2}₽</h2>
                  <p class="broad__right__text">Обычная цена</p>
                </div>
                <div class="broad__right__card2">
                  <h2 class="broad__right__title2">${price}₽</h2>
                  <p class="broad__right__text">
                    С картой Северяночки
                    <i class="fa-solid fa-circle-info broad__right__icon"></i>
                  </p>
                </div>
              </div>
                ${
                  productInCart
                    ? `<div class="broad-group" role="group">
                      <button type="button" class="btn broad-success" onclick="decreaseQuantity(${id})">-</button>
                      <span type="button" class="btn broad-primary">${productInCart.quantity}</span>
                      <button type="button" class="btn broad-success" onclick="increaseQuantity(${id})">+</button>
                    </div>`
                    : `<button onclick="addToCart(${id})" class="broad__btn">
                  <i class="fa-solid fa-cart-shopping broad__btn__icon"></i>
                    <p class="broad__btn__text">В корзину</p>
                    </button>`
                }
              <div class="broad__pas">
                <div class="broad__pas__card">
                  <img src="../assets/images/atom.png" alt="atom" class="broad__pas__img" />
                  <h4 class="broad__pas__h4">
                    Вы получаете <strong>10 бонусов</strong>
                  </h4>
                </div>
                <div class="broad__pas__card">
                  <i class="fa-regular fa-bell-slash broad__pas__icon"></i>
                  <p class="broad__pas__text">Уведомить о снижении цены</p>
                </div>
              </div>
              <div class="broad__box">
                <div class="broad__box__card">
                  <h3 class="broad__box__h3">Бренд</h3>
                  <h2 class="broad__box__title">ПРОСТОКВАШИНО</h2>
                </div>
                <div class="broad__box__card">
                  <h3 class="broad__box__h3">Страна производителя</h3>
                  <h2 class="broad__box__title">Россия</h2>
                </div>
                <div class="broad__box__card">
                  <h3 class="broad__box__h3">Упаковка</h3>
                  <h2 class="broad__box__title">180 г</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;
}

function checkImg(num) {
  curImg = +num;
  getHomeProducts();
}

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
        <p class="action__card__reg"></p>
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

function getHomeProducts() {
  actionBoxFirst.innerHTML = "";
  actionBoxThird.innerHTML = "";
  broadRow.innerHTML = "";
  let findPr = products.filter((el) => el.id === save);
  findPr.map((el) => {
    broadRow.innerHTML += getHeaderProduct(el);
  });
  discountProducts.map((el) => {
    actionBoxFirst.innerHTML += getProductsCard(el, "favourite");
  });

  const popularProducts = products
    .toSorted((a, b) => a.rating - b.rating)
    .slice(-4)
    .forEach(
      (el) => (actionBoxThird.innerHTML += getProductsCard(el, "favourite"))
    );
  let actionFirstFour = actionBoxFirst.querySelectorAll(".action__card__reg");
  for (let i = 0; i < actionFirstFour.length; i++) {
    actionFirstFour[i].textContent = "50%";
  }
}

getHomeProducts();

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
    getHomeProducts();
  } else if (which === "favourite") {
    getHomeProducts();
  }
  getFavoriteNumber();
}

// cart start
function addToCart(id) {
  let productFound = products.find((pr) => pr.id === id);
  let productsInCart = cartQuantityProducts.find((pr) => pr.id === id);

  if (productsInCart) {
    cartQuantityProducts = cartQuantityProducts.map((pr) => {
      if (pr.id === id) {
        pr.quantity++;
      }
      return pr;
    });
  } else {
    productFound.quantity = 1;
    cartQuantityProducts.push(productFound);
  }

  getCardQuantity();
  getHomeProducts();

  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}

function increaseQuantity(id) {
  cartQuantityProducts = cartQuantityProducts.map((pr) => {
    if (pr.id === id) {
      pr.quantity++;
    }
    return pr;
  });
  getCardQuantity();
  getHomeProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
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
  }

  getCardQuantity();
  getHomeProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}
// cart end
