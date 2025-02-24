import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let signupAttempts = 0; // Rate limiting attempts

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup-btn").addEventListener("click", () => {
        if (signupAttempts >= 5) {
            document.getElementById("error-message").innerText = "Too many attempts! Try again later.";
            return;
        }
        

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const errorMessage = document.getElementById("error-message");
        const loadingMessage = document.getElementById("loading-message");

        errorMessage.innerText = "";
        loadingMessage.innerText = "Processing... Please wait.";

        if (!email || !password || !confirmPassword) {
            errorMessage.innerText = "All fields are required.";
            loadingMessage.innerText = "";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.innerText = "Passwords do not match.";
            loadingMessage.innerText = "";
            return;
        }

        if (password.length < 6) {
            errorMessage.innerText = "Password must be at least 6 characters.";
            loadingMessage.innerText = "";
            return;
        }

        // Prevent excessive signup attempts
        signupAttempts++;

        // Firebase Signup
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Send Verification Email
                sendEmailVerification(user)
                    .then(() => {
                        alert("Verification email sent! Please verify before logging in.");
                        window.location.href = "login.html"; // Redirect to login page
                    })
                    .catch(error => {
                        errorMessage.innerText = "Error sending verification email.";
                    });

                loadingMessage.innerText = "";
            })
            .catch(error => {
                loadingMessage.innerText = "";
                if (error.code === "auth/email-already-in-use") {
                    errorMessage.innerText = "This email is already registered.";
                } else if (error.code === "auth/weak-password") {
                    errorMessage.innerText = "Your password is too weak.";
                } else {
                    errorMessage.innerText = error.message;
                }
            });
    });
});
