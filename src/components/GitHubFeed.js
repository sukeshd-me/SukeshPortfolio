/**
 * S//SECURITY OS — GitHub Integration Component
 * Connects directly to GitHub Public API for @sukeshd-me.
 * STRICT HONESTY: Renders genuine repositories or gracefully falls back.
 * Zero fabricated stats or imaginary contribution counts.
 */

export class GitHubFeed {
  constructor(containerId = 'github-repos-container') {
    this.container = document.getElementById(containerId) || document.getElementById('github-repos-container') || document.getElementById('github-repo-grid');
    this.profileCard = document.getElementById('github-profile-summary');
    this.username = 'sukeshd-me';
    this.profileUrl = 'https://github.com/sukeshd-me';

    if (this.container || this.profileCard) {
      this.fetchGitHubData();
    }
  }

  async fetchGitHubData() {
    try {
      // 1. Fetch user public profile
      const userRes = await fetch(`https://api.github.com/users/${this.username}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (!userRes.ok) {
        throw new Error(`GitHub user status: ${userRes.status}`);
      }

      const userData = await userRes.json();
      this.renderProfileCard(userData);

      // 2. Fetch public repositories
      const reposRes = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=6`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (!reposRes.ok) {
        throw new Error(`GitHub repos status: ${reposRes.status}`);
      }

      const reposData = await reposRes.json();
      this.renderRepositories(reposData);

    } catch (err) {
      console.warn('GitHub API fetch notice (graceful fallback active):', err.message);
      this.renderFallback();
    }
  }

  renderProfileCard(user) {
    if (!this.profileCard) return;

    this.profileCard.innerHTML = `
      <div class="gh-profile-header">
        <div class="gh-avatar-wrapper">
          <img src="${user.avatar_url}" alt="Sukesh D GitHub Avatar" width="64" height="64" class="gh-avatar" loading="lazy" />
          <span class="gh-online-dot" title="Profile Verified"></span>
        </div>
        <div class="gh-info">
          <h4 class="gh-name">${user.name || 'Sukesh D'}</h4>
          <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="gh-handle">
            @${user.login}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <p class="gh-bio">${user.bio || 'Aspiring Cybersecurity Professional & Developer'}</p>
        </div>
      </div>
      <div class="gh-stats-row">
        <div class="gh-stat-box">
          <span class="gh-stat-val">${user.public_repos ?? '--'}</span>
          <span class="gh-stat-lbl">Public Repos</span>
        </div>
        <div class="gh-stat-box">
          <span class="gh-stat-val">${user.followers ?? '--'}</span>
          <span class="gh-stat-lbl">Followers</span>
        </div>
        <div class="gh-stat-box">
          <span class="gh-stat-val">${user.following ?? '--'}</span>
          <span class="gh-stat-lbl">Following</span>
        </div>
      </div>
    `;
  }

  renderRepositories(repos) {
    if (!this.container) return;

    if (!Array.isArray(repos) || repos.length === 0) {
      this.container.innerHTML = `
        <div class="gh-empty-box">
          <p>No public repositories listed currently on GitHub.</p>
          <a href="${this.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            View @${this.username} on GitHub
          </a>
        </div>
      `;
      return;
    }

    this.container.innerHTML = repos.map(repo => `
      <div class="repo-card glass-card">
        <div class="repo-card-top">
          <span class="repo-type-tag">${repo.fork ? 'Fork' : 'Source'}</span>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link" aria-label="Open repository ${repo.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
        <h4 class="repo-name">${repo.name}</h4>
        <p class="repo-desc">${repo.description || 'Security and development source repository.'}</p>
        <div class="repo-footer">
          ${repo.language ? `<span class="repo-lang"><span class="lang-dot"></span>${repo.language}</span>` : '<span></span>'}
          <span class="repo-updated">Updated ${new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    `).join('');
  }

  renderFallback() {
    if (this.profileCard) {
      this.profileCard.innerHTML = `
        <div class="gh-profile-header">
          <div class="gh-avatar-placeholder">S</div>
          <div class="gh-info">
            <h4 class="gh-name">Sukesh D</h4>
            <a href="${this.profileUrl}" target="_blank" rel="noopener noreferrer" class="gh-handle">@${this.username}</a>
            <p class="gh-bio">Aspiring Cybersecurity Professional & Developer</p>
          </div>
        </div>
        <p class="gh-fallback-notice">
          Live GitHub connection status: Verified profile link available directly on GitHub.
        </p>
        <a href="${this.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="margin-top: 1rem; display: inline-flex;">
          Explore Profile on GitHub
        </a>
      `;
    }

    if (this.container) {
      this.container.innerHTML = `
        <div class="gh-fallback-card os-card">
          <div class="gh-fallback-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </div>
          <h4>Featured Project: SentinelScan</h4>
          <p><strong>SentinelScan</strong> — File Safety &amp; Malware Analysis Platform. Real open-source static analysis and defensive cybersecurity platform.</p>
          <div class="gh-fallback-actions" style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
            <a href="https://github.com/sukeshd-me/SentinelScan" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              View sukeshd-me/SentinelScan
            </a>
            <a href="${this.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              All Repositories (@${this.username})
            </a>
          </div>
        </div>
      `;
    }
  }
}

export function initGitHubFeed(containerId = 'github-repos-container') {
  return new GitHubFeed(containerId);
}
