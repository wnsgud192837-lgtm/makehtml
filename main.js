const loginForm = document.querySelector("#login-form");
const statusMessage = document.querySelector("#status-message");

if (loginForm && statusMessage) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!userId) {
      statusMessage.textContent = "해모수 ID를 입력해 주세요.";
      return;
    }

    if (!password) {
      statusMessage.textContent = "비밀번호를 입력해 주세요.";
      return;
    }

    statusMessage.textContent = `${userId} 계정으로 로그인 요청을 준비했습니다. 이 데모는 실제 인증을 수행하지 않습니다.`;
  });
}
