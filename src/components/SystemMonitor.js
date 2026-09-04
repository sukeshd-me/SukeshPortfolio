/**
 * S//SECURITY OS — Real System Monitor & Clock Engine
 * STRICT HONESTY REQUIREMENT:
 * Displays genuine runtime telemetry only.
 * Unmonitored or unverified external services are explicitly labeled 'Not monitored'.
 */

export class SystemMonitor {
  constructor() {
    this.sessionStart = Date.now();
    this.timeZoneMode = 'IST'; // 'IST' | 'UTC'
    this.statusResults = {
      runtime: { status: 'Operational', latency: '0ms', note: 'Client OS Kernel Active' },
      githubApi: { status: 'Checking...', latency: '--', note: 'Querying api.github.com' },
      cdnEdge: { status: 'Checking...', latency: '--', note: 'Measuring local latency' },
      sentinelBackend: { status: 'Not monitored', latency: 'N/A', note: 'Private development sandbox' },
      threatFeeds: { status: 'Not monitored', latency: 'N/A', note: 'No public feed connected' }
    };

    this.startClock();
    this.runDiagnosticChecks();
  }

  startClock() {
    this.clockElement = document.getElementById('system-clock');
    this.uptimeElement = document.getElementById('system-uptime');

    const updateTimes = () => {
      const now = new Date();
      
      // Clock format
      if (this.clockElement) {
        if (this.timeZoneMode === 'IST') {
          const istTime = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          this.clockElement.textContent = `${istTime} IST`;
        } else {
          const utcTime = now.toISOString().slice(11, 19);
          this.clockElement.textContent = `${utcTime} UTC`;
        }
      }

      // Uptime format (hh:mm:ss)
      if (this.uptimeElement) {
        const diffSec = Math.floor((Date.now() - this.sessionStart) / 1000);
        const hrs = String(Math.floor(diffSec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
        const secs = String(diffSec % 60).padStart(2, '0');
        this.uptimeElement.textContent = `${hrs}:${mins}:${secs}`;
      }
    };

    updateTimes();
    this.timerInterval = setInterval(updateTimes, 1000);
  }

  toggleTimeZone() {
    this.timeZoneMode = this.timeZoneMode === 'IST' ? 'UTC' : 'IST';
    const indicator = document.getElementById('tz-indicator');
    if (indicator) indicator.textContent = this.timeZoneMode;
  }

  async runDiagnosticChecks() {
    // 1. Check local edge CDN / origin
    try {
      const startEdge = performance.now();
      const resEdge = await fetch('/favicon.svg?t=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
      const edgeLatency = Math.round(performance.now() - startEdge);
      if (resEdge.ok) {
        this.statusResults.cdnEdge = {
          status: 'Operational',
          latency: `${edgeLatency}ms`,
          note: 'Origin / CDN edge responsive'
        };
      } else {
        this.statusResults.cdnEdge = {
          status: 'Degraded',
          latency: `${edgeLatency}ms`,
          note: `HTTP ${resEdge.status}`
        };
      }
    } catch {
      this.statusResults.cdnEdge = {
        status: 'Local/Offline',
        latency: 'Local',
        note: 'Serving from local client'
      };
    }

    // 2. Check real GitHub API reachability
    try {
      const startGh = performance.now();
      const resGh = await fetch('https://api.github.com/zen', { 
        method: 'GET', 
        cache: 'no-store',
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      const ghLatency = Math.round(performance.now() - startGh);
      if (resGh.ok) {
        this.statusResults.githubApi = {
          status: 'Operational',
          latency: `${ghLatency}ms`,
          note: 'GitHub Public API reachable'
        };
      } else if (resGh.status === 403) {
        this.statusResults.githubApi = {
          status: 'Rate Limited',
          latency: `${ghLatency}ms`,
          note: 'GitHub IP rate limit reached'
        };
      } else {
        this.statusResults.githubApi = {
          status: 'Unreachable',
          latency: `${ghLatency}ms`,
          note: `Status ${resGh.status}`
        };
      }
    } catch {
      this.statusResults.githubApi = {
        status: 'Blocked/Offline',
        latency: '--',
        note: 'Network or CORS restricted'
      };
    }

    this.renderStatusTable();
  }

  renderStatusTable() {
    const container = document.getElementById('status-table-body') || document.getElementById('system-status-body');

    // Also update individual status cells if present in markup
    const ghBadge = document.getElementById('status-github-badge');
    const ghLatency = document.getElementById('status-github-latency');
    if (ghBadge && this.statusResults.githubApi) {
      ghBadge.textContent = this.statusResults.githubApi.status;
      ghBadge.className = `status-badge ${this.statusResults.githubApi.status === 'Operational' ? 'operational' : 'warn'}`;
    }
    if (ghLatency && this.statusResults.githubApi) {
      ghLatency.textContent = this.statusResults.githubApi.latency;
    }

    if (!container) return;

    const items = [
      { name: 'Portfolio Client Core', category: 'Internal Runtime', ...this.statusResults.runtime },
      { name: 'Edge CDN Delivery', category: 'Cloudflare / Hosting', ...this.statusResults.cdnEdge },
      { name: 'GitHub Public API', category: 'External Connectivity', ...this.statusResults.githubApi },
      { name: 'SentinelScan Engine', category: 'Project Services', ...this.statusResults.sentinelBackend },
      { name: 'External Security Feeds', category: 'Security Services', ...this.statusResults.threatFeeds }
    ];

    container.innerHTML = items.map(item => {
      let badgeClass = 'status-badge-ok';
      if (item.status.includes('Not monitored')) badgeClass = 'status-badge-unmonitored';
      else if (item.status.includes('Checking')) badgeClass = 'status-badge-pending';
      else if (item.status.includes('Rate') || item.status.includes('Degraded')) badgeClass = 'status-badge-warn';
      else if (item.status.includes('Unreachable') || item.status.includes('Blocked')) badgeClass = 'status-badge-err';

      return `
        <tr class="status-row">
          <td class="status-col-name">
            <span class="status-service-title">${item.name}</span>
            <span class="status-service-sub">${item.category}</span>
          </td>
          <td class="status-col-state">
            <span class="status-badge ${badgeClass}">${item.status}</span>
          </td>
          <td class="status-col-latency font-mono">${item.latency}</td>
          <td class="status-col-note">${item.note}</td>
        </tr>
      `;
    }).join('');
  }
}

export function initSystemMonitor(options = {}) {
  return new SystemMonitor(options);
}

