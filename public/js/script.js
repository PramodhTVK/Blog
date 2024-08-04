const loginBtn = document.getElementById("loginButton");
loginBtn.addEventListener("click", () => {
    console.log("Login button clicked");
    window.location.href = "/login";
});