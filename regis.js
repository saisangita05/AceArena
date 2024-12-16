// Select the form element
const form = document.querySelector("form");

// Add event listener for form submission
form.addEventListener("submit", function (e) {
    // Prevent default form submission
    e.preventDefault();

    // Get form field values
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.querySelector("input[name='gender']:checked");
    const address = document.getElementById("address").value.trim();
    const branch = document.getElementById("branch").value;
    const skills = document.querySelectorAll("input[name='skills']:checked");
    const resume = document.getElementById("resume").files[0];
    const photo = document.getElementById("photo").files[0];

    // Validation flags
    let isValid = true;
    let errorMessage = "";

    // Validate name
    if (!name) {
        errorMessage += "Name is required.\n";
        isValid = false;
    }

    // Validate ID
    if (!id) {
        errorMessage += "ID is required.\n";
        isValid = false;
    }

    // Validate password
    if (!password) {
        errorMessage += "Password is required.\n";
        isValid = false;
    } else if (password.length < 6) {
        errorMessage += "Password must be at least 6 characters long.\n";
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errorMessage += "E-mail is required.\n";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errorMessage += "Invalid e-mail format.\n";
        isValid = false;
    }

    // Validate age
    if (!age || age < 1) {
        errorMessage += "Age must be a positive number.\n";
        isValid = false;
    }

    // Validate gender
    if (!gender) {
        errorMessage += "Gender selection is required.\n";
        isValid = false;
    }

    // Validate address
    if (!address) {
        errorMessage += "Address is required.\n";
        isValid = false;
    }

    // Validate branch
    if (!branch) {
        errorMessage += "Branch selection is required.\n";
        isValid = false;
    }

    // Validate technical skills
    if (skills.length === 0) {
        errorMessage += "At least one technical skill must be selected.\n";
        isValid = false;
    }

    // Validate resume upload
    if (!resume) {
        errorMessage += "Resume upload is required.\n";
        isValid = false;
    }

    // Validate photo upload
    if (!photo) {
        errorMessage += "Photo upload is required.\n";
        isValid = false;
    }

    // Show errors or submit form
    if (isValid) {
        alert("Form submitted successfully!");
        form.submit(); // Submit the form if all validations pass
    } else {
        alert(errorMessage); // Display validation errors
    }
});
