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
    this.firstElementChild.src = "./assets/images/light.svg";
  } else {
    this.firstElementChild.src = "./assets/images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

