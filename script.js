document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('registrationModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');

    loginBtn.onclick = () => {
        modal.style.display = 'flex';
    };

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDp9Ur9h4-A19LOOtPC_oLU7tWvF24g4wI",
    authDomain: "acearena-cf2f3.firebaseapp.com",
    projectId: "acearena-cf2f3",
    storageBucket: "acearena-cf2f3.firebasestorage.app",
    messagingSenderId: "867334695120",
    appId: "1:867334695120:web:0afd3a7b4141f422c656d5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  document.getElementById("submit").addEventListener("click", function(e){
    set(ref(db, 'user/' + document.getElementById("username").value),
    {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value
    })
  })
