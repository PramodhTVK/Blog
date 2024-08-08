const loginBtn = document.getElementById("loginButton");
const blogBtn = document.getElementById("createBlogs");
loginBtn.addEventListener("click", () => {
    console.log("Login button clicked");
    window.location.href = "/login";
});

const sessionID = document.cookie.split("=")[1];
console.log(document.cookie);
if (sessionID) {
    loginBtn.textContent = 'Logout';
    loginBtn.addEventListener('click', function() {
        // Delete a cookie named "username"
        document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/" // Reload the page to reflect the change
        loginBtn.textContent = 'Login';
    });
} else {
    loginBtn.textContent = 'Login';
    blogBtn.style.display = 'none';
}