import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAnkCWfluRim9ohIHNqfOIKyXHgeMGq5E",
    authDomain: "digitaltwin-3a1da.firebaseapp.com",
    projectId: "digitaltwin-3a1da",
    storageBucket: "digitaltwin-3a1da.firebasestorage.app",
    messagingSenderId: "138442510963",
    appId: "1:138442510963:web:401e28bde29bdf1b8d5006",
    measurementId: "G-5PQDJX8D48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMessage = document.getElementById("error-message");

            if (!email || !password) {
                errorMessage.innerText = "Please enter both email and password.";
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Login successful!");
                    window.location.href = "dashboard.html"; // Redirect on success
                })
                .catch(error => {
                    errorMessage.innerText = error.message;
                });
        });
    }
});
