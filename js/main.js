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
