// HTML에서 필요한 요소를 선택합니다.
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const themeButton = document.querySelector("#theme-button");

// 햄버거 버튼을 클릭하면 메뉴의 active 상태를 켜거나 끕니다.
menuButton.addEventListener("click", () => {
  const isActive = navMenu.classList.toggle("active");

  // 메뉴가 열려 있는지 접근성 속성에도 반영합니다.
  menuButton.setAttribute("aria-expanded", isActive);
});

// 메뉴 링크를 클릭하면 모바일 메뉴를 닫습니다.
const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// 저장된 테마를 가져옵니다.
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeButton.textContent = "☀️";
}

// 다크 모드 버튼을 클릭하면 테마를 변경합니다.
themeButton.addEventListener("click", () => {
  const isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";

  if (isDarkMode) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeButton.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeButton.textContent = "☀️";
  }
});

// 스크롤 탑 버튼과 헤더를 선택합니다.
const scrollTopButton = document.querySelector("#scroll-top-button");
const header = document.querySelector("header");

// 스크롤 위치에 따라 화면을 변경합니다.
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // 300px 이상 스크롤하면 버튼을 표시합니다.
  scrollTopButton.classList.toggle("visible", scrollPosition >= 300);

  // 60px 이상 스크롤하면 헤더에 scrolled 클래스를 추가합니다.
  header.classList.toggle("scrolled", scrollPosition >= 60);
});

// 버튼을 클릭하면 페이지 맨 위로 부드럽게 이동합니다.
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 화면에 들어온 섹션을 감지합니다.
const sections = document.querySelectorAll("main section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

// 모든 섹션 감시를 시작합니다.
sections.forEach((section) => {
  sectionObserver.observe(section);
});

// 문의 폼 요소를 선택합니다.
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formResult = document.querySelector("#form-result");

// 이메일 형식 확인을 위한 정규식입니다.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 입력값 하나를 검사하는 함수입니다.
const validateField = (input, errorElement, message) => {
  if (input.value.trim() === "") {
    input.classList.add("error");
    errorElement.textContent = message;
    return false;
  }

  input.classList.remove("error");
  errorElement.textContent = "";
  return true;
};

// 입력 중에는 해당 입력칸의 에러를 제거합니다.
nameInput.addEventListener("input", () => {
  validateField(nameInput, nameError, "이름을 입력해주세요.");
});

emailInput.addEventListener("input", () => {
  if (emailInput.value.trim() === "") {
    emailInput.classList.add("error");
    emailError.textContent = "이메일을 입력해주세요.";
  } else if (!emailPattern.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.textContent = "올바른 이메일 형식을 입력해주세요.";
  } else {
    emailInput.classList.remove("error");
    emailError.textContent = "";
  }
});

messageInput.addEventListener("input", () => {
  validateField(messageInput, messageError, "메시지를 입력해주세요.");
});

// 폼 제출을 검사합니다.
contactForm.addEventListener("submit", (event) => {
  // 서버로 실제 전송되는 기본 동작을 막습니다.
  event.preventDefault();

  const isNameValid = validateField(
    nameInput,
    nameError,
    "이름을 입력해주세요.",
  );

  const isMessageValid = validateField(
    messageInput,
    messageError,
    "메시지를 입력해주세요.",
  );

  let isEmailValid = true;

  if (emailInput.value.trim() === "") {
    emailInput.classList.add("error");
    emailError.textContent = "이메일을 입력해주세요.";
    isEmailValid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.textContent = "올바른 이메일 형식을 입력해주세요.";
    isEmailValid = false;
  } else {
    emailInput.classList.remove("error");
    emailError.textContent = "";
  }

  if (isNameValid && isEmailValid && isMessageValid) {
    formResult.textContent = "문의가 성공적으로 접수되었습니다.";
    formResult.classList.add("success");

    contactForm.reset();
  } else {
    formResult.textContent = "";
    formResult.classList.remove("success");
  }
});
