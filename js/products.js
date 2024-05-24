// loading

const loading = document.getElementById("loading");

const loadingDuration = 6500; // 6.5s

setTimeout(() => {
  loading.classList.add("loading-none");
}, loadingDuration);

// loading new version

// const loading = document.getElementById("loading");

// window.addEventListener("load", () => {
//   document.querySelector("#loading").classList.add("loading-none")
// })

// backtop
window.addEventListener("scroll", () => {
  if (scrollY >= 200) {
    document.querySelector("#backtop").classList.add("backtop-show");
  } else {
    document.querySelector("#backtop").classList.remove("backtop-show");
  }
});

// mode btn

let modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "../assets/images/light.svg";
  } else {
    this.firstElementChild.src = "../assets/images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

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
  dropdownLink.href = "./categories.html";

  dropdownLink.textContent = name;

  dropdownItem.appendChild(dropdownLink);
  dropdownList.appendChild(dropdownItem);

  return dropdownList;
}

const dropdownNice = categories.forEach((el) => {
  dropdownInfo.append(getDropdownItems(el));
});

// start

const actionFirstSection = document.querySelector("#action__first");
const actionBoxFirst = document.querySelector(".action__box__first");
const searchInput = document.querySelector(".nav__left__input");
const pagination = document.querySelector(".pagination");
const priceSortSelect = document.querySelector(".price-sort");

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

let search = "";

let activePage = +localStorage.getItem(PAGE) || 1;

let priceSort = "initial";

function getProducts() {
  let results = products.filter((pr) => pr.name.toLowerCase().includes(search));

  let sortResults;

  if (priceSort === "asc") {
    sortResults = results.toSorted((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortResults = results.toSorted((a, b) => b.price - a.price);
  } else {
    sortResults = results;
  }

  let pages = Math.ceil(results.length / LIMIT);

  if (pages > 1) {
    pagination.innerHTML = `<li class="page-item">
      <button onclick="getPage('-')" class="page-link ${
        activePage === 1 ? "active" : ""
      }" ${activePage === 1 ? "disabled" : ""}>&laquo;</button>
    </li>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `<li class="page-item"><button class="page-link ${
        i === activePage ? "active" : ""
      }" onclick="getPage(${i})">${i}</button></li>`;
    }

    pagination.innerHTML += `<li class="page-item">
      <button onclick="getPage('+')" class="page-link ${
        activePage === pages ? "active" : ""
      }" ${activePage === pages ? "disabled" : ""}>&raquo;</button>
    </li>`;
  } else {
    pagination.innerHTML = "";
  }

  actionBoxFirst.innerHTML = "";

  let start = (activePage - 1) * LIMIT;
  let end = activePage * LIMIT;

  sortResults.slice(start, end).map((product) => {
    actionBoxFirst.innerHTML += getProductsCard(product, "all");
  });
}

function getPage(page) {
  if (page === "+") {
    activePage++;
  } else if (page === "-") {
    activePage--;
  } else {
    activePage = page;
  }
  localStorage.setItem(PAGE, activePage);
  getProducts();
}

getProducts();

searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  activePage = 1;
  getProducts();
});

priceSortSelect.addEventListener("change", function () {
  priceSort = this.value;
  getProducts();
});

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
  getProducts();

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
  getProducts();
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
  getProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}
// cart end

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
    window.location.href = "#";
  } else {
    openModal();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

mobileButton.addEventListener("click", openModal);

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

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
    if ((window.location.href = "../index.html")) {
    } else {
      window.open("../index.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "products") {
    if ((window.location.href = "./products.html")) {
    } else {
      window.open("./products.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "favorites") {
    if ((window.location.href = "./favorites.html")) {
    } else {
      window.open("./favorites.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "about" || command == "we") {
    if ((window.location.href = "./about.html")) {
    } else {
      window.open("./about.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "contacts" || command == "contact") {
    if ((window.location.href = "./contacts.html")) {
    } else {
      window.open("./contacts.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "contacts" || command == "contact") {
    if ((window.location.href = "./contacts.html")) {
    } else {
      window.open("./contacts.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (
    command == "my profile" ||
    command == "profile" ||
    command == "dashboard"
  ) {
    if ((window.location.href = "./dashboard.html")) {
    } else {
      window.open("./dashboard.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "categories") {
    if ((window.location.href = "./categories.html")) {
    } else {
      window.open("./categories.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "catalog") {
    if ((window.location.href = "./catalog.html")) {
    } else {
      window.open("./catalog.html");
    }
  } else {
    search = command;
    searchInput.value = command;
    handleSearch();
  }
  if (command == "basket" || command == "shopping") {
    if ((window.location.href = "./basket.html")) {
    } else {
      window.open("./basket.html");
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
