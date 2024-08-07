const loginBtn = document.getElementById("loginButton");
loginBtn.addEventListener("click", () => {
    console.log("Login button clicked");
    window.location.href = "/login";
});

const sessionID = document.cookie.split("=")[1];
if (sessionID) {
    loginBtn.textContent = 'Logout';
    loginBtn.addEventListener('click', function() {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "/" // Reload the page to reflect the change
    });
} else {
    loginBtn.textContent = 'Login';
}