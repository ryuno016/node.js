const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

userForm.addEventListener("submit", (event) => {
  let isValid = true;

  // 名前のバリデーション
  if (!/^[a-zA-Z.]+$/.test(nameInput.value)) {
    nameError.textContent = "名前は半角英字とピリオドのみ入力可能です。";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  // メールアドレスのバリデーション
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.textContent = "有効なメールアドレスを入力してください。";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!isValid) {
    event.preventDefault(); // フォーム送信をキャンセル
  }
});
