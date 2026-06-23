const welcomeButton = document.getElementById("welcomeButton");
const message = document.getElementById("message");

const revealElements = document.querySelectorAll(
  ".project-info, .technologies, .learning-goals, .current-focus, .project-highlights, .interaction, .github-area, .repository-area, .status-area"
);

function showWelcomeMessage() {
  const messages = [
    "Willkommen auf meinem ersten Website-Projekt!",
    "Schön, dass du meine Website besuchst!",
    "Ich lerne jeden Tag etwas Neues über Webentwicklung.",
    "Danke für deinen Besuch auf meiner Website!"
  ];

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  message.textContent = randomMessage;
  message.classList.add("show-message");

  welcomeButton.textContent = "Nachricht angezeigt";

  setTimeout(() => {
    message.classList.remove("show-message");
    welcomeButton.textContent = "Click me";
  }, 3000);
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollHeight > 0
      ? Math.min(scrollTop / scrollHeight, 1)
      : 0;

  document.documentElement.style.setProperty(
    "--scroll-progress",
    progress
  );
}

function revealVisibleElements() {
  revealElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const triggerPosition = window.innerHeight * 0.88;

    if (elementPosition < triggerPosition) {
      element.classList.add("visible");
    }
  });
}

function createScrollToTopButton() {
  const scrollButton = document.createElement("button");

  scrollButton.type = "button";
  scrollButton.className = "scroll-top-button";
  scrollButton.setAttribute("aria-label", "Nach oben scrollen");
  scrollButton.textContent = "↑";

  document.body.appendChild(scrollButton);

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  return scrollButton;
}

function updateScrollToTopButton(scrollButton) {
  if (window.scrollY > 450) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
}

function updateCurrentDate() {
  const footerText = document.querySelector("footer p");

  if (!footerText) {
    return;
  }

  const currentDate = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  footerText.innerHTML =
    `&copy; ${new Date().getFullYear()} Kimberly Vale ` +
    `<span aria-hidden="true">|</span> Stand: ${currentDate}`;
}

function initializeWebsite() {
  const scrollToTopButton = createScrollToTopButton();

  updateCurrentDate();
  updateScrollProgress();
  revealVisibleElements();
  updateScrollToTopButton(scrollToTopButton);

  window.addEventListener(
    "scroll",
    () => {
      updateScrollProgress();
      revealVisibleElements();
      updateScrollToTopButton(scrollToTopButton);
    },
    {
      passive: true
    }
  );
}

if (welcomeButton && message) {
  welcomeButton.addEventListener("click", showWelcomeMessage);
}

window.addEventListener("DOMContentLoaded", initializeWebsite);
