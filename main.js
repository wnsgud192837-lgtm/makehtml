const loginForm = document.querySelector("#login-form");
const statusMessage = document.querySelector("#status-message");

if (loginForm && statusMessage) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();

    if (!userId) {
      statusMessage.textContent = "아이디를 입력해 주세요.";
      return;
    }

    statusMessage.textContent = `${userId} 계정으로 로그인 요청을 준비했습니다. 이 데모에서는 실제 인증을 수행하지 않습니다.`;
  });
}
