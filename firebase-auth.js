// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAnkCWfluRim9ohIHNqfOIKyXHgeMGq5E",
    authDomain: "digitaltwin-3a1da.firebaseapp.com",
    projectId: "digitaltwin-3a1da",
    storageBucket: "digitaltwin-3a1da.firebasestorage.app",
    messagingSenderId: "138442510963",
    appId: "1:138442510963:web:401e28bde29bdf1b8d5006"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to handle Sign Up
document.getElementById("signup-btn").addEventListener("click", () => {
    const email = prompt("Enter Email:");
    const password = prompt("Enter Password:");

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Sign Up Successful! Welcome " + userCredential.user.email);
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Function to handle Log In
document.getElementById("login-btn").addEventListener("click", () => {
    const email = prompt("Enter Email:");
    const password = prompt("Enter Password:");

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful! Welcome back " + userCredential.user.email);
        })
        .catch((error) => {
            alert(error.message);
        });
});
