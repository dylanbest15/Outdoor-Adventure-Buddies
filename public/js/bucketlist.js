// document ready
$(function () {

  // bucketlist and buddy modal variables
  const bucketlist = $("ul.trail-list");
  const listItem = $($("#list-template").html());
  const buddyModal = document.getElementById("buddy-modal");
  const buddyList = $("ul.buddy-list");
  const buddyItem = $($("#buddy-template").html());

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
    console.log("userID ===", userID);

    // get user favorites ajax request
    $.ajax(`/api/favorites/${userID}`, {
      method: "GET"
    }).then(function ({ userFavorites, favoritesTrailNames } = result) {
      console.log(`userFavorites === ${userFavorites}, \nfavoriteTrailNames ===${favoritesTrailNames}`);

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
    console.log(`currentTrailId === `, currentTrailId);
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
      console.log(`$.get buddyList result === `, result);
      console.log(`$.get buddyList userID === `, userID);

      // show buddy modal
      buddyModal.style.display = "block";
      // create email list item for each buddy found
      for (let i = 0; i < result.length; i++) {
        let newBuddyItem = buddyItem.clone();
        newBuddyItem.find("span.buddy-name").text(`${result[i].first_name} ${result[i].last_name}`);
        newBuddyItem.find("button.email-buddy").attr("id", result[i].email);
        buddyList.append(newBuddyItem);
      }
    })
  })

  // close modal click event
  $("button.close").on("click", function (event) {
    buddyModal.style.display = "none";
  })

  // window click event for modal
  window.onclick = function (event) {
    if (event.target == buddyModal) {
      buddyModal.style.display = "none";
    }
  }

  // email button click event
  $(document).on("click", "button.email-buddy", function (event) {

    event.preventDefault();

    let emailAddress = $(this).attr("id");
    console.log(`buddy.email-buddy BTN.click emailAddress === `, emailAddress);

    async function getSenderUserEmail() {
      await $.get("/api/user_data", function ({ email }) {
        console.log(email);
        return emailData = {
            userTo: emailAddress,
            userFrom: email
        };
      }).then(() => {
        if (!emailData.userTo || !emailData.userFrom) {
          console.log(`***\nno userTo or no userFrom\n***`);
          return;
        }
        console.log('emailData === ', emailData)
        // If we have an email message then run sendEmail
        sendEmail(emailData);
      });
    };

    // Does a post to the email route. 
    function sendEmail(emailData) {
      $.post("/email/send-email", emailData)
        .catch((err) => {
          console.log(err);
        });
    }

    getSenderUserEmail();

  })

  // ***** need to work with back end to set up email event
})