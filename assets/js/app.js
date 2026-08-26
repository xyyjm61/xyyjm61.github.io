/* ==========================================================================
   余剑锰个人主页 - 页面逻辑
   - 手写项目卡片：assets/js/projects.js
   - 深色/浅色主题切换
   - 微信复制
   ========================================================================== */

import { PROJECTS } from "./projects.js";

/* ===== 主题 ===== */
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {
    /* 存储不可用时忽略 */
  }
}

function initTheme() {
  const btn = document.getElementById("page-theme");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

/* ===== 工具函数 ===== */
const escapeHtml = (str = "") =>
  str.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]
  );

const renderTags = (tags = []) =>
  tags.length
    ? `<div class="topics">${tags
        .map((t) => `<span class="topic">${escapeHtml(t)}</span>`)
        .join("")}</div>`
    : "";

/* ===== 项目卡片 ===== */
function projectCard(project) {
  const links = [
    project.demoUrl
      ? `<a class="repo-link" href="${encodeURI(project.demoUrl)}" target="_blank" rel="noopener">演示 →</a>`
      : "",
    project.repoUrl
      ? `<a class="repo-link" href="${encodeURI(project.repoUrl)}" target="_blank" rel="noopener">代码 →</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="repo-card">
      <h3>${escapeHtml(project.title || "项目")}</h3>
      <p class="desc">${escapeHtml(project.description || "")}</p>
      ${renderTags(project.tags)}
      <div class="foot">
        <span class="stats">${project.result ? escapeHtml(project.result) : ""}</span>
        <span class="links">${links}</span>
      </div>
    </article>
  `;
}

function renderProjects() {
  const el = document.getElementById("project-cards");
  if (!el) return;

  if (!Array.isArray(PROJECTS) || !PROJECTS.length) {
    el.innerHTML = `<p class="state">暂无项目内容。</p>`;
    return;
  }

  el.innerHTML = PROJECTS.map(projectCard).join("");
}

/* ===== 复制微信 ===== */
function initCopyButtons() {
  const buttons = document.querySelectorAll("[data-copy]");
  const status = document.getElementById("copy-status");
  if (!buttons.length) return;

  const showStatus = (message) => {
    if (!status) return;
    status.textContent = message;
    status.classList.add("show");
    clearTimeout(showStatus.timer);
    showStatus.timer = setTimeout(() => {
      status.classList.remove("show");
      status.textContent = "";
    }, 1800);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(value);
        showStatus("微信号已复制");
      } catch (_) {
        const input = document.createElement("input");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        showStatus("微信号已复制");
      }
    });
  });
}

/* ===== 初始化 ===== */
function init() {
  initTheme();
  renderProjects();
  initCopyButtons();
}

init();
