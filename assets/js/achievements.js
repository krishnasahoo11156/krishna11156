/**
 * Krishna Sahoo Portfolio – Achievements Section JS (Conveyor Belt)
 * Dual-axis infinite conveyor rows, scroll velocity acceleration, magnetic hovers, and portal zoom details.
 */

// ============================================================
//  ACHIEVEMENTS DATASET
// ============================================================

const ACHIEVEMENTS_DATA = [
  // ROW 1: Slides Left
  {
    id: "unimerge-win",
    row: 1,
    filterKey: "hackathon",
    category: "🏆 Hackathon Winner",
    title: "Winner — UniMerge 1.0 (StudySync)",
    issuer: "parth.builds Developer Community",
    date: "April 2026",
    desc: "Awarded 1st place in the UniMerge 1.0 Hackathon for designing StudySync—an academic dashboard running a dynamic Web Audio synthesis system to generate native environmental soundscapes.",
    tech: ["React.js", "Tailwind CSS", "Web Audio API", "Firebase DB & Auth"],
    image: "sources/certificates/unimergecertificate.png",
    verifyUrl: "https://github.com/krishnasahoo11156/StudySync",
    accent: "#2ecc71"
  },
  {
    id: "aws-devops-cert",
    row: 1,
    filterKey: "cloud",
    category: "☁️ Cloud & Infrastructure",
    title: "Fundamentals of DevOps on AWS",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2026",
    desc: "Verified expertise in configuring cloud architectures, automating deployments via AWS pipelines, designing continuous integration (CI/CD) environments, and security configurations.",
    tech: ["AWS EC2", "AWS CodePipeline", "IAM Policies", "CloudWatch"],
    image: "sources/certificates/fundamentals of devops on aws.png",
    verifyUrl: "https://aws.amazon.com/",
    accent: "#f1c40f"
  },
  {
    id: "cn-hackaithon",
    row: 1,
    filterKey: "hackathon",
    category: "🏆 National Hackathon Win",
    title: "Coding Ninjas Hackaithon (ForeSee)",
    issuer: "Coding Ninjas & Google for Developers",
    date: "June 2026",
    desc: "Built ForeSee, a predictive calendar tool incorporating Monte Carlo task simulations and event-driven agents coordinating over Pub/Sub, competing against 3,000+ developers.",
    tech: ["Next.js 14", "Google Cloud Pub/Sub", "Monte Carlo Simulator", "Docker"],
    image: "sources/certificates/hackaithoncertificate.png",
    verifyUrl: "https://github.com/krishnasahoo11156/foresee-app-2026",
    accent: "#00f2fe"
  },
  {
    id: "gcp-pubsub",
    row: 1,
    filterKey: "cloud",
    category: "🛠️ Google Cloud Badge",
    title: "Get Started with Pub/Sub",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Validated operational competence in configuring Google Cloud Pub/Sub message topics, handling subscriptions, push/pull configurations, and orchestrating events.",
    tech: ["Google Cloud Pub/Sub", "Google Cloud Functions", "Event Architectures"],
    image: "sources/certificates/get-started-with-pub-sub-skill-badge.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#0984e3"
  },
  {
    id: "gcp-networking",
    row: 1,
    filterKey: "cloud",
    category: "🛡️ Google Cloud Badge",
    title: "Set Up a Google Cloud Network",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Earned Google Cloud skill badge verifying VPS architectures, subnetting layouts, firewall configurations, and external load balancing policies.",
    tech: ["VPC Networks", "Firewall Rules", "GCP Load Balancers"],
    image: "sources/certificates/set-up-a-google-cloud-network-skill-badge.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#1abc9c"
  },
  {
    id: "gcp-compute",
    row: 1,
    filterKey: "cloud",
    category: "💻 Google Cloud Badge",
    title: "The Basics of Google Cloud Compute",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Certified in creating virtual machines, configuring Kubernetes engine deployments (GKE), managing persistent disks, and auto-scaling server configurations.",
    tech: ["Google Compute Engine", "Google Kubernetes Engine (GKE)", "Docker Containers"],
    image: "sources/certificates/the-basics-of-google-cloud-compute-skill-badge.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#3498db"
  },
  {
    id: "gcp-partner",
    row: 1,
    filterKey: "cloud",
    category: "☁️ Google Cloud Badge",
    title: "Google Cloud Partner Training Credentials",
    issuer: "Google Cloud",
    date: "July 2026",
    desc: "Verified foundational cloud business knowledge, enterprise integration strategies, and core GCP infrastructure capabilities.",
    tech: ["GCP Infrastructure", "Enterprise Cloud Services", "Partner Systems"],
    image: "sources/certificates/image.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#6c5ce7"
  },

  // ROW 2: Slides Right
  {
    id: "syrus-hackathon",
    row: 2,
    filterKey: "hackathon",
    category: "🚀 Hackathon Sprint",
    title: "Codecell's Syrus Hackathon Onboarding",
    issuer: "Codecell Committee · VESIT",
    date: "June 2026",
    desc: "Designed and implemented an AI-powered conversational employee onboarding platform utilizing local Node.js system setup monitors to automate developer environment verification.",
    tech: ["Next.js (App Router)", "TypeScript", "Tailwind CSS 4", "Gemini AI API"],
    image: "sources/certificates/codecell's-syrus-hackathon.png",
    verifyUrl: "https://github.com/krishnasahoo11156/crisissync",
    accent: "#a55eea"
  },
  {
    id: "gemini-streamlit",
    row: 2,
    filterKey: "cloud",
    category: "🧠 Generative AI Systems",
    title: "Develop GenAI Apps with Gemini",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Earned Google Cloud skill badge validating competencies in orchestrating prompt contexts, designing Streamlit frontends, and connecting generative LLM APIs.",
    tech: ["Gemini Pro API", "Streamlit", "Python", "Google Cloud Console"],
    image: "sources/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#8e75b2"
  },
  {
    id: "gcp-prompt",
    row: 2,
    filterKey: "cloud",
    category: "🤖 AI Engineering",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Certified in building and evaluating prompts on Vertex AI, parameter tuning (temperature, top-k/top-p), and managing text and multimodal inference structures.",
    tech: ["Vertex AI Model Builder", "Prompt Engineering", "Multimodal LLMs", "Inference Controls"],
    image: "sources/certificates/prompt-design-in-vertex-ai-skill-badge.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#e74c3c"
  },
  {
    id: "gcp-monitoring",
    row: 2,
    filterKey: "cloud",
    category: "📊 Google Cloud Badge",
    title: "Monitoring in Google Cloud",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Google Cloud skill badge validating resource monitoring setups, dashboard construction, alert routing, and system health evaluation using Cloud Logging and Monitoring.",
    tech: ["Cloud Monitoring", "Cloud Logging", "Error Reporting", "Alerting Policies"],
    image: "sources/certificates/monitoring-in-google-cloud-skill-badge.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#e67e22"
  },
  {
    id: "gcp-data",
    row: 2,
    filterKey: "cloud",
    category: "🗄️ Google Cloud Badge",
    title: "Store, Process, and Manage Data on GCP",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Certified in data processing architectures, loading datasets, managing BigQuery pipelines, and administering Cloud Storage and database schemas.",
    tech: ["BigQuery", "Cloud Storage", "Cloud SQL", "Dataproc"],
    image: "sources/certificates/store-process-and-manage-data-on-google-cloud-conso.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#2c3e50"
  },
  {
    id: "gcp-genai-studio",
    row: 2,
    filterKey: "cloud",
    category: "🎨 Google Cloud Badge",
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud Skills Boost",
    date: "July 2026",
    desc: "Verified foundational prompt design, image generation parameters, speech synthesis settings, and playground iterations inside Google Cloud's Generative AI Studio.",
    tech: ["Generative AI Studio", "Imagen Models", "Speech-to-Text", "Model Tuning"],
    image: "sources/certificates/introduction to generative ai studio.png",
    verifyUrl: "https://www.cloudskillsboost.google/",
    accent: "#fd79a8"
  }
];

// ============================================================
//  CONVEYOR ENGINE & RENDERER
// ============================================================

let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let isPortalOpen = false;

// Speed controls
const baseDriftSpeed = 0.85; // Default slow drifting speed
let row1Multiplier = 1;
let row2Multiplier = 1;

let x1 = 0; // Row 1 position (offset)
let x2 = 0; // Row 2 position (offset)

let track1Width = 0;
let track2Width = 0;

function initConveyorSection() {
  const rowLeftTrack = document.getElementById("row-left-track");
  const rowRightTrack = document.getElementById("row-right-track");

  if (!rowLeftTrack || !rowRightTrack) return;

  const row1Data = ACHIEVEMENTS_DATA.filter(ach => ach.row === 1);
  const row2Data = ACHIEVEMENTS_DATA.filter(ach => ach.row === 2);

  // Helper to generate Card HTML
  const createCardHtml = (ach) => `
    <div class="conveyor-card" data-id="${ach.id}" style="--accent-color: ${ach.accent}">
      <div class="card-inspect-hint">Inspect 🔍</div>
      <div class="conveyor-card-inner">
        <div class="conveyor-card-content">
          <div class="conveyor-card-top">
            <span class="conveyor-card-category">${ach.category}</span>
            <h3 class="conveyor-card-title">${ach.title}</h3>
          </div>
          <div class="conveyor-card-bottom">
            <span class="conveyor-card-issuer">${ach.issuer}</span>
            <span class="conveyor-card-date">${ach.date}</span>
          </div>
        </div>
        <div class="conveyor-card-visual">
          <img src="${ach.image}" alt="${ach.title}" class="conveyor-card-img" loading="lazy">
        </div>
      </div>
    </div>
  `;

  // Triple the items inside each track to enable seamless infinite loops
  rowLeftTrack.innerHTML = [...row1Data, ...row1Data, ...row1Data].map(createCardHtml).join("");
  rowRightTrack.innerHTML = [...row2Data, ...row2Data, ...row2Data].map(createCardHtml).join("");

  // Measure single track set sizes after layout loads
  setTimeout(() => {
    const row1Cards = rowLeftTrack.querySelectorAll(".conveyor-card");
    const row2Cards = rowRightTrack.querySelectorAll(".conveyor-card");
    const n1 = row1Data.length;
    const n2 = row2Data.length;

    if (row1Cards.length >= 2 * n1 && row2Cards.length >= 2 * n2) {
      track1Width = row1Cards[n1].offsetLeft - row1Cards[0].offsetLeft;
      track2Width = row2Cards[n2].offsetLeft - row2Cards[0].offsetLeft;
    } else {
      track1Width = rowLeftTrack.scrollWidth / 3;
      track2Width = rowRightTrack.scrollWidth / 3;
    }
    
    // Set initial position for row 2 to offset it backwards
    x2 = -track2Width;
  }, 100);

  // Register interactive triggers
  setupConveyorInteractions();
  setupVelocityTracker();
  setupPortalZoom();

  // Run infinite loop
  requestAnimationFrame(loopConveyors);
}

// Infinite loop tick function
function loopConveyors() {
  const rowLeftTrack = document.getElementById("row-left-track");
  const rowRightTrack = document.getElementById("row-right-track");

  // Keep looping unless modal details are open
  if (!isPortalOpen && rowLeftTrack && rowRightTrack && track1Width > 0 && track2Width > 0) {
    // 1. Friction physics: decay scroll velocity over time
    scrollVelocity *= 0.94;
    if (Math.abs(scrollVelocity) < 0.005) {
      scrollVelocity = 0;
    }

    // 2. Compute movements
    // Row 1 (Moves left: subtract offset)
    const dx1 = (baseDriftSpeed * row1Multiplier) + (scrollVelocity * 0.8);
    x1 -= dx1;
    if (x1 <= -track1Width) {
      x1 += track1Width; // reset position seamlessly when moving left
    } else if (x1 > 0) {
      x1 -= track1Width; // reset position seamlessly when moving right
    }

    // Row 2 (Moves right: add offset)
    const dx2 = (baseDriftSpeed * row2Multiplier) + (scrollVelocity * 0.8);
    x2 += dx2;
    if (x2 >= 0) {
      x2 -= track2Width; // reset position seamlessly when moving right
    } else if (x2 < -track2Width) {
      x2 += track2Width; // reset position seamlessly when moving left
    }

    // 3. Apply CSS Translate
    rowLeftTrack.style.transform = `translate3d(${x1}px, 0, 0)`;
    rowRightTrack.style.transform = `translate3d(${x2}px, 0, 0)`;
  }

  requestAnimationFrame(loopConveyors);
}

// Track velocity on mouse/page scroll
function setupVelocityTracker() {
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Direct scroll speed maps to conveyor velocity
    scrollVelocity += delta * 0.095;

    // Clamp speed to prevent extreme warp jumps on quick mouse wheel spins
    scrollVelocity = Math.max(-18, Math.min(18, scrollVelocity));
  });
}

// ============================================================
//  MAGNETIC & SIBLING HOVER LOGIC
// ============================================================

function setupConveyorInteractions() {
  const cards = document.querySelectorAll(".conveyor-card");

  cards.forEach((card) => {
    const row = card.closest(".conveyor-row");
    const isRow1 = row.classList.contains("row-left");

    card.addEventListener("mouseenter", () => {
      // 1. Pause row drift
      if (isRow1) {
        row1Multiplier = 0;
      } else {
        row2Multiplier = 0;
      }

      // 2. Toggle spotlight/blur classes on siblings
      row.classList.add("has-hovered");
      card.classList.add("hovered");
    });

    card.addEventListener("mousemove", (e) => {
      // Magnetic pull calculations relative to card center
      const rect = card.getBoundingClientRect();
      const mx = (e.clientX - rect.left - rect.width / 2) * 0.16; // magnetic translation pull
      const my = (e.clientY - rect.top - rect.height / 2) * 0.16;

      card.style.setProperty("--mx", `${mx}px`);
      card.style.setProperty("--my", `${my}px`);
    });

    card.addEventListener("mouseleave", () => {
      // 1. Resume row drift
      if (isRow1) {
        row1Multiplier = 1;
      } else {
        row2Multiplier = 1;
      }

      // 2. Remove spotlight/blur classes
      row.classList.remove("has-hovered");
      card.classList.remove("hovered");
      
      card.style.setProperty("--mx", "0px");
      card.style.setProperty("--my", "0px");
    });
  });
}

// ============================================================
//  PORTAL ZOOM OVERLAY CONTROLLER
// ============================================================

function setupPortalZoom() {
  const cards = document.querySelectorAll(".conveyor-card");
  const overlay = document.getElementById("portal-zoom-overlay");
  const closeBtn = document.getElementById("portal-close-btn");
  const lightbox = document.getElementById("portal-lightbox");
  const lightboxImg = document.getElementById("portal-lightbox-img");
  const certImg = document.getElementById("portal-cert-img");

  if (!overlay) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const achId = card.getAttribute("data-id");
      const ach = ACHIEVEMENTS_DATA.find(item => item.id === achId);
      
      if (ach) {
        // Freeze conveyor tracks
        isPortalOpen = true;
        
        // Populate portal contents
        document.getElementById("portal-category-badge").textContent = ach.category;
        document.getElementById("portal-title").textContent = ach.title;
        document.getElementById("portal-issuer").textContent = ach.issuer;
        document.getElementById("portal-date").textContent = ach.date;
        document.getElementById("portal-desc").textContent = ach.desc;
        document.getElementById("portal-cert-img").src = ach.image;
        document.getElementById("portal-cert-img").alt = ach.title;
        
        const verifyBtn = document.getElementById("btn-portal-verify");
        if (verifyBtn) {
          verifyBtn.href = ach.verifyUrl;
        }

        const techPills = ach.tech
          .map(t => `<span class="portal-tech-pill">${t}</span>`)
          .join("");
        document.getElementById("portal-tech-row").innerHTML = techPills;

        // Open Overlay
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Lock page scroll
      }
    });
  });

  // Close Overlay
  const closePortal = () => {
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Unlock page scroll
    
    // Unfreeze conveyor loops after close animation completes
    setTimeout(() => {
      isPortalOpen = false;
    }, 400);
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closePortal);
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePortal();
    }
  });

  // Lightbox zoom triggers
  if (certImg && lightbox && lightboxImg) {
    certImg.addEventListener("click", () => {
      lightboxImg.src = certImg.src;
      lightboxImg.alt = certImg.alt;
      lightbox.classList.add("active");
    });
  }

  // Close Lightbox
  if (lightbox) {
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  // Keyboard escape listeners
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
      } else if (overlay && overlay.classList.contains("active")) {
        closePortal();
      }
    }
  });
}

// ============================================================
//  BOOTSTRAP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initConveyorSection();
  initAchievementsFilter();
});

/**
 * Populates the meta count strip and wires up category filter pills.
 * Cards are hidden/shown via CSS class toggling — the conveyor physics still run.
 */
function initAchievementsFilter() {
  const filterBar = document.getElementById('achievements-filter-bar');
  const metaStrip = document.getElementById('achievements-meta-strip');
  if (!filterBar) return;

  const total = ACHIEVEMENTS_DATA.length;
  const hackathonCount = ACHIEVEMENTS_DATA.filter(a => a.filterKey === 'hackathon').length;
  const cloudCount     = ACHIEVEMENTS_DATA.filter(a => a.filterKey === 'cloud').length;
  const academicCount  = ACHIEVEMENTS_DATA.filter(a => a.filterKey === 'academic').length;
  const opensourceCount = ACHIEVEMENTS_DATA.filter(a => a.filterKey === 'opensource').length;

  // Populate meta count strip
  if (metaStrip) {
    metaStrip.textContent =
      `${total} credentials total  ·  ${hackathonCount} hackathon wins  ·  ${cloudCount} cloud badges`;
  }

  // Filter pills click handler
  const pills = filterBar.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      // Find ALL conveyor cards currently in the DOM and toggle visibility
      const allCards = document.querySelectorAll('.conveyor-card');
      allCards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        const ach = ACHIEVEMENTS_DATA.find(a => a.id === cardId);
        if (!ach) return; // skip cloned cards without unique id match

        if (filter === 'all' || ach.filterKey === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
}
window.addEventListener("resize", () => {
  // Re-measure track widths on window resize
  const rowLeftTrack = document.getElementById("row-left-track");
  const rowRightTrack = document.getElementById("row-right-track");
  if (rowLeftTrack && rowRightTrack) {
    const row1Cards = rowLeftTrack.querySelectorAll(".conveyor-card");
    const row2Cards = rowRightTrack.querySelectorAll(".conveyor-card");
    const row1Data = ACHIEVEMENTS_DATA.filter(ach => ach.row === 1);
    const row2Data = ACHIEVEMENTS_DATA.filter(ach => ach.row === 2);
    const n1 = row1Data.length;
    const n2 = row2Data.length;

    if (row1Cards.length >= 2 * n1 && row2Cards.length >= 2 * n2) {
      track1Width = row1Cards[n1].offsetLeft - row1Cards[0].offsetLeft;
      track2Width = row2Cards[n2].offsetLeft - row2Cards[0].offsetLeft;
    } else {
      track1Width = rowLeftTrack.scrollWidth / 3;
      track2Width = rowRightTrack.scrollWidth / 3;
    }
  }
});
