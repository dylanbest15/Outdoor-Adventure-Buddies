// document ready
$(function () {

  // bucketlist and buddy modal variables
  const bucketlist = $("ul.list-group");
  const listItem = $($("#list-template").html());
  const buddyModal = document.getElementById("buddy-modal");

  // set current trail ID for search
  let currentTrailId;
  let userID;

  // get user id ajax request
  $.ajax("/api/user_data", {
    method: "GET"
  }).then(function (userData) {
    console.log(userData);

    // set userID variable
    userID = userData.id;
    console.log(userID);

    // get user favorites ajax request
    $.ajax(`/api/favorites/${userID}`, {
      method: "GET"
    }).then(function ({ userFavorites, favoritesTrailNames } = result) {
      console.log(userFavorites, favoritesTrailNames);

      // create bucketlist item for each favorited trail
      for (let i = 0; i < favoritesTrailNames.length; i++) {
        let newListItem = listItem.clone();
        newListItem.find("span.trail-text").text(favoritesTrailNames[i].trail_name);
        newListItem.find("input.form-check-input").attr("id", userFavorites[i].HikingTrailId);
        newListItem.find("button.delete-button").attr("id", userFavorites[i].id);
        bucketlist.append(newListItem);
      };
    })
  })

  // checkbox change event
  $(document).on("change", "input.form-check-input", function (event) {
    currentTrailId = $(this).attr("id");
    // uncheck all other checkboxes
    $("input.form-check-input").not(this).prop("checked", false);
  })

  // delete favorite click event
  $(document).on("click", "button.delete-button", function (event) {
    let id = $(this).attr("id");
    // delete favorites ajax request
    $.ajax(`/api/favorites/${id}`, {
      type: "DELETE"
    }).then(function () {
      console.log("Deleted item from bucketlist!");
      location.reload();
    })
  })

  // find adventure buddies click event
  $("button.find-buddies").on("click", function (event) {
    event.preventDefault();
    // find buddies ajax request
    $.ajax(`/api/buddyList/${currentTrailId}`, {
      method: "GET",
      data: userID
    }).then(function (result) {
      console.log(result);
      console.log(userID);

      // show buddy modal
      buddyModal.style.display = "block";
      // ***** need to append buddy info to modal
    })
  })

  // close modal click event
  $("button.close").on("click", function (event) {
    buddyModal.style.display = "none";
  })

  // window click event for modal
  window.onclick = function(event) {
    if (event.target == buddyModal) {
      buddyModal.style.display = "none";
    }
  }
})