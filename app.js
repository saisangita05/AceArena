const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const signInForm = document.querySelector("#sign-in-form");
const signUpForm = document.querySelector("#sign-up-form");

// Show error message near the input
function showError(input, message) {
  const errorElement = input.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = message;
    input.classList.add("error");
  }
}

// Clear error message
function clearError(input) {
  const errorElement = input.parentElement.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = "";
    input.classList.remove("error");
  }
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

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp9Ur9h4-A19LOOtPC_oLU7tWvF24g4wI",
  authDomain: "acearena-cf2f3.firebaseapp.com",
  databaseURL: "https://acearena-cf2f3-default-rtdb.firebaseio.com",
  projectId: "acearena-cf2f3",
  storageBucket: "acearena-cf2f3.appspot.com",
  messagingSenderId: "867334695120",
  appId: "1:867334695120:web:0afd3a7b4141f422c656d5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle sign-in form submission
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate email and password
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  try {
    const snapshot = await database.ref("users2").once("value");
    const users = snapshot.val();
    let foundUser = null;

    for (let uid in users) {
      if (users[uid].email === email) {
        foundUser = users[uid];
        break;
      }
    }

    if (foundUser && foundUser.password === password) {
      alert("Sign In successful!");
      window.location.href = "index.html"; // Redirect to the home page
    } else {
      alert(foundUser ? "Incorrect password." : "No account found with this email address.");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("An error occurred while signing in.");
  }
});

// Handle sign-up form submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  // Validate fields
  if (!username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
    alert("Please fill in all fields correctly.");
    return;
  }

  database
    .ref("users2/" + username)
    .set({
      email,
      password,
      username,
    })
    .then(() => {
      alert("Sign-up successful!");
      container.classList.remove("sign-up-mode");
    })
    .catch((error) => {
      console.error("Error during sign-up:", error);
      alert("An error occurred while signing up.");
    });
});

// Toggle between sign-in and sign-up modes
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
