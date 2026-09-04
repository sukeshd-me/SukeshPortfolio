/**
 * S//SECURITY OS — Portfolio Data Store
 * STRICT INTEGRITY RULE: Real information only.
 * No fabricated certifications, achievements, projects, or statistics.
 */

export const PORTFOLIO_DATA = {
  identity: {
    name: 'Sukesh D',
    monogram: 'S',
    brandTag: 'S//SECURITY OS',
    primaryTitle: 'Aspiring Cybersecurity Professional',
    role: 'Developer × Cybersecurity',
    location: 'Cuddalore, Tamil Nadu, India',
    locationShort: 'Cuddalore, IN',
    email: 'sukesh.me@gmail.com',
    domain: 'https://www.sukeshportfolio.com',
    heroTagline: 'Building software, exploring cybersecurity, and learning how systems can be made safer.',
    aboutBrief: 'Sukesh D is an aspiring cybersecurity professional and developer from Cuddalore, Tamil Nadu, interested in cybersecurity, ethical hacking, web security, security engineering, programming, and building security-focused software.',
    seoKeywords: [
      'Sukesh D',
      'Who is Sukesh D',
      'Who is Sukesh',
      'Sukesh D Cuddalore',
      'Sukesh D Cybersecurity',
      'Sukesh D Cybersecurity Professional',
      'Sukesh D Developer',
      'Sukesh D GitHub',
      'Sukesh D Cuddalore Tamil Nadu',
      'Aspiring Cybersecurity Professional'
    ]
  },

  navigation: [
    { id: 'overview', num: '01', label: 'Overview', icon: 'shield' },
    { id: 'about', num: '02', label: 'About', icon: 'user' },
    { id: 'developer', num: '03', label: 'Developer', icon: 'code' },
    { id: 'cybersecurity', num: '04', label: 'Cybersecurity', icon: 'lock' },
    { id: 'skills', num: '05', label: 'Skills', icon: 'cpu' },
    { id: 'projects', num: '06', label: 'Project Explorer', icon: 'layers' },
    { id: 'security-lab', num: '07', label: 'Security Lab', icon: 'terminal' },
    { id: 'certifications', num: '08', label: 'Certifications', icon: 'award' },
    { id: 'research', num: '09', label: 'Research', icon: 'compass' },
    { id: 'writeups', num: '10', label: 'Write-ups', icon: 'file-text' },
    { id: 'github', num: '11', label: 'GitHub', icon: 'github' },
    { id: 'contact', num: '12', label: 'Contact', icon: 'mail' },
    { id: 'system', num: '13', label: 'System', icon: 'activity' },
    { id: 'about-site', num: '14', label: 'About This Site', icon: 'info' }
  ],

  socials: [
    {
      platform: 'GitHub',
      handle: '@sukeshd-me',
      url: 'https://github.com/sukeshd-me',
      ariaLabel: 'Sukesh D on GitHub',
      icon: 'github'
    },
    {
      platform: 'X',
      handle: '@sukeshd_me',
      url: 'https://x.com/sukeshd_me',
      ariaLabel: 'Sukesh D on X (Twitter)',
      icon: 'x'
    },
    {
      platform: 'YouTube',
      handle: '@sukeshd_me',
      url: 'https://youtube.com/@sukeshd_me',
      ariaLabel: 'Sukesh D on YouTube',
      icon: 'youtube'
    },
    {
      platform: 'Instagram',
      handle: '@sukeshd.me',
      url: 'https://instagram.com/sukeshd.me',
      ariaLabel: 'Sukesh D on Instagram',
      icon: 'instagram'
    },
    {
      platform: 'Pinterest',
      handle: '@sukeshd_me',
      url: 'https://pinterest.com/sukeshd_me',
      ariaLabel: 'Sukesh D on Pinterest',
      icon: 'pinterest'
    },
    {
      platform: 'CodePen',
      handle: '@sukeshd_me',
      url: 'https://codepen.io/sukeshd_me',
      ariaLabel: 'Sukesh D on CodePen',
      icon: 'codepen'
    },
    {
      platform: 'Codeberg',
      handle: '@sukeshd_me',
      url: 'https://codeberg.org/sukeshd_me',
      ariaLabel: 'Sukesh D on Codeberg',
      icon: 'codeberg'
    },
    {
      platform: 'Bluesky',
      handle: '@sukeshd-me',
      url: 'https://bsky.app/profile/sukeshd-me',
      ariaLabel: 'Sukesh D on Bluesky',
      icon: 'bluesky'
    },
    {
      platform: 'Replit',
      handle: '@sukeshd-me',
      url: 'https://replit.com/@sukeshd-me',
      ariaLabel: 'Sukesh D on Replit',
      icon: 'replit'
    },
    {
      platform: 'Reddit',
      handle: '@sukeshd_me',
      url: 'https://www.reddit.com/user/sukeshd_me/',
      ariaLabel: 'Sukesh D on Reddit',
      icon: 'reddit'
    }
  ],

  developerEcosystem: [
    {
      domain: 'Programming',
      step: '01',
      skills: ['Python', 'JavaScript'],
      description: 'Core logic, scripting, defensive tooling development, and automation.'
    },
    {
      domain: 'Web Architecture',
      step: '02',
      skills: ['HTTP / HTTPS', 'DNS', 'SQL'],
      description: 'Client-server communications, protocols, records, querying and structured data.'
    },
    {
      domain: 'Networking',
      step: '03',
      skills: ['IP Protocols', 'Network Security', 'Routing Models'],
      description: 'Traffic flow analysis, perimeter defence fundamentals, packet inspection.'
    },
    {
      domain: 'Security Assessment',
      step: '04',
      skills: ['Vulnerability Assessment', 'Web Security', 'Ethical Hacking Principles'],
      description: 'Identifying structural weaknesses, security configurations, and secure code practices.'
    },
    {
      domain: 'Operating Systems',
      step: '05',
      skills: ['Linux', 'Windows', 'CLI Environments'],
      description: 'System administration, permission boundaries, filesystem analysis, service auditing.'
    }
  ],

  cybersecurityFocus: [
    {
      title: 'Ethical Hacking',
      tag: 'DEFENSIVE EXPLORATION',
      description: 'Studying penetration testing methodologies, authorization flaws, and systematic identification of system weaknesses under safe, legal, and educational conditions.'
    },
    {
      title: 'Web Security',
      tag: 'APPLICATION DEFENCE',
      description: 'Focusing on OWASP security concepts, secure session management, Cross-Site Scripting (XSS), SQL Injection defenses, and Content Security Policies (CSP).'
    },
    {
      title: 'Security Engineering',
      tag: 'SYSTEM HARDENING',
      description: 'Designing resilient architectures, adhering to the principle of least privilege, secure default configurations, and defense-in-depth principles.'
    },
    {
      title: 'Network Security',
      tag: 'INFRASTRUCTURE',
      description: 'Understanding packet mechanics, IP address structuring, DNS resolution security, firewall principles, and defensive traffic analysis.'
    },
    {
      title: 'Vulnerability Assessment',
      tag: 'ANALYSIS & AUDIT',
      description: 'Evaluating configurations, services, dependencies, and codebases to locate vulnerabilities before exploitation can occur.'
    },
    {
      title: 'Security-Focused Software',
      tag: 'TOOL BUILDING',
      description: 'Developing proactive utility software and analysis engines that empower developers and administrators to verify system integrity.'
    }
  ],

  skillCategories: {
    workingKnowledge: [
      { name: 'Python', type: 'Language & Scripting', note: 'Automation, scripting, defensive tools' },
      { name: 'JavaScript', type: 'Web & Logic', note: 'Modern ES, DOM architecture, web security' },
      { name: 'Linux', type: 'Operating System', note: 'POSIX environment, shell commands, permissions' },
      { name: 'Windows', type: 'Operating System', note: 'OS administration, event logging, configurations' },
      { name: 'HTTP / HTTPS', type: 'Protocol', note: 'Header analysis, SSL/TLS concepts, stateless flow' },
      { name: 'SQL', type: 'Database Querying', note: 'Relational data structures, query security, injection defense' }
    ],
    learning: [
      { name: 'Network Security', type: 'Defensive Infrastructure', note: 'Firewalls, segmentation, traffic inspection' },
      { name: 'Web Security', type: 'Application Layer', note: 'OWASP Top 10, sanitization, authentication flows' },
      { name: 'Vulnerability Assessment', type: 'Audit & Scanning', note: 'Vulnerability discovery workflows, threat models' },
      { name: 'IP Addressing & Subnets', type: 'Networking Layer', note: 'CIDR, routing fundamentals, packet structure' },
      { name: 'DNS Architecture', type: 'Protocol & Resolution', note: 'Nameserver hierarchies, record validation, poisoning defenses' }
    ],
    exploring: [
      { name: 'Malware Analysis Principles', type: 'Analysis', note: 'Static header inspection, hash comparison, sandboxing' },
      { name: 'Cryptographic Protocols', type: 'Theory & Application', note: 'Hashing algorithms, public-key infrastructure, HMAC' },
      { name: 'Security Automation', type: 'Tooling', note: 'Continuous security auditing in CI/CD pipelines' }
    ]
  },

  projects: [
    {
      id: 'sentinelscan',
      number: 'PROJECT #01',
      title: 'SentinelScan',
      subtitle: 'File Safety & Malware Analysis Platform',
      status: 'Open Source • In Progress',
      badgeClass: 'status-progress',
      description: 'SentinelScan — File Safety & Malware Analysis Platform. Real open-source static analysis and defensive cybersecurity platform. Designed to evaluate uploaded files through static analysis, cryptographic hash computation, structural header inspection, and heuristics to identify suspicious markers without executing untrusted binaries.',
      technologies: ['Python', 'JavaScript', 'Linux', 'SHA-256 / MD5', 'MIME Heuristics'],
      architecture: [
        'Client-side file hash generator (avoids premature transmission of untrusted payloads)',
        'Server-side validation pipeline utilizing sandboxed memory environments',
        'Structured anomaly report engine outputting risk classifications and metadata'
      ],
      securityConsiderations: [
        'Strict zero-execution policy for incoming uploaded binaries',
        'Payload size constraints and rate limiting to prevent denial of service',
        'Explicit memory cleanup to prevent resource depletion during static analysis'
      ],
      repoUrl: 'https://github.com/sukeshd-me/SentinelScan',
      repoName: 'sukeshd-me/SentinelScan',
      isRealData: true
    }
  ],

  certifications: [
    {
      provider: 'CompTIA',
      name: 'Security+ (SY0-701)',
      status: 'In Progress',
      statusType: 'in-progress',
      dateNote: 'Targeting 2026 Examination',
      credentialUrl: null,
      description: 'Currently studying foundational concepts across network architecture, threat mitigation, identity management, and incident response.'
    },
    {
      provider: 'Industry Standard / Practical',
      name: 'Defensive Web Security & Networking Courses',
      status: 'Planned',
      statusType: 'planned',
      dateNote: 'Curriculum Roadmap',
      credentialUrl: null,
      description: 'Structured exploration into practical penetration testing and web application vulnerability assessment frameworks.'
    }
  ],

  research: {
    statusNote: 'Research and technical notes will appear here as ongoing experiments conclude.',
    plannedTopics: [
      {
        title: 'Static Anomaly Detection in Executable Headers',
        domain: 'Malware Analysis Fundamentals',
        state: 'Concept & Outline Stage'
      },
      {
        title: 'Modern CSP Configurations and Subresource Integrity',
        domain: 'Defensive Web Architecture',
        state: 'Laboratory Testing'
      },
      {
        title: 'DNS Tunneling Mechanics and Detection Signatures',
        domain: 'Network Security',
        state: 'Protocol Research'
      }
    ]
  },

  writeups: {
    statusNote: 'Technical write-ups and security notes are currently in drafting.',
    drafts: [
      {
        title: 'Hardening Web Applications with HTTP Security Headers',
        tag: 'Web Security',
        summary: 'A deep-dive into HSTS, CSP, X-Content-Type-Options, and Referrer-Policy headers for real-world deployments.'
      },
      {
        title: 'Understanding Network Packets from Handshake to Teardown',
        tag: 'Networking',
        summary: 'Step-by-step trace of TCP three-way handshake, TLS negotiation, and security checkpoints along the route.'
      },
      {
        title: 'Building Defensive CLI Utilities in Python',
        tag: 'Security Tooling',
        summary: 'Best practices for writing clean, memory-safe scripts to parse logs, verify file hashes, and alert on anomalous patterns.'
      }
    ]
  },

  securityLab: [
    {
      title: 'Packet & Header Inspection Flow',
      type: 'STATIC EXAMPLE',
      badgeClass: 'badge-static',
      description: 'Visual demonstration of how a defense-in-depth pipeline evaluates an incoming web request through header validation, reverse proxy filtering, and application firewalls.',
      steps: [
        { name: 'Ingress Point', detail: 'TLS 1.3 Termination + Cipher Suite Validation' },
        { name: 'Edge Filter', detail: 'Rate Limiting + Geo/IP Sanity + Malformed URI Drop' },
        { name: 'Header Audit', detail: 'Strict CORS + CSP + X-Frame-Options Verification' },
        { name: 'App Handler', detail: 'Parameterized Queries + Strict Input Sanitization' }
      ]
    },
    {
      title: 'SentinelScan File Analysis Lifecycle',
      type: 'PROJECT ARCHITECTURE',
      badgeClass: 'badge-demo',
      description: 'Structural overview of how files are processed defensively without dangerous dynamic execution.',
      steps: [
        { name: 'File Acquisition', detail: 'Cryptographic Hash Verification (SHA-256 / SHA-1 / MD5)' },
        { name: 'Magic Bytes Audit', detail: 'True MIME validation against extension spoofing' },
        { name: 'Entropy Assessment', detail: 'Heuristic calculation of file randomness for packer detection' },
        { name: 'Risk Scoring', detail: 'Defensive summary report generated for security operators' }
      ]
    }
  ]
};
