const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const copyButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");
const projectGrid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const email = "hello@example.com";

// 1. Переключение светлой и тёмной темы.
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";
});

// 2. Открытие/закрытие мобильного меню.
menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 3. Копирование email в буфер обмена.
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = "Email copied!";
  } catch {
    copyFeedback.textContent = `Напишите нам: ${email}`;
  }
});

// 4. Фильтрация карточек по категории.
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// 5. Модальное окно с информацией о проекте.
projectGrid.addEventListener("click", event => {
  const card = event.target.closest(".project-card");
  if (!card) return;
  modalTitle.textContent = card.dataset.title;
  modalDescription.textContent = card.dataset.description;
  modal.showModal();
});
modalClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
  if (event.target === modal) modal.close();
});
