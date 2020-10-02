$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // coming soon modal
  const comingSoon = document.getElementById("coming-soon");

  // travel button opens modal
  $("a.travel-button").on("click", function (event) {
    event.preventDefault();
    comingSoon.style.display = "block";
  })

  // climbing button opens modal
  $("a.climbing-button").on("click", function (event) {
    event.preventDefault();
    comingSoon.style.display = "block";
  })

  // close modal click event
  $("button.close").on("click", function (event) {
    comingSoon.style.display = "none";
  })

  // window click event for modal
  window.onclick = function (event) {
    if (event.target === comingSoon) {
      comingSoon.style.display = "none";
    }
  }
});
