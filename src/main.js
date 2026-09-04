/**
 * S//SECURITY OS — 3D Web Application Controller
 * Orchestrates 3D canvas, spatial scroll camera, 3D card tilt & reveal,
 * top navigation spy, mobile drawer, command palette, and real data rendering.
 */

import { PORTFOLIO_DATA } from './data/portfolioData.js';
import { ICONS } from './components/Icons.js';
import { initThreeCanvas } from './components/ThreeCanvas.js';
import { initCommandPalette } from './components/CommandPalette.js';
import { initSystemMonitor } from './components/SystemMonitor.js';
import { initGitHubFeed } from './components/GitHubFeed.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Verified Social Icons
  renderSocialIcons();

  // 2. Cinematic Intro Sequence
  setupCinematicIntro();

  // 3. Initialize 3D WebGL Background Universe
  const threeCanvas = initThreeCanvas('bg-canvas');

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

  // 7. Top Navigation Spy & Smooth Scrolling
  setupNavigationSpy();

  // 8. 3D Pallet/Card Scroll Reveals & Interactive 3D Tilt
  setup3DScrollAndTilt();

  // 9. Mobile Drawer Navigation
  setupMobileMenu();

  // 10. Cinema Mode
  setupCinemaMode();

  // 11. Security Lab: Interactive SHA-256 Tool
  setupCryptoLab();

  // 12. Skills Filter Tabs
  setupSkillsFilter();

  // 13. Copy Email Functionality
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
    overlay.classList.add('hidden');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissIntro);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isDismissed) {
      dismissIntro();
    }
  }, { once: true });

  let progress = 0;
  const messages = [
    { at: 15, text: 'MOUNTING 3D CYBERNETIC UNIVERSE...' },
    { at: 45, text: 'INITIALIZING INTERFACE CORES...' },
    { at: 75, text: 'ESTABLISHING REAL DATA CHANNELS...' },
    { at: 95, text: 'SYSTEM READY.' }
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 14;
    if (progress > 100) progress = 100;

    if (fill) fill.style.width = `${progress}%`;

    const currentMsg = messages.filter(m => progress >= m.at).pop();
    if (currentMsg && statusText) {
      statusText.textContent = currentMsg.text;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(dismissIntro, 200);
    }
  }, 80);
}

/**
 * 3D Pallet / Box Scroll Reveals & Interactive 3D Tilt Engine
 * Animates pallets and boxes from left, right, and bottom into their actual place on every scroll.
 */
function setup3DScrollAndTilt() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Assign directional 3D reveal classes to all pallets, cards, and section blocks
  assignDirectionalClasses();

  const revealElements = document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-bottom, .reveal-3d'
  );

  // 2. IntersectionObserver for every-scroll 3D entrance animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('revealed');
      } else {
        // When element has completely scrolled off-screen (above or below), remove 'revealed'
        // so on every scroll back into view, it animates from left/right/bottom into its actual place!
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          el.classList.remove('revealed');
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '20px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // Trigger initial hero elements immediately on load if at top of page
  if (window.scrollY < 120) {
    const heroElements = document.querySelectorAll('#overview .reveal-left, #overview .reveal-right, #overview .reveal-bottom');
    heroElements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, idx * 100);
    });
  }

  if (prefersReducedMotion) return;

  // 3. Interactive 3D Card Hover Tilt with Dynamic Specular Glare
  const cards = document.querySelectorAll('.os-card');

  cards.forEach((card) => {
    // Inject specular glare element if absent
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalized offsets from center (-0.5 to 0.5)
        const xOffset = mouseX / rect.width - 0.5;
        const yOffset = mouseY / rect.height - 0.5;

        // 3D rotation angles
        const maxTilt = 9; // degrees
        const rotateX = -yOffset * maxTilt;
        const rotateY = xOffset * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`;
        card.style.setProperty('--glare-x', `${((mouseX / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${((mouseY / rect.height) * 100).toFixed(1)}%`);

        ticking = false;
      });
    });

    card.addEventListener('mouseleave', () => {
      // Clear inline transform to allow resting .revealed CSS transform to restore cleanly
      card.style.transform = '';
    });
  });
}

/**
 * Automatically inspects the DOM and tags all pallets, boxes, and headers
 * with the appropriate directional 3D class (reveal-left, reveal-right, or reveal-bottom)
 */
function assignDirectionalClasses() {
  // Hero section
  const heroText = document.querySelector('.hero-text-block');
  const heroCard = document.querySelector('.hero-profile-card');
  if (heroText && !heroText.classList.contains('reveal-left')) heroText.classList.add('reveal-left');
  if (heroCard && !heroCard.classList.contains('reveal-right')) heroCard.classList.add('reveal-right');

  // Section headers & eyebrows always glide up from bottom
  document.querySelectorAll('.section-header-block, .section-eyebrow').forEach((el) => {
    if (!el.classList.contains('reveal-bottom')) el.classList.add('reveal-bottom');
  });

  // About section: main card from left, pillars from right with stagger
  const aboutMain = document.querySelector('.about-main-card');
  if (aboutMain && !aboutMain.classList.contains('reveal-left')) aboutMain.classList.add('reveal-left');

  const pillars = document.querySelectorAll('.pillar-card');
  pillars.forEach((pillar, i) => {
    if (!pillar.classList.contains('reveal-right')) {
      pillar.classList.add('reveal-right', `delay-${(i % 4) + 1}`);
    }
  });

  // Developer ecosystem: 5 steps (left -> left -> bottom -> right -> right)
  const ecoCards = document.querySelectorAll('.ecosystem-card');
  ecoCards.forEach((card, i) => {
    if (i < 2) {
      card.classList.add('reveal-left', `delay-${i + 1}`);
    } else if (i === 2) {
      card.classList.add('reveal-bottom', 'delay-2');
    } else {
      card.classList.add('reveal-right', `delay-${i}`);
    }
  });

  // Cybersecurity focus cards (2-column grid: alternating left and right)
  const cyberCards = document.querySelectorAll('.cyber-focus-card');
  cyberCards.forEach((card, i) => {
    if (i % 2 === 0) {
      card.classList.add('reveal-left', `delay-${(i % 3) + 1}`);
    } else {
      card.classList.add('reveal-right', `delay-${(i % 3) + 1}`);
    }
  });

  // Skills matrix cards: 3 columns (left, bottom, right)
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, i) => {
    const col = i % 3;
    if (col === 0) card.classList.add('reveal-left', `delay-${(i % 3) + 1}`);
    else if (col === 1) card.classList.add('reveal-bottom', `delay-${(i % 3) + 1}`);
    else card.classList.add('reveal-right', `delay-${(i % 3) + 1}`);
  });

  const skillsFilterBar = document.querySelector('.skills-filter-bar');
  if (skillsFilterBar && !skillsFilterBar.classList.contains('reveal-bottom')) {
    skillsFilterBar.classList.add('reveal-bottom');
  }

  // Project cards
  const projectCards = document.querySelectorAll('.project-module-card');
  projectCards.forEach((card) => {
    if (!card.classList.contains('reveal-bottom')) card.classList.add('reveal-bottom');
  });

  // Security Lab cards (3 tools: left, bottom, right)
  const labCards = document.querySelectorAll('.lab-card');
  labCards.forEach((card, i) => {
    if (i === 0) card.classList.add('reveal-left');
    else if (i === 1) card.classList.add('reveal-bottom', 'delay-2');
    else card.classList.add('reveal-right', 'delay-3');
  });

  // Certifications cards (2 cards: left, right)
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((card, i) => {
    if (i % 2 === 0) card.classList.add('reveal-left', 'delay-1');
    else card.classList.add('reveal-right', 'delay-2');
  });

  // Empty state cards (Research, Write-ups)
  document.querySelectorAll('.empty-state-card').forEach((card) => {
    if (!card.classList.contains('reveal-bottom')) card.classList.add('reveal-bottom');
  });

  // GitHub container & repo cards
  const ghCard = document.querySelector('.github-container-card');
  if (ghCard && !ghCard.classList.contains('reveal-bottom')) ghCard.classList.add('reveal-bottom');

  // Contact section: main contact on left, socials on right
  const contactMain = document.querySelector('.contact-main-card');
  const socialsHub = document.querySelector('.socials-hub-card');
  if (contactMain && !contactMain.classList.contains('reveal-left')) contactMain.classList.add('reveal-left');
  if (socialsHub && !socialsHub.classList.contains('reveal-right')) socialsHub.classList.add('reveal-right');

  // System status card
  const sysCard = document.querySelector('.system-status-card');
  if (sysCard && !sysCard.classList.contains('reveal-bottom')) sysCard.classList.add('reveal-bottom');

  // Site specs cards (2 cards: left, right)
  const specCards = document.querySelectorAll('.spec-card');
  specCards.forEach((card, i) => {
    if (i % 2 === 0) card.classList.add('reveal-left', 'delay-1');
    else card.classList.add('reveal-right', 'delay-2');
  });

  // Universal catch-all for any other .os-card or .truth-banner
  document.querySelectorAll('.os-card, .truth-banner').forEach((card) => {
    if (
      !card.classList.contains('reveal-left') &&
      !card.classList.contains('reveal-right') &&
      !card.classList.contains('reveal-bottom') &&
      !card.classList.contains('reveal-3d')
    ) {
      card.classList.add('reveal-bottom');
    }
  });
}

/**
 * Active navigation spy for Top Navigation & Mobile Drawer
 */
function setupNavigationSpy() {
  const sections = document.querySelectorAll('main > section');
  const desktopLinks = document.querySelectorAll('.nav-links-desktop .top-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        desktopLinks.forEach((link) => {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach((link) => {
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
 * Mobile Drawer Navigation Controls
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!menuBtn || !drawer || !backdrop) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  backdrop.addEventListener('click', closeMobileMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const menuBtn = document.getElementById('mobile-menu-btn');

  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) backdrop.classList.remove('active');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
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
