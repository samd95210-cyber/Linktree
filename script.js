// script.js - Personal Linktree Web Application

// Default State Configuration
const DEFAULT_DATA = {
  profile: {
    name: "Alex Morgan",
    handle: "@alexmorgan",
    bio: "Product Designer & Creative Technologist. Building thoughtful digital experiences & sharing insights on web aesthetics.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces",
    verified: true
  },
  theme: "dark",
  buttonShape: "pill",
  socials: [
    { id: "github", name: "GitHub", url: "https://github.com", active: true },
    { id: "twitter", name: "X (Twitter)", url: "https://x.com", active: true },
    { id: "instagram", name: "Instagram", url: "https://instagram.com", active: true },
    { id: "youtube", name: "YouTube", url: "https://youtube.com", active: true },
    { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com", active: true },
    { id: "spotify", name: "Spotify", url: "https://spotify.com", active: true },
    { id: "email", name: "Email", url: "mailto:alex@example.com", active: true }
  ],
  buttons: [
    {
      id: "b1",
      title: "My Portfolio & Selected Works",
      subtitle: "Recent projects, case studies & design systems",
      url: "https://example.com/portfolio",
      icon: "globe",
      badge: "FEATURED",
      featured: true,
      pulse: true,
      clicks: 142
    },
    {
      id: "b2",
      title: "Latest YouTube Video: 2026 UI Design Trends",
      subtitle: "Deep dive into clean modern aesthetics & micro-interactions",
      url: "https://youtube.com",
      icon: "youtube",
      badge: "NEW",
      featured: false,
      pulse: false,
      clicks: 89
    },
    {
      id: "b3",
      title: "Weekly Design Newsletter",
      subtitle: "Over 12,000 creators receiving curated typography & tools",
      url: "https://example.com/newsletter",
      icon: "mail",
      badge: "",
      featured: false,
      pulse: false,
      clicks: 215
    },
    {
      id: "b4",
      title: "Book a 1:1 Design Mentorship Call",
      subtitle: "30-minute portfolio review & career strategy session",
      url: "https://cal.com",
      icon: "calendar",
      badge: "POPULAR",
      featured: false,
      pulse: false,
      clicks: 64
    },
    {
      id: "b5",
      title: "My Spotify Focus & Coding Playlist",
      subtitle: "Ambient synth, chillwave & lo-fi beats",
      url: "https://open.spotify.com",
      icon: "music",
      badge: "",
      featured: false,
      pulse: false,
      clicks: 178
    }
  ]
};

// SVG Icons Collection
const ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  shopping: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  podcast: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  // Social Media Icons
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.306c-.215.353-.674.464-1.026.248-2.812-1.718-6.353-2.106-10.522-1.154-.403.092-.806-.157-.899-.56-.092-.403.157-.806.56-.899 4.568-1.042 8.483-.601 11.639 1.339.352.216.463.675.248 1.026zm1.464-3.256c-.27.441-.849.58-1.29.31-3.218-1.978-8.125-2.55-11.93-1.395-.497.151-1.029-.133-1.18-.63-.151-.497.133-1.029.63-1.18 4.354-1.321 9.771-.684 13.46 1.585.441.27.58.849.31 1.29zm.126-3.397c-3.86-2.292-10.228-2.503-13.896-1.389-.592.18-1.222-.158-1.402-.75-.18-.592.158-1.222.75-1.402 4.218-1.28 11.237-1.037 15.688 1.606.533.316.707 1.008.391 1.541-.316.533-1.008.707-1.541.394z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.399 0 .017 5.382.017 12.014c0 2.12.553 4.186 1.605 6.01L0 24l6.177-1.62c1.764.962 3.754 1.47 5.845 1.47 6.633 0 12.015-5.382 12.015-12.015C24.037 5.382 18.664 0 12.031 0zm.019 21.99c-1.802 0-3.568-.485-5.112-1.401l-.367-.217-3.799.996 1.014-3.704-.239-.38a9.98 9.98 0 0 1-1.53-5.26c0-5.526 4.498-10.024 10.033-10.024 2.68 0 5.2 1.045 7.094 2.94a10.007 10.007 0 0 1 2.94 7.094c0 5.527-4.507 10.026-10.034 10.026z"/></svg>`
};

// Storage Helpers
const STORAGE_KEY = "linktree_custom_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_DATA,
        ...parsed,
        profile: { ...DEFAULT_DATA.profile, ...parsed.profile },
        buttons: parsed.buttons || DEFAULT_DATA.buttons,
        socials: parsed.socials || DEFAULT_DATA.socials
      };
    }
  } catch (e) {
    console.error("Failed to load linktree data", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save linktree data", e);
  }
}

// Global Application State
let appData = loadData();
let activeEditingButtonId = null;

// Initialize on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(appData.theme);
  applyShape(appData.buttonShape);
  renderProfile();
  renderSocials();
  renderButtons();
  setupEventListeners();
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("toastMsg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastMsg";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Theme & Styling
function applyTheme(themeName) {
  document.body.className = document.body.className.replace(/theme-\w+/g, "").trim();
  document.body.classList.add(`theme-${themeName}`);
  appData.theme = themeName;
}

function applyShape(shapeName) {
  document.body.className = document.body.className.replace(/shape-\w+/g, "").trim();
  document.body.classList.add(`shape-${shapeName}`);
  appData.buttonShape = shapeName;
}

// Render Profile
function renderProfile() {
  const avatarEl = document.getElementById("profileAvatar");
  const nameEl = document.getElementById("profileName");
  const handleEl = document.getElementById("profileHandle");
  const bioEl = document.getElementById("profileBio");
  const locEl = document.getElementById("profileLocation");
  const verifiedEl = document.getElementById("verifiedBadge");

  if (avatarEl) avatarEl.src = appData.profile.avatar;
  if (nameEl) nameEl.textContent = appData.profile.name;
  if (handleEl) handleEl.textContent = appData.profile.handle;
  if (bioEl) bioEl.textContent = appData.profile.bio;
  if (locEl) {
    locEl.innerHTML = `${ICONS.location} <span>${appData.profile.location}</span>`;
  }
  if (verifiedEl) {
    verifiedEl.style.display = appData.profile.verified ? "flex" : "none";
  }

  // Update document title
  document.title = `${appData.profile.name} | Links & Socials`;
}

// Render Socials
function renderSocials() {
  const container = document.getElementById("socialLinksContainer");
  if (!container) return;

  container.innerHTML = "";
  const activeSocials = appData.socials.filter(s => s.active && s.url);

  activeSocials.forEach(social => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "social-icon-btn";
    link.setAttribute("aria-label", social.name);
    link.title = social.name;
    link.innerHTML = ICONS[social.id] || ICONS.globe;
    container.appendChild(link);
  });
}

// Render Custom Buttons
function renderButtons() {
  const container = document.getElementById("buttonsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (appData.buttons.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-secondary); background: var(--card-bg); border-radius: var(--radius); border: 1px dashed var(--card-border);">
        <p style="font-weight: 600; margin-bottom: 6px;">No links added yet</p>
        <p style="font-size: 13px;">Click "Customize" in the top right to add your custom buttons.</p>
      </div>
    `;
    return;
  }

  appData.buttons.forEach(btn => {
    const a = document.createElement("a");
    a.href = btn.url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = `link-btn ${btn.featured ? "featured" : ""} ${btn.pulse ? "pulse" : ""}`;
    a.id = `btn-${btn.id}`;

    // Click handler for tracking
    a.addEventListener("click", () => {
      btn.clicks = (btn.clicks || 0) + 1;
      saveData(appData);
    });

    const iconSvg = ICONS[btn.icon] || ICONS.globe;

    a.innerHTML = `
      <div class="link-btn-left">
        <div class="btn-icon-box">
          ${iconSvg}
        </div>
        <div class="btn-text-content">
          <span class="btn-title">${escapeHtml(btn.title)}</span>
          ${btn.subtitle ? `<span class="btn-subtitle">${escapeHtml(btn.subtitle)}</span>` : ""}
        </div>
      </div>
      <div class="link-btn-right">
        ${btn.badge ? `<span class="btn-badge">${escapeHtml(btn.badge)}</span>` : ""}
        <span class="btn-arrow">${ICONS.arrowRight}</span>
      </div>
    `;

    container.appendChild(a);
  });
}

// Escape HTML utility
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Setup Event Listeners
function setupEventListeners() {
  // Share Button
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: `${appData.profile.name} - Linktree`,
          text: appData.profile.bio,
          url: window.location.href
        }).catch(() => copyToClipboard());
      } else {
        copyToClipboard();
      }
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast("Link copied to clipboard!"))
      .catch(() => showToast("Copied page URL!"));
  }

  // Customize Modal Controls
  const customizeBtn = document.getElementById("customizeBtn");
  const modalOverlay = document.getElementById("customizeModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (customizeBtn && modalOverlay) {
    customizeBtn.addEventListener("click", () => {
      openCustomizeModal();
    });
  }

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
      }
    });
  }

  // Modal Tabs
  const tabs = document.querySelectorAll(".modal-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      document.querySelectorAll(".modal-tab-content").forEach(c => c.style.display = "none");
      const activeContent = document.getElementById(`tabContent-${target}`);
      if (activeContent) activeContent.style.display = "block";
    });
  });

  // Profile Form Save
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      appData.profile.name = document.getElementById("inputProfileName").value.trim() || "My Name";
      appData.profile.handle = document.getElementById("inputProfileHandle").value.trim() || "@handle";
      appData.profile.bio = document.getElementById("inputProfileBio").value.trim();
      appData.profile.location = document.getElementById("inputProfileLocation").value.trim();
      appData.profile.avatar = document.getElementById("inputProfileAvatar").value.trim() || DEFAULT_DATA.profile.avatar;
      appData.profile.verified = document.getElementById("inputProfileVerified").checked;

      saveData(appData);
      renderProfile();
      showToast("Profile updated!");
    });
  }

  // Avatar file input handler
  const avatarFileInput = document.getElementById("avatarFileInput");
  if (avatarFileInput) {
    avatarFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          document.getElementById("inputProfileAvatar").value = loadEvt.target.result;
          appData.profile.avatar = loadEvt.target.result;
          renderProfile();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Add / Edit Button Form
  const buttonForm = document.getElementById("buttonForm");
  if (buttonForm) {
    buttonForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("inputBtnTitle").value.trim();
      const url = document.getElementById("inputBtnUrl").value.trim();
      const subtitle = document.getElementById("inputBtnSubtitle").value.trim();
      const icon = document.getElementById("selectBtnIcon").value;
      const badge = document.getElementById("inputBtnBadge").value.trim();
      const featured = document.getElementById("inputBtnFeatured").checked;
      const pulse = document.getElementById("inputBtnPulse").checked;

      if (!title || !url) {
        showToast("Title and URL are required!");
        return;
      }

      if (activeEditingButtonId) {
        // Update existing
        const idx = appData.buttons.findIndex(b => b.id === activeEditingButtonId);
        if (idx !== -1) {
          appData.buttons[idx] = {
            ...appData.buttons[idx],
            title,
            url,
            subtitle,
            icon,
            badge,
            featured,
            pulse
          };
          showToast("Button updated!");
        }
        activeEditingButtonId = null;
        document.getElementById("btnSubmitText").textContent = "Add Button";
      } else {
        // Create new
        const newBtn = {
          id: "btn_" + Date.now(),
          title,
          url,
          subtitle,
          icon,
          badge,
          featured,
          pulse,
          clicks: 0
        };
        appData.buttons.push(newBtn);
        showToast("Button added!");
      }

      saveData(appData);
      renderButtons();
      renderManageButtonsList();
      buttonForm.reset();
    });
  }

  // Reset Button Form
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", () => {
      activeEditingButtonId = null;
      buttonForm.reset();
      document.getElementById("btnSubmitText").textContent = "Add Button";
      cancelEditBtn.style.display = "none";
    });
  }

  // Theme selector
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.value = appData.theme;
    themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
      saveData(appData);
    });
  }

  // Shape selector
  const shapeSelect = document.getElementById("shapeSelect");
  if (shapeSelect) {
    shapeSelect.value = appData.buttonShape;
    shapeSelect.addEventListener("change", (e) => {
      applyShape(e.target.value);
      saveData(appData);
    });
  }

  // Socials Form Save
  const socialsForm = document.getElementById("socialsForm");
  if (socialsForm) {
    socialsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      appData.socials.forEach(s => {
        const inputUrl = document.getElementById(`socialUrl_${s.id}`);
        const inputActive = document.getElementById(`socialActive_${s.id}`);
        if (inputUrl) s.url = inputUrl.value.trim();
        if (inputActive) s.active = inputActive.checked;
      });
      saveData(appData);
      renderSocials();
      showToast("Social links updated!");
    });
  }

  // Reset to default data button
  const resetBtn = document.getElementById("resetAllBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all profile links, buttons, and settings to original state?")) {
        localStorage.removeItem(STORAGE_KEY);
        appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveData(appData);
        applyTheme(appData.theme);
        applyShape(appData.buttonShape);
        renderProfile();
        renderSocials();
        renderButtons();
        openCustomizeModal();
        showToast("Reset to defaults!");
      }
    });
  }
}

// Open Customize Modal & Populate Fields
function openCustomizeModal() {
  const modal = document.getElementById("customizeModal");
  if (!modal) return;
  modal.classList.add("active");

  // Populate profile fields
  document.getElementById("inputProfileName").value = appData.profile.name;
  document.getElementById("inputProfileHandle").value = appData.profile.handle;
  document.getElementById("inputProfileBio").value = appData.profile.bio;
  document.getElementById("inputProfileLocation").value = appData.profile.location;
  document.getElementById("inputProfileAvatar").value = appData.profile.avatar;
  document.getElementById("inputProfileVerified").checked = !!appData.profile.verified;

  // Populate styling
  document.getElementById("themeSelect").value = appData.theme;
  document.getElementById("shapeSelect").value = appData.buttonShape;

  // Populate manage buttons list
  renderManageButtonsList();

  // Populate socials fields
  renderSocialsEditor();
}

// Render Manage Buttons in Modal
function renderManageButtonsList() {
  const listContainer = document.getElementById("manageButtonsList");
  if (!listContainer) return;

  listContainer.innerHTML = "";

  if (appData.buttons.length === 0) {
    listContainer.innerHTML = `<p style="font-size: 13px; color: var(--text-secondary); text-align: center; padding: 12px;">No buttons created yet.</p>`;
    return;
  }

  appData.buttons.forEach((btn, index) => {
    const item = document.createElement("div");
    item.className = "btn-manage-item";
    item.innerHTML = `
      <div class="btn-manage-info">
        <div class="btn-manage-title">${escapeHtml(btn.title)}</div>
        <div class="btn-manage-url">${escapeHtml(btn.url)} &bull; ${btn.clicks || 0} clicks</div>
      </div>
      <div class="btn-actions">
        <button type="button" class="btn-action-icon" title="Move Up" ${index === 0 ? "disabled style='opacity:0.3; cursor:default;'" : ""} onclick="moveButton(${index}, -1)">&#9650;</button>
        <button type="button" class="btn-action-icon" title="Move Down" ${index === appData.buttons.length - 1 ? "disabled style='opacity:0.3; cursor:default;'" : ""} onclick="moveButton(${index}, 1)">&#9660;</button>
        <button type="button" class="btn-action-icon" title="Edit" onclick="editButton('${btn.id}')">&#9998;</button>
        <button type="button" class="btn-action-icon delete" title="Delete" onclick="deleteButton('${btn.id}')">&#10005;</button>
      </div>
    `;
    listContainer.appendChild(item);
  });
}

// Global button actions triggered from onclick in items
window.moveButton = function(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= appData.buttons.length) return;
  const temp = appData.buttons[index];
  appData.buttons[index] = appData.buttons[newIndex];
  appData.buttons[newIndex] = temp;
  saveData(appData);
  renderButtons();
  renderManageButtonsList();
};

window.editButton = function(id) {
  const btn = appData.buttons.find(b => b.id === id);
  if (!btn) return;
  activeEditingButtonId = id;

  document.getElementById("inputBtnTitle").value = btn.title;
  document.getElementById("inputBtnUrl").value = btn.url;
  document.getElementById("inputBtnSubtitle").value = btn.subtitle || "";
  document.getElementById("selectBtnIcon").value = btn.icon || "globe";
  document.getElementById("inputBtnBadge").value = btn.badge || "";
  document.getElementById("inputBtnFeatured").checked = !!btn.featured;
  document.getElementById("inputBtnPulse").checked = !!btn.pulse;

  document.getElementById("btnSubmitText").textContent = "Save Changes";
  const cancelBtn = document.getElementById("cancelEditBtn");
  if (cancelBtn) cancelBtn.style.display = "inline-block";

  // Scroll to form
  document.getElementById("buttonForm").scrollIntoView({ behavior: "smooth" });
};

window.deleteButton = function(id) {
  if (!confirm("Are you sure you want to delete this button?")) return;
  appData.buttons = appData.buttons.filter(b => b.id !== id);
  if (activeEditingButtonId === id) {
    activeEditingButtonId = null;
    document.getElementById("buttonForm").reset();
    document.getElementById("btnSubmitText").textContent = "Add Button";
    const cancelBtn = document.getElementById("cancelEditBtn");
    if (cancelBtn) cancelBtn.style.display = "none";
  }
  saveData(appData);
  renderButtons();
  renderManageButtonsList();
  showToast("Button removed!");
};

// Render Socials Editor in Modal
function renderSocialsEditor() {
  const container = document.getElementById("socialsEditorList");
  if (!container) return;

  container.innerHTML = "";

  appData.socials.forEach(s => {
    const row = document.createElement("div");
    row.style.marginBottom = "12px";
    row.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
        <label class="form-label" style="margin: 0; display: flex; align-items: center; gap: 8px;">
          ${s.name}
        </label>
        <label style="font-size: 11px; display: flex; align-items: center; gap: 4px; cursor: pointer;">
          <input type="checkbox" id="socialActive_${s.id}" ${s.active ? "checked" : ""}>
          Show
        </label>
      </div>
      <input type="url" class="form-input" id="socialUrl_${s.id}" value="${escapeHtml(s.url)}" placeholder="https://...">
    `;
    container.appendChild(row);
  });
}
