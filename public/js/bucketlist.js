// document ready
$(function () {

  // bucketlist and buddy modal variables
  const bucketlist = $("ul.trail-list");
  const listItem = $($("#list-template").html());
  const buddyModal = document.getElementById("buddy-modal");
  const buddyList = $("ul.buddy-list");
  const buddyItem = $($("#buddy-template").html());

  // set global variables for apis
  let currentTrailId;
  let userID;
  let emailAddress;
  let recipientName;

  // get user id ajax request
  $.ajax("/api/user_data", {
    method: "GET"
  }).then(function (userData) {

    // set userID variable
    userID = userData.id;

    // get user favorites ajax request
    $.ajax(`/api/favorites/${userID}`, {
      method: "GET"
    }).then(function ({ userFavorites, favoritesTrailNames } = result) {

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
    if(currentTrailId === $(this).attr("id")) {
      currentTrailId = 0;
    }
    else {
      currentTrailId = $(this).attr("id");
    }
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

      if (currentTrailId) {
        // clear list and show buddy modal
        buddyList.empty();
        buddyModal.style.display = "block";
        // create email list item for each buddy found
        for (let i = 0; i < result.length; i++) {
          let newBuddyItem = buddyItem.clone();
          newBuddyItem.find("span.buddy-name").text(`${result[i].first_name} ${result[i].last_name}`);
          newBuddyItem.find("button.email-buddy").attr("id", result[i].email);
          newBuddyItem.find("button.email-buddy").attr("data-recipient", `${result[i].first_name} ${result[i].last_name}`);
          buddyList.append(newBuddyItem);
        }
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

    // recipients email and name for email template
    emailAddress = $(this).attr("id");
    recipientName = $(this).attr("data-recipient");

    async function getSenderUserEmail() {
      await $.get("/api/user_data", function ({ email }) {
        console.log(email);
        return emailData = {
          userTo: emailAddress,
          userFrom: email,
          userFromName: recipientName
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
})