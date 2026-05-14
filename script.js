const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const copyButton = document.querySelector("[data-copy-text]");

const messageText =
  "Здравствуйте, Екатерина! Хочу обсудить занятия по математике. Ребёнок в __ классе, цель __, сейчас сложнее всего __.";

menuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

function fallbackCopy(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  return copied;
}

copyButton?.addEventListener("click", async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(messageText);
    } else if (!fallbackCopy(messageText)) {
      throw new Error("Copy failed");
    }
    const original = copyButton.textContent;
    copyButton.textContent = "Текст скопирован";
    window.setTimeout(() => {
      copyButton.textContent = original;
    }, 1800);
  } catch {
    copyButton.textContent = "Не удалось скопировать";
  }
});
