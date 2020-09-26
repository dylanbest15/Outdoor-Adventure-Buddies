$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#firstname");
  const lastNameInput = $("input#lastname");
  const userNameInput = $("input#username");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const ageInput = $("input#age");
  const bioInput = $("input#bio");
  const genderInput = $("input#gender");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      age: ageInput.val().trim(),
      bio: bioInput.val().trim(),
      gender: genderInput
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, userName, email, password) {
    $.post("/api/signup", {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
