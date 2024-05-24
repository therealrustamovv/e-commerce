const catologBox = document.querySelector(".catolog__box");

function getCatologCards({ name, image }) {
  return `
  <a href="./categories.html" onclick="getCategory('${name}')" class="catolog__card">
    <div class="catolog__min">
      <img class="catolog__img" src="${image}" alt="catolog__img">
      <p class="catolog__text">${name}</p>
    </div>
  </a>
  `;
}

const catologNewCards = categories.forEach((el) => {
  catologBox.innerHTML += getCatologCards(el);
});
function getCategory(name) {
  localStorage.setItem(CATEGORY, name);
}
