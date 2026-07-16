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
      metaTags: ["Resume Screener", "Explainable AI", "Recruitment Suite"]
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
      metaTags: ["Chrome Extension", "GitHub Automation", "Competitive Coding"]
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
      metaTags: ["Upcoming", "AI Companion", "Multi-Modal LLM"]
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
      metaTags: ["National Level 🇮🇳", "3,000+ Solo Competitors 👥", "Monte Carlo Simulation"]
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
        "assets/images/projects/studysync/Screenshot 2026-04-21 221546.png",
        "assets/images/projects/studysync/Screenshot 2026-05-17 122518.png"
      ],
      details: [
        "<strong>UniMerge 1.0 Winner:</strong> Awarded first place in parth.builds community hackathon.",
        "<strong>Procedural Sound Synthesizer:</strong> Utilizes the Web Audio API to natively generate environmental sounds (Rain, Birds, Café, White Noise) without external files.",
        "<strong>Zero-CORS Vault:</strong> Custom Firestore schema encoding files into Base64 formats for zero-cost static cloud storage.",
        "<strong>Intelligent Calendar:</strong> Built-in conflict checker checking exam overlaps and course timelines."
      ],
      metaTags: ["Winner 🏆", "Solo Project 👤", "Web Audio Engine"]
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
      metaTags: ["3,000+ Competitors 👥", "Gemini Triage", "Real-time Sync"]
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
      metaTags: ["11,000+ Groups 🛰️", "React Three Fiber", "Conjunction Forecast"]
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
      metaTags: ["Team AlgoMinds 👥", "Auto Setup Checks", "Gemini Copilot"]
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
      metaTags: ["9 Merged PRs 🚀", "Docker Compose", "Prisma Schemas"]
    },
    {
      id: "firstcontrib",
      title: "First Contributions",
      subtitle: "Onboarding Bug Fix",
      tagline: "Escaped translation characters in Lingala Markdown README to prevent directory rendering crashes.",
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
      metaTags: ["Merged PR 🐛", "Translation Fix", "Git Onboarding"]
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
      metaTags: ["GSoC Target 🎯", "Enterprise Java ☕", "Community Driven"]
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
      metaTags: ["GSoC Target 🎯", "IDE Tooling ⚙️", "Jakarta EE"]
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
      metaTags: ["GSoC Target 🎯", "DevOps & CI/CD ⚙️", "Plugin Infrastructure"]
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
      metaTags: ["GSoC Target 🎯", "Healthcare Systems 🏥", "Beginner Friendly"]
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

/** Set CSS custom properties for project accent colors */
function applyAccent(el, project) {
  el.style.setProperty('--project-accent', project.accent);
  el.style.setProperty('--project-accent-rgb', project.accentRgb || '0,242,254');
}

// ============================================================
//  CARD BUILDERS
// ============================================================

/**
 * Builds the full-width FEATURED card (first item in a category).
 */
function buildFeaturedCard(item, index, typeClass = '') {
  const card = document.createElement('div');
  card.className = `work-card-featured ${typeClass} card-entering`;
  card.setAttribute('data-id', item.id);
  card.style.setProperty('--animation-delay', `${index * 60}ms`);
  card.style.animationDelay = `${index * 60}ms`;
  applyAccent(card, item);

  const imgUrl = item.images && item.images.length > 0
    ? encodeAssetPath(item.images[0])
    : '';

  const techPills = item.tech.slice(0, 4)
    .map(t => `<span class="featured-card-tech-pill">${t}</span>`).join('');
  const moreTech = item.tech.length > 4
    ? `<span class="featured-card-tech-pill">+${item.tech.length - 4} more</span>`
    : '';

  const pad = (index + 1).toString().padStart(2, '0');

  card.innerHTML = `
    ${imgUrl ? `<div class="featured-card-bg" style="background-image:url('${imgUrl}')"></div>` : ''}
    <div class="featured-card-glass"></div>
    <div class="featured-card-glow"></div>

    <span class="featured-card-index">${pad} · Featured</span>
    <button class="featured-card-explore" aria-label="Explore project">↗</button>

    <div class="featured-card-content">
      <span class="featured-card-status-badge">${item.status}</span>
      <h3 class="featured-card-title">${item.title}</h3>
      <p class="featured-card-tagline">${item.tagline}</p>
      <div class="featured-card-tech-row">
        ${techPills}${moreTech}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openProjectSheet(item));
  return card;
}

/**
 * Builds a compact dark-glass card for all items after the first.
 */
function buildCompactCard(item, index, typeClass = '') {
  const card = document.createElement('div');
  card.className = `work-card-compact ${typeClass} card-entering`;
  card.setAttribute('data-id', item.id);
  card.style.animationDelay = `${index * 70}ms`;
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
 * Top section is a 50/50 split:
 * - Left: 1 large card (Featured)
 * - Right: Stack of maximum 2 compact cards.
 * Any additional cards (index 3+) are added to a Bottom Grid below.
 */
function renderBento(bentoEl, category) {
  const items = WORKS_DATA[category] || [];
  bentoEl.innerHTML = '';

  if (items.length === 0) {
    bentoEl.innerHTML = `<p style="color:rgba(255,255,255,0.3);padding:2rem;">No items in this category yet.</p>`;
    return;
  }

  const N = items.length;

  // Case 1: Less than 3 items: Just render them side-by-side in Top Row
  if (N <= 2) {
    const topRow = document.createElement('div');
    topRow.className = 'works-top-row';
    items.forEach((item, i) => {
      topRow.appendChild(buildCompactCard(item, i, ''));
    });
    bentoEl.appendChild(topRow);
    return;
  }

  // Case 2: 3 or more items: Build Top Row with 1 large (left) + 2 stacked (right)
  const topRow = document.createElement('div');
  topRow.className = 'works-top-row';

  // Left side: Large featured card (Index 0)
  const leftCard = buildFeaturedCard(items[0], 0, 'work-card-large');
  topRow.appendChild(leftCard);

  // Right side: Flex stack of exactly 2 compact cards (Index 1 & 2)
  const rightStack = document.createElement('div');
  rightStack.className = 'works-right-stack';
  rightStack.appendChild(buildCompactCard(items[1], 1, ''));
  rightStack.appendChild(buildCompactCard(items[2], 2, ''));
  topRow.appendChild(rightStack);

  bentoEl.appendChild(topRow);

  // Case 3: More than 3 items: Build Bottom Grid for remaining cards (Index 3+)
  if (N > 3) {
    const bottomGrid = document.createElement('div');
    bottomGrid.className = 'works-bottom-grid';

    const remainingItems = items.slice(3);
    const R = remainingItems.length;

    remainingItems.forEach((item, idx) => {
      const globalIdx = idx + 3;
      let cardClass = '';

      // If it's the last odd item remaining, make it span full width
      if (R % 2 !== 0 && idx === R - 1) {
        cardClass = 'work-card-full-width';
      }

      bottomGrid.appendChild(buildCompactCard(item, globalIdx, cardClass));
    });

    bentoEl.appendChild(bottomGrid);
  }
}

/**
 * Switches to a new category with animated card exit → enter transition.
 */
async function switchCategory(bentoEl, category) {
  if (_isAnimating || category === _activeCategory) return;
  _isAnimating = true;
  _activeCategory = category;

  const currentCards = bentoEl.querySelectorAll(
    '.work-card-featured, .work-card-compact'
  );

  // 1. Animate existing cards OUT
  if (currentCards.length > 0) {
    currentCards.forEach((card, i) => {
      card.classList.remove('card-entering');
      card.classList.add('card-exiting');
      card.style.animationDelay = `${i * 35}ms`;
    });
    // Wait for exit animation to complete (longest card: ~220ms + stagger)
    await new Promise(resolve =>
      setTimeout(resolve, 220 + currentCards.length * 35)
    );
  }

  // 2. Clear and render new cards
  renderBento(bentoEl, category);

  _isAnimating = false;
}

// ============================================================
//  PROJECT SHEET MODAL
// ============================================================

let _sheetOpen = false;
let _escHandler = null;

/**
 * Opens the immersive slide-up project sheet for a given project.
 */
function openProjectSheet(project) {
  if (_sheetOpen) return;
  _sheetOpen = true;

  const screenshots = project.images || [];
  let carouselIndex = 0;

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

  // --- Build action buttons ---
  const actionButtons = [];
  if (project.demo) {
    actionButtons.push(
      `<a href="${project.demo}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-primary">⚡ Live Demo</a>`
    );
  }
  if (project.repo) {
    actionButtons.push(
      `<a href="${project.repo}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-github">📦 GitHub Repository</a>`
    );
  }
  if (project.video) {
    actionButtons.push(
      `<a href="${project.video}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-video">🎬 Demo Video</a>`
    );
  }
  if (project.ppt) {
    actionButtons.push(
      `<a href="${project.ppt}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-ppt">📊 PPT Presentation</a>`
    );
  }
  if (project.guide) {
    actionButtons.push(
      `<a href="${project.guide}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-guide">📖 Contribution Guide</a>`
    );
  }
  // GitHub fallback if no other link
  if (actionButtons.length === 0 && project.repo) {
    actionButtons.push(
      `<a href="${project.repo}" target="_blank" rel="noopener" class="sheet-action-btn sheet-btn-primary">📦 View Repository</a>`
    );
  }

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
      <div class="sheet-header-meta">
        <div class="sheet-header-category">${project.status}</div>
        <h2 class="sheet-header-title">${project.title}</h2>
        <div class="sheet-header-subtitle">${project.subtitle}</div>
        ${metaTagsHtml ? `<div class="sheet-meta-tags">${metaTagsHtml}</div>` : ''}
      </div>
      <button class="sheet-close-btn" id="sheet-close-btn" aria-label="Close">&#x2715;</button>
    </div>

    <div class="sheet-body">
      <!-- Left: Visuals -->
      <div class="sheet-visuals">
        <div class="sheet-carousel">
          <div class="sheet-carousel-inner" id="sheet-carousel-inner">
            ${carouselImagesHtml}
          </div>
          ${carouselNavHtml}
        </div>
        <div>
          <div class="sheet-tech-section-label">Tech Stack</div>
          <div class="sheet-tech-cloud">${techCloud}</div>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="sheet-details">
        <div>
          <div class="sheet-section-label">${project.guide ? 'Contribution Target' : 'My Role'}</div>
          <p class="sheet-role-text">${project.role}</p>
        </div>
        <div>
          <div class="sheet-section-label">Specifications & Impact</div>
          <ul class="sheet-feature-list">${featureList}</ul>
        </div>
        ${actionButtons.length > 0 ? `
        <div class="sheet-actions-section">
          <div class="sheet-section-label">Links</div>
          ${actionButtons.join('')}
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

    btnPrev.addEventListener('click', e => { e.stopPropagation(); showSlide(carouselIndex - 1); });
    btnNext.addEventListener('click', e => { e.stopPropagation(); showSlide(carouselIndex + 1); });
    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        e.stopPropagation();
        showSlide(parseInt(dot.getAttribute('data-idx'), 10));
      });
    });
  }

  // --- Close logic ---
  function closeSheet() {
    if (!_sheetOpen) return;
    backdrop.classList.add('closing');
    sheet.classList.add('closing');

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

function initWorksSection() {
  const worksSection = document.getElementById('works');
  if (!worksSection) return;

  const tabBtns = document.querySelectorAll('.works-tab-btn');
  const bentoEl = document.getElementById('works-bento');
  if (!bentoEl) return;

  // Render initial category
  renderBento(bentoEl, 'projects');
  _activeCategory = 'projects';

  // Tab click handlers — smooth crossfade transition
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-tab');
      if (category === _activeCategory || _isAnimating) return;

      // Update active state on buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Animate switch
      switchCategory(bentoEl, category);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWorksSection();
});
