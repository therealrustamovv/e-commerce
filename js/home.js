const actionBoxFirst = document.querySelector(".action__box__first");

const discountProducts = products.filter((el) => el.discount).slice(-4);
const actionBoxSecond = document.querySelector(".action__box__second");
const newProducts = products.slice(-4);
const actionBoxThird = document.querySelector(".action__box__third");

// get raiting
function getRating(rating) {
  let res = "";
  let star_count = 0;
  let full_star = parseInt(rating);
  let rest_star = rating - full_star;
  star_count = full_star;
  res = Array(full_star)
    .fill("<img  src='./assets/images/full-star.svg'>")
    .join("");
  if (0.25 <= rest_star && rest_star <= 0.5) {
    star_count++;
    res += "<img src='./assets/images/half-star.svg'>";
  }
  if (0.5 < rest_star) {
    star_count++;
    res += "<img src='./assets/images/full-star.svg'>";
  }
  free_star = 5 - star_count;
  res += Array(free_star)
    .fill("<img src='./assets/images/free-star.svg'>")
    .join("");
  return res;
}

// cart start
const cartQuantity = document.querySelector(".cart-quantity");
const cartQuantityMobile = document.querySelector(".cart-quantity-mobile");

let cartJson = localStorage.getItem("cart");

let cartQuantityProducts = JSON.parse(cartJson) || [];

function getCardQuantity() {
  cartQuantity.textContent = cartQuantityProducts.length;
  cartQuantityMobile.textContent = cartQuantityProducts.length;
}

getCardQuantity();
// end

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
        <a href="./pages/product.html">
          <img onclick='getImg(${id})' src="${
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
  actionBoxSecond.innerHTML = "";
  actionBoxThird.innerHTML = "";
  discountProducts.map((el) => {
    actionBoxFirst.innerHTML += getProductsCard(el, "favourite");
  });

  newProducts.forEach((el) => {
    actionBoxSecond.innerHTML += getProductsCard(el, "favourite");
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

  let actionfour = actionBoxSecond.querySelectorAll(".action__card__reg");
  for (let i = 0; i < actionfour.length; i++) {
    actionfour[i].textContent = "New";
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

// get search
const searchInput = document.querySelector(".nav__left__input");
const searchResult = document.querySelector(".search_result");
let search = "";

searchInput.addEventListener("keyup", function () {
  search = this.value.toLowerCase();
  handleSearch();
});

function handleSearch() {
  searchResult.innerHTML = "";

  const filteredProducts = products.filter((element) => {
    const { name, description } = element;
    return (
      name.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    );
  });

  filteredProducts.forEach((element) => {
    const { id, name, price, description, images } = element;
    let card = document.createElement("a");
    card.classList.add("card");
    card.href = "./pages/product.html";
    card.innerHTML = `
      <a href="./pages/product.html" onclick='getImg(${id})' class="img" style="background: url('${
      images[0]
    }') center center no-repeat;
        background-size: cover;"></a>
      <a href="./product.html" onclick='getImg(${id})' class="content">
        <div class="price_content">
          <h1 class="category">${name}</h1>
          <p class="price">
            ${price} ₽
          </p>
          <p class="reating_search">${getRating(element.rating)}</p>
        </div>
        <p class="description_search">${description}</p>
      </a>
    `;
    searchResult.appendChild(card);
  });

  if (filteredProducts.length > 0 && search !== "") {
    searchResult.style.display = "flex";
  } else {
    searchResult.style.display = "none";
  }
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

// official start
const cartBox = document.querySelector(".cart__box");

function getOfficialElements({ title, text, img }) {
  const cartCard1 = document.createElement("a");
  cartCard1.className = "cart__card";
  cartCard1.href = "../../pages/categories.html";
  const cartCardLeft1 = document.createElement("div");
  cartCardLeft1.className = "cart__card__left";
  const cartCardLeftTitle1 = document.createElement("h2");
  cartCardLeftTitle1.className = "cart__card__left__title";
  const cartCardLeftText1 = document.createElement("p");
  cartCardLeftText1.className = "cart__card__left__text";
  const cartCardImg1 = document.createElement("img");
  cartCardImg1.className = "cart__card__img cart__img1";
  cartCardImg1.src = img;
  cartCardImg1.alt = "img";

  const cartCard2 = document.createElement("a");
  cartCard2.className = "cart__card";
  cartCard2.href = "../../pages/categories.html";
  const cartCardLeft2 = document.createElement("div");
  cartCardLeft2.className = "cart__card__left";
  const cartCardLeftTitle2 = document.createElement("h2");
  cartCardLeftTitle2.className = "cart__card__left__title";
  const cartCardLeftText2 = document.createElement("p");
  cartCardLeftText2.className = "cart__card__left__text";
  const cartCardImg2 = document.createElement("img");
  cartCardImg2.className = "cart__card__img cart__img2";
  cartCardImg2.src = img;
  cartCardImg2.alt = "img";

  cartCardLeftTitle1.textContent = title;
  cartCardLeftTitle2.textContent = title;
  cartCardLeftText1.textContent = text;
  cartCardLeftText2.textContent = text;

  cartCardLeft1.append(cartCardLeftTitle1, cartCardLeftText1);
  cartCardLeft2.append(cartCardLeftTitle2, cartCardLeftText2);
  cartCard1.append(cartCardLeft1, cartCardImg1);
  cartCard2.append(cartCardLeft2, cartCardImg2);
  return cartCard1;
}

const cartProducts = official.forEach((el) => {
  cartBox.append(getOfficialElements(el));
});
// official end

// articles start
const articlesBox = document.querySelector(".articles__box");

function getArticlesCard({ img, h3, title, text, btn }) {
  const articlesCard = document.createElement("div");
  articlesCard.className = "articles__card";
  const articlesImg = document.createElement("img");
  articlesImg.className = "articles__img";
  articlesImg.src = img;
  articlesImg.alt = "articles-img";
  const articlesBottom = document.createElement("div");
  articlesBottom.className = "articles__bottom";
  const articlesH3 = document.createElement("h3");
  articlesH3.className = "articles__h3";
  const articlesTitle = document.createElement("h2");
  articlesTitle.className = "articles__title";
  const articlesText = document.createElement("p");
  articlesText.className = "articles__text";
  const articlesBtn = document.createElement("a");
  articlesBtn.className = "articles__btn";
  articlesBtn.href = "./pages/catalog.html";

  articlesH3.textContent = h3;
  articlesTitle.textContent = title;
  articlesText.textContent = text;
  articlesBtn.textContent = btn;

  articlesBottom.append(articlesH3, articlesTitle, articlesText, articlesBtn);
  articlesCard.append(articlesImg, articlesBottom);

  return articlesCard;
}

const articlesCards = articles.forEach((el) => {
  articlesBox.append(getArticlesCard(el));
});
// articles end

// dropdown start

const dropdownMenu = document.querySelector(".nav__left__icon");
const dropdown = document.querySelector(".dropdown");
const dropdownHave = document.querySelector(".dropdown-have");
const footerDropMenu = document.querySelector(".footer__nav__center__card");

dropdownMenu.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown-have");
});

footerDropMenu.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown-have");
});

const dropdownInfo = document.querySelector(".dropdown__info");

function getDropdownItems({ name }) {
  const dropdownList = document.createElement("ul");
  dropdownList.className = "dropdown__list";
  const dropdownItem = document.createElement("li");
  dropdownItem.className = "dropdown__item";
  const dropdownLink = document.createElement("a");
  dropdownLink.className = "dropdown__link";
  dropdownLink.href = "./pages/categories.html";

  dropdownLink.addEventListener("click", function () {
    localStorage.setItem(CATEGORY, name);
  });

  dropdownLink.textContent = name;

  dropdownItem.appendChild(dropdownLink);
  dropdownList.appendChild(dropdownItem);

  return dropdownList;
}

const dropdownNice = categories.forEach((el) => {
  dropdownInfo.append(getDropdownItems(el));
});

// user
var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.0/build/js/utils.js",
});

window.iti = iti;

const userButton = document.getElementById("user-button");
const mobileButton = document.querySelector(".footer__nav__center__img");
const modal = document.getElementById("modal");
const userName = document.querySelector(".user_info");

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (window.innerWidth <= 768) {
  userButton.id = "user-button-mobile";
}

userButton.addEventListener("click", function () {
  if (userInfo) {
    window.location.href = "./pages/dashboard.html";
  } else {
    openModal();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

mobileButton.addEventListener("click", openModal);

if (userInfo) {
  userName.textContent = userInfo.userName;
}

const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();

  const firstNameInput = document.querySelector(
    ".slide-page .field input[type='text'][placeholder='First Name']"
  );
  const lastNameInput = document.querySelector(
    ".slide-page .field input[type='text'][placeholder='Last name']"
  );

  if (firstNameInput.value.trim() === "" || lastNameInput.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();

  const userEmail = document.querySelector(".email");
  const userPhone = document.querySelector(".tel");

  if (userEmail.value.trim() === "" || userPhone.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();

  const userEmail = document.querySelector(".date");
  const userPhone = document.querySelector(".tel");

  if (userEmail.value.trim() === "" || userPhone.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const userNameImp = document.querySelector(".username_important");
  const userPassword = document.querySelector(".tel");

  if (userNameImp.value.trim() === "" || userPassword.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }

  const userInfo = {
    userName: userNameImp.value.trim(),
    userPassword: userPassword.value.trim(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
});

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

const userNameElement = document.getElementById("username");
const dropdownMenuList = document.getElementById("dropdown-menu");
const dropdownIcon = document.querySelector(".dropdown-icon");

function toggleDropdown() {
  dropdownMenuList.classList.toggle("show");
}

document.getElementById("user-info").addEventListener("click", toggleDropdown);

window.addEventListener("click", function (event) {
  if (
    !event.target.matches(".user-info") &&
    !event.target.matches(".dropdown-icon")
  ) {
    dropdownMenuList.classList.remove("show");
  }
});
dropdownIcon.classList.remove("hidden");

const profileImageInput = document.getElementById("profile-image-input");
const profileImage = document.getElementById("profile-image");

profileImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const imageDataURL = reader.result;
      profileImage.src = imageDataURL;
    };
    reader.readAsDataURL(file);
  }
});

function toggleDropdown() {
  if (userInfo) {
    dropdownMenuList.classList.toggle("show");
  }
}

if (userInfo) {
  userName.textContent = userInfo.userName;
  dropdownIcon.style.display = "block";
}

if (userInfo) {
  userName.textContent = userInfo.userName;
  dropdownIcon.classList.remove("hidden");
}

const logoutButton = document.querySelector(".log-out");

logoutButton.addEventListener("click", logout);

function logout(event) {
  event.preventDefault();

  localStorage.removeItem("userInfo");

  location.reload();
}

// password
const togglePassword = document.querySelector("#toggle-password");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

// micraphone

searchInput.addEventListener("keyup", function () {
  search = this.value.toLowerCase();
  handleSearch();
});

function handleSearch() {
  searchResult.innerHTML = "";

  const filteredProducts = products.filter((element) => {
    const { name } = element;
    return name.toLowerCase().includes(search);
  });

  filteredProducts.forEach((element) => {
    const { id, name, price, description, images } = element;
    let card = document.createElement("a");
    card.classList.add("card");
    card.href = "#" + id;
    card.innerHTML = `
      <div class="img" style="background: url('${
        images[0]
      }') center center no-repeat;
        background-size: cover;"></div>
      <div class="content">
        <div class="price_content">
          <h1 class="category">${name}</h1>
          <p class="price">
            ${price} ₽
          </p>
          <p class="reating_search">${getRating(element.rating)}</p>
        </div>
        <p class="description_search">${description}</p>
      </div>
    `;
    searchResult.appendChild(card);
  });

  if (filteredProducts.length > 0 && search !== "") {
    searchResult.style.display = "flex";
  } else {
    searchResult.style.display = "none";
  }
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = "#JSGF V1.0;";
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  if (command == "dark") {
    document.body.classList.add("dark");
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "light") {
    document.body.classList.remove("dark");
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "open dropdown") {
    toggleDropdown();
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "close dropdown") {
    toggleDropdown();
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "go home page") {
    if ((window.location.href = "#")) {
    } else {
      window.open("#", "_blank");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "products") {
    if ((window.location.href = "./pages/products.html")) {
    } else {
      window.open("./pages/products.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "favorites") {
    if ((window.location.href = "./pages/favorites.html")) {
    } else {
      window.open("./pages/favorites.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "about" || command == "we") {
    if ((window.location.href = "./pages/about.html")) {
    } else {
      window.open("./pages/about.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "contacts" || command == "contact") {
    if ((window.location.href = "./pages/contacts.html")) {
    } else {
      window.open("./pages/contacts.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "contacts" || command == "contact") {
    if ((window.location.href = "./pages/contacts.html")) {
    } else {
      window.open("./pages/contacts.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "my profile" || command == "profile" || command == "dashboard") {
    if ((window.location.href = "./pages/dashboard.html")) {
    } else {
      window.open("./pages/dashboard.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "categories") {
    if ((window.location.href = "./pages/categories.html")) {
    } else {
      window.open("./pages/categories.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "catalog") {
    if ((window.location.href = "./pages/catalog.html")) {
    } else {
      window.open("./pages/catalog.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "basket" || command == "shopping") {
    if ((window.location.href = "./pages/basket.html")) {
    } else {
      window.open("./pages/basket.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
};

recognition.onspeechend = function () {
  recognition.stop();
};

searchInput.addEventListener("click", function () {
  console.log("working");
});

const btnGiveCommand = document.querySelector("#btnGiveCommand");
let isListening = false;

btnGiveCommand.addEventListener("click", function () {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
});

function startListening() {
  recognition.start();
  isListening = true;
  btnGiveCommand.classList.add("button-active");
}

function stopListening() {
  recognition.stop();
  isListening = false;
  btnGiveCommand.classList.remove("button-active");
}

recognition.onstart = function () {
  console.log("Speech recognition started");
};

recognition.onend = function () {
  console.log("Speech recognition ended");
  stopListening();
};

logoutButton.addEventListener("click", logout);

function logout(event) {
  event.preventDefault();

  localStorage.removeItem("userInfo");

  location.reload();
}
