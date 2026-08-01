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
      timeline: "May 2026 – July 2026",
      role: "Full-Stack Developer & AI Integrator",
      roleTitle: "Full-Stack Developer & AI Integrator",
      roleDetails: "Sole designer & developer of Featherless.ai LLM integration, live candidate skill-gap heatmaps, and blind bias-scrubbing algorithms.",
      metrics: [
        { value: "100%", label: "Explainable AI" },
        { value: "Live", label: "Multi-Source Feed" },
        { value: "Blind", label: "Bias Scrubbing" }
      ],
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
      timeline: "Feb 2026 – Apr 2026",
      role: "Creator & Solo Developer",
      roleTitle: "Creator & Solo Developer",
      roleDetails: "Engineered Chrome Extension API background workers, GitHub API OAuth pipeline, and Firebase real-time leaderboards.",
      metrics: [
        { value: "5+", label: "Active Users" },
        { value: "3", label: "Platforms Synced" },
        { value: "100%", label: "Client Security" }
      ],
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
      timeline: "Upcoming 2026",
      role: "Solo Architect",
      roleTitle: "Solo Architect & Product Designer",
      roleDetails: "Designing emotional memory models, multi-modal reaction image generators, and ambient vibe trackers.",
      metrics: [
        { value: "Relational", label: "AI Ecosystem" },
        { value: "Multi-Modal", label: "Personas" },
        { value: "Web Audio", label: "Vibe Engine" }
      ],
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
      timeline: "June 2026 · National Hackathon",
      role: "Solo Architect & Developer",
      roleTitle: "Solo Architect & Full-Stack Developer",
      roleDetails: "Built an event-driven system of 15+ agents over Google Cloud Pub/Sub, Monte Carlo path simulator, and Gemini Calendar sync out of 3,000+ competitors.",
      metrics: [
        { value: "3,000+", label: "Solo Competitors" },
        { value: "15+", label: "Pub/Sub Agents" },
        { value: "Monte Carlo", label: "Predictive Risk Engine" }
      ],
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
      timeline: "Apr 2026 – May 2026",
      role: "Solo Project (parth.builds community)",
      roleTitle: "Solo Creator & Full-Stack Developer",
      roleDetails: "Designed complete academic command center, Web Audio environmental sound synthesizer, and Base64 Firestore document vault.",
      metrics: [
        { value: "🏆 1st", label: "UniMerge 1.0 Winner" },
        { value: "Native", label: "Web Audio Engine" },
        { value: "Zero-Cost", label: "Firestore Vault" }
      ],
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
      timeline: "May 2026 · Global Challenge",
      role: "Core Developer (Team of 4)",
      roleTitle: "Core Full-Stack & AI Developer",
      roleDetails: "Engineered Firebase Realtime Database sub-200ms coordinates sync and Gemini AI emergency triage classifier.",
      metrics: [
        { value: "3,000+", label: "Global Competitors" },
        { value: "<200ms", label: "Sub-Second Event Sync" },
        { value: "<3s", label: "Gemini AI Triage" }
      ],
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
      timeline: "June 2026 · Global Arena",
      role: "Lead Systems Architect & UI Developer",
      roleTitle: "Lead Systems Architect & UI Developer",
      roleDetails: "Built 3D R3F/Three.js Earth atmospheric shaders, WebGL instanced rendering for 500+ orbiters, and SGP4 TLE orbital propagator.",
      metrics: [
        { value: "11,000+", label: "Teams Participating" },
        { value: "60 FPS", label: "WebGL Instanced Engine" },
        { value: "500+", label: "Active Orbiters" }
      ],
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
      timeline: "July 2026 · Syrus Hackathon",
      role: "Solo Frontend & Integrations Architect",
      roleTitle: "Solo Frontend & Integrations Architect",
      roleDetails: "Engineered Next.js 16 App Router interface, local Node.js system verification agent, and HR analytics dashboard.",
      metrics: [
        { value: "Team AlgoMinds", label: "Syrus Hackathon" },
        { value: "Real-time", label: "Local Agent Checks" },
        { value: "Copilot", label: "Gemini Onboarding AI" }
      ],
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
      timeline: "Early 2026 · Core Contributor",
      role: "9 Merged Pull Requests",
      roleTitle: "Open Source Contributor",
      roleDetails: "Authored 9 pull requests configuring Outlook OAuth2/IMAP integrations, Prisma database schemas, and BullMQ background task workers.",
      metrics: [
        { value: "9", label: "Merged Backend PRs" },
        { value: "OAuth2", label: "IMAP & Mail Parser" },
        { value: "Prisma", label: "PostgreSQL & Docker" }
      ],
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
      timeline: "Early 2026",
      role: "Merged Translation Fix",
      roleTitle: "Open Source Contributor",
      roleDetails: "Escaped angle brackets inside Lingala translation strings, resolving a layout parser issue in standard directory registration.",
      metrics: [
        { value: "Merged", label: "Pull Request" },
        { value: "Fix", label: "Parser Bug" },
        { value: "Git Flow", label: "Standard Onboarding" }
      ],
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
      timeline: "Target 2027",
      role: "Target Organization",
      roleTitle: "Prospective GSoC Contributor",
      roleDetails: "Studying Apache Maven build core, Tomcat/Kafka messaging networks, and ShardingSphere transaction connectors.",
      metrics: [
        { value: "Target", label: "GSoC 2027 Org" },
        { value: "Java", label: "Enterprise Stack" },
        { value: "Maven", label: "Tomcat & Kafka" }
      ],
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
      timeline: "Target 2027",
      role: "Target Organization",
      roleTitle: "Prospective GSoC Contributor",
      roleDetails: "Studying Java Development Tools (JDT) compiler parser scripts, OSGi microservices, and Eclipse Collections API.",
      metrics: [
        { value: "Target", label: "GSoC 2027 Org" },
        { value: "IDE", label: "Tooling & Compiler" },
        { value: "Jakarta", label: "EE Microservices" }
      ],
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
      timeline: "Target 2027",
      role: "Target Organization",
      roleTitle: "Prospective GSoC Contributor",
      roleDetails: "Analyzing Jenkins lifecycle servers, Groovy-based pipeline script parsers, and YAML Configuration as Code (JCasC).",
      metrics: [
        { value: "Target", label: "GSoC 2027 Org" },
        { value: "DevOps", label: "CI/CD Pipeline" },
        { value: "Groovy", label: "Plugin Architecture" }
      ],
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
      timeline: "Target 2027",
      role: "Target Organization",
      roleTitle: "Prospective GSoC Contributor",
      roleDetails: "Reviewing patient record database schema engines, Spring Boot REST controllers, and Hibernate ORM interceptors.",
      metrics: [
        { value: "Target", label: "GSoC 2027 Org" },
        { value: "Spring", label: "REST & Hibernate" },
        { value: "Health", label: "Patient Modules" }
      ],
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
//  CONSTELLATION ENGINE — Refined
// ============================================================

const CATEGORY_META = {
  projects:   { label: 'Products',      icon: '📦' },
  hackathons: { label: 'Competitions',  icon: '🏆' },
  opensource: { label: 'Contributions', icon: '🌱' }
};

/**
 * Tech-stack → color token map.
 * Returns { bg, color, border } for a given tech string.
 */
function getTechColor(tech) {
  const t = (tech || '').toLowerCase();
  if (t.includes('next.js') || t.includes('nextjs'))
    return { bg: 'rgba(0,0,0,0.06)',      color: '#111111', border: 'rgba(0,0,0,0.12)' };
  if (t.includes('react'))
    return { bg: 'rgba(6,182,212,0.10)',  color: '#0891b2', border: 'rgba(6,182,212,0.22)' };
  if (t.includes('flutter'))
    return { bg: 'rgba(2,132,199,0.10)',  color: '#0284c7', border: 'rgba(2,132,199,0.22)' };
  if (t.includes('python'))
    return { bg: 'rgba(14,162,113,0.10)', color: '#0ea271', border: 'rgba(14,162,113,0.22)' };
  if (t.includes('java') && !t.includes('javascript'))
    return { bg: 'rgba(249,115,22,0.10)', color: '#ea6c0a', border: 'rgba(249,115,22,0.22)' };
  if (t.includes('node') || t.includes('node.js'))
    return { bg: 'rgba(34,197,94,0.10)',  color: '#16a34a', border: 'rgba(34,197,94,0.22)' };
  if (t.includes('javascript') || t.includes('js'))
    return { bg: 'rgba(234,179,8,0.10)',  color: '#a16207', border: 'rgba(234,179,8,0.22)' };
  if (t.includes('mern') || t.includes('mongo'))
    return { bg: 'rgba(59,130,246,0.10)', color: '#3b82f6', border: 'rgba(59,130,246,0.22)' };
  if (t.includes('git') && !t.includes('github'))
    return { bg: 'rgba(75,85,99,0.10)',   color: '#4b5563', border: 'rgba(75,85,99,0.20)' };
  if (t.includes('github'))
    return { bg: 'rgba(15,15,15,0.08)',   color: '#111111', border: 'rgba(0,0,0,0.15)' };
  if (t.includes('typescript'))
    return { bg: 'rgba(59,130,246,0.10)', color: '#2563eb', border: 'rgba(59,130,246,0.22)' };
  // default: emerald
  return { bg: 'rgba(14,162,113,0.10)',   color: '#0ea271', border: 'rgba(14,162,113,0.22)' };
}

/**
 * Picks the primary badge text for a node card.
 */
function getNodeBadge(item, category) {
  if (item.status && item.status.toLowerCase().includes('winner'))
    return { text: 'Winner 🏆', color: '#b45309', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)' };
  if (item.status && item.status.toLowerCase().includes('shortlist'))
    return { text: 'Shortlisted Top 6', color: '#6366f1', bg: 'rgba(99,102,241,0.10)', border: 'rgba(99,102,241,0.22)' };
  return { text: '', color: '', bg: '', border: '' };
}

/* ── Master Constellation RAF Loop Controller ───────────── */
class WorkshopMasterLoop {
  constructor(constellation) {
    this.constellation = constellation;
    this.rafId = null;
    this.isRunning = false;
    this.startTime = Date.now();

    this._initObserver();
  }

  _initObserver() {
    const section = document.getElementById('works');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          this.stop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(section);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      if (!this.isRunning) return;
      this.constellation.updateFrame(Date.now() - this.startTime);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

/**
 * WorkshopConstellation
 * Positions project card nodes in an elliptical orbit around Taesu,
 * draws SVG arcs with correct pixel coordinates, and handles category switching.
 */
class WorkshopConstellation {
  constructor(stageEl, svgEl, taesuWrapEl, taesuCtrl) {
    this.stage     = stageEl;
    this.svg       = svgEl;
    this.taesuWrap = taesuWrapEl;
    this.taesu     = taesuCtrl;
    this.activeCategory = 'projects';
    this.nodes = [];
    this.nodeData = [];
    this.isAnimating = false;

    this.masterLoop = new WorkshopMasterLoop(this);
  }

  /* ── Stage geometry ──────────────────────────────────── */
  _geo() {
    const rect = this.stage.getBoundingClientRect();
    const W = this.stage.offsetWidth || rect.width || 850;
    const H = this.stage.offsetHeight || rect.height || 600;
    const cx = W / 2;
    const cy = H / 2;
    return { W, H, cx, cy };
  }

  /* ── Elliptical orbit positions ──────────────────────── */
  _positions(count) {
    const startAngles = {
      projects:   -Math.PI / 2,
      hackathons: -Math.PI / 3,
      opensource: -Math.PI / 2
    };
    const start = startAngles[this.activeCategory] || -Math.PI / 2;

    return Array.from({ length: count }, (_, i) => {
      const angle = start + (2 * Math.PI * i) / count;
      return {
        angle,
        phase: i * 0.85
      };
    });
  }

  /* ── SVG arcs — orbital ring + spoke lines ────────────── */
  _drawArcs(positions) {
    const { W, H, cx, cy } = this._geo();

    this.svg.setAttribute('width',   W);
    this.svg.setAttribute('height',  H);
    this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

    if (positions.length === 0) return;
    const { rx, ry } = positions[0];

    // ── Orbital ellipse ring ──
    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('cx', cx);
    ellipse.setAttribute('cy', cy);
    ellipse.setAttribute('rx', rx);
    ellipse.setAttribute('ry', ry);
    ellipse.setAttribute('fill', 'none');
    ellipse.setAttribute('stroke', '#0ea271');
    ellipse.setAttribute('stroke-width', '1');
    ellipse.setAttribute('stroke-dasharray', '3 9');
    ellipse.setAttribute('opacity', '0.20');
    ellipse.id = 'constellation-orbit-ring';
    this.svg.appendChild(ellipse);

    // ── Spoke lines: center → each node ──
    positions.forEach((pos, i) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx);
      line.setAttribute('y1', cy);
      line.setAttribute('x2', pos.baseX);
      line.setAttribute('y2', pos.baseY);
      line.setAttribute('stroke', '#0ea271');
      line.setAttribute('stroke-width', '0.9');
      line.setAttribute('stroke-dasharray', '3 7');
      line.setAttribute('opacity', '0.14');
      line.id = `spoke-line-${i}`;
      this.svg.appendChild(line);
    });
  }

  /* ── Position Taesu at stage center ──────────────────── */
  _placeTaesu() {
    const { cx, cy } = this._geo();
    // TaesuWrap is 174px wide. Ceramic sphere (152px) center is at (87px, 76px) relative to wrap top-left.
    this.taesuWrap.style.left = (cx - 87) + 'px';
    this.taesuWrap.style.top  = (cy - 76) + 'px';
    this.taesuWrap.style.pointerEvents = 'auto';
  }

  /* ── Launch Traveling Energy Particle (●) ───────────────── */
  _launchEnergyParticle(startX, startY) {
    const { cx, cy } = this._geo();
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    particle.setAttribute('r', '3.5');
    particle.setAttribute('fill', '#0ea271');
    particle.setAttribute('opacity', '0.9');
    particle.style.filter = 'drop-shadow(0 0 4px #0ea271)';
    this.svg.appendChild(particle);

    const startTime = Date.now();
    const duration = 450;

    const anim = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      const px = startX + (cx - startX) * ease;
      const py = startY + (cy - startY) * ease;

      particle.setAttribute('cx', px);
      particle.setAttribute('cy', py);

      if (progress < 1) {
        requestAnimationFrame(anim);
      } else {
        particle.remove();
      }
    };
    requestAnimationFrame(anim);
  }

  /* ── Build a single node card element ────────────────── */
  _buildNode(item, category, i, pos) {
    const badge     = getNodeBadge(item, category);
    const techColor = getTechColor(item.tech[0] || '');
    const imgSrc    = item.images && item.images[0] ? encodeAssetPath(item.images[0]) : '';
    const delay     = i * 60;

    const node = document.createElement('div');
    node.className = 'project-node';
    node.setAttribute('data-id', item.id);
    node.style.left           = pos.baseX + 'px';
    node.style.top            = pos.baseY + 'px';
    node.style.animationDelay = delay + 'ms';

    if (this.taesu && this.taesu.visitedProjects.has(item.id)) {
      node.classList.add('visited');
    }

    const floatLabel = item.tech[0] ? `
      <span class="node-tech-float" style="
        background:${techColor.bg};
        color:${techColor.color};
        border:1px solid ${techColor.border};
      ">${item.tech[0]}</span>` : '';

    const accentBg = item.accent
      ? `rgba(${item.accentRgb || '14,162,113'},0.12)`
      : 'rgba(14,162,113,0.10)';

    const iconHtml = imgSrc
      ? `<div class="node-icon" style="background:${accentBg};">
           <img src="${imgSrc}" alt="${item.title}" loading="lazy">
         </div>`
      : `<div class="node-icon" style="background:${accentBg}; font-size:1.3rem; display:flex; align-items:center; justify-content:center;">
           ${category === 'hackathons' ? '🏆' : category === 'opensource' ? '🌱' : '📦'}
         </div>`;

    const badgeHtml = badge.text ? `
      <span class="node-badge" style="
        color:${badge.color};
        background:${badge.bg};
        border-color:${badge.border};
      ">${badge.text}</span>` : '';

    node.innerHTML = `
      ${floatLabel}
      ${iconHtml}
      <div class="node-title">${item.title}</div>
      <div class="node-subtitle">${item.subtitle}</div>
      ${badgeHtml}
    `;

    node.addEventListener('mouseenter', () => {
      const nodeX = parseFloat(node.style.left) || pos.baseX;
      const nodeY = parseFloat(node.style.top) || pos.baseY;

      this._launchEnergyParticle(nodeX, nodeY);

      const visitedEls = this.stage.querySelectorAll('.project-node.visited');
      if (visitedEls.length > 0 && this.taesu) {
        const randomVisited = visitedEls[Math.floor(Math.random() * visitedEls.length)];
        if (randomVisited !== node) {
          this.taesu.performRecall(randomVisited);
        }
      }
    });

    node.addEventListener('click', () => {
      node.classList.add('visited');
      if (this.taesu) {
        this.taesu.visitedProjects.add(item.id);
        const rect = node.getBoundingClientRect();
        this.taesu.flyAlongside(rect, () => openProjectSheet(item));
      } else {
        openProjectSheet(item);
      }
    });

    return node;
  }

  /* ── Render all nodes for a category ─────────────────── */
  renderCategory(category) {
    this.activeCategory = category;
    const items = WORKS_DATA[category] || [];

    this.nodes.forEach(n => n.remove());
    this.nodes = [];
    this.nodeData = [];

    this._placeTaesu();

    const positions = this._positions(items.length);
    const { W, H, cx, cy } = this._geo();
    const maxRx = Math.max(220, W / 2 - 110);
    const maxRy = Math.max(160, H / 2 - 85);
    const rx = Math.min(maxRx, W * 0.38);
    const ry = Math.min(maxRy, H * 0.36);

    const fullPositions = positions.map(p => ({
      ...p,
      rx, ry,
      baseX: cx + rx * Math.cos(p.angle),
      baseY: cy + ry * Math.sin(p.angle)
    }));

    this._drawArcs(fullPositions);

    items.forEach((item, i) => {
      const pos = fullPositions[i];
      const node = this._buildNode(item, category, i, pos);
      this.stage.appendChild(node);
      this.nodes.push(node);
      this.nodeData.push({ el: node, pos, item });
    });
  }

  /* ── Single Master RAF Frame Update Loop ─────────────── */
  updateFrame(elapsedMs) {
    if (this.isAnimating || this.nodeData.length === 0) return;

    const { W, H, cx, cy } = this._geo();

    // Dynamically keep Taesu centered
    this.taesuWrap.style.left = (cx - 87) + 'px';
    this.taesuWrap.style.top  = (cy - 76) + 'px';

    const maxRx = Math.max(220, W / 2 - 110);
    const maxRy = Math.max(160, H / 2 - 85);
    const rx = Math.min(maxRx, W * 0.38);
    const ry = Math.min(maxRy, H * 0.36);

    // Solar system constellation breathing scaling (±0.8%)
    const breathScale = 1.0 + 0.008 * Math.sin(elapsedMs / 1200);

    const ringEl = this.svg.querySelector('#constellation-orbit-ring');
    if (ringEl) {
      ringEl.setAttribute('cx', cx);
      ringEl.setAttribute('cy', cy);
      ringEl.setAttribute('rx', rx * breathScale);
      ringEl.setAttribute('ry', ry * breathScale);
    }

    // Weightless floating drift per node (±4px sinusoidal offset)
    this.nodeData.forEach((nd, i) => {
      const driftX = Math.sin(elapsedMs / 1000 + nd.pos.phase) * 4;
      const driftY = Math.cos(elapsedMs / 1150 + nd.pos.phase) * 4;

      const currX = cx + (rx * breathScale) * Math.cos(nd.pos.angle) + driftX;
      const currY = cy + (ry * breathScale) * Math.sin(nd.pos.angle) + driftY;

      nd.el.style.left = currX.toFixed(2) + 'px';
      nd.el.style.top  = currY.toFixed(2) + 'px';

      const line = this.svg.querySelector(`#spoke-line-${i}`);
      if (line) {
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', currX.toFixed(2));
        line.setAttribute('y2', currY.toFixed(2));
      }
    });
  }

  /* ── Graceful Category Switch Sequence ─────────────────── */
  async switchCategory(category) {
    if (this.isAnimating || category === this.activeCategory) return;
    this.isAnimating = true;

    // 0ms: Update Taesu personality & status
    if (this.taesu && typeof this.taesu.setCategoryPersonality === 'function') {
      this.taesu.setCategoryPersonality(category);
    }

    // 150ms: Current constellation nodes gracefully emerge/fade
    this.nodes.forEach(n => n.classList.add('exiting'));
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

    await new Promise(r => setTimeout(r, 280));

    this.nodes.forEach(n => n.remove());
    this.nodes = [];
    this.nodeData = [];

    // 400ms: Gracefully render & emerge new nodes
    this.renderCategory(category);
    this.isAnimating = false;
  }
}

// ============================================================
//  INIT — WORKSHOP
// ============================================================

function initWorkshop() {
  const section    = document.getElementById('works');
  if (!section) return;

  const stage      = document.getElementById('workshop-stage');
  const svgEl      = document.getElementById('constellation-arcs');
  const taesuEl    = document.getElementById('taesu-mascot');
  const taesuWrap  = document.querySelector('.taesu-center-wrap');
  const catBtns    = document.querySelectorAll('.category-btn');
  const activeIconWrap  = document.getElementById('category-active-icon') || document.getElementById('category-active-icon-wrap');
  const activeLabelEl   = document.getElementById('category-active-label');

  if (!stage || !svgEl) return;

  // Boot Taesu behavior controller
  let taesuCtrl = null;
  if (taesuEl && window.TaesuController) {
    taesuCtrl = new window.TaesuController(taesuEl);
  }

  // Build constellation
  const constellation = new WorkshopConstellation(stage, svgEl, taesuWrap, taesuCtrl);
  constellation.renderCategory('projects');

  requestAnimationFrame(() => {
    constellation.renderCategory(constellation.activeCategory);
  });
  window.addEventListener('load', () => {
    constellation.renderCategory(constellation.activeCategory);
  });

  // Resize → redraw
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      constellation.renderCategory(constellation.activeCategory);
    }, 120);
  });

  // Category button clicks
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (!cat) return;

      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const meta = CATEGORY_META[cat];
      if (activeIconWrap && meta) activeIconWrap.textContent = meta.icon;
      if (activeLabelEl  && meta) activeLabelEl.textContent  = meta.label;

      constellation.switchCategory(cat);
    });
  });

  // Stats counter animation
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (statEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    statEls.forEach(el => io.observe(el));
  }

  // Scroll chevron
  const scrollBtn = document.querySelector('.workshop-scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const next = section.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/** Animated counter for stats bar numbers */
function animateCounter(el) {
  const raw   = el.getAttribute('data-target') || '';
  const match = raw.match(/([\d.]+)/);
  if (!match) { el.textContent = raw; return; }
  const end    = parseFloat(match[1]);
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice(match.index + match[1].length);
  const dur    = 1100;
  const t0     = performance.now();
  const isInt  = Number.isInteger(end);

  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (isInt ? Math.floor(end * e) : (end * e).toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => { initWorkshop(); });

window.openProjectSheet = openProjectSheet;
window.WORKS_DATA       = WORKS_DATA;

// ============================================================
//  PROJECT SHEET MODAL
// ============================================================

/** Applies custom accent CSS variables to the project detail sheet */
function applyAccent(sheet, project) {
  if (project.accent) {
    sheet.style.setProperty('--project-accent', project.accent);
  }
  if (project.accentRgb) {
    sheet.style.setProperty('--project-accent-rgb', project.accentRgb);
  }
}

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

  // --- Build Key Metrics Grid ---
  const metricsHtml = (project.metrics && project.metrics.length > 0)
    ? `<div class="sheet-metrics-row">
        ${project.metrics.map(m => `
          <div class="sheet-metric-card">
            <div class="sheet-metric-value">${m.value}</div>
            <div class="sheet-metric-label">${m.label}</div>
          </div>
        `).join('')}
       </div>`
    : '';

  // --- Build My Role & Contributions ---
  const roleCardHtml = `
    <div class="sheet-role-card">
      <div class="sheet-role-header">
        <span class="sheet-role-title">👤 ${project.roleTitle || project.role}</span>
        ${project.timeline ? `<span class="sheet-timeline-tag">📅 ${project.timeline}</span>` : ''}
      </div>
      ${project.roleDetails ? `<p class="sheet-role-details">${project.roleDetails}</p>` : ''}
    </div>
  `;

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
      <!-- Left: Visuals & Metadata -->
      <div class="sheet-visuals">
        <div class="sheet-carousel">
          <div class="sheet-carousel-inner" id="sheet-carousel-inner">
            ${carouselImagesHtml}
          </div>
          ${carouselNavHtml}
        </div>
        
        <div class="sheet-left-meta">
          <div class="sheet-meta-group">
            <div class="sheet-section-label">Status & Timeline</div>
            <div class="sheet-status-badge">${project.status}</div>
          </div>

          <div class="sheet-meta-group">
            <div class="sheet-tech-section-label">Tech Stack</div>
            <div class="sheet-tech-cloud">${techCloud}</div>
          </div>
        </div>
      </div>

      <!-- Right: Key Metrics, My Role & Detailed Specifications -->
      <div class="sheet-details">
        ${metricsHtml}

        <div class="sheet-role-section">
          <div class="sheet-section-label">My Role & Contributions</div>
          ${roleCardHtml}
        </div>

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

    // Pause autoplay on hover
    const carousel = sheet.querySelector('.sheet-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }

    // Keyboard arrow navigation while sheet is open
    const _arrowHandler = (e) => {
      if (e.key === 'ArrowLeft') { showSlide(carouselIndex - 1); startAutoplay(); }
      if (e.key === 'ArrowRight') { showSlide(carouselIndex + 1); startAutoplay(); }
    };
    document.addEventListener('keydown', _arrowHandler);

    // Store reference so it can be cleaned up on sheet close
    sheet._arrowHandler = _arrowHandler;
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
      // Clean up keyboard arrow handler if present
      if (sheet._arrowHandler) {
        document.removeEventListener('keydown', sheet._arrowHandler);
      }
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


