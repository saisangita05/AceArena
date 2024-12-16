const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const signInForm = document.querySelector("#sign-in-form");
const signUpForm = document.querySelector("#sign-up-form");

// Show error message near the input
function showError(input, message) {
  const errorElement = input.parentElement.querySelector(".error-message");
  errorElement.textContent = message;
  input.classList.add("error");
}

// Clear error message
function clearError(input) {
  const errorElement = input.parentElement.querySelector(".error-message");
  errorElement.textContent = "";
  input.classList.remove("error");
}

// Validate form fields
function validateForm(inputs) {
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, "This field is required");
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

// Handle sign-in form submission
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = [
    document.querySelector("#signin-username"),
    document.querySelector("#signin-password"),
  ];

  if (!validateForm(inputs)) {
    showError(inputs[0], "Please sign up first if you don't have an account.");
    return;
  }

  alert("Sign-in successful!");
});

// Handle sign-up form submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = [
    document.querySelector("#signup-username"),
    document.querySelector("#signup-email"),
    document.querySelector("#signup-password"),
  ];

  if (!validateForm(inputs)) return;

  alert("Sign-up successful!");
});

// Toggle between sign-in and sign-up modes
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
