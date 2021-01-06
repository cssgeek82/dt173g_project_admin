"use strict";

// Log in
const loginForm = document.getElementById("loginform");
const loginButton = document.getElementById("loginbtn");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "password") {

        if (typeof(Storage) !== "undefined") {
            sessionStorage.setItem("value", "loggedin");  // Store
            location.assign("index.html")   // Directs to this webpage
          } else {               
        }
    } 
    else {
        document.getElementById("loginerror").style.display = "block";  // Display!
    }
})
