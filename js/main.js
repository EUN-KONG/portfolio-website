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

// GitHub API를 사용할 사용자 아이디입니다.
const githubUsername = "EUN-KONG";

// 프로젝트를 표시할 HTML 요소입니다.
const projectList = document.querySelector("#project-list");

// GitHub 프로젝트를 화면에 표시하는 함수입니다.
const renderProjects = (projects) => {
  // 저장소가 하나도 없을 때의 빈 상태입니다.
  if (projects.length === 0) {
    projectList.innerHTML = `
      <p class="project-status">표시할 프로젝트가 없습니다.</p>
    `;
    return;
  }

  // map으로 저장소 데이터를 HTML 카드로 변환합니다.
  projectList.innerHTML = projects
    .map((project) => {
      const {
        name,
        description,
        html_url: projectUrl,
        stargazers_count: starCount,
        language,
      } = project;

      return `
        <article class="project-card">
          <h3>${name}</h3>
          <p>${description || "프로젝트 설명이 없습니다."}</p>
          <p>사용 언어: ${language || "정보 없음"}</p>
          <p>⭐ ${starCount}</p>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer">
            GitHub에서 보기
          </a>
        </article>
      `;
    })
    .join("");
};

// GitHub API에서 프로젝트를 가져오는 비동기 함수입니다.
const fetchProjects = async () => {
  // API 요청 중임을 표시합니다.
  projectList.innerHTML = `
    <p class="project-status">프로젝트를 불러오는 중입니다...</p>
  `;

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated`,
    );

    // 응답 상태가 정상적이지 않으면 에러를 발생시킵니다.
    if (!response.ok) {
      throw new Error("GitHub API 요청 실패");
    }

    const projects = await response.json();

    // 가져온 프로젝트를 화면에 표시합니다.
    renderProjects(projects);
  } catch (error) {
    // API 요청 실패 상태를 화면에 표시합니다.
    projectList.innerHTML = `
      <p class="project-status">
        프로젝트를 불러올 수 없습니다.
      </p>
      <button type="button" class="retry-button">
        다시 시도
      </button>
    `;

    // 다시 시도 버튼을 선택합니다.
    const retryButton = document.querySelector(".retry-button");

    // 버튼을 클릭하면 API를 다시 요청합니다.
    retryButton.addEventListener("click", fetchProjects);
  }
};

// 페이지가 열릴 때 GitHub 프로젝트를 요청합니다.
fetchProjects();
