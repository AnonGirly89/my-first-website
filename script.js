const welcomeButton = document.getElementById("welcomeButton");
const message = document.getElementById("message");

welcomeButton.addEventListener("click", () => {
  message.textContent = "Welcome to my first website project!";
  message.classList.add("show-message");

  setTimeout(() => {
    message.classList.remove("show-message");
  }, 2500);
});

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

function revealElements() {
  const revealItems = document.querySelectorAll(
    ".project-info, .technologies, .interaction, .status-area"
  );

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (itemTop < triggerPoint) {
      item.classList.add("visible");
    }
  });
}

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();
    revealElements();
  },
  {
    passive: true
  }
);

window.addEventListener("load", () => {
  updateScrollProgress();
  revealElements();
});
