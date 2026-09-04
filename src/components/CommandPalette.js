/**
 * S//SECURITY OS — Command Palette (Ctrl+K / Cmd+K)
 * Accessible, keyboard-first modal with fuzzy search and OS action dispatcher.
 */

export class CommandPalette {
  constructor(options = {}) {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.filteredCommands = [];
    this.onToggleCinema = options.onToggleCinema || (() => {});
    this.onToggleTheme = options.onToggleTheme || (() => {});
    
    this.commands = [
      { id: 'nav-overview', title: 'Open Overview', category: 'Navigation', shortcut: '01', action: () => this.scrollTo('overview') },
      { id: 'nav-about', title: 'Open About (Who is Sukesh D?)', category: 'Navigation', shortcut: '02', action: () => this.scrollTo('about') },
      { id: 'nav-developer', title: 'Open Developer Section', category: 'Navigation', shortcut: '03', action: () => this.scrollTo('developer') },
      { id: 'nav-cybersecurity', title: 'Open Cybersecurity Operations', category: 'Navigation', shortcut: '04', action: () => this.scrollTo('cybersecurity') },
      { id: 'nav-skills', title: 'Open Skills Matrix', category: 'Navigation', shortcut: '05', action: () => this.scrollTo('skills') },
      { id: 'nav-projects', title: 'Open Projects (SentinelScan)', category: 'Navigation', shortcut: '06', action: () => this.scrollTo('projects') },
      { id: 'nav-lab', title: 'Open Security Lab', category: 'Navigation', shortcut: '07', action: () => this.scrollTo('security-lab') },
      { id: 'nav-certifications', title: 'Open Certifications', category: 'Navigation', shortcut: '08', action: () => this.scrollTo('certifications') },
      { id: 'nav-research', title: 'Open Research', category: 'Navigation', shortcut: '09', action: () => this.scrollTo('research') },
      { id: 'nav-writeups', title: 'Open Write-ups', category: 'Navigation', shortcut: '10', action: () => this.scrollTo('writeups') },
      { id: 'nav-github', title: 'Open GitHub Profile & Activity', category: 'External', shortcut: 'GH', action: () => this.scrollTo('github') },
      { id: 'nav-contact', title: 'Open Contact Information', category: 'Navigation', shortcut: '12', action: () => this.scrollTo('contact') },
      { id: 'nav-system', title: 'View System Status', category: 'System', shortcut: '13', action: () => this.scrollTo('system') },
      { id: 'act-cinema', title: 'Toggle Cinema Mode', category: 'View Mode', shortcut: 'Alt+C', action: () => this.onToggleCinema() },
      { id: 'act-theme', title: 'Toggle Contrast Profile', category: 'Preferences', shortcut: 'T', action: () => this.onToggleTheme() },
      { id: 'act-top', title: 'Scroll to Top', category: 'Action', shortcut: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { id: 'act-copy-email', title: 'Copy Direct Email (sukesh.me@gmail.com)', category: 'Contact', shortcut: 'Copy', action: () => this.copyEmail() },
      { id: 'act-open-gh', title: 'Visit GitHub (@sukeshd-me)', category: 'External', shortcut: 'Link', action: () => window.open('https://github.com/sukeshd-me', '_blank', 'noopener,noreferrer') }
    ];

    this.filteredCommands = [...this.commands];
    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.id = 'command-palette-backdrop';
    this.backdrop.className = 'palette-backdrop';
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.backdrop.style.display = 'none';

    this.backdrop.innerHTML = `
      <div class="palette-dialog" role="dialog" aria-modal="true" aria-labelledby="palette-title">
        <div class="palette-header">
          <div class="palette-search-wrapper">
            <svg class="palette-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              id="palette-input" 
              class="palette-input" 
              placeholder="Type a command or jump to section..." 
              autocomplete="off" 
              spellcheck="false" 
              aria-autocomplete="list"
              aria-controls="palette-results"
            />
            <span class="palette-kbd">ESC to exit</span>
          </div>
        </div>
        <div id="palette-results" class="palette-results" role="listbox"></div>
        <div class="palette-footer">
          <span>Navigation: <kbd>&uarr;</kbd> <kbd>&darr;</kbd></span>
          <span>Execute: <kbd>&crarr;</kbd></span>
          <span>Close: <kbd>ESC</kbd></span>
        </div>
      </div>
    `;

    document.body.appendChild(this.backdrop);
    this.input = this.backdrop.querySelector('#palette-input');
    this.resultsContainer = this.backdrop.querySelector('#palette-results');
  }

  bindEvents() {
    // Global Keyboard Shortcut: Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on backdrop click
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Search filter input
    this.input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        this.filteredCommands = [...this.commands];
      } else {
        this.filteredCommands = this.commands.filter(cmd => 
          cmd.title.toLowerCase().includes(q) || 
          cmd.category.toLowerCase().includes(q)
        );
      }
      this.selectedIndex = 0;
      this.renderResults();
    });

    // Keyboard navigation within list
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredCommands.length);
        this.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % Math.max(1, this.filteredCommands.length);
        this.renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = this.filteredCommands[this.selectedIndex];
        if (selected) {
          this.executeCommand(selected);
        }
      }
    });
  }

  renderResults() {
    if (this.filteredCommands.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="palette-empty">
          <p>No matching commands found</p>
          <span class="palette-empty-sub">Try searching for "About", "Projects", "Skills", or "GitHub"</span>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = this.filteredCommands.map((cmd, idx) => `
      <div 
        class="palette-item ${idx === this.selectedIndex ? 'selected' : ''}" 
        role="option" 
        aria-selected="${idx === this.selectedIndex}" 
        data-index="${idx}"
      >
        <div class="palette-item-left">
          <span class="palette-item-cat">${cmd.category}</span>
          <span class="palette-item-title">${cmd.title}</span>
        </div>
        ${cmd.shortcut ? `<span class="palette-item-shortcut">${cmd.shortcut}</span>` : ''}
      </div>
    `).join('');

    // Click handler on items
    this.resultsContainer.querySelectorAll('.palette-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index, 10);
        const selected = this.filteredCommands[idx];
        if (selected) this.executeCommand(selected);
      });
    });

    // Auto scroll selected into view
    const selectedElem = this.resultsContainer.querySelector('.palette-item.selected');
    if (selectedElem) {
      selectedElem.scrollIntoView({ block: 'nearest' });
    }
  }

  executeCommand(cmd) {
    this.close();
    setTimeout(() => {
      cmd.action();
    }, 80);
  }

  scrollTo(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // update active state in sidebar
      history.replaceState(null, null, `#${sectionId}`);
    }
  }

  copyEmail() {
    navigator.clipboard.writeText('sukesh.me@gmail.com').then(() => {
      this.showToast('Copied to clipboard: sukesh.me@gmail.com');
    }).catch(() => {
      this.showToast('Email: sukesh.me@gmail.com');
    });
  }

  showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'os-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 20);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  open() {
    this.isOpen = true;
    this.backdrop.style.display = 'flex';
    this.backdrop.setAttribute('aria-hidden', 'false');
    this.input.value = '';
    this.filteredCommands = [...this.commands];
    this.selectedIndex = 0;
    this.renderResults();
    setTimeout(() => {
      this.backdrop.classList.add('active');
      this.input.focus();
    }, 10);
  }

  close() {
    this.isOpen = false;
    this.backdrop.classList.remove('active');
    this.backdrop.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      this.backdrop.style.display = 'none';
    }, 200);
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
}

export function initCommandPalette(options = {}) {
  return new CommandPalette(options);
}
