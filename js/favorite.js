const favoriteRow = document.querySelector(".favorites__products");
const favouriteContainer = document.querySelector(".favourite_container");
const empty = document.querySelector(".empty_basket");
const actionFirstSection = document.querySelector("#action__first");
const actionBoxFirst = document.querySelector(".action__box__first");
let rangeInput = document.querySelectorAll(".range-input input");
let priceInput = document.querySelectorAll(".price-input input");
let range = document.querySelector(".slider .progress");
let priceGap = 10;

// mapping

function getFavouriteProducts() {
  let results = favoriteProducts.filter((pr) => pr.name);

  favoriteRow.innerHTML = "";
  if (favoriteProducts.length !== 0) {
    favoriteProducts.forEach((pr) => {
      favoriteRow.innerHTML += getProductsCard(pr, "favourite");
    });
  } else {
    favoriteRow.innerHTML = "";
  }

  favoriteRow.innerHTML = "";

  results.map((product) => {
    favoriteRow.innerHTML += getProductsCard(product, "favourite");
  });
}
getFavouriteProducts();

// get favorite cards
function getFavouriteOnes() {
  const minPrice = parseInt(priceInput[0].value);
  const maxPrice = parseInt(priceInput[1].value);

  favoriteRow.innerHTML = "";

  // Filter favorite products based on the price range
  const filteredFavorites = favoriteProducts.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  if (filteredFavorites.length !== 0) {
    filteredFavorites.forEach((el) => {
      favoriteRow.innerHTML += getProductsCard(el);
    });
    favoriteRow.classList.remove("empty");
    favouriteContainer.classList.remove("empty");
  } else {
    favoriteRow.classList.add("empty");
    favouriteContainer.classList.add("empty");
    favoriteRow.innerHTML = `
        <div class="alert alert-info" role="alert">
        <div class="empty-cart empty_basket">

        <svg viewBox="656 573 264 182" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect id="bg-line" stroke="none" fill-opacity="0.2" fill="#FFE100" fill-rule="evenodd" x="656" y="624" width="206" height="38" rx="19"></rect>
            <rect id="bg-line" stroke="none" fill-opacity="0.2" fill="#FFE100" fill-rule="evenodd" x="692" y="665" width="192" height="29" rx="14.5"></rect>
            <rect id="bg-line" stroke="none" fill-opacity="0.2" fill="#FFE100" fill-rule="evenodd" x="678" y="696" width="192" height="33" rx="16.5"></rect>
            <g id="shopping-bag" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(721.000000, 630.000000)">
                <polygon id="Fill-10" fill="#FFA800" points="4 29 120 29 120 0 4 0"></polygon>
                <polygon id="Fill-14" fill="#FFE100" points="120 29 120 0 115.75 0 103 12.4285714 115.75 29"></polygon>
                <polygon id="Fill-15" fill="#FFE100" points="4 29 4 0 8.25 0 21 12.4285714 8.25 29"></polygon>
                <polygon id="Fill-33" fill="#FFA800" points="110 112 121.573723 109.059187 122 29 110 29"></polygon>
                <polygon id="Fill-35" fill-opacity="0.5" fill="#FFFFFF" points="2 107.846154 10 112 10 31 2 31"></polygon>
                <path d="M107.709596,112 L15.2883462,112 C11.2635,112 8,108.70905 8,104.648275 L8,29 L115,29 L115,104.648275 C115,108.70905 111.7365,112 107.709596,112" id="Fill-36" fill="#FFE100"></path>
                <path d="M122,97.4615385 L122,104.230231 C122,108.521154 118.534483,112 114.257931,112 L9.74206897,112 C5.46551724,112 2,108.521154 2,104.230231 L2,58" id="Stroke-4916" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <polyline id="Stroke-4917" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="2 41.5 2 29 122 29 122 79"></polyline>
                <path d="M4,50 C4,51.104 3.104,52 2,52 C0.896,52 0,51.104 0,50 C0,48.896 0.896,48 2,48 C3.104,48 4,48.896 4,50" id="Fill-4918" fill="#000000"></path>
                <path d="M122,87 L122,89" id="Stroke-4919" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <polygon id="Stroke-4922" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="4 29 120 29 120 0 4 0"></polygon>
                <path d="M87,46 L87,58.3333333 C87,71.9 75.75,83 62,83 L62,83 C48.25,83 37,71.9 37,58.3333333 L37,46" id="Stroke-4923" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M31,45 C31,41.686 33.686,39 37,39 C40.314,39 43,41.686 43,45" id="Stroke-4924" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M81,45 C81,41.686 83.686,39 87,39 C90.314,39 93,41.686 93,45" id="Stroke-4925" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M8,0 L20,12" id="Stroke-4928" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M20,12 L8,29" id="Stroke-4929" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M20,12 L20,29" id="Stroke-4930" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M115,0 L103,12" id="Stroke-4931" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M103,12 L115,29" id="Stroke-4932" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
                <path d="M103,12 L103,29" id="Stroke-4933" stroke="#000000" stroke-width="3" stroke-linecap="round"></path>
            </g>
            <g id="glow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(768.000000, 615.000000)">
                <rect id="Rectangle-2" fill="#000000" x="14" y="0" width="2" height="9" rx="1"></rect>
                <rect fill="#000000" transform="translate(7.601883, 6.142354) rotate(-12.000000) translate(-7.601883, -6.142354) " x="6.60188267" y="3.14235449" width="2" height="6" rx="1"></rect>
                <rect fill="#000000" transform="translate(1.540235, 7.782080) rotate(-25.000000) translate(-1.540235, -7.782080) " x="0.54023518" y="6.28207994" width="2" height="3" rx="1"></rect>
                <rect fill="#000000" transform="translate(29.540235, 7.782080) scale(-1, 1) rotate(-25.000000) translate(-29.540235, -7.782080) " x="28.5402352" y="6.28207994" width="2" height="3" rx="1"></rect>
                <rect fill="#000000" transform="translate(22.601883, 6.142354) scale(-1, 1) rotate(-12.000000) translate(-22.601883, -6.142354) " x="21.6018827" y="3.14235449" width="2" height="6" rx="1"></rect>
            </g>
            <polygon id="plus" stroke="none" fill="#7DBFEB" fill-rule="evenodd" points="689.681239 597.614697 689.681239 596 690.771974 596 690.771974 597.614697 692.408077 597.614697 692.408077 598.691161 690.771974 598.691161 690.771974 600.350404 689.681239 600.350404 689.681239 598.691161 688 598.691161 688 597.614697"></polygon>
            <polygon id="plus" stroke="none" fill="#EEE332" fill-rule="evenodd" points="913.288398 701.226961 913.288398 699 914.773039 699 914.773039 701.226961 917 701.226961 917 702.711602 914.773039 702.711602 914.773039 705 913.288398 705 913.288398 702.711602 911 702.711602 911 701.226961"></polygon>
            <polygon id="plus" stroke="none" fill="#FFA800" fill-rule="evenodd" points="662.288398 736.226961 662.288398 734 663.773039 734 663.773039 736.226961 666 736.226961 666 737.711602 663.773039 737.711602 663.773039 740 662.288398 740 662.288398 737.711602 660 737.711602 660 736.226961"></polygon>
            <circle id="oval" stroke="none" fill="#A5D6D3" fill-rule="evenodd" cx="699.5" cy="579.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#CFC94E" fill-rule="evenodd" cx="712.5" cy="617.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#8CC8C8" fill-rule="evenodd" cx="692.5" cy="738.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#3EC08D" fill-rule="evenodd" cx="884.5" cy="657.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#66739F" fill-rule="evenodd" cx="918.5" cy="681.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#C48C47" fill-rule="evenodd" cx="903.5" cy="723.5" r="1.5"></circle>
            <circle id="oval" stroke="none" fill="#A24C65" fill-rule="evenodd" cx="760.5" cy="587.5" r="1.5"></circle>
            <circle id="oval" stroke="#66739F" stroke-width="2" fill="none" cx="745" cy="603" r="3"></circle>
            <circle id="oval" stroke="#EFB549" stroke-width="2" fill="none" cx="716" cy="597" r="3"></circle>
            <circle id="oval" stroke="#FFE100" stroke-width="2" fill="none" cx="681" cy="751" r="3"></circle>
            <circle id="oval" stroke="#3CBC83" stroke-width="2" fill="none" cx="896" cy="680" r="3"></circle>
            <polygon id="diamond" stroke="#C46F82" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" points="886 705 889 708 886 711 883 708"></polygon>
            <path d="M736,577 C737.65825,577 739,578.34175 739,580 C739,578.34175 740.34175,577 742,577 C740.34175,577 739,575.65825 739,574 C739,575.65825 737.65825,577 736,577 Z" id="bubble-rounded" stroke="#3CBC83" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
        </svg>
      
        <h3>Empty-Favourite-Box ❌</h3>
        <p>Your favourite box is empty now. Add some products</p>
      </div>
        </div>
      `;
  }
}
getFavouriteOnes();

// range input start
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);
    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
      getFavouriteOnes();
      getFavouriteProducts();
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal < 60) {
      empty.classList.add("view");
    } else {
      empty.classList.add("remove");
    }

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
    getFavouriteOnes();
    getFavouriteProducts();
  });
});

function handleUpdate() {
  getFavouriteOnes();
}
getFavouriteProducts();

rangeInput.forEach((el) => el.addEventListener("change", handleUpdate));
priceInput.forEach((el) => el.addEventListener("mousemove", handleUpdate));

const customDiv = document.getElementById("main-wrapper");

const openingRangeBtn = document.querySelector(".open-range");
const openingRange = document.querySelector(".wrapper");

openingRangeBtn.addEventListener("click", function () {
  openingRange.classList.toggle("open");
});

getFavouriteProducts();
getFavouriteOnes();

function addToCartLatest(id) {
  addToCart(id);
  getFavouriteOnes();
  getFavouriteProducts();
}

function increaseLatest(id) {
  increase(id);
  getFavouriteOnes();
  getFavouriteProducts();
}

function decreaseLatest(id) {
  decrease(id);
  getFavouriteOnes();
  getFavouriteProducts();
}

function addToFavoriteLatest(id) {
  addToFavorite(id);
  getFavouriteOnes();
  getFavouriteProducts();
}

function getCartLength() {
  if (favoriteProducts.length === 0) {
    empty.classList.add("view");
  }
}

getCartLength();
getFavouriteProducts();

// start

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
  getFavouriteOnes();
  getFavouriteProducts();
  getCartLength();

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
  getFavouriteOnes();
  getCartLength();
  getFavouriteProducts();
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
  getFavouriteOnes();
  getCartLength();
  getFavouriteProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}
// cart end
