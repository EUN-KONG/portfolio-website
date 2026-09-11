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
