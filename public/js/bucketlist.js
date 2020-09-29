// document ready
$(function () {

  // grab element variables
  const bucketlist = $("ul.list-group");
  const listItem = $("#list-template");

  // set current trail ID for search
  let currentTrailId;

  // get user id ajax request
  $.ajax("/api/user_data", {
    method: "GET"
  }).then(function (userData) {
    console.log(userData);

    // set userID variable
    const userID = userData.id;

    // get user favorites ajax request
    $.ajax(`/api/favorites/${userID}`, {
      method: "GET"
    }).then(function (result) {
      console.log(result);

      // if user has no favorites
      if (!result) {
        // ***** create modal pop up with link to get started
      } else {
        // create bucketlist item for each favorited trail
        for(let i = 0; i < result.userFavorites.length(); i++) {
          let newListItem = listItem.clone();
          // ***** need to modify variable based on what's returned in result
          newListItem.find("span.trail-text").text(result.favoritesTrailNames[i].trail_name);
          newListItem.find("input.form-check-input").attr("id", result.userFavorites[i].HikingTrailId);
          newListItem.find("button.delete-button").attr("id", result.userFavorites[i].id);
          bucketlist.append(newListItem);
        };
      }
    })
  })

  // checkbox change event
  $("input.form-check-input").on("change", function (event) {
    event.preventDefault();
    currentTrailId = $(this).data("id");
    // uncheck all other checkboxes
    // ***** will this work (grabbing specific id attribute using hashtag and this.data) ??
    $(`#${$(this).data("id")}`).not(this).prop("checked", false);
  })

  // delete favorite click event
  $("button.delete-button").on("click", function (event) {
    // delete favorites ajax request
    // ***** will this work ??
    $.ajax(`/api/favorites/:${$(this).data("id")}`, {
      method: "DELETE"
    }).then(function () {
      console.log("Deleted item from bucketlist!");
      location.reload();
    })
  })

  // find adventure buddies click event
  $("button.find-buddies").on("click", function (event) {
    // find buddies ajax request
    $.ajax(`/api/buddyList/${currentTrailId}`, {
      method: "GET"
    }).then(function (result) {
      console.log(result);

      // ***** function doesn't exist yet. do we want to display buddies in modal ??
      displayBuddies(result);
    })
  })
})