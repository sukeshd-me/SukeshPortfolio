/**
 * S//SECURITY OS — Main Application Entrypoint
 * Orchestrates 3D canvas, system telemetry, command palette, navigation,
 * cinema mode, accessibility, and real data rendering.
 */

import { PORTFOLIO_DATA } from './data/portfolioData.js';
import { ICONS } from './components/Icons.js';
import { initThreeCanvas } from './components/ThreeCanvas.js';
import { initCommandPalette } from './components/CommandPalette.js';
import { initSystemMonitor } from './components/SystemMonitor.js';
import { initGitHubFeed } from './components/GitHubFeed.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Social Icons
  renderSocialIcons();

  // 2. Cinematic Intro Sequence
  setupCinematicIntro();

  // 3. Initialize 3D Canvas Background
  initThreeCanvas('bg-canvas');

  // 4. Initialize Command Palette (Ctrl+K / Cmd+K)
  const cmdPalette = initCommandPalette({
    onNavigate: (sectionId) => {
      navigateToSection(sectionId);
    },
    onToggleCinema: () => {
      toggleCinemaMode();
    }
  });

  const cmdPaletteBtn = document.getElementById('cmd-palette-btn');
  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', () => {
      cmdPalette.open();
    });
  }

  // 5. Initialize System Monitor (Real-time clock & telemetry)
  initSystemMonitor({
    clockElementId: 'system-clock',
    githubStatusBadgeId: 'status-github-badge',
    githubLatencyId: 'status-github-latency'
  });

  // 6. Initialize GitHub Feed for @sukeshd-me
  initGitHubFeed('github-repos-container');

  // 7. Navigation Spy & Smooth Scrolling
  setupNavigationSpy();

  // 8. Cinema Mode
  setupCinemaMode();

  // 9. Mobile Menu
  setupMobileMenu();

  // 10. Security Lab: Interactive SHA-256 Tool
  setupCryptoLab();

  // 11. Skills Filter Tabs
  setupSkillsFilter();

  // 12. Copy Email Functionality
  setupCopyEmail();
});

/**
 * Render verified inline SVG icons for social profile links
 */
function renderSocialIcons() {
  const iconMappings = [
    { id: 'icon-github', iconName: 'github' },
    { id: 'icon-x', iconName: 'x' },
    { id: 'icon-instagram', iconName: 'instagram' },
    { id: 'icon-youtube', iconName: 'youtube' },
    { id: 'icon-pinterest', iconName: 'pinterest' },
    { id: 'icon-codepen', iconName: 'codepen' },
    { id: 'icon-codeberg', iconName: 'codeberg' },
    { id: 'icon-bluesky', iconName: 'bluesky' },
    { id: 'icon-replit', iconName: 'replit' },
    { id: 'icon-reddit', iconName: 'reddit' }
  ];

  iconMappings.forEach(({ id, iconName }) => {
    const el = document.getElementById(id);
    if (el && ICONS[iconName]) {
      el.innerHTML = ICONS[iconName];
    }
  });
}

/**
 * Short cinematic loading & system initialization sequence
 */
function setupCinematicIntro() {
  const overlay = document.getElementById('intro-overlay');
  const fill = document.getElementById('intro-progress-fill');
  const statusText = document.getElementById('intro-status-text');
  const skipBtn = document.getElementById('intro-skip-btn');

  if (!overlay) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, skip intro immediately
  if (prefersReducedMotion) {
    overlay.style.display = 'none';
    return;
  }

  let isDismissed = false;

  const dismissIntro = () => {
    if (isDismissed) return;
    isDismissed = true;
    overlay.classList.add('dismissed');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissIntro);
  }

  // Allow ESC to dismiss intro
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isDismissed) {
      dismissIntro();
    }
  }, { once: true });

  // Progress simulation (fast, elegant, non-blocking)
  let progress = 0;
  const messages = [
    { at: 15, text: 'MOUNTING SECURITY ENGINE...' },
    { at: 45, text: 'INITIALIZING INTERFACE CORES...' },
    { at: 75, text: 'ESTABLISHING REAL DATA CHANNELS...' },
    { at: 95, text: 'SYSTEM READY.' }
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 12;
    if (progress > 100) progress = 100;

    if (fill) fill.style.width = `${progress}%`;

    const currentMsg = messages.filter(m => progress >= m.at).pop();
    if (currentMsg && statusText) {
      statusText.textContent = currentMsg.text;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(dismissIntro, 250);
    }
  }, 90);
}

/**
 * Active navigation spy using IntersectionObserver
 */
function setupNavigationSpy() {
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.os-sidebar .nav-item');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll handler for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, `#${targetId}`);

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/**
 * Smooth navigate to a given section ID
 */
function navigateToSection(sectionId) {
  const targetEl = document.getElementById(sectionId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, null, `#${sectionId}`);
    closeMobileMenu();
  }
}

/**
 * Cinema Mode Toggle & Exit
 */
function setupCinemaMode() {
  const toggleBtn = document.getElementById('cinema-toggle-btn');
  const exitBtn = document.getElementById('exit-cinema-btn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleCinemaMode);
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', exitCinemaMode);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('cinema-mode')) {
      // Don't close cinema mode if command palette or modal is open
      const palette = document.querySelector('.cmd-palette-backdrop');
      if (!palette) {
        exitCinemaMode();
      }
    }
  });
}

function toggleCinemaMode() {
  document.body.classList.toggle('cinema-mode');
  const isCinema = document.body.classList.contains('cinema-mode');
  showToast(isCinema ? 'Cinema Mode Enabled (Press Esc to exit)' : 'Cinema Mode Disabled');
}

function exitCinemaMode() {
  document.body.classList.remove('cinema-mode');
  showToast('Exited Cinema Mode');
}

/**
 * Mobile Navigation Drawer Controls
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('os-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (!menuBtn || !sidebar || !backdrop) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('mobile-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  backdrop.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  const sidebar = document.getElementById('os-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const menuBtn = document.getElementById('mobile-menu-btn');

  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

/**
 * Security Lab: Client-side cryptographic SHA-256 hashing demo
 */
function setupCryptoLab() {
  const input = document.getElementById('hash-input');
  const output = document.getElementById('hash-output');

  if (!input || !output) return;

  async function calculateHash(text) {
    if (!window.crypto || !window.crypto.subtle) {
      output.textContent = 'Web Crypto API unavailable in this browser context';
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      output.textContent = hashHex;
    } catch (err) {
      output.textContent = 'Hashing error';
    }
  }

  input.addEventListener('input', (e) => {
    calculateHash(e.target.value);
  });

  // Calculate initial hash
  calculateHash(input.value);
}

/**
 * Skills Category Filtering
 */
function setupSkillsFilter() {
  const tabs = document.querySelectorAll('.skills-filter-bar .filter-tab');
  const cards = document.querySelectorAll('#skills-matrix-grid .skill-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Copy Primary Email with Accessible Feedback
 */
function setupCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-btn-text');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = PORTFOLIO_DATA.identity.email;
    try {
      await navigator.clipboard.writeText(email);
      if (copyText) copyText.textContent = 'Copied!';
      showToast(`Email copied: ${email}`);
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy Email';
      }, 2500);
    } catch (err) {
      // Fallback for older browsers
      showToast(`Email: ${email}`);
    }
  });
}

/**
 * Lightweight Accessible Toast Notification
 */
export function showToast(message, duration = 3000) {
  const container = document.getElementById('os-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'os-toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-dot" aria-hidden="true"></span>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
