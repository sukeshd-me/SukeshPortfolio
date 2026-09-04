# S // SECURITY OS — Sukesh D Portfolio

> **Developer × Cybersecurity**  
> Official personal portfolio and digital operations environment for **Sukesh D**, an aspiring cybersecurity professional and developer based in **Cuddalore, Tamil Nadu, India**.

[![Production Domain](https://img.shields.io/badge/Domain-www.sukeshportfolio.com-06b6d4?style=for-the-badge&logo=cloudflare)](https://www.sukeshportfolio.com)
[![GitHub Profile](https://img.shields.io/badge/GitHub-%40sukeshd--me-2563eb?style=for-the-badge&logo=github)](https://github.com/sukeshd-me)
[![Security OS](https://img.shields.io/badge/System-S%2F%2FSECURITY_OS_v1.0-1e293b?style=for-the-badge&logo=linux)](https://www.sukeshportfolio.com)

---

## Overview

**S // SECURITY OS** is an Awwwards-caliber, lightweight futuristic operating-system-style personal portfolio. Built with a bespoke dark navy glassmorphic design system and hardware-accelerated 3D WebGL cryptography visualizer, it communicates technical competence, architectural discipline, and defensive security engineering without resorting to stereotypical "hacker movie" tropes (no green matrix rain, no skulls, no fake hacking animations, no fake statistics).

### Core Identity & Verification
- **Name**: Sukesh D
- **Visual Monogram**: `S`
- **Primary Title**: Aspiring Cybersecurity Professional
- **Professional Identity**: Developer × Cybersecurity
- **Location**: Cuddalore, Tamil Nadu, India
- **Contact Email**: [sukesh.me@gmail.com](mailto:sukesh.me@gmail.com)
- **Production URL**: `https://www.sukeshportfolio.com`

---

## Key Features

- **Cinematic Boot Sequence**: Clean, skippable system initialization with respect for `prefers-reduced-motion`.
- **Operating System Desktop Shell**: Fixed top status bar displaying UTC live time, edge network latency, cinema mode toggle, and command palette trigger.
- **Unified 14-Module Architecture**:
  1. `01 Overview`: Hero interface, quick launch actions, and core professional summary.
  2. `02 About`: Contextual professional background answering *"Who is Sukesh D?"* with authenticity.
  3. `03 Developer`: Technical ecosystem map across programming, systems, networking, and security.
  4. `04 Cybersecurity`: Defense domains, methodology, and ethical security focus areas.
  5. `05 Skills`: Categorized knowledge base partitioned into *Working Knowledge*, *Learning*, and *Exploring*.
  6. `06 Project Explorer`: Deep dive into active software engineering projects, starring **SentinelScan** (File Safety & Malware Analysis Platform).
  7. `07 Security Lab`: Real browser-based defensive security tools, including an interactive client-side Web Crypto SHA-256 hash generator.
  8. `08 Certifications`: Strict factual display of ongoing credentials (CompTIA Security+ SY0-701 — *In Progress*).
  9. `09 Research`: Forthcoming vulnerability notes and study areas.
  10. `10 Write-ups`: Technical documentation and engineering logs repository.
  11. `11 GitHub Feed`: Live public GitHub API integration with resilient offline/fallback states.
  12. `12 Contact`: Direct verified touchpoints, secure email clipboard tool, and location details.
  13. `13 System`: Live edge runtime diagnostics, ping checks, and infrastructure status.
  14. `14 About This Site`: Open-source design system credits and architectural disclosure.
- **Professional Command Palette (`Ctrl+K` / `Cmd+K`)**: Rapid keyboard-first navigation and system actions with fuzzy filtering and arrow key support.
- **Cinema Mode**: One-click immersive storytelling view expanding typography and visual focus.
- **Hardware-Accelerated 3D Mesh**: High-performance Three.js background with DPR clamping, window resize handling, visibility change pausing, and fallback for low-power devices.
- **Strict Data Authenticity**: **Zero** fabricated metrics, fake commit graphs, fake stars, or counterfeit credentials.

---

## Confirmed Social Profiles

All social links on this portfolio correspond to verified public handles:

| Platform | Handle / Profile URL | Status |
| :--- | :--- | :--- |
| **GitHub** | [`@sukeshd-me`](https://github.com/sukeshd-me) | Confirmed |
| **X (Twitter)** | [`@sukeshd_me`](https://x.com/sukeshd_me) | Confirmed |
| **YouTube** | [`@sukeshd_me`](https://youtube.com/@sukeshd_me) | Confirmed |
| **Instagram** | [`@sukeshd.me`](https://instagram.com/sukeshd.me) | Confirmed |
| **Pinterest** | [`@sukeshd_me`](https://pinterest.com/sukeshd_me) | Confirmed |
| **CodePen** | [`@sukeshd_me`](https://codepen.io/sukeshd_me) | Confirmed |
| **Codeberg** | [`@sukeshd_me`](https://codeberg.org/sukeshd_me) | Confirmed |
| **Bluesky** | [`@sukeshd-me`](https://bsky.app/profile/sukeshd-me) | Confirmed |
| **Replit** | [`@sukeshd-me`](https://replit.com/@sukeshd-me) | Confirmed |
| **Reddit** | [`@sukeshd_me`](https://www.reddit.com/user/sukeshd_me/) | Confirmed |

---

## Tech Stack & Architecture

- **Bundler & Build Tool**: Vite 6 (Pure ES Module architecture)
- **3D Graphics Engine**: Three.js (Hardware-accelerated WebGL with DPR limiter)
- **Styling Architecture**: Vanilla Modular CSS (Design tokens, glassmorphism, responsive grid & flexbox, zero runtime CSS bloat)
- **Typography**: Google Fonts (`Space Grotesk` for display headings, `Inter` for interface typography, `JetBrains Mono` for code & technical readouts)
- **Iconography**: Inline optimized SVG icon library (Zero external font icon dependencies)
- **Security & Headers**: Cloudflare Pages `_headers` with strict Content Security Policy (CSP), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- **Search Engine Optimization**: Full semantic HTML5, valid JSON-LD schemas (`Person`, `WebSite`, `BreadcrumbList`), OpenGraph 1200x630 visual card, XML sitemap, and robots.txt.

---

## Local Development

### Prerequisites
- Node.js 18.0+ or later
- npm 9.0+ or later

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sukeshd-me/sukesh-portfolio.git
   cd sukesh-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```
   Compiled assets will be generated in `dist/`.

5. **Preview production bundle**:
   ```bash
   npm run preview
   ```

---

## Cloudflare Pages Deployment Guide

This repository is pre-configured for instant zero-configuration deployment to **Cloudflare Pages**.

### Step 1: Connect Repository to Cloudflare
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository: `sukeshd-me/sukesh-portfolio`.

### Step 2: Configure Build Settings
In the Cloudflare Pages deployment configuration dialog, specify:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave empty) |
| **Node.js Version** | `20` (optional environment variable `NODE_VERSION=20`) |

Click **Save and Deploy**. Cloudflare Pages will build the site and deploy it to a `*.pages.dev` subdomain.

### Step 3: Attach Custom Domain (`www.sukeshportfolio.com`)
1. In Cloudflare Pages, select your deployed project.
2. Go to the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter `www.sukeshportfolio.com` (and optionally `sukeshportfolio.com`).
5. Cloudflare will automatically configure the DNS CNAME records and issue an SSL/TLS Universal Certificate.

### Security Headers & SPA Routing
Cloudflare Pages will automatically read the bundled:
- `public/_headers` (applied to `dist/_headers`) to enforce strict Content Security Policy, HSTS, and frame protections.
- `public/_redirects` (applied to `dist/_redirects`) to guarantee 200 SPA pass-through and canonical 301 redirects.

---

## Google Search Console Verification & SEO Guide

The site includes native metadata and assets designed to establish strong search engine trust:
- Canonical link: `https://www.sukeshportfolio.com/`
- Valid XML Sitemap: `https://www.sukeshportfolio.com/sitemap.xml`
- Valid Robots rules: `https://www.sukeshportfolio.com/robots.txt`
- High-fidelity Schema.org JSON-LD structured data for `Person`, `WebSite`, and `BreadcrumbList`.

### Step-by-Step Google Search Console Setup

1. **Open Google Search Console**:
   Visit [search.google.com/search-console](https://search.google.com/search-console).

2. **Add Property**:
   Choose **Domain** (enter `sukeshportfolio.com`) or **URL prefix** (enter `https://www.sukeshportfolio.com`).

3. **Verify Ownership**:
   - **Recommended (Domain)**: Add the Google verification DNS TXT record provided by Search Console directly to your Cloudflare DNS table.
   - **Alternative (HTML tag)**: If using URL prefix, copy the meta tag code and place it inside `<head>` in `index.html`.

4. **Submit Sitemap**:
   - In Search Console left sidebar, click **Sitemaps**.
   - Under *Add a new sitemap*, enter: `sitemap.xml`
   - Click **Submit**. Verify status changes to **Success**.

5. **Request Indexing**:
   - Use the URL Inspection tool at the top to inspect `https://www.sukeshportfolio.com/`.
   - Click **Request Indexing** to queue Googlebot for initial crawling.

---

## Project Structure

```text
├── .env.example            # Environment variables reference
├── .gitignore              # Git ignore rules
├── 404.html                # Custom OS-themed module-not-found page
├── CONTRIBUTING.md         # Contribution standards and guidelines
├── LICENSE                 # MIT License
├── README.md               # Complete project documentation
├── SECURITY.md             # Vulnerability disclosure policy
├── index.html              # Main semantic HTML5 markup with JSON-LD
├── package.json            # Dependencies and scripts
├── public/                 # Static web assets
│   ├── _headers            # Cloudflare security and cache headers
│   ├── _redirects          # Cloudflare routing rules
│   ├── favicon.svg         # Monogram 'S' favicon
│   ├── manifest.webmanifest# Progressive Web App manifest
│   ├── og-image.svg        # 1200x630 Open Graph visual asset
│   ├── robots.txt          # Search engine crawler policies
│   └── sitemap.xml         # Production XML sitemap
├── src/                    # Source code
│   ├── components/
│   │   ├── CommandPalette.js # Ctrl+K keyboard navigation modal
│   │   ├── GitHubFeed.js     # Zero-token public GitHub fetcher
│   │   ├── Icons.js          # SVG iconography system
│   │   ├── SystemMonitor.js  # Runtime latency and health diagnostics
│   │   └── ThreeCanvas.js    # WebGL 3D cryptographic particle mesh
│   ├── data/
│   │   └── portfolioData.js  # Centralized truthful data store
│   ├── main.js               # Application initialization & DOM controllers
│   └── styles/
│       ├── cinema.css        # Immersive cinema mode styles
│       ├── main.css          # OS desktop, cards, grid, and navigation
│       ├── reset.css         # Modern CSS reset and accessibility rules
│       └── variables.css     # CSS custom properties and color tokens
└── vite.config.js          # Vite build config with multi-page & vendor split
```

---

## Security & Privacy Policy

- **No Third-Party Trackers**: No invasive Google Analytics, pixels, or profiling scripts.
- **No Client Fingerprinting**: Hardware and device state is strictly evaluated for visual frame-rate adaptation only.
- **Zero Secrets in Code**: No API keys, passwords, or personal credentials are exposed in frontend assets.
- **Strict Headers**: Enforced Content-Security-Policy, anti-clickjacking protection (`X-Frame-Options: DENY`), and modern HTTPS enforcement.

---

## License

This project is licensed under the [MIT License](LICENSE) © 2026 Sukesh D.
