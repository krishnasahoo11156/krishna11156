/**
 * Krishna Sahoo Portfolio — Works Section JavaScript
 * Bento-grid cards, animated tab switching, immersive slide-up sheet modal.
 */

// ============================================================
//  DATA
// ============================================================

const WORKS_DATA = {
  projects: [
    {
      id: "hiremind",
      title: "HireMind",
      subtitle: "AI-Powered Explainable Hiring Intelligence",
      tagline: "Transform hiring from black-box resume screening to explainable, multi-source talent intelligence.",
      status: "Completed · Summer Hackathon 2026",
      role: "Full-Stack Developer & AI Integrator",
      tech: ["React", "TypeScript", "Tailwind CSS", "Express.js", "Firebase", "Socket.io", "Featherless.ai (LLM)"],
      repo: "https://github.com/krishnasahoo11156/HireMind",
      demo: "https://hire-mind-client.vercel.app/",
      accent: "#8e75b2",
      accentRgb: "142,117,178",
      images: [
        "assets/images/projects/hiremind/HireMindLogo.png",
        "assets/images/projects/hiremind/hm2.png",
        "assets/images/projects/hiremind/hm3.png",
        "assets/images/projects/hiremind/hm4.png",
        "assets/images/projects/hiremind/hm5.png",
        "assets/images/projects/hiremind/hm6.png"
      ],
      details: [
        "<strong>Explainable AI Ranking:</strong> Uses Featherless.ai models to live-stream detailed reasoning explaining exactly why Candidate A is ranked above Candidate B.",
        "<strong>Multi-Source Portfolio Analyzer:</strong> Fetches live GitHub activity (commits, language breakdown) and LeetCode statistics (problems solved, rank) to evaluate technical depth.",
        "<strong>Skill-Gap Heatmap:</strong> Generates an interactive, color-coded comparison grid (🟢 Match, 🟡 Partial, 🔴 Missing) highlighting skill alignments.",
        "<strong>Blind Screening Mode:</strong> Reduces unconscious bias by scrubbing identifying candidate details (names, emails, phone numbers, genders, university names)."
      ],
      metaTags: ["Resume Screener", "Explainable AI", "Recruitment Suite"],
      size: "large"
    },
    {
      id: "code2git",
      title: "Code2Git",
      subtitle: "Chrome Extension for Coding Portfolios",
      tagline: "Effortlessly sync your coding platform solutions to GitHub and build your developer portfolio in real-time.",
      status: "Completed · Used by 5+ Active Users",
      role: "Creator & Solo Developer",
      tech: ["JavaScript (ES6)", "HTML5", "CSS3", "Chrome Extension API", "GitHub API", "Firebase DB"],
      repo: "https://github.com/krishnasahoo11156/Code2Git",
      accent: "#f1c40f",
      accentRgb: "241,196,15",
      images: [
        "assets/images/projects/code2git/code2GitLogo2.png",
        "assets/images/projects/code2git/Code2GitLogo1.png",
        "assets/images/projects/code2git/c2g3.png",
        "assets/images/projects/code2git/c2g4.png",
        "assets/images/projects/code2git/c2g5.png",
        "assets/images/projects/code2git/c2g6.png"
      ],
      details: [
        "<strong>Automatic Real-time Sync:</strong> Instantly detects and uploads accepted solutions from LeetCode, Codeforces, and GeeksforGeeks to your GitHub repository.",
        "<strong>100% Client-Side Security:</strong> Stores credentials and access tokens locally in the browser, eliminating external server hops.",
        "<strong>Interactive Statistics Dashboard:</strong> Tracks solved problems, platform distributions, and submission history in a visually rich dashboard.",
        "<strong>Private Coding Leaderboards:</strong> Connects to a custom Firebase URL to share stats and compete on private leaderboards with friends."
      ],
      metaTags: ["Chrome Extension", "GitHub Automation", "Competitive Coding"],
      size: "tall"
    },
    {
      id: "thegreenroom",
      title: "The Green Room",
      subtitle: "Relational AI Chat Ecosystem",
      tagline: "Evolving from a single-purpose 'roasting' agent into a next-generation Relational AI Chat Ecosystem.",
      status: "Upcoming · Concept & Design Stage",
      role: "Solo Architect",
      tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Web Audio API", "Stable Diffusion", "Firebase"],
      accent: "#00b894",
      accentRgb: "0,184,148",
      images: [
        "assets/images/projects/thegreenroom/image.png"
      ],
      details: [
        "<strong>Emotional Memory:</strong> The agent remembers previous conversations, evolving their feelings toward the user over time.",
        "<strong>Multi-Modal Personality:</strong> The agent sends context-aware reaction images, memes, and expresses itself with realistic text quirks.",
        "<strong>Vibe Tracker:</strong> Renders a subtle ambient glow behind the chat bubble that changes color based on the persona's current emotional state.",
        "<strong>Subscription Architecture:</strong> Restricts premium personas (Romantic, Fantasy, Roaster) using message quotas and paywalls."
      ],
      metaTags: ["Upcoming", "AI Companion", "Multi-Modal LLM"],
      size: "wide"
    }
  ],
  hackathons: [
    {
      id: "foresee",
      title: "ForeSee",
      subtitle: "Predictive Deadline Rescue Engine",
      tagline: "AI-powered predictive deadline rescue platform simulating alternative calendar paths using Monte Carlo trials.",
      status: "Vibe2Ship Hackathon · Solo Project",
      role: "Solo Architect & Developer",
      tech: ["Next.js 14", "Tailwind CSS", "TypeScript", "Node.js", "Express", "Docker", "Google Cloud Run", "Gemini API", "Pub/Sub"],
      repo: "https://github.com/krishnasahoo11156/foresee-app-2026",
      demo: "https://foresee-app-827856108785.us-central1.run.app/",
      accent: "#00f2fe",
      accentRgb: "0,242,254",
      images: [
        "assets/images/projects/foresee/image.png",
        "assets/images/projects/foresee/image copy.png",
        "assets/images/projects/foresee/image copy 2.png",
        "assets/images/projects/foresee/image copy 3.png",
        "assets/images/projects/foresee/image copy 4.png",
        "assets/images/projects/foresee/image copy 5.png",
        "assets/images/projects/foresee/image copy 6.png",
        "assets/images/projects/foresee/image copy 7.png",
        "assets/images/projects/foresee/image copy 8.png",
        "assets/images/projects/foresee/image copy 9.png",
        "assets/images/projects/foresee/image copy 10.png",
        "assets/images/projects/foresee/image copy 11.png"
      ],
      details: [
        "<strong>National-Level Hackathon:</strong> Built as a solo project for the Vibe2Ship Hackathon (Coding Ninjas & Google for Developers) out of <strong>3,000+ individual participants</strong>.",
        "<strong>Agentic Pub/Sub Orchestrator:</strong> Engineered an event-driven system of 15+ specialized agents coordinating over Google Cloud Pub/Sub.",
        "<strong>Monte Carlo Simulator:</strong> Evaluates calendar slots and runs trials to calculate deadline risks before they occur.",
        "<strong>Gemini Calendar Sync:</strong> Parses natural language tasks, re-maps conflict slots, and updates Google Calendar in real-time."
      ],
      metaTags: ["National Level 🇮🇳", "3,000+ Solo Competitors 👥", "Monte Carlo Simulation"],
      size: "large"
    },
    {
      id: "studysync",
      title: "StudySync",
      subtitle: "Unified Academic Command Center",
      tagline: "A unified React-based academic command center integrating task planners, library vaults, and Pomodoro trackers.",
      status: "🏆 Winner — UniMerge 1.0",
      role: "Solo Project (parth.builds community)",
      tech: ["React.js (Vite)", "Tailwind CSS", "React Router", "Web Audio API", "Firebase DB & Auth"],
      repo: "https://github.com/krishnasahoo11156/StudySync",
      demo: "https://study-sync-eosin-seven.vercel.app/",
      video: "https://drive.google.com/file/d/1EFEZ7JUcr8pwHhUq5ElBZvno3VPz67He/view?usp=sharing",
      accent: "#2ecc71",
      accentRgb: "46,204,113",
      images: [
        "assets/images/projects/studysync/Screenshot 2026-04-21 221244.png",
        "assets/images/projects/studysync/Screenshot 2026-04-21 221344.png",
        "assets/images/projects/studysync/Screenshot 2026-04-21 221419.png",
        "assets/images/projects/studysync/Screenshot 2026-04-21 221456.png",
        "assets/images/projects/studysync/Screenshot 2026-04-21 221518.png",
        "assets/images/projects/studysync/Screenshot 2026-05-17 122518.png"
      ],
      details: [
        "<strong>UniMerge 1.0 Winner:</strong> Awarded first place in parth.builds community hackathon.",
        "<strong>Procedural Sound Synthesizer:</strong> Utilizes the Web Audio API to natively generate environmental sounds (Rain, Birds, Café, White Noise) without external files.",
        "<strong>Zero-CORS Vault:</strong> Custom Firestore schema encoding files into Base64 formats for zero-cost static cloud storage.",
        "<strong>Intelligent Calendar:</strong> Built-in conflict checker checking exam overlaps and course timelines."
      ],
      metaTags: ["Winner 🏆", "Solo Project 👤", "Web Audio Engine"],
      size: "tall"
    },
    {
      id: "crisissync",
      title: "CrisisSync",
      subtitle: "High-Pressure Emergency Coordination",
      tagline: "Emergency incident coordination and real-time triage platform engineered for hospitality venues.",
      status: "Google Solution Challenge · Team Project",
      role: "Core Developer (Team of 4)",
      tech: ["Flutter", "Dart", "Firebase", "Gemini AI", "Google Maps API", "Docker", "Nginx"],
      repo: "https://github.com/krishnasahoo11156/crisissync",
      accent: "#e74c3c",
      accentRgb: "231,76,60",
      images: [
        "assets/images/projects/crisissync/Screenshot 2026-05-04 101355.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 101431.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 101624.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 101817.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 101953.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102033.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102109.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102217.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102323.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102344.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102401.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102419.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102556.png",
        "assets/images/projects/crisissync/Screenshot 2026-05-04 102954.png"
      ],
      details: [
        "<strong>Google Solution Challenge:</strong> Participated in a global hackathon with <strong>3,000+ competitors</strong>.",
        "<strong>Sub-Second Event Sync:</strong> Integrates Firebase Realtime Database for sub-200ms coordinates updates and Firestore for logs.",
        "<strong>Gemini Triage Classifier:</strong> AI incident classification engine classifying reports, rating urgency, and making safety checklists under 3 seconds.",
        "<strong>Aegis Design System:</strong> Dark, tactical high-visibility interfaces separating Guest, Staff, and Admin portals."
      ],
      metaTags: ["3,000+ Competitors 👥", "Gemini Triage", "Real-time Sync"],
      size: "compact"
    },
    {
      id: "orbitalwatch",
      title: "OrbitalWatch",
      subtitle: "3D Space Traffic Control Simulator",
      tagline: "Real-time Space Situational Awareness (SSA) system propagating coordinates and tracking conjunction risks.",
      status: "Space Traffic Control Hackathon",
      role: "Lead Systems Architect & UI Developer",
      tech: ["React 19", "React Three Fiber (R3F)", "Three.js", "FastAPI", "PostgreSQL", "Redis", "Socket.IO"],
      repo: "https://github.com/parthnarkar/OrbitalWatch",
      demo: "https://orbital-watch-bay.vercel.app/",
      accent: "#0984e3",
      accentRgb: "9,132,227",
      images: [
        "assets/images/projects/orbitalwatch/image.png",
        "assets/images/projects/orbitalwatch/image copy.png",
        "assets/images/projects/orbitalwatch/image copy 2.png"
      ],
      details: [
        "<strong>Global Competitiveness:</strong> Built as a team project in an international arena with over <strong>11,000+ groups participating</strong>.",
        "<strong>3D Earth Visualizer:</strong> Custom atmospheric shaders and Instanced Rendering displaying 500+ active orbiters at 60 FPS in WebGL.",
        "<strong>SGP4 Coordinate Propagator:</strong> Evaluates satellite elements (TLE) dynamically and outputs geodetic paths.",
        "<strong>Conjunction Scans:</strong> Double-pass shell filter mapping close approaches within 1.0 km in a 72-hour forecast."
      ],
      metaTags: ["11,000+ Groups 🛰️", "React Three Fiber", "Conjunction Forecast"],
      size: "compact"
    },
    {
      id: "syrus-onboarding",
      title: "Onboarding Suite",
      subtitle: "AI Employee Onboarding Platform",
      tagline: "Conversational employee onboarding platform utilizing local agent monitoring to verify developer setups automatically.",
      status: "Syrus Hackathon · Team Project",
      role: "Solo Frontend & Integrations Architect",
      tech: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4", "Gemini AI", "NextAuth", "Chart.js"],
      repo: "https://github.com/krishnasahoo11156/crisissync",
      video: "https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link",
      ppt: "https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link",
      accent: "#a55eea",
      accentRgb: "165,94,234",
      images: [
        "assets/images/projects/syrus/image.png",
        "assets/images/projects/syrus/image copy.png",
        "assets/images/projects/syrus/image copy 2.png",
        "assets/images/projects/syrus/image copy 3.png"
      ],
      details: [
        "<strong>Team AlgoMinds Project:</strong> Configured for the Syrus Onboarding Hackathon.",
        "<strong>Local Agent Verification:</strong> Background Node.js agent checking system path setups (Node, Git, Docker) and checking tasks off in real-time.",
        "<strong>Gemini Onboarding Copilot:</strong> Conversation bot answering workspace queries and loading setup guidelines.",
        "<strong>HR Analytics Dashboard:</strong> Tracking team checklists and analytics progress utilizing Chart.js grids."
      ],
      metaTags: ["Team AlgoMinds 👥", "Auto Setup Checks", "Gemini Copilot"],
      size: "compact"
    }
  ],
  opensource: [
    {
      id: "inboxos",
      title: "InboxOS Contributions",
      subtitle: "Open Source Email Hub",
      tagline: "Merged 9 backend and frontend pull requests structuring database Schemas and core mail client views.",
      status: "Open Source Contributor",
      role: "9 Merged Pull Requests",
      tech: ["Node.js", "TypeScript", "React", "Prisma", "Docker Compose", "PostgreSQL", "Redis", "Jest"],
      repo: "https://github.com/krishnasahoo11156/InboxOS",
      accent: "#00d2d3",
      accentRgb: "0,210,211",
      images: [
        "assets/images/projects/inboxos/inboxosLogo.jpeg"
      ],
      details: [
        "<strong>PR #67:</strong> Configured Outlook OAuth2 and IMAP account integration, mapping tables in Prisma schemas.",
        "<strong>PR #71:</strong> Structured Docker Compose coordinating frontend, backend, PostgreSQL, and Redis containers.",
        "<strong>PR #68:</strong> Crafted core dashboard shell layout and sidebar feeds integrating TanStack Query.",
        "<strong>PR #65:</strong> Setup BullMQ background email parser running AI models to classify priority items.",
        "<strong>Auth & Tests:</strong> AuthContext Context API (PR #70), JWT Authentication middleware (PR #69), and Jest test suits (PR #50)."
      ],
      metaTags: ["9 Merged PRs 🚀", "Docker Compose", "Prisma Schemas"],
      size: "large"
    },
    {
      id: "firstcontrib",
      title: "First Contributions",
      subtitle: "Onboarding Bug Fix",
      tagline: "Escaped translation characters in Lingala README to prevent directory crashes.",
      status: "Open Source Contributor",
      role: "Merged Translation Fix",
      tech: ["Git", "Markdown", "HTML", "Lingala Translation"],
      repo: "https://github.com/firstcontributions/first-contributions",
      demo: "https://github.com/firstcontributions/first-contributions/pull/119971",
      accent: "#1abc9c",
      accentRgb: "26,188,156",
      images: [
        "assets/images/projects/firstcontrib/image.png"
      ],
      details: [
        "<strong>PR #119971:</strong> Escaped angle brackets inside Lingala translation strings, resolving a layout parser issue.",
        "<strong>Git Flow:</strong> Learned the standard directory registration process to establish open source workflows."
      ],
      metaTags: ["Merged PR 🐛", "Translation Fix", "Git Onboarding"],
      size: "compact"
    },
    {
      id: "gsoc-apache",
      title: "Apache Foundation",
      subtitle: "GSoC 2027 Java Preparation",
      tagline: "Target GSoC organization preparing contributions to enterprise Java web servers, databases, and compilers.",
      status: "Future GSoC Target Org",
      role: "Target Organization",
      tech: ["Java", "Maven", "Spring Boot", "Docker", "Git", "JUnit"],
      repo: "https://github.com/apache",
      guide: "https://community.apache.org/contributors/",
      accent: "#e67e22",
      accentRgb: "230,126,34",
      images: [
        "assets/images/projects/apache/image.png",
        "assets/images/projects/apache/image copy.png"
      ],
      details: [
        "<strong>Apache Maven:</strong> Targeting Java-based build configuration core files.",
        "<strong>Apache Tomcat & Kafka:</strong> Exploring network controllers and high-throughput logging messaging backbones.",
        "<strong>Apache NetBeans:</strong> Under-the-hood Java compiler and code completion tools.",
        "<strong>Apache ShardingSphere & Fineract:</strong> Studying transaction servers and distributed SQL connectors."
      ],
      metaTags: ["GSoC Target 🎯", "Enterprise Java ☕", "Community Driven"],
      size: "compact"
    },
    {
      id: "gsoc-eclipse",
      title: "Eclipse Foundation",
      subtitle: "GSoC 2027 Java Preparation",
      tagline: "Target GSoC organization preparing contributions to IDE Java compilers, tooling platforms, and collections.",
      status: "Future GSoC Target Org",
      role: "Target Organization",
      tech: ["Java", "Maven", "Gradle", "OSGi", "SWT", "Jakarta EE"],
      repo: "https://github.com/eclipse",
      guide: "https://eclipse.github.io/eclipse-projects/",
      accent: "#9b59b6",
      accentRgb: "155,89,182",
      images: [
        "assets/images/projects/eclipse/image.png"
      ],
      details: [
        "<strong>Eclipse JDT:</strong> Studying the core Java Development Tools compilation parser scripts.",
        "<strong>Eclipse Platform:</strong> Reviewing general OSGi micro-services and plugin layouts.",
        "<strong>Eclipse Collections:</strong> High-performance JDK compatibility collections API sheets.",
        "<strong>Eclipse Theia & Che:</strong> Next-generation cloud IDE containers written in TypeScript and Java."
      ],
      metaTags: ["GSoC Target 🎯", "IDE Tooling ⚙️", "Jakarta EE"],
      size: "compact"
    },
    {
      id: "gsoc-jenkins",
      title: "Jenkins CI/CD",
      subtitle: "GSoC 2027 Java Preparation",
      tagline: "Target GSoC organization preparing plugins and core server configurations written in Groovy and Java.",
      status: "Future GSoC Target Org",
      role: "Target Organization",
      tech: ["Java", "Maven", "Groovy", "Docker", "Git"],
      repo: "https://github.com/jenkinsci",
      guide: "https://www.jenkins.io/participate/",
      accent: "#d63031",
      accentRgb: "214,48,49",
      images: [
        "assets/images/projects/jenkins/image.png"
      ],
      details: [
        "<strong>Jenkins Core:</strong> Studying lifecycle servers, web interfaces, and background tasks.",
        "<strong>Pipeline Plugin:</strong> Analyzing compiler rules for Groovy-based pipeline script parsers.",
        "<strong>Configuration as Code (JCasC):</strong> Writing YAML configuration setup pipelines for plugin dependencies."
      ],
      metaTags: ["GSoC Target 🎯", "DevOps & CI/CD ⚙️", "Plugin Infrastructure"],
      size: "compact"
    },
    {
      id: "gsoc-openmrs",
      title: "OpenMRS Healthcare",
      subtitle: "GSoC 2027 Java Preparation",
      tagline: "Target GSoC organization preparing patient record modules and REST APIs built in Spring and Hibernate.",
      status: "Future GSoC Target Org",
      role: "Target Organization",
      tech: ["Java", "Spring Boot", "Hibernate", "MySQL", "REST APIs"],
      repo: "https://github.com/openmrs",
      guide: "https://openmrs.atlassian.net/wiki/spaces/RES",
      accent: "#0984e3",
      accentRgb: "9,132,227",
      images: [
        "assets/images/projects/openmrs/image.png"
      ],
      details: [
        "<strong>OpenMRS Core:</strong> Managing patient databases and clinical metadata records.",
        "<strong>REST Web Services:</strong> Engineering security interceptors and controllers for data operations.",
        "<strong>Reference Application:</strong> Custom theme configurations and client UI packages."
      ],
      metaTags: ["GSoC Target 🎯", "Healthcare Systems 🏥", "Beginner Friendly"],
      size: "compact"
    }
  ]
};

// ============================================================
//  HELPERS
// ============================================================

/** Escape spaces in a file path for CSS/src usage */
function encodeAssetPath(path) {
  return path ? path.replace(/ /g, '%20') : '';
}

/** Set CSS custom properties for project accent colors dynamically */
function applyAccent(el, project) {
  el.style.setProperty('--project-accent', project.accent || '#e5e5e7');
  el.style.setProperty('--project-accent-rgb', project.accentRgb || '229,229,231');
}

// ============================================================
//  CARD BUILDERS
// ============================================================

/**
 * Builds a LARGE (featured) card.
 * Desktop: Spans 8 columns, 2 rows.
 */
function buildLargeCard(item, index) {
  const card = document.createElement('div');
  card.className = 'work-card-large card-entering';
  card.setAttribute('data-id', item.id);
  card.style.animationDelay = `${index * 60}ms`;
  applyAccent(card, item);

  const imgUrl = item.images && item.images.length > 0
    ? encodeAssetPath(item.images[0])
    : '';

  const techPills = item.tech.slice(0, 4)
    .map(t => `<span class="large-card-tech-pill">${t}</span>`).join('');
  const moreTech = item.tech.length > 4
    ? `<span class="large-card-tech-pill">+${item.tech.length - 4} more</span>`
    : '';

  const pad = (index + 1).toString().padStart(2, '0');

  card.innerHTML = `
    ${imgUrl ? `<div class="large-card-bg" style="background-image:url('${imgUrl}')"></div>` : ''}
    <div class="large-card-glass"></div>
    <div class="large-card-glow"></div>

    <span class="large-card-index">${pad} · Featured</span>
    <button class="large-card-explore" aria-label="Explore project">↗</button>

    <div class="large-card-content">
      <span class="large-card-status-badge">${item.status}</span>
      <h3 class="large-card-title">${item.title}</h3>
      <p class="large-card-tagline">${item.tagline}</p>
      <div class="large-card-tech-row">
        ${techPills}${moreTech}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openProjectSheet(item));
  return card;
}

/**
 * Builds a TALL card.
 * Desktop: Spans 4 columns, 2 rows.
 */
function buildTallCard(item, index) {
  const card = document.createElement('div');
  card.className = 'work-card-tall card-entering';
  card.setAttribute('data-id', item.id);
  card.style.animationDelay = `${index * 70}ms`;
  applyAccent(card, item);

  const imgUrl = item.images && item.images.length > 0
    ? encodeAssetPath(item.images[0])
    : '';

  const techPills = item.tech.slice(0, 3)
    .map(t => `<span class="tall-card-tech-pill">${t}</span>`).join('');
  const moreTech = item.tech.length > 3
    ? `<span class="tall-card-tech-more">+${item.tech.length - 3}</span>`
    : '';

  const pad = (index + 1).toString().padStart(2, '0');

  card.innerHTML = `
    ${imgUrl ? `<div class="tall-card-bg" style="background-image:url('${imgUrl}')"></div>` : ''}
    <div class="tall-card-glass"></div>
    <div class="tall-card-glow"></div>
    
    <div class="tall-card-header">
      <span class="tall-card-index">${pad}</span>
      <button class="tall-card-arrow-btn" aria-label="Open project">↗</button>
    </div>
    
    <div class="tall-card-body">
      <span class="tall-card-status">${item.status}</span>
      <h3 class="tall-card-title">${item.title}</h3>
      <p class="tall-card-tagline">${item.tagline}</p>
    </div>
    
    <div class="tall-card-footer">
      <div class="tall-card-tech-row">
        ${techPills}${moreTech}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openProjectSheet(item));
  return card;
}

/**
 * Builds a WIDE card.
 * Desktop: Spans 12 columns, 1 row.
 */
function buildWideCard(item, index) {
  const card = document.createElement('div');
  card.className = 'work-card-wide card-entering';
  card.setAttribute('data-id', item.id);
  card.style.animationDelay = `${index * 60}ms`;
  applyAccent(card, item);

  const imgUrl = item.images && item.images.length > 0
    ? encodeAssetPath(item.images[0])
    : '';

  const techPills = item.tech.slice(0, 5)
    .map(t => `<span class="wide-card-tech-pill">${t}</span>`).join('');
  const moreTech = item.tech.length > 5
    ? `<span class="wide-card-tech-pill">+${item.tech.length - 5} more</span>`
    : '';

  const pad = (index + 1).toString().padStart(2, '0');

  card.innerHTML = `
    ${imgUrl ? `<div class="wide-card-bg" style="background-image:url('${imgUrl}')"></div>` : ''}
    <div class="wide-card-glass"></div>
    <div class="wide-card-glow"></div>
    
    <div class="wide-card-layout">
      <div class="wide-card-left">
        <span class="wide-card-index">${pad} · ${item.status}</span>
        <h3 class="wide-card-title">${item.title}</h3>
        <p class="wide-card-tagline">${item.tagline}</p>
      </div>
      <div class="wide-card-right">
        <div class="wide-card-tech-row">
          ${techPills}${moreTech}
        </div>
        <button class="wide-card-explore" aria-label="Explore project">↗</button>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openProjectSheet(item));
  return card;
}

/**
 * Builds a COMPACT card.
 * Desktop: Spans 4 columns, 1 row.
 */
function buildCompactCard(item, index) {
  const card = document.createElement('div');
  card.className = 'work-card-compact card-entering';
  card.setAttribute('data-id', item.id);
  card.style.animationDelay = `${index * 75}ms`;
  applyAccent(card, item);

  const techPills = item.tech.slice(0, 2)
    .map(t => `<span class="compact-card-tech-pill">${t}</span>`).join('');
  const moreTech = item.tech.length > 2
    ? `<span class="compact-card-tech-more">+${item.tech.length - 2}</span>`
    : '';

  const pad = (index + 1).toString().padStart(2, '0');

  card.innerHTML = `
    <div class="compact-card-header">
      <span class="compact-card-index">${pad}</span>
      <button class="compact-card-arrow-btn" aria-label="Open project">↗</button>
    </div>
    <h3 class="compact-card-title">${item.title}</h3>
    <p class="compact-card-tagline">${item.tagline}</p>
    <div class="compact-card-footer">
      ${techPills}${moreTech}
    </div>
  `;

  card.addEventListener('click', () => openProjectSheet(item));
  return card;
}

// ============================================================
//  RENDER LOGIC
// ============================================================

let _activeCategory = 'projects';
let _isAnimating = false;

/**
 * Renders the bento grid for a category.
 * Sizing layout is governed by item.size properties mapped to 12-column grid spans in CSS.
 */
function renderBento(bentoEl, category) {
  const items = WORKS_DATA[category] || [];
  bentoEl.innerHTML = '';

  if (items.length === 0) {
    bentoEl.innerHTML = `<p style="color:rgba(255,255,255,0.3);padding:2rem;">No items in this category yet.</p>`;
    return;
  }

  items.forEach((item, idx) => {
    let card;
    if (item.size === 'large') {
      card = buildLargeCard(item, idx);
    } else if (item.size === 'tall') {
      card = buildTallCard(item, idx);
    } else if (item.size === 'wide') {
      card = buildWideCard(item, idx);
    } else {
      card = buildCompactCard(item, idx);
    }
    bentoEl.appendChild(card);
  });
}

/**
 * Switches to a new category with animated card exit → height lock → render new → transition height → card enter.
 */
async function switchCategory(bentoEl, category) {
  if (_isAnimating || category === _activeCategory) return;
  _isAnimating = true;
  _activeCategory = category;

  const currentCards = bentoEl.querySelectorAll(
    '.work-card-large, .work-card-tall, .work-card-wide, .work-card-compact'
  );

  // 1. Get current container height and lock it
  const currentHeight = bentoEl.offsetHeight;
  bentoEl.style.height = `${currentHeight}px`;
  bentoEl.style.overflow = 'hidden';

  // 2. Animate existing cards OUT
  if (currentCards.length > 0) {
    currentCards.forEach((card, i) => {
      card.classList.remove('card-entering');
      card.classList.add('card-exiting');
      card.style.animationDelay = `${i * 30}ms`;
    });
    // Wait for exit animations to complete
    await new Promise(resolve =>
      setTimeout(resolve, 220 + currentCards.length * 30)
    );
  }

  // 3. Render new cards
  renderBento(bentoEl, category);

  // 4. Measure new height
  bentoEl.style.height = 'auto';
  const newHeight = bentoEl.offsetHeight;
  
  // Set back to old height temporarily for transition
  bentoEl.style.height = `${currentHeight}px`;
  bentoEl.offsetHeight; // Force reflow

  // 5. Transition container height
  bentoEl.style.transition = 'height 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
  bentoEl.style.height = `${newHeight}px`;

  // 6. Reset styles after animation completes
  setTimeout(() => {
    bentoEl.style.height = '';
    bentoEl.style.overflow = '';
    bentoEl.style.transition = '';
    _isAnimating = false;
  }, 450);
}

// ============================================================
//  PROJECT SHEET MODAL
// ============================================================

let _sheetOpen = false;
let _escHandler = null;

/**
 * Opens the immersive slide-up project sheet for a given project.
 */
/**
 * Opens the immersive slide-up project sheet for a given project.
 */
function openProjectSheet(project) {
  if (_sheetOpen) return;
  _sheetOpen = true;

  const screenshots = project.images || [];
  let carouselIndex = 0;
  let autoplayTimer = null;

  // --- Build backdrop ---
  const backdrop = document.createElement('div');
  backdrop.className = 'project-sheet-backdrop';
  backdrop.id = 'project-sheet-backdrop';

  // --- Build carousel HTML ---
  const carouselImagesHtml = screenshots.length > 0
    ? screenshots.map((src, i) =>
      `<img src="${encodeAssetPath(src)}" alt="Screenshot ${i + 1}" class="sheet-carousel-img${i === 0 ? ' active' : ''}">`
    ).join('')
    : `<div class="sheet-carousel-placeholder">NO PREVIEW AVAILABLE</div>`;

  const carouselNavHtml = screenshots.length > 1
    ? `<button class="sheet-carousel-nav prev" id="sheet-carousel-prev">&#x276E;</button>
       <button class="sheet-carousel-nav next" id="sheet-carousel-next">&#x276F;</button>
       <div class="sheet-carousel-dots">
         ${screenshots.map((_, i) =>
      `<span class="sheet-carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`
    ).join('')}
       </div>`
    : '';

  // --- Build tech cloud ---
  const techCloud = project.tech
    .map(t => `<span class="sheet-tech-pill">${t}</span>`)
    .join('');

  // --- Build feature list ---
  const featureList = project.details
    .map(d => `<li>${d}</li>`)
    .join('');

  // --- Build header links ---
  const headerLinks = [];
  if (project.demo) {
    headerLinks.push(
      `<a href="${project.demo}" target="_blank" rel="noopener" class="sheet-header-link-btn btn-primary">⚡ Live Demo</a>`
    );
  }
  if (project.repo) {
    headerLinks.push(
      `<a href="${project.repo}" target="_blank" rel="noopener" class="sheet-header-link-btn">📦 GitHub</a>`
    );
  }
  if (project.video) {
    headerLinks.push(
      `<a href="${project.video}" target="_blank" rel="noopener" class="sheet-header-link-btn">🎬 Video</a>`
    );
  }
  if (project.ppt) {
    headerLinks.push(
      `<a href="${project.ppt}" target="_blank" rel="noopener" class="sheet-header-link-btn">📊 Slides</a>`
    );
  }
  if (project.guide) {
    headerLinks.push(
      `<a href="${project.guide}" target="_blank" rel="noopener" class="sheet-header-link-btn">📖 Guide</a>`
    );
  }
  if (headerLinks.length === 0 && project.repo) {
    headerLinks.push(
      `<a href="${project.repo}" target="_blank" rel="noopener" class="sheet-header-link-btn btn-primary">📦 Repo</a>`
    );
  }
  const headerLinksHtml = headerLinks.join('');

  // --- Meta tags ---
  const metaTagsHtml = (project.metaTags || [])
    .map(tag => `<span class="sheet-meta-tag">${tag}</span>`)
    .join('');

  // --- Build sheet ---
  const sheet = document.createElement('div');
  sheet.className = 'project-sheet';
  sheet.id = 'project-sheet';
  sheet.innerHTML = `
    <div class="sheet-accent-stripe"></div>
    <div class="sheet-drag-handle"></div>

    <div class="sheet-header">
      <div class="sheet-header-title-area">
        <h2 class="sheet-header-title">${project.title}</h2>
        <div class="sheet-header-subtitle">${project.subtitle}</div>
      </div>
      <div class="sheet-header-actions-area">
        <div class="sheet-header-links">${headerLinksHtml}</div>
        <button class="sheet-close-btn" id="sheet-close-btn" aria-label="Close">&#x2715;</button>
      </div>
    </div>

    <div class="sheet-body">
      <!-- Left: Visuals & Metadata (Saves vertical scrolling in details column) -->
      <div class="sheet-visuals">
        <div class="sheet-carousel">
          <div class="sheet-carousel-inner" id="sheet-carousel-inner">
            ${carouselImagesHtml}
          </div>
          ${carouselNavHtml}
        </div>
        
        <div class="sheet-left-meta">
          <div class="sheet-meta-group">
            <div class="sheet-section-label">Status</div>
            <div class="sheet-status-badge">${project.status}</div>
          </div>

          <div class="sheet-meta-group">
            <div class="sheet-tech-section-label">Tech Stack</div>
            <div class="sheet-tech-cloud">${techCloud}</div>
          </div>
        </div>
      </div>

      <!-- Right: Detailed Specifications -->
      <div class="sheet-details">
        <div class="sheet-specs-section">
          <div class="sheet-section-label">Specifications & Impact</div>
          <ul class="sheet-feature-list">${featureList}</ul>
        </div>
        
        ${metaTagsHtml ? `
        <div class="sheet-tags-section">
          <div class="sheet-section-label">Focus Areas</div>
          <div class="sheet-meta-tags">${metaTagsHtml}</div>
        </div>` : ''}
      </div>
    </div>
  `;

  // Apply accent variables to sheet
  applyAccent(sheet, project);

  // --- Mount to DOM ---
  document.body.appendChild(backdrop);
  document.body.appendChild(sheet);
  document.body.style.overflow = 'hidden';

  // --- Carousel interactivity ---
  if (screenshots.length > 1) {
    const imgs = sheet.querySelectorAll('.sheet-carousel-img');
    const dots = sheet.querySelectorAll('.sheet-carousel-dot');
    const btnPrev = sheet.querySelector('#sheet-carousel-prev');
    const btnNext = sheet.querySelector('#sheet-carousel-next');

    function showSlide(idx) {
      carouselIndex = (idx + screenshots.length) % screenshots.length;
      imgs.forEach((img, i) => img.classList.toggle('active', i === carouselIndex));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === carouselIndex));
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        showSlide(carouselIndex + 1);
      }, 3000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    btnPrev.addEventListener('click', e => {
      e.stopPropagation();
      showSlide(carouselIndex - 1);
      startAutoplay();
    });

    btnNext.addEventListener('click', e => {
      e.stopPropagation();
      showSlide(carouselIndex + 1);
      startAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        e.stopPropagation();
        showSlide(parseInt(dot.getAttribute('data-idx'), 10));
        startAutoplay();
      });
    });

    // Start autoplay slideshow
    startAutoplay();
  }

  // --- Close logic ---
  function closeSheet() {
    if (!_sheetOpen) return;
    backdrop.classList.add('closing');
    sheet.classList.add('closing');

    // Stop autoplay timer
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    // Remove Escape listener
    if (_escHandler) {
      document.removeEventListener('keydown', _escHandler);
      _escHandler = null;
    }

    setTimeout(() => {
      backdrop.remove();
      sheet.remove();
      document.body.style.overflow = '';
      _sheetOpen = false;
    }, 380);
  }

  // Close button
  sheet.querySelector('#sheet-close-btn').addEventListener('click', closeSheet);

  // Backdrop click
  backdrop.addEventListener('click', closeSheet);

  // Escape key
  _escHandler = e => { if (e.key === 'Escape') closeSheet(); };
  document.addEventListener('keydown', _escHandler);
}

// ============================================================
//  INIT
// ============================================================

/** Positions the absolute-positioned sliding pill indicator behind the active tab button */
function updateTabIndicator() {
  const activeBtn = document.querySelector('.works-tab-btn.active');
  const indicator = document.getElementById('works-tab-indicator');
  if (!activeBtn || !indicator) return;

  indicator.style.left = `${activeBtn.offsetLeft}px`;
  indicator.style.top = `${activeBtn.offsetTop}px`;
  indicator.style.width = `${activeBtn.offsetWidth}px`;
  indicator.style.height = `${activeBtn.offsetHeight}px`;
}

function initWorksSection() {
  const worksSection = document.getElementById('works');
  if (!worksSection) return;

  const tabBtns = document.querySelectorAll('.works-tab-btn');
  const bentoEl = document.getElementById('works-bento');
  const tabsContainer = document.querySelector('.works-tabs');
  if (!bentoEl) return;

  // Render initial category
  renderBento(bentoEl, 'projects');
  _activeCategory = 'projects';

  // Inject tab indicator capsule dynamically
  if (tabsContainer && !document.getElementById('works-tab-indicator')) {
    const indicator = document.createElement('span');
    indicator.className = 'works-tab-indicator';
    indicator.id = 'works-tab-indicator';
    tabsContainer.appendChild(indicator);
  }

  // Position indicator initially after a slight layout delay
  setTimeout(updateTabIndicator, 80);

  // Tab click handlers — smooth crossfade transition
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-tab');
      if (category === _activeCategory || _isAnimating) return;

      // Update active state on buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Slide the background capsule indicator
      updateTabIndicator();

      // Animate switch
      switchCategory(bentoEl, category);
    });
  });

  // Re-align indicator on window resize
  window.addEventListener('resize', updateTabIndicator);
}

document.addEventListener('DOMContentLoaded', () => {
  initWorksSection();
});
