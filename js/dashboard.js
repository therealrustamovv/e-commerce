$(function () {
  $(".sidebar-link").click(function () {
    $(".sidebar-link").removeClass("is-active");
    $(this).addClass("is-active");
  });
});

$(window)
  .resize(function () {
    if ($(window).width() > 1090) {
      $(".sidebar").removeClass("collapse");
    } else {
      $(".sidebar").addClass("collapse");
    }
  })
  .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
  v.addEventListener("mouseover", () => {
    const video = v.querySelector("video");
    video.play();
  });
  v.addEventListener("mouseleave", () => {
    const video = v.querySelector("video");
    video.pause();
  });
});

$(function () {
  $(".logo, .logo-expand, .discover").on("click", function (e) {
    $(".main-container").removeClass("show");
    $(".main-container").scrollTop(0);
  });
  $(".trending, .video").on("click", function (e) {
    $(".main-container").addClass("show");
    $(".main-container").scrollTop(0);
    $(".sidebar-link").removeClass("is-active");
    $(".trending").addClass("is-active");
  });

  $(".video").click(function () {
    var source = $(this).find("source").attr("src");
    var title = $(this).find(".video-name").text();
    var person = $(this).find(".video-by").text();
    var img = $(this).find(".author-img").attr("src");
    $(".video-stream video").stop();
    $(".video-stream source").attr("src", source);
    $(".video-stream video").load();
    $(".video-p-title").text(title);
    $(".video-p-name").text(person);
    $(".video-detail .author-img").attr("src", img);
  });
});

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Expense",
        data: [11, 3, 14, 7, 4, 15, 7, 9, 15, 13, 7, 14],
        borderWidth: 1,
        borderRadius: 30,
        barThickness: 12,
        backgroundColor: ["rgba(114, 92, 255, 1)"],
        borderColor: ["rgba(114, 92, 255, 1)"],
        hoverBackgroundColor: ["rgba(28, 30, 35, 1)"],
        hoverBorderColor: ["rgba(28, 30, 35, 1)"],
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, ticks) {
            return "$" + value + "k";
          },
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 12,
            family: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 18,
            weight: 600,
          },
        },
      },
    },
  },
});
const username = document.querySelector(".user-name");
let pris = JSON.parse(localStorage.getItem("userInfo"));
username.textContent = pris.userName;
