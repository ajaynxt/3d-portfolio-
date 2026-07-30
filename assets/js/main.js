import { processSteps, projects, services } from "./data/site.js";

const projectGrid = document.querySelector("[data-project-grid]");
const serviceGrid = document.querySelector("[data-service-grid]");
const processGrid = document.querySelector("[data-process-grid]");

if (projectGrid) {
  projectGrid.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal" style="--reveal-delay: ${index * 70}ms">
          <a class="project-card__link" href="${project.href}" target="_blank" rel="noreferrer" aria-label="Open ${project.title}">
            <div class="project-card__media">
              <img src="${project.image}" alt="${project.imageAlt}" width="1600" height="1000" loading="lazy" decoding="async" />
              <span class="project-card__index">0${index + 1}</span>
              <span class="project-card__open" aria-hidden="true">↗</span>
            </div>
            <div class="project-card__body">
              <p class="eyebrow">${project.eyebrow}</p>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <ul class="tag-list" aria-label="Project capabilities">
                ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
              </ul>
            </div>
          </a>
        </article>
      `,
    )
    .join("");
}

if (serviceGrid) {
  serviceGrid.innerHTML = services
    .map(
      (service, index) => `
        <article class="service-card reveal" style="--reveal-delay: ${index * 90}ms">
          <div class="service-card__top">
            <span>${service.number}</span>
            <span class="service-card__line" aria-hidden="true"></span>
          </div>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <ul>${service.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `,
    )
    .join("");
}

if (processGrid) {
  processGrid.innerHTML = processSteps
    .map(
      ([title, description], index) => `
        <li class="process-step reveal" style="--reveal-delay: ${index * 70}ms">
          <span>0${index + 1}</span>
          <div><h3>${title}</h3><p>${description}</p></div>
        </li>
      `,
    )
    .join("");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -7%" },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  header?.classList.toggle("menu-open", !expanded);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    header?.classList.remove("menu-open");
  });
});

let previousScrollY = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;
    header?.classList.toggle("header-scrolled", currentScrollY > 24);
    header?.classList.toggle(
      "header-hidden",
      currentScrollY > previousScrollY &&
        currentScrollY > 180 &&
        !header?.classList.contains("menu-open"),
    );
    previousScrollY = currentScrollY;
  },
  { passive: true },
);

const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(
  document.querySelectorAll("[data-navigation] a[href^='#']"),
);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${active.target.id}`,
      );
    });
  },
  { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -55%" },
);
sections.forEach((section) => sectionObserver.observe(section));

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 3.5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 4.5).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
