/**
 * Krishna Sahoo Portfolio - Works Section JavaScript
 * Implements the Clean, Professional Exhibition Grid & Split Modal.
 */

// Comprehensive database of Projects, Hackathons, and Open-Source Contributions
const WORKS_DATA = {
  projects: [
    {
      id: "hiremind",
      title: "HireMind",
      subtitle: "AI-Powered Explainable Hiring Intelligence",
      tagline: "Transform hiring from black-box resume screening to explainable, multi-source talent intelligence.",
      status: "Completed (Summer Hackathon 2026)",
      role: "Full-Stack Developer & AI Integrator",
      tech: ["React", "TypeScript", "Tailwind CSS", "Express.js", "Firebase", "Socket.io", "Featherless.ai (LLM)"],
      repo: "https://github.com/krishnasahoo11156/HireMind",
      demo: "https://hire-mind-client.vercel.app/",
      accent: "#8e75b2",
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
      status: "Completed (Used by 5+ Active Users)",
      role: "Creator & Solo Developer",
      tech: ["JavaScript (ES6)", "HTML5", "CSS3", "Chrome Extension API", "GitHub API", "Firebase DB"],
      repo: "https://github.com/krishnasahoo11156/Code2Git",
      accent: "#f1c40f",
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
      status: "Upcoming (Concept & Design Stage)",
      role: "Solo Architect",
      tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Web Audio API", "Stable Diffusion", "Firebase"],
      accent: "#00b894",
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
      status: "Vibe2Ship Hackathon (Solo Project)",
      role: "Solo Architect & Developer",
      tech: ["Next.js 14", "Tailwind CSS", "TypeScript", "Node.js", "Express", "Docker", "Google Cloud Run", "Gemini API", "Pub/Sub"],
      repo: "https://github.com/krishnasahoo11156/foresee-app-2026",
      demo: "https://foresee-app-827856108785.us-central1.run.app/",
      accent: "#00f2fe",
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
      status: "🏆 Winner - UniMerge 1.0",
      role: "Solo Project (parth.builds community)",
      tech: ["React.js (Vite)", "Tailwind CSS", "React Router", "Web Audio API", "Firebase DB & Auth"],
      repo: "https://github.com/krishnasahoo11156/StudySync",
      demo: "https://study-sync-eosin-seven.vercel.app/",
      video: "https://drive.google.com/file/d/1EFEZ7JUcr8pwHhUq5ElBZvno3VPz67He/view?usp=sharing",
      accent: "#2ecc71",
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
      status: "Google Solution Challenge (Team Project)",
      role: "Core Developer (Team of 4)",
      tech: ["Flutter", "Dart", "Firebase", "Gemini AI", "Google Maps API", "Docker", "Nginx"],
      repo: "https://github.com/krishnasahoo11156/crisissync",
      accent: "#e74c3c",
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
      status: "Syrus Hackathon (Team Project)",
      role: "Solo Frontend & Integrations Architect",
      tech: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS 4", "Gemini AI", "NextAuth", "Chart.js"],
      repo: "https://github.com/krishnasahoo11156/crisissync",
      video: "https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link",
      ppt: "https://drive.google.com/drive/folders/1f5uDXGoUeDgz4zbZQjtp_dPNcljTUiS-?usp=drive_link",
      accent: "#a55eea",
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

function initWorksSection() {
  const worksSection = document.getElementById('works');
  if (!worksSection) return;

  const tabBtns = document.querySelectorAll('.works-tab-btn');
  const gridContainer = document.getElementById('works-grid');
  
  // Render cards for the active category
  function renderCategory(category) {
    gridContainer.innerHTML = '';
    const items = WORKS_DATA[category] || [];
    
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.style.setProperty('--project-accent', item.accent);
      card.style.setProperty('--card-index', index);
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-category', category);
      
      // Escape spaces in image filename URL to prevent loading issues in CSS background
      const escapedImageUrl = item.images && item.images.length > 0 
        ? item.images[0].replace(/ /g, '%20')
        : '';
        
      const imageMarkup = escapedImageUrl 
        ? `<div class="work-card-image" style="background-image: url('${escapedImageUrl}')"></div>`
        : `<div class="work-card-image placeholder-sketch"><div class="sketch-lines"></div></div>`;
      
      // Select meta badge to show at the top of the card
      const topBadge = item.metaTags && item.metaTags.length > 0 ? item.metaTags[0] : item.status;

      card.innerHTML = `
        ${imageMarkup}
        <div class="work-card-content">
          <div class="work-card-meta">
            <span class="work-card-status">${item.status}</span>
            <span class="work-card-badge-highlight" style="border-color: ${item.accent}; color: ${item.accent};">${topBadge}</span>
          </div>
          <h3 class="work-card-title">${item.title}</h3>
          <p class="work-card-tagline">${item.tagline}</p>
          <div class="work-card-tech-list">
            ${item.tech.slice(0, 3).map(t => `<span class="work-card-tech">${t}</span>`).join('')}
            ${item.tech.length > 3 ? `<span class="work-card-tech-more">+${item.tech.length - 3}</span>` : ''}
          </div>
          <button class="work-card-action">View Details <span class="arrow">&rarr;</span></button>
        </div>
      `;
      
      card.addEventListener('click', () => openDraftingDesk(item));
      gridContainer.appendChild(card);
    });
  }

  // Set up tab events
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-tab');
      renderCategory(category);
    });
  });

  // Render initial tab (projects)
  renderCategory('projects');
}

function openDraftingDesk(project) {
  // Create overlay modal
  const overlay = document.createElement('div');
  overlay.className = 'drafting-overlay';
  overlay.id = 'drafting-desk-modal';
  
  // Carousel images list
  const screenshots = project.images || [];
  let carouselIndex = 0;
  
  const carouselHtml = screenshots.length > 0
    ? `<div class="system-carousel">
         <div class="carousel-inner" id="system-carousel-inner">
           ${screenshots.map((src, index) => `<img src="${src.replace(/ /g, '%20')}" alt="Screenshot ${index + 1}" class="carousel-img ${index === 0 ? 'active' : ''}">`).join('')}
         </div>
         ${screenshots.length > 1 ? `
           <button class="carousel-nav prev" id="carousel-prev">&#x276E;</button>
           <button class="carousel-nav next" id="carousel-next">&#x276F;</button>
           <div class="carousel-dots">
             ${screenshots.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`).join('')}
           </div>
         ` : ''}
       </div>`
    : `<div class="system-carousel placeholder-system">
         <div class="matrix-code">SYSTEM ASSET RECORD SECURE</div>
       </div>`;

  const techBadges = project.tech.map(t => `<span class="badge">${t}</span>`).join('');
  const detailsHtml = project.details.map(detail => `<li>${detail}</li>`).join('');
  
  // Build professional links action cockpit
  const repoLink = project.repo ? `<a href="${project.repo}" target="_blank" class="desk-btn btn-github">📦 GitHub Repository</a>` : '';
  const demoLink = project.demo ? `<a href="${project.demo}" target="_blank" class="desk-btn btn-demo">⚡ Live Simulation</a>` : '';
  const videoLink = project.video ? `<a href="${project.video}" target="_blank" class="desk-btn btn-video">🎬 Demo Video</a>` : '';
  const pptLink = project.ppt ? `<a href="${project.ppt}" target="_blank" class="desk-btn btn-ppt">📊 PPT Presentation</a>` : '';
  const guideLink = project.guide ? `<a href="${project.guide}" target="_blank" class="desk-btn btn-guide">📖 Contribution Guide</a>` : '';

  // Setup overlay markup with transparent overlay header and split dark/light contents (Dark on Left, Light on Right)
  overlay.innerHTML = `
    <div class="drafting-container" style="--project-accent: ${project.accent}">
      
      <!-- Overlay transparent header running over both halves (Dark on Left, Light on Right) -->
      <div class="drafting-header-overlay">
        <!-- Falls over the left dark column: light text -->
        <div class="modal-left-header-title">
          <span class="category-indicator">${project.status}</span>
          <h2 class="project-title">${project.title}</h2>
        </div>
        <!-- Falls over the right light column: dark text close button -->
        <button class="drafting-close-btn" id="close-drafting-desk">&times;</button>
      </div>

      <!-- Main Exhibition Area (Technical ledger layout) -->
      <div class="drafting-workspace">
        <div class="system-content-area-split">
          
          <!-- LEFT SIDE: Visual Gallery (Dark Theme - matching hero right side) -->
          <div class="system-visuals-dark">
            <div class="visuals-content-wrapper">
              ${carouselHtml}
              <div class="system-tech-badges-dark">
                ${techBadges}
              </div>
            </div>
          </div>
          
          <!-- RIGHT SIDE: Details & Actions (Light Theme - matching hero left side) -->
          <div class="system-meta-details-light">
            <div class="details-content-wrapper">
              <div class="meta-section">
                <h4>${project.guide ? 'CONTRIBUTION TARGET' : 'ARCHITECT ROLE'}</h4>
                <p class="role-text-desc">${project.role}</p>
              </div>
              
              <div class="meta-section">
                <h4>SPECIFICATIONS & IMPACT</h4>
                <ul class="system-specs-list-light">
                  ${detailsHtml}
                </ul>
              </div>
              
              <div class="meta-actions">
                ${repoLink}
                ${demoLink}
                ${videoLink}
                ${pptLink}
                ${guideLink}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden'; // Lock background scroll

  const btnClose = overlay.querySelector('#close-drafting-desk');

  // Carousel navigation (System layer)
  if (screenshots.length > 1) {
    const carInner = overlay.querySelector('#system-carousel-inner');
    const imgs = overlay.querySelectorAll('.carousel-img');
    const dots = overlay.querySelectorAll('.carousel-dot');
    const btnPrev = overlay.querySelector('#carousel-prev');
    const btnNext = overlay.querySelector('#carousel-next');

    function showImage(idx) {
      carouselIndex = (idx + screenshots.length) % screenshots.length;
      imgs.forEach((img, i) => img.classList.toggle('active', i === carouselIndex));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === carouselIndex));
    }

    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(carouselIndex - 1);
    });

    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(carouselIndex + 1);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute('data-idx'));
        showImage(idx);
      });
    });
  }

  // Close overlay modal
  function closeModal() {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = ''; // Unlock scroll
    }, 300);
  }

  btnClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

// Initialise on load
document.addEventListener('DOMContentLoaded', () => {
  initWorksSection();
});
