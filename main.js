const loginForm = document.querySelector("#login-form");
const loginPage = document.querySelector("#login-page");
const dashboardPage = document.querySelector("#dashboard-page");
const loginMessage = document.querySelector("#login-message");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (userId !== "admin" || password !== "admin") {
      if (loginMessage) {
        loginMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      }
      return;
    }

    if (loginMessage) {
      loginMessage.textContent = "";
    }

    if (loginPage) {
      loginPage.classList.add("is-hidden");
    }

    if (dashboardPage) {
      dashboardPage.classList.remove("is-hidden");
    }
  });
}
