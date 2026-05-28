/* ── Platform detection ── */
const PLATFORMS = {
  youtube:     { label: "YouTube",      cls: "yt", icon: ytIcon() },
  instagram:   { label: "Instagram",    cls: "ig", icon: igIcon() },
  tiktok:      { label: "TikTok",       cls: "tt", icon: ttIcon() },
  facebook:    { label: "Facebook",     cls: "fb", icon: fbIcon() },
  linkedin:    { label: "LinkedIn",     cls: "li", icon: liIcon() },
  twitter:     { label: "Twitter / X",  cls: "tw", icon: twIcon() },
  reddit:      { label: "Reddit",       cls: "rd", icon: rdIcon() },
  vimeo:       { label: "Vimeo",        cls: "vi", icon: viIcon() },
  dailymotion: { label: "Dailymotion",  cls: "dm", icon: dmIcon() },
  twitch:      { label: "Twitch",       cls: "tc", icon: tcIcon() },
};

function detectPlatform(url) {
  if (/youtube\.com|youtu\.be/i.test(url))      return "youtube";
  if (/instagram\.com/i.test(url))              return "instagram";
  if (/tiktok\.com/i.test(url))                 return "tiktok";
  if (/facebook\.com|fb\.watch/i.test(url))     return "facebook";
  if (/linkedin\.com/i.test(url))               return "linkedin";
  if (/twitter\.com|x\.com/i.test(url))         return "twitter";
  if (/reddit\.com/i.test(url))                 return "reddit";
  if (/vimeo\.com/i.test(url))                  return "vimeo";
  if (/dailymotion\.com/i.test(url))            return "dailymotion";
  if (/twitch\.tv/i.test(url))                  return "twitch";
  return null;
}

function formatDuration(seconds) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/* ── SVG icons (inline, 16×16) ── */
function ytIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3.02 3.02 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3.02 3.02 0 002.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3.02 3.02 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>`;
}
function igIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z"/></svg>`;
}
function ttIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 3.3A4.8 4.8 0 0115 0h-3.7v16.4a2.9 2.9 0 01-2.9 2.4 2.9 2.9 0 01-2.9-2.9 2.9 2.9 0 012.9-2.9c.3 0 .5 0 .8.1V9.3a6.6 6.6 0 00-.8-.1 6.6 6.6 0 00-6.6 6.6A6.6 6.6 0 008.4 22.4a6.6 6.6 0 006.6-6.6V8.3a8.5 8.5 0 005 1.6V6.2a4.8 4.8 0 01-0.4-2.9z"/></svg>`;
}
function fbIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>`;
}
function liIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
}
function twIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
}
function rdIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>`;
}
function viIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.613-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.479 4.807z"/></svg>`;
}
function dmIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.917 0H24v24h-11.083C5.774 24 0 18.226 0 12S5.774 0 12.917 0zm-1.657 16.82c2.95 0 4.85-2.05 4.85-4.82 0-2.76-1.9-4.81-4.85-4.81-2.96 0-4.86 2.05-4.86 4.81 0 2.77 1.9 4.82 4.86 4.82zm0-7.47c1.46 0 2.41 1.06 2.41 2.65 0 1.6-.95 2.66-2.41 2.66-1.47 0-2.42-1.06-2.42-2.66 0-1.59.95-2.65 2.42-2.65z"/></svg>`;
}
function tcIcon() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>`;
}

/* ── DOM refs ── */
const urlInput       = document.getElementById("urlInput");
const inputWrapper   = document.getElementById("inputWrapper");
const platformBadge  = document.getElementById("platformBadge");
const btnClear       = document.getElementById("btnClear");
const btnPaste       = document.getElementById("btnPaste");
const errorMsg       = document.getElementById("errorMsg");
const previewCard    = document.getElementById("previewCard");
const previewLoading = document.getElementById("previewLoading");
const previewContent = document.getElementById("previewContent");
const thumbnail      = document.getElementById("thumbnail");
const durationBadge  = document.getElementById("durationBadge");
const platformOverlay= document.getElementById("platformOverlay");
const platformTag    = document.getElementById("platformTag");
const videoTitle     = document.getElementById("videoTitle");
const videoUploader  = document.getElementById("videoUploader");
const btnDownload      = document.getElementById("btnDownload");
const downloadProgress = document.getElementById("downloadProgress");
const progressFill     = document.getElementById("progressFill");
const progressLabel    = document.getElementById("progressLabel");

/* ── State ── */
let currentUrl = "";
let fetchTimeout = null;

/* ── Helpers ── */
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
}
function hideError() {
  errorMsg.classList.add("hidden");
}

function resetPreview() {
  previewCard.classList.add("hidden");
  previewLoading.classList.add("hidden");
  previewContent.classList.add("hidden");
  downloadProgress.classList.add("hidden");
  btnDownload.disabled = false;
  btnDownload.classList.remove("hidden");
}

function updateBadge(platform) {
  if (!platform) {
    platformBadge.classList.add("hidden");
    platformBadge.className = "platform-badge hidden";
    inputWrapper.classList.remove("has-url");
    return;
  }
  const p = PLATFORMS[platform];
  platformBadge.innerHTML = p.icon + " " + p.label;
  platformBadge.className = `platform-badge ${p.cls}`;
  inputWrapper.classList.add("has-url");
}

/* ── Fetch info ── */
async function fetchInfo(url) {
  resetPreview();
  previewCard.classList.remove("hidden");
  previewLoading.classList.remove("hidden");
  hideError();

  try {
    const res = await fetch("/api/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    previewLoading.classList.add("hidden");

    if (!res.ok || data.error) {
      showError(data.error || "Erreur inconnue.");
      previewCard.classList.add("hidden");
      return;
    }

    const p = PLATFORMS[data.platform];

    // Thumbnail
    if (data.thumbnail) {
      thumbnail.src = data.thumbnail;
      thumbnail.style.display = "block";
    } else {
      thumbnail.style.display = "none";
    }

    // Duration
    const dur = formatDuration(data.duration);
    durationBadge.textContent = dur;
    durationBadge.style.display = dur ? "block" : "none";

    // Platform overlay icon
    const colorMap = { youtube: "--yt", instagram: "--ig", tiktok: "--tt", facebook: "--fb", linkedin: "--li", twitter: "--tw", reddit: "--rd", vimeo: "--vi", dailymotion: "--dm", twitch: "--tc" };
    platformOverlay.innerHTML = p.icon;
    platformOverlay.style.color = getComputedStyle(document.documentElement)
      .getPropertyValue(colorMap[data.platform] || "--text").trim() || "#fff";

    // Tag
    platformTag.innerHTML = p.icon + " " + p.label;
    platformTag.className = `platform-tag ${p.cls}`;

    videoTitle.textContent = data.title;
    videoUploader.textContent = data.uploader ? `@${data.uploader}` : "";

    previewContent.classList.remove("hidden");
  } catch (err) {
    previewLoading.classList.add("hidden");
    previewCard.classList.add("hidden");
    showError("Impossible de contacter le serveur.");
  }
}

/* ── Pill highlight ── */
function highlightPill(platform) {
  Object.keys(PLATFORMS).forEach(p => {
    document.getElementById("pill-" + p)?.classList.toggle("active", p === platform);
  });
}

/* ── URL change handler ── */
function onUrlChange(value) {
  currentUrl = value.trim();
  const platform = detectPlatform(currentUrl);

  updateBadge(platform);
  highlightPill(platform);
  btnClear.classList.toggle("hidden", !currentUrl);
  hideError();

  clearTimeout(fetchTimeout);

  if (!currentUrl) {
    resetPreview();
    return;
  }

  if (platform) {
    fetchTimeout = setTimeout(() => fetchInfo(currentUrl), 600);
  } else {
    resetPreview();
  }
}

/* ── Input events ── */
urlInput.addEventListener("input", (e) => onUrlChange(e.target.value));

urlInput.addEventListener("paste", (e) => {
  // Let the paste happen, then trigger
  setTimeout(() => onUrlChange(urlInput.value), 0);
});

btnClear.addEventListener("click", () => {
  urlInput.value = "";
  onUrlChange("");
  urlInput.focus();
});

btnPaste.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    urlInput.value = text;
    onUrlChange(text);
  } catch {
    urlInput.focus();
    document.execCommand("paste");
    setTimeout(() => onUrlChange(urlInput.value), 0);
  }
});

/* ── Download ── */
btnDownload.addEventListener("click", () => {
  if (!currentUrl) return;

  btnDownload.disabled = true;
  btnDownload.classList.add("hidden");
  downloadProgress.classList.remove("hidden");
  progressFill.style.animation = "indeterminate 1.4s ease infinite";
  progressFill.style.backgroundImage = "linear-gradient(90deg, var(--accent), var(--accent2), var(--accent))";
  progressFill.style.backgroundSize = "200% 100%";
  progressFill.style.width = "100%";
  progressLabel.textContent = "Téléchargement en cours…";

  // Trigger browser download via hidden link
  const a = document.createElement("a");
  a.href = `/api/download?url=${encodeURIComponent(currentUrl)}`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Simulate completion feedback after a delay (actual download is handled by browser)
  setTimeout(() => {
    progressFill.style.animation = "none";
    progressFill.style.backgroundSize = "100% 100%";
    progressFill.style.width = "100%";
    progressLabel.textContent = "Téléchargement lancé !";

    setTimeout(() => {
      downloadProgress.classList.add("hidden");
      btnDownload.disabled = false;
      btnDownload.classList.remove("hidden");
    }, 3000);
  }, 2000);
});
