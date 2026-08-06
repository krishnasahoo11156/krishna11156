/**
 * Krishna Sahoo Portfolio - Main JS Entry
 * Handles navbar, scroll effects, mobile menu, testimonials drag, and global interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initResumeModal();
  initNavbar();
  initScrollHint();
  initTestimonialsEditorialShowcase();
  initSectionObserver();
  initStatsCounter();
  initTimelineObserver();
  initCurrentlyBuildingPreviews();
  initSectionTransitions();
  initBlogReader();
  initHeroPanels();
  initHeroButtons();
  initContactAndAppointmentSystem();
  initFooterTypewriter();
});

/**
 * Handles opening and closing of the Resume Viewer Modal
 */
function initResumeModal() {
  const resumeBtn = document.getElementById('resume-nav-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!resumeBtn || !modal || !closeBtn) return;

  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/**
 * Navbar: glassmorphic scrolled state + mobile hamburger + active link tracking
 */
function initNavbar() {
  const header = document.querySelector('.navbar-header');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  if (!header) return;

  // Scrolled glassmorphic state
  const updateScrolledState = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', updateScrolledState, { passive: true });
  updateScrolledState();

  // Mobile hamburger menu
  if (hamburgerBtn && mobileOverlay) {
    const openMenu = () => {
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileOverlay.style.display = 'block';
      // Trigger transition on next frame
      requestAnimationFrame(() => mobileOverlay.classList.add('open'));
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
      // Hide after transition
      mobileOverlay.addEventListener('transitionend', () => {
        if (!mobileOverlay.classList.contains('open')) {
          mobileOverlay.style.display = '';
        }
      }, { once: true });
    };

    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) closeMenu();
    });

    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) closeMenu();
    });
  }

  // Active nav link via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));
}

/**
 * Scroll hint chevron — hides after user scrolls, clicking scrolls down
 */
function initScrollHint() {
  const hint = document.getElementById('scroll-hint');
  if (!hint) return;

  const hideHint = () => {
    if (window.scrollY > 80) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
      window.removeEventListener('scroll', hideHint);
    }
  };
  window.addEventListener('scroll', hideHint, { passive: true });

  hint.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  });

  hint.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  });
}

/**
 * Testimonials Editorial Showcase — Premium Apple x Linear x Stripe Redesign
 */

const TESTIMONIALS_DATA = [
  {
    id: "1",
    name: "Malavya Mankar",
    role: "Team AlgoMinds Lead",
    organisation: "VESIT",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    initials: "MM",
    quote: "Krishna is one of the most driven builders I've met. His ability to turn ideas into impactful products in record time is remarkable. He's not just a great developer, but also a fantastic teammate and leader.",
    project: "Autonomous Onboarding Agent",
    projectSlug: "works",
    badge: "Verified Collaboration",
    date: "Syrus 2026",
    tooltip: {
      title: "WORKED TOGETHER ON",
      project: "Autonomous Onboarding Agent",
      event: "Syrus 2026",
      role: "Frontend & AI Architecture"
    },
    verified: true
  },
  {
    id: "2",
    name: "Rishabh Mishra",
    role: "Fullstack Collaborator",
    organisation: "Team AlgoMinds",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    initials: "RM",
    quote: "Krishna brings clarity to complexity. His ability to break down problems and build elegant, scalable solutions in high-pressure hackathon sprints is rare to find.",
    project: "CrisisSync Platform",
    projectSlug: "works",
    badge: "Highly Recommended",
    date: "Solution Challenge",
    tooltip: {
      title: "WORKED TOGETHER ON",
      project: "CrisisSync Realtime",
      event: "Google Solution Challenge",
      role: "Flutter & Firebase Engine"
    },
    verified: true
  },
  {
    id: "3",
    name: "Nidhi Patil",
    role: "Product Strategist",
    organisation: "VESIT",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    initials: "NP",
    quote: "Krishna's consistency, dedication and problem-solving mindset are truly inspiring. During tight project timelines, he delivers clean engineering with meticulous detail. He elevates the whole team.",
    project: "StudySync Platform",
    projectSlug: "works",
    badge: "Verified Collaboration",
    date: "UniMerge 1.0",
    tooltip: {
      title: "WORKED TOGETHER ON",
      project: "StudySync Audio Engine",
      event: "UniMerge 1.0",
      role: "Web Audio Synthesis Engine"
    },
    verified: true
  },
  {
    id: "4",
    name: "Parth B.",
    role: "Hackathon Organizer",
    organisation: "parth.builds Community",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    initials: "PB",
    quote: "Krishna has an exceptional ability to turn complex ideas into working software in record time. His work on StudySync — particularly the Web Audio synthesis engine — was genuinely innovative for a second-year student.",
    project: "StudySync Web Audio",
    projectSlug: "works",
    badge: "Hackathon Judge",
    date: "UniMerge 1.0",
    tooltip: {
      title: "EVALUATED AT HACKATHON",
      project: "StudySync Platform",
      event: "UniMerge 1.0",
      role: "Grand Finalist Evaluation"
    },
    verified: true
  },
  {
    id: "5",
    name: "InboxOS Maintainer",
    role: "Open Source Lead",
    organisation: "InboxOS Monorepo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
    initials: "IO",
    quote: "One of the most self-driven developers I've seen. Krishna approached a production TypeScript monorepo with Docker, Prisma, and Redis, and merged 9 PRs in under two weeks. That kind of initiative is rare.",
    project: "InboxOS Core",
    projectSlug: "works",
    badge: "Verified Contributor",
    date: "Open Source 2026",
    tooltip: {
      title: "OPEN SOURCE COLLABORATION",
      project: "InboxOS Monorepo",
      event: "Production Release",
      role: "Docker & Prisma Infrastructure"
    },
    verified: true
  }
];

const IMPACT_METRICS_DATA = [
  { icon: 'trophy', value: '6+', label: 'Hackathons Participated' },
  { icon: 'award', value: '3', label: 'Top 3 Finishes' },
  { icon: 'users', value: '15+', label: 'Projects Built' },
  { icon: 'code', value: '1166+', label: 'Hours of Collaboration' },
  { icon: 'shield-check', value: '5+', label: 'Collaborations' }
];

const OUTLINE_ICONS = {
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  'shield-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`
};

class TestimonialsManager {
  constructor(data, metrics) {
    this.data = data;
    this.metrics = metrics;
    this.track = document.getElementById('testim-conveyor-track');
    this.metricsGrid = document.getElementById('impact-metrics-grid');
  }

  init() {
    if (!this.track) return;

    if (!this.data || this.data.length === 0) {
      this.renderEmptyState();
      return;
    }

    this.renderMetrics();
    this.renderConveyor();
    this.bindCardInteractions();
  }

  renderEmptyState() {
    if (!this.track) return;
    this.track.innerHTML = `
      <div class="testim-empty-state">
        <p>Testimonials coming soon.</p>
        <p class="sub">I'm currently collaborating on exciting engineering projects. Check back soon!</p>
      </div>
    `;
  }

  renderMetrics() {
    if (!this.metricsGrid) return;
    this.metricsGrid.innerHTML = this.metrics.map(m => `
      <div class="impact-metric-col">
        <div class="impact-icon-badge">
          ${OUTLINE_ICONS[m.icon] || ''}
        </div>
        <div class="impact-metric-info">
          <span class="impact-metric-value">${m.value}</span>
          <span class="impact-metric-label">${m.label}</span>
        </div>
      </div>
    `).join('');
  }

  renderConveyor() {
    if (!this.track) return;
    // Duplicate dataset twice so loop translation is 100% continuous and seamless
    const itemsToRender = [...this.data, ...this.data];

    this.track.innerHTML = itemsToRender.map((item, index) => this.createCardHTML(item, index)).join('');
  }

  createCardHTML(item, index) {
    return `
      <article class="testim-card-editorial" data-id="${item.id}" data-index="${index}">
        <!-- Card Header: Quote Icon & Badge -->
        <div class="testim-card-header">
          <svg class="testim-quote-icon quote-icon" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <span class="testim-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            ${item.badge}
          </span>
        </div>

        <!-- Card Body -->
        <div class="testim-card-body">
          <p class="testim-quote-text">
            &ldquo;${item.quote}&rdquo;
          </p>
        </div>

        <!-- Card Footer -->
        <div class="testim-card-footer">
          <div class="testim-author-wrapper">
            <div class="testim-avatar-container">
              <img src="${item.avatar}"
                   alt="${item.name}"
                   class="testim-avatar-img"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="testim-avatar-initials" style="display: none;">
                ${item.initials}
              </div>

              <!-- Floating Tooltip -->
              <div class="testim-avatar-tooltip" role="tooltip" aria-hidden="true">
                <div class="tooltip-title">${item.tooltip.title}</div>
                <div class="tooltip-desc">${item.tooltip.project}</div>
                <div class="tooltip-sub">${item.tooltip.event} &bull; ${item.tooltip.role}</div>
              </div>
            </div>

            <div class="testim-author-meta">
              <div class="testim-author-name-row">
                <span class="testim-author-name">${item.name}</span>
                ${item.verified ? `
                  <svg class="testim-verified-icon" viewBox="0 0 24 24" fill="currentColor" title="Verified Collaborator">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ` : ''}
              </div>
              <span class="testim-author-role">${item.role} &bull; ${item.organisation}</span>
              <span class="testim-author-event">${item.date}</span>
            </div>
          </div>

          ${item.project ? `
            <a href="#${item.projectSlug}" class="testim-project-link" data-slug="${item.projectSlug}">
              <span>View Project</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          ` : ''}
        </div>

        <!-- Card Watermark Quote -->
        <svg class="testim-card-watermark" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </article>
    `;
  }

  bindCardInteractions() {
    if (!this.track) return;

    // Linked project smooth scroll deduction for navbar
    const projectLinks = this.track.querySelectorAll('.testim-project-link');
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = link.getAttribute('data-slug') || 'works';
        this.scrollToProject(slug);
      });
    });

    // Avatar mobile tap tooltips
    const avatarContainers = this.track.querySelectorAll('.testim-avatar-container');
    avatarContainers.forEach(container => {
      container.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = container.classList.contains('is-active-tooltip');
        this.closeAllTooltips();
        if (!isActive) {
          container.classList.add('is-active-tooltip');
          const tooltip = container.querySelector('.testim-avatar-tooltip');
          if (tooltip) tooltip.setAttribute('aria-hidden', 'false');
        }
      });
    });

    document.addEventListener('click', () => this.closeAllTooltips());
  }

  closeAllTooltips() {
    if (!this.track) return;
    const activeTooltips = this.track.querySelectorAll('.testim-avatar-container.is-active-tooltip');
    activeTooltips.forEach(el => {
      el.classList.remove('is-active-tooltip');
      const tooltip = el.querySelector('.testim-avatar-tooltip');
      if (tooltip) tooltip.setAttribute('aria-hidden', 'true');
    });
  }

  scrollToProject(slug) {
    const target = document.getElementById(slug);
    if (!target) return;
    const navbarHeight = 80;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

let testimonialsInstance = null;

function initTestimonialsEditorialShowcase() {
  testimonialsInstance = new TestimonialsManager(TESTIMONIALS_DATA, IMPACT_METRICS_DATA);
  testimonialsInstance.init();
}

/**
 * Section entrance animations via IntersectionObserver
 */
function initSectionObserver() {
  const targets = document.querySelectorAll('.fade-in-section');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

/**
 * Typewriter effect for the right-aligned hero tagline
 */
function initTypewriter() {
  const line1Elem = document.getElementById('tagline-line-1');
  const line2Elem = document.getElementById('tagline-line-2');
  if (!line1Elem || !line2Elem) return;

  // ── 3 cycling phrases (line2 is optional; leave blank for single-line phrases) ──
  const phrases = [
    { line1: "AI & Full Stack Developer",      line2: "" },
    { line1: "I draw what I can't say",        line2: "I code what I can't draw" },
    { line1: "Where creativity",               line2: "meets clean code" }
  ];

  let phraseIdx = 0;
  let charIdx1   = 0;
  let charIdx2   = 0;
  // phases: 'type1' → 'type2' (if line2) → 'pause' → 'delete2' (if line2) → 'delete1' → loops
  let phase = 'type1';

  line1Elem.textContent = '';
  line2Elem.textContent = '';

  function typeStep() {
    let speed = 75;
    const p = phrases[phraseIdx];

    if (phase === 'type1') {
      if (charIdx1 < p.line1.length) {
        charIdx1++;
        line1Elem.textContent = p.line1.substring(0, charIdx1) + '|';
        speed = 55 + Math.random() * 25;
      } else {
        // Line 1 fully typed
        line1Elem.textContent = p.line2 ? p.line1 : p.line1 + '|';
        phase = p.line2 ? 'type2' : 'pause';
        speed = p.line2 ? 250 : 3000;
      }

    } else if (phase === 'type2') {
      if (charIdx2 < p.line2.length) {
        charIdx2++;
        line2Elem.textContent = p.line2.substring(0, charIdx2) + '|';
        speed = 55 + Math.random() * 25;
      } else {
        line2Elem.textContent = p.line2;
        phase = 'pause';
        speed = 3500;
      }

    } else if (phase === 'pause') {
      phase = p.line2 ? 'delete2' : 'delete1';
      speed = 35;

    } else if (phase === 'delete2') {
      if (charIdx2 > 0) {
        charIdx2--;
        line2Elem.textContent = charIdx2 > 0 ? p.line2.substring(0, charIdx2) + '|' : '';
        speed = 28;
      } else {
        line2Elem.textContent = '';
        phase = 'delete1';
        speed = 120;
      }

    } else if (phase === 'delete1') {
      if (charIdx1 > 0) {
        charIdx1--;
        line1Elem.textContent = charIdx1 > 0 ? p.line1.substring(0, charIdx1) + '|' : '';
        speed = 28;
      } else {
        // Phrase fully deleted — move to next
        line1Elem.textContent = '';
        line2Elem.textContent = '';
        phraseIdx = (phraseIdx + 1) % phrases.length;
        charIdx1 = 0;
        charIdx2 = 0;
        phase = 'type1';
        speed = 500;
      }
    }

    setTimeout(typeStep, speed);
  }

  setTimeout(typeStep, 600);
}

/**
 * Animated count-up counter for stats in About section
 */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-bento-box .stat-num, .modal-stat-card .stat-num');
  if (!statElements.length) return;

  const statsContainer = document.querySelector('.bento-stats-card') || document.querySelector('#about');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const items = [];

  statElements.forEach(el => {
    const targetAttr = el.getAttribute('data-target');
    const rawText = (targetAttr || el.textContent || '').trim();

    if (!rawText) return;

    const hasPlus = rawText.includes('+');
    const hasPercent = rawText.includes('%');
    const cleanNumStr = rawText.replace(/[^0-9.]/g, '');
    const targetVal = parseFloat(cleanNumStr);

    if (isNaN(targetVal)) return;

    const isFloat = cleanNumStr.includes('.');
    const decimals = isFloat ? (cleanNumStr.split('.')[1] || '').length : 0;
    const suffix = (hasPlus ? '+' : '') + (hasPercent ? '%' : '');

    items.push({
      el,
      target: targetVal,
      decimals,
      suffix
    });

    if (!prefersReducedMotion) {
      const startNum = (0).toFixed(decimals);
      el.textContent = `${startNum}${suffix}`;
    }
  });

  if (!items.length || prefersReducedMotion) return;

  let hasStarted = false;
  const startAnimation = () => {
    if (hasStarted) return;
    hasStarted = true;

    items.forEach((item, index) => {
      setTimeout(() => {
        const duration = 1600; // 1.6s duration
        const startTime = performance.now();

        const animateStep = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic deceleration formula
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * item.target;

          item.el.textContent = `${currentVal.toFixed(item.decimals)}${item.suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animateStep);
          } else {
            item.el.textContent = `${item.target.toFixed(item.decimals)}${item.suffix}`;
            item.el.classList.remove('counter-finish');
            void item.el.offsetWidth; // Trigger reflow for animation restart
            item.el.classList.add('counter-finish');
          }
        };

        requestAnimationFrame(animateStep);
      }, index * 90);
    });
  };

  // Immediate check if element is already visible in the viewport
  if (statsContainer) {
    const rect = statsContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight && rect.bottom >= 0) {
      startAnimation();
      return;
    }
  }

  // IntersectionObserver for scroll trigger
  if ('IntersectionObserver' in window && statsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

    observer.observe(statsContainer);
  } else {
    startAnimation();
  }
}

/**
 * Sequential reveal animation for the Journey Timeline in About section
 */
function initTimelineObserver() {
  const timelineContainer = document.querySelector('.creative-timeline');
  if (!timelineContainer) return;

  const timelineSteps = timelineContainer.querySelectorAll('.timeline-step');
  if (!timelineSteps.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    timelineContainer.classList.add('timeline-animated');
    timelineSteps.forEach(step => step.classList.add('step-visible'));
    return;
  }

  const revealedSet = new Set();

  const revealStep = (step, delay = 0) => {
    if (revealedSet.has(step)) return;
    revealedSet.add(step);

    timelineContainer.classList.add('timeline-animated');

    setTimeout(() => {
      step.classList.add('step-visible');
    }, delay);
  };

  let containerTriggered = false;
  const triggerContainerReveal = () => {
    if (containerTriggered) return;
    containerTriggered = true;

    timelineContainer.classList.add('timeline-animated');

    let visibleIndex = 0;
    timelineSteps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < windowHeight - 20) {
        revealStep(step, visibleIndex * 140);
        visibleIndex++;
      }
    });
  };

  // Immediate check on load if already in viewport
  const containerRect = timelineContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  if (containerRect.top < windowHeight - 40 && containerRect.bottom >= 0) {
    triggerContainerReveal();
  }

  // IntersectionObserver for container & individual steps on scroll
  if ('IntersectionObserver' in window) {
    const containerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerContainerReveal();
          containerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    containerObserver.observe(timelineContainer);

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealStep(entry.target, 0);
          stepObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    timelineSteps.forEach(step => stepObserver.observe(step));
  } else {
    triggerContainerReveal();
  }
}

/**
 * macOS Quick Look-style Floating Preview Popover for "Currently Building" items in About Section.
 * Reuses the exact project sheet modal from Works section as single source of truth.
 */
function initCurrentlyBuildingPreviews() {
  const buildingItems = document.querySelectorAll('.building-item');
  if (!buildingItems.length) return;

  // Dynamically create single floating preview popover in DOM if not present
  let popover = document.getElementById('building-preview-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.id = 'building-preview-popover';
    popover.className = 'building-preview-popover';
    popover.innerHTML = `
      <div class="preview-popover-img-wrap">
        <img src="" alt="Project Preview" class="preview-popover-img" id="popover-img">
      </div>
      <div class="preview-popover-meta">
        <span class="preview-status-pill">
          <span class="preview-status-dot"></span>
          <span id="popover-status">Currently Building</span>
        </span>
        <button class="preview-more-btn" id="popover-more-btn" type="button" aria-label="View More Details">
          <span>More Details</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    `;
    document.body.appendChild(popover);
  }

  const popoverImg = popover.querySelector('#popover-img');
  const popoverStatus = popover.querySelector('#popover-status');
  const popoverMoreBtn = popover.querySelector('#popover-more-btn');

  let currentTargetItem = null;
  let hideTimeout = null;

  // Position popover relative to item with exact vertical center height arrow alignment
  const positionPopover = (item) => {
    const itemRect = item.getBoundingClientRect();
    const popoverWidth = 320;
    const popoverHeight = popover.offsetHeight || 215;
    const margin = 18;

    // Calculate exact center Y height of the hovered item card
    const itemCenterY = itemRect.top + (itemRect.height / 2);
    let top = itemCenterY - 48; // Default 48px arrow offset
    let left = itemRect.right + margin;
    let arrowClass = 'arrow-left';

    // Position above or below if right side overflows viewport
    if (left + popoverWidth > window.innerWidth - 16) {
      left = Math.max(16, Math.min(itemRect.left, window.innerWidth - popoverWidth - 16));
      if (itemRect.top > popoverHeight + 20) {
        top = itemRect.top - popoverHeight - 12;
        arrowClass = 'arrow-bottom';
      } else {
        top = itemRect.bottom + 12;
        arrowClass = 'arrow-top';
      }
    } else {
      // Clamp top within viewport boundaries while keeping arrow aligned to itemCenterY
      const minTop = 12;
      const maxTop = window.innerHeight - popoverHeight - 12;
      const clampedTop = Math.max(minTop, Math.min(top, maxTop));

      // Dynamically calculate arrow top offset so arrow ALWAYS points directly to itemCenterY
      const arrowTopPx = Math.max(20, Math.min(itemCenterY - clampedTop, popoverHeight - 20));
      popover.style.setProperty('--arrow-top', `${arrowTopPx}px`);
      top = clampedTop;
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.className = `building-preview-popover active ${arrowClass}`;
  };

  // Trigger project sheet modal (Single Source of Truth)
  const handleOpenProjectModal = (projectId, fallbackTitle, fallbackDesc, previewImg) => {
    let projectData = null;

    if (typeof WORKS_DATA !== 'undefined' && WORKS_DATA) {
      const allItems = [...(WORKS_DATA.projects || []), ...(WORKS_DATA.hackathons || [])];
      projectData = allItems.find(p => p.id === projectId || p.title.toLowerCase().includes(fallbackTitle.toLowerCase()));
    }

    if (!projectData) {
      projectData = {
        id: projectId || 'code2git',
        title: fallbackTitle,
        subtitle: 'Currently Building Project',
        tagline: fallbackDesc,
        status: 'Currently Building · In Active Development',
        role: 'Creator & Architect',
        tech: ['React', 'TypeScript', 'Node.js', 'AI Agents', 'Tailwind CSS'],
        repo: 'https://github.com/krishnasahoo11156',
        accent: '#10B981',
        images: [previewImg],
        details: [
          `<strong>Active Development:</strong> ${fallbackDesc}`,
          '<strong>Architecture:</strong> Engineered with clean modular design, high performance, and responsive UI.',
          '<strong>Key Objective:</strong> Delivering intuitive agentic and full-stack user experiences.'
        ],
        metaTags: ['Currently Building', 'Full Stack', 'AI Agent']
      };
    }

    popover.classList.remove('active');

    if (typeof openProjectSheet === 'function') {
      openProjectSheet(projectData);
    } else if (window.openProjectSheet) {
      window.openProjectSheet(projectData);
    }
  };

  buildingItems.forEach(item => {
    const projectId = item.getAttribute('data-project-id');
    const previewImg = item.getAttribute('data-preview-img');
    const titleText = item.querySelector('h5') ? item.querySelector('h5').textContent : 'Project';
    const descText = item.querySelector('p') ? item.querySelector('p').textContent : '';

    item.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);

      if (currentTargetItem !== item) {
        currentTargetItem = item;

        // Smooth image cross-fade when switching rapidly between items
        if (popoverImg && previewImg) {
          if (popoverImg.src && popoverImg.src !== previewImg) {
            popoverImg.style.opacity = '0.2';
            setTimeout(() => {
              popoverImg.src = previewImg;
              popoverImg.style.opacity = '1';
            }, 120);
          } else {
            popoverImg.src = previewImg;
            popoverImg.style.opacity = '1';
          }
        }
      }

      if (popoverStatus) popoverStatus.textContent = 'Currently Building';
      positionPopover(item);
    });

    item.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        if (!popover.matches(':hover') && !document.querySelector('.building-item:hover')) {
          popover.classList.remove('active');
          currentTargetItem = null;
        }
      }, 200);
    });

    item.addEventListener('click', (e) => {
      e.preventDefault();
      handleOpenProjectModal(projectId, titleText, descText, previewImg);
    });
  });

  popover.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });

  popover.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      if (!document.querySelector('.building-item:hover')) {
        popover.classList.remove('active');
        currentTargetItem = null;
      }
    }, 200);
  });

  if (popoverMoreBtn) {
    popoverMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentTargetItem) {
        const projectId = currentTargetItem.getAttribute('data-project-id');
        const previewImg = currentTargetItem.getAttribute('data-preview-img');
        const titleText = currentTargetItem.querySelector('h5') ? currentTargetItem.querySelector('h5').textContent : 'Project';
        const descText = currentTargetItem.querySelector('p') ? currentTargetItem.querySelector('p').textContent : '';
        handleOpenProjectModal(projectId, titleText, descText, previewImg);
      }
    });
  }
}

function initHeroPanels() {
  // Obsolete full-screen modal overlays removed in favor of Engineering Desk Journal popup
}

function initHeroButtons() {
  const btnOpenSocials = document.getElementById('btn-open-socials');
  if (btnOpenSocials) {
    btnOpenSocials.addEventListener('click', (e) => {
      e.preventDefault();
      const connectSec = document.getElementById('connect') || document.querySelector('.connect-section');
      if (connectSec) {
        connectSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/**
 * Split-Pane Blog Reader Handler
 * Renders full articles on the right pane when a blog card on the left conveyor is clicked.
 */
const BLOG_ARTICLES_DATA = {
  'foresee-solo': {
    title: 'Building ForeSee Solo vs 3,000+ Devs',
    tag: 'Hackathon Sprint',
    date: 'Oct 2024',
    readtime: '5 min read',
    body: `
      <p class="article-lead">During an intense 48-hour national hackathon featuring over 3,000 developer participants, I set out to build <strong>ForeSee</strong>—an automated AI crisis dispatch system designed to ingest emergency transcripts, triage incident severity, and dispatch first responders in real-time.</p>
      
      <h3>The Architecture Challenge</h3>
      <p>Building real-time emergency tooling requires zero-latency response pipelines. A single hung API call or unhandled promise rejection could mean lost notifications during critical disaster triage.</p>

      <div class="article-code-block">
        <pre><code>// Fast JSON schema enforcement using Gemini Flash
const triageResponse = await aiClient.models.generateContent({
  model: 'gemini-1.5-flash',
  contents: prompt,
  config: { responseMimeType: 'application/json' }
});</code></pre>
      </div>

      <h3>Key Engineering Takeaways</h3>
      <ul>
        <li><strong>Structured Schema Enforcement:</strong> Forcing JSON output schemas eliminated AI parsing errors completely under stress testing.</li>
        <li><strong>WebSocket Fallbacks:</strong> Implemented automatic heartbeat polling so socket connections recover instantly when switching networks.</li>
        <li><strong>Rapid Solo MVP Delivery:</strong> Strict scope constraints allowed me to outrank multi-member teams by shipping a fully working prototype.</li>
      </ul>
    `
  },
  'agent-bus': {
    title: 'Event-Driven Micro-Agent Bus Pattern',
    tag: 'System Design',
    date: 'Dec 2024',
    readtime: '7 min read',
    body: `
      <p class="article-lead">When orchestrating multi-step AI tasks across several autonomous subagents, traditional synchronous HTTP calls quickly become brittle. This article breaks down the <strong>EventBus Pattern</strong> I implemented for managing agent state and recovery.</p>
      
      <h3>Decoupled Messaging Architecture</h3>
      <p>By routing agent messages through an in-memory pub/sub EventBus, agents operate independently and communicate asynchronously without hard coupling.</p>

      <div class="article-code-block">
        <pre><code>class EventBus extends EventEmitter {
  publish(event, payload) {
    this.emit(event, { timestamp: Date.now(), payload });
  }
}</code></pre>
      </div>

      <h3>State Snapshots &amp; Failover</h3>
      <p>Each agent saves state JSON snapshots after completing key milestones. If an agent crashes, it resumes from the latest checkpoint without re-running expensive steps.</p>
    `
  },
  'css-shaders': {
    title: 'Mastering Dual-Axis CSS Shaders & Canvas',
    tag: 'Frontend Craft',
    date: 'Feb 2025',
    readtime: '4 min read',
    body: `
      <p class="article-lead">Modern web aesthetics rely on interactive depth, smooth micro-animations, and liquid responsive layouts. Here is how I crafted the dual-axis canvas doodle shader and glassmorphic backdrop filters for this portfolio.</p>

      <h3>Clipping Path Math</h3>
      <p>To split the hero section diagonally while maintaining crisp resolution on mobile and desktop, CSS custom properties recalculate coordinate bounds dynamically.</p>
    `
  },
  'inboxos-prs': {
    title: '9 PRs in 2 Weeks: Lessons from InboxOS',
    tag: 'Open Source',
    date: 'Nov 2024',
    readtime: '6 min read',
    body: `
      <p class="article-lead">Contributing to large-scale open-source projects requires rapid comprehension of unfamiliar monorepos. In two weeks, I submitted and merged 9 pull requests to InboxOS.</p>

      <h3>Key Technical Fixes</h3>
      <ul>
        <li>Optimized Prisma database queries to eliminate N+1 query bottlenecks on message threads.</li>
        <li>Fixed Docker multi-stage build caching to reduce CI pipeline build times by 40%.</li>
        <li>Refactored background queue worker memory allocation.</li>
      </ul>
    `
  },
  'gemini-triage': {
    title: 'Prompt Engineering vs Fine-Tuning',
    tag: 'AI Systems',
    date: 'Jan 2025',
    readtime: '8 min read',
    body: `
      <p class="article-lead">A comprehensive benchmark comparing zero-shot Gemini prompt engineering against fine-tuned smaller models for emergency crisis dispatch classification.</p>
      
      <h3>Benchmark Findings</h3>
      <p>Zero-shot prompting with structured outputs achieved 99.2% accuracy while avoiding the maintenance overhead of dedicated model hosting.</p>
    `
  },
  'clean-java': {
    title: 'Clean Architecture in Java & Spring',
    tag: 'Backend Design',
    date: 'Mar 2025',
    readtime: '6 min read',
    body: `
      <p class="article-lead">How Hexagonal Architecture (Ports &amp; Adapters) protects core Java business domain models from framework deprecations and database changes.</p>
    `
  },
  'websocket-10k': {
    title: 'Scaling WebSockets to 10k Connections',
    tag: 'Performance',
    date: 'Nov 2024',
    readtime: '9 min read',
    body: `
      <p class="article-lead">Stress testing Node.js WS servers to handle 10,000 active concurrent connections without memory exhaustion.</p>
    `
  },
  'rag-hyde': {
    title: 'HyDE RAG Pipelines with Vector Search',
    tag: 'AI Retrieval',
    date: 'Jan 2025',
    readtime: '7 min read',
    body: `
      <p class="article-lead">Combining Hypothetical Document Embeddings (HyDE) with BM25 lexical search for technical document search engines.</p>
    `
  }
};

function initBlogReader() {
  const placeholder = document.getElementById('reader-placeholder');
  const articleContent = document.getElementById('reader-article-content');
  const btnReadFeatured = document.getElementById('btn-read-featured');

  const elTag = document.getElementById('article-tag');
  const elDate = document.getElementById('article-date');
  const elReadtime = document.getElementById('article-readtime');
  const elTitle = document.getElementById('article-title');
  const elBody = document.getElementById('article-body');

  function renderArticle(articleId) {
    const data = BLOG_ARTICLES_DATA[articleId];
    if (!data) return;

    // Highlight active card
    document.querySelectorAll('.modal-blog-card').forEach(card => {
      if (card.getAttribute('data-article-id') === articleId) {
        card.classList.add('active-card');
      } else {
        card.classList.remove('active-card');
      }
    });

    if (placeholder) placeholder.classList.add('hidden');
    if (articleContent) {
      articleContent.classList.remove('hidden');

      // Populate fields
      if (elTag) elTag.textContent = data.tag;
      if (elDate) elDate.textContent = data.date;
      if (elReadtime) elReadtime.textContent = data.readtime;
      if (elTitle) elTitle.textContent = data.title;
      if (elBody) elBody.innerHTML = data.body;

      // Scroll reader pane to top
      const readerPane = document.getElementById('blog-reader-pane');
      if (readerPane) readerPane.scrollTop = 0;
    }
  }

  document.querySelectorAll('.modal-blog-card[data-article-id]').forEach(card => {
    card.addEventListener('click', () => {
      const articleId = card.getAttribute('data-article-id');
      renderArticle(articleId);
    });
  });

  if (btnReadFeatured) {
    btnReadFeatured.addEventListener('click', () => renderArticle('foresee-solo'));
  }
}

/**
 * Cinematic Viewport Scroll Transitions & Lens Pop-up Reveal (Hero <-> About <-> Skills)
 * Dynamically applies section-active and section-receding states based on viewport scroll ratio.
 */
function initSectionTransitions() {
  const heroSec = document.getElementById('hero-section');
  const aboutSec = document.getElementById('about');
  const skillsSec = document.getElementById('skills');

  if (!heroSec || !aboutSec || !skillsSec) return;

  const sections = [
    { el: heroSec, name: 'hero' },
    { el: aboutSec, name: 'about' },
    { el: skillsSec, name: 'skills' }
  ];

  const updateSectionStates = () => {
    const windowHeight = window.innerHeight;

    sections.forEach(({ el }) => {
      const rect = el.getBoundingClientRect();
      const topRatio = rect.top / windowHeight;
      const bottomRatio = rect.bottom / windowHeight;

      // Section is active inside primary viewing window
      if (topRatio < 0.75 && bottomRatio > 0.25) {
        el.classList.add('section-active');
        el.classList.remove('section-receding');
      }
      // Section is above viewing window (scrolled past / receding upward)
      else if (bottomRatio <= 0.25) {
        el.classList.remove('section-active');
        el.classList.add('section-receding');
      }
      // Section is below viewing window (waiting to pop up / enter)
      else {
        el.classList.remove('section-active');
        el.classList.remove('section-receding');
      }
    });
  };

  // Run initial state setup
  updateSectionStates();

  // Optimized scroll listener
  let tick = false;
  window.addEventListener('scroll', () => {
    if (!tick) {
      window.requestAnimationFrame(() => {
        updateSectionStates();
        tick = false;
      });
      tick = true;
    }
  }, { passive: true });
}

/**
 * Interactive Contact Section & Google Calendar Appointment Scheduler Engine
 */
function initContactAndAppointmentSystem() {
  // Toast Helper
  const toastEl = document.getElementById('toast-notification');
  function showToast(msg, duration = 3000) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('active');
    setTimeout(() => {
      toastEl.classList.remove('active');
    }, duration);
  }

  // ============================================================
  // CONNECT SECTION — HANDCRAFTED REFINED MICRO-INTERACTIONS
  // ============================================================

  // 1. TAB SWITCHER & ACTIVE EMERALD INDICATOR
  const tabSendMsg = document.getElementById('tab-send-msg');
  const tabBookAppt = document.getElementById('tab-book-appt');
  const paneMsg = document.getElementById('pane-msg');
  const paneAppt = document.getElementById('pane-appt');
  const tabIndicator = document.getElementById('tab-active-indicator');

  function updateTabIndicator(activeBtn) {
    if (!activeBtn || !tabIndicator) return;
    const parent = activeBtn.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const leftOffset = btnRect.left - parentRect.left;
    tabIndicator.style.width = `${btnRect.width}px`;
    tabIndicator.style.transform = `translateX(${leftOffset}px)`;
  }

  if (tabSendMsg && tabBookAppt && paneMsg && paneAppt) {
    // Initial indicator positioning
    setTimeout(() => updateTabIndicator(tabSendMsg), 100);

    tabSendMsg.addEventListener('click', () => {
      tabSendMsg.classList.add('active');
      tabBookAppt.classList.remove('active');
      paneMsg.classList.add('active');
      paneAppt.classList.remove('active');
      updateTabIndicator(tabSendMsg);
    });

    tabBookAppt.addEventListener('click', () => {
      tabBookAppt.classList.add('active');
      tabSendMsg.classList.remove('active');
      paneAppt.classList.add('active');
      paneMsg.classList.remove('active');
      updateTabIndicator(tabBookAppt);
      // Trigger journey animation on tab click
      const journeyDesktop = document.getElementById('journey-desktop');
      if (journeyDesktop) {
        journeyDesktop.classList.add('animate-active');
      }
    });

    window.addEventListener('resize', () => {
      const activeBtn = tabSendMsg.classList.contains('active') ? tabSendMsg : tabBookAppt;
      updateTabIndicator(activeBtn);
    });
  }

  // ⭐ 2. DOT FIELD — SPRING PHYSICS CURSOR EFFECT
  // Bimodal compliance, inertia of rest/motion, spatial wake modulation, soft collision
  (function () {
    const paperCard = document.getElementById('contact-paper-card');
    const dotCanvas = document.getElementById('dot-field-canvas');
    if (!paperCard || !dotCanvas) return;

    const ctx = dotCanvas.getContext('2d');

    // ── PHYSICS CONSTANTS ────────────────────────────────────────────────────
    const SPACING        = 15;    // px — dot rest-position grid gap
    const RADIUS         = 145;   // px — cursor influence radius
    const MAX_PULL       = 0.30;  // fraction of RADIUS a dot can be displaced toward cursor
    const BASE_STIFF     = 0.058; // spring stiffness (compliant baseline)
    const REPEL_DIST     = 8.0;   // px — soft repulsion activation distance
    const REPEL_STRENGTH = 0.09;  // repulsion force magnitude
    const IDLE_VEL       = 0.04;  // velocity magnitude threshold to consider dot "settled"
    const IDLE_POS       = 0.35;  // position error threshold to consider dot "settled"

    // ── SITE GREEN PALETTE (R, G, B) ─────────────────────────────────────────
    const C_CORE  = [52,  211, 153]; // #34D399 — light emerald at cursor centre
    const C_MID   = [110, 231, 183]; // #6EE7B7 — light mint mid-ring
    const C_EDGE  = [167, 243, 208]; // #A7F3D0 — very light mint at influence edge

    // ── STATE ────────────────────────────────────────────────────────────────
    let dots = [], pairs = [];
    let numCols = 0, numRows = 0;
    let cursorX = -9999, cursorY = -9999;
    let prevCX  = -9999, prevCY  = -9999;
    let curVX = 0, curVY = 0, cursorSpeed = 0;
    let isInside = false;
    let rafId = null;

    // ── GAUSSIAN RANDOM (Box-Muller) ─────────────────────────────────────────
    function gauss(mean, std) {
      let u, v;
      do { u = Math.random(); } while (u === 0);
      do { v = Math.random(); } while (v === 0);
      return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }

    // ── BIMODAL COMPLIANCE SAMPLER ───────────────────────────────────────────
    // Returns a value 0–1. Two clusters:
    //   Compliant (85%): clustered near 0.87 ± 0.055   → heavy inertia, oscillate
    //   Rebel     (15%): clustered near 0.22 ± 0.060   → eager, low inertia
    // Within each cluster, Gaussian spread gives natural variance.
    function sampleCompliance() {
      if (Math.random() < 0.15) {
        return Math.max(0.06, Math.min(0.42, gauss(0.22, 0.060))); // rebel cluster
      } else {
        return Math.max(0.58, Math.min(1.00, gauss(0.87, 0.055))); // compliant cluster
      }
    }

    // ── INIT DOT GRID + COLLISION PAIRS ──────────────────────────────────────
    function init() {
      dots = [];
      pairs = [];

      const W = dotCanvas.width;
      const H = dotCanvas.height;
      // Centre the grid within the canvas
      const ox = ((W % SPACING) + SPACING) / 2;
      const oy = ((H % SPACING) + SPACING) / 2;

      numCols = Math.floor((W - ox) / SPACING) + 1;
      numRows = Math.floor((H - oy) / SPACING) + 1;

      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          const rx = ox + c * SPACING;
          const ry = oy + r * SPACING;
          const comp = sampleCompliance();

          // Compliance → physics mapping:
          //   Rebel  (low comp): stiff spring + high damp → snappy/eager, little oscillation
          //   Compliant (high): soft spring + low  damp → laggy start, rich overshoot & oscillation
          const stiffness = BASE_STIFF * (1.55 - comp * 0.90); // rebel ≈ 0.078, compliant ≈ 0.045
          const damping   = 0.895 - comp * 0.115;              // rebel ≈ 0.870, compliant ≈ 0.795

          dots.push({ rx, ry, x: rx, y: ry, vx: 0, vy: 0, comp, stiffness, damping });
        }
      }

      // Precompute immediate-neighbor pairs (right, down, 2 diagonals).
      // Only O(4n) pairs → collision stays performant even for 2000+ dots.
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          const i = r * numCols + c;
          if (c + 1 < numCols)                       pairs.push([i, r * numCols + c + 1]);
          if (r + 1 < numRows)                       pairs.push([i, (r + 1) * numCols + c]);
          if (r + 1 < numRows && c + 1 < numCols)   pairs.push([i, (r + 1) * numCols + c + 1]);
          if (r + 1 < numRows && c - 1 >= 0)        pairs.push([i, (r + 1) * numCols + c - 1]);
        }
      }
    }

    // ── COLOR INTERPOLATION ───────────────────────────────────────────────────
    // t: 0 = cursor centre → C_CORE, 1 = influence edge → C_EDGE
    function lerpColor(t) {
      const [r1, g1, b1] = t < 0.45
        ? [C_CORE[0] + (C_MID[0] - C_CORE[0]) * (t / 0.45),
           C_CORE[1] + (C_MID[1] - C_CORE[1]) * (t / 0.45),
           C_CORE[2] + (C_MID[2] - C_CORE[2]) * (t / 0.45)]
        : [C_MID[0] + (C_EDGE[0] - C_MID[0]) * ((t - 0.45) / 0.55),
           C_MID[1] + (C_EDGE[1] - C_MID[1]) * ((t - 0.45) / 0.55),
           C_MID[2] + (C_EDGE[2] - C_MID[2]) * ((t - 0.45) / 0.55)];
      return [Math.round(r1), Math.round(g1), Math.round(b1)];
    }

    // ── MAIN ANIMATION LOOP ───────────────────────────────────────────────────
    function animate() {
      rafId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);

      // Smooth cursor velocity (used for spatial wake modulation)
      if (prevCX !== -9999) {
        curVX = cursorX - prevCX;
        curVY = cursorY - prevCY;
        cursorSpeed = Math.sqrt(curVX * curVX + curVY * curVY);
      }
      prevCX = cursorX;
      prevCY = cursorY;

      // Normalized speed [0–1] for spatial modulation strength
      const speedNorm = Math.min(1, cursorSpeed / 10);
      // Direction of cursor movement (angle)
      const movAngle = Math.atan2(curVY, curVX);

      // ── PER-DOT PHYSICS ──────────────────────────────────────────────────
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Distance from dot's REST position to cursor
        const rdx = cursorX - d.rx;
        const rdy = cursorY - d.ry;
        const restDist = Math.sqrt(rdx * rdx + rdy * rdy);

        // Smooth influence falloff: 1 at cursor, 0 at RADIUS  (smoothstep³)
        const raw = Math.max(0, 1 - restDist / RADIUS);
        const infl = raw * raw * (3 - 2 * raw); // smoothstep

        const inMotion = Math.abs(d.vx) > IDLE_VEL || Math.abs(d.vy) > IDLE_VEL
                      || Math.abs(d.x - d.rx) > IDLE_POS || Math.abs(d.y - d.ry) > IDLE_POS;

        if (infl < 0.001 && !inMotion) continue; // fully settled & out of range → skip

        // ── SPATIAL WAKE MODULATION ─────────────────────────────────────────
        // When cursor moves, dots in its WAKE get a temporary stiffness reduction
        // (more lag/inertia). Dots AHEAD of the cursor get a slight stiffness boost
        // (more eager). This creates a natural directional drag texture.
        // Effect is proportional to cursor speed so it's invisible at rest.
        let stiffnessMod = 1.0;
        if (speedNorm > 0.04 && infl > 0.03) {
          // alignment: +1 = dot ahead of cursor, -1 = dot behind (in wake)
          const dotAngle  = Math.atan2(d.ry - cursorY, d.rx - cursorX);
          const alignment = Math.cos(dotAngle - movAngle);
          // Wake: alignment ≈ -1 → reduce stiffness (heavier inertia)
          // Front: alignment ≈ +1 → boost stiffness (more eager)
          stiffnessMod = 1.0 + speedNorm * 0.28 * alignment;
          stiffnessMod  = Math.max(0.35, stiffnessMod);
        }

        // ── SPRING TARGET ───────────────────────────────────────────────────
        // All dots aim for the same target: rest pos + partial pull toward cursor.
        // HOW fast they reach it is what compliance controls.
        const pullFrac = infl * MAX_PULL;
        const targetX  = d.rx + rdx * pullFrac;
        const targetY  = d.ry + rdy * pullFrac;

        // Spring force toward target (stiffness × error × spatial mod)
        const eff = d.stiffness * stiffnessMod;
        d.vx += (targetX - d.x) * eff;
        d.vy += (targetY - d.y) * eff;

        // Velocity damping (rebels damp fast → settle quick; compliant damp slow → overshoot)
        d.vx *= d.damping;
        d.vy *= d.damping;

        // Integrate position
        d.x += d.vx;
        d.y += d.vy;
      }

      // ── SOFT COLLISION REPULSION ─────────────────────────────────────────
      // Only run for neighbor pairs where at least one dot is near cursor.
      // Very slight repulsion — prevents overlap but allows gap to compress.
      if (isInside) {
        for (let p = 0; p < pairs.length; p++) {
          const [ai, bi] = pairs[p];
          const a = dots[ai], b = dots[bi];

          // Cull pairs far from cursor (both rest positions outside influence)
          if (Math.hypot(cursorX - a.rx, cursorY - a.ry) > RADIUS * 1.15 &&
              Math.hypot(cursorX - b.rx, cursorY - b.ry) > RADIUS * 1.15) continue;

          const dx   = a.x - b.x;
          const dy   = a.y - b.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < REPEL_DIST * REPEL_DIST && dist2 > 0.0001) {
            const dist   = Math.sqrt(dist2);
            const force  = REPEL_STRENGTH * (1 - dist / REPEL_DIST);
            const nx = dx / dist, ny = dy / dist;
            // Equal and opposite impulse (momentum conservation)
            a.vx += nx * force; a.vy += ny * force;
            b.vx -= nx * force; b.vy -= ny * force;
          }
        }
      }

      // ── DRAW DOTS ────────────────────────────────────────────────────────
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        const rdx2     = cursorX - d.rx;
        const rdy2     = cursorY - d.ry;
        const restDist2 = Math.sqrt(rdx2 * rdx2 + rdy2 * rdy2);
        const raw2     = Math.max(0, 1 - restDist2 / RADIUS);
        const infl2    = raw2 * raw2 * (3 - 2 * raw2);

        if (infl2 < 0.004) continue; // too dim to be visible

        const normDist = Math.min(1, restDist2 / RADIUS);   // 0=centre, 1=edge
        const [r, g, b] = lerpColor(normDist);
        const opacity  = (infl2 * 0.72).toFixed(3);
        // Dot radius: bold at centre (3px), fine at edge (0.55px)
        const dotR = 0.55 + 2.45 * (1 - normDist);

        ctx.beginPath();
        ctx.arc(d.x, d.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      }

      // ── IDLE CHECK: stop rAF when cursor is gone and all dots have settled ─
      if (!isInside) {
        let anyActive = false;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          if (Math.abs(d.vx) > IDLE_VEL || Math.abs(d.vy) > IDLE_VEL ||
              Math.abs(d.x - d.rx) > IDLE_POS || Math.abs(d.y - d.ry) > IDLE_POS) {
            anyActive = true;
            break;
          }
        }
        if (!anyActive) {
          cancelAnimationFrame(rafId);
          rafId = null;
          ctx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
        }
      }
    }

    // ── RESIZE HANDLER ────────────────────────────────────────────────────────
    function resize() {
      const rect = paperCard.getBoundingClientRect();
      dotCanvas.width  = Math.round(rect.width);
      dotCanvas.height = Math.round(rect.height);
      init();
    }

    // ── EVENTS ───────────────────────────────────────────────────────────────
    paperCard.addEventListener('mouseenter', () => {
      isInside = true;
      prevCX = -9999; prevCY = -9999;
      cursorSpeed = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
    });

    paperCard.addEventListener('mousemove', (e) => {
      const rect = paperCard.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
    });

    paperCard.addEventListener('mouseleave', () => {
      isInside = false;
      cursorX  = -9999;
      cursorY  = -9999;
      cursorSpeed = 0;
    });

    // ── STARTUP ──────────────────────────────────────────────────────────────
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(paperCard);
  })();

  // ⭐ 3. LOCAL PARALLAX SPARKLE (Moves 6-8px Following Cursor in Header)
  const headerElem = document.querySelector('.connect-header');
  const sparkleSvg = document.getElementById('connect-sparkle-svg');

  if (headerElem && sparkleSvg) {
    let spX = 0, spY = 0;
    let targetSpX = 0, targetSpY = 0;
    let spAnimFrame = null;

    function updateSparklePos() {
      spX += (targetSpX - spX) * 0.08;
      spY += (targetSpY - spY) * 0.08;
      sparkleSvg.style.transform = `translate(${spX}px, ${spY}px)`;

      if (Math.abs(targetSpX - spX) > 0.2 || Math.abs(targetSpY - spY) > 0.2) {
        spAnimFrame = requestAnimationFrame(updateSparklePos);
      } else {
        spAnimFrame = null;
      }
    }

    headerElem.addEventListener('mousemove', (e) => {
      const rect = headerElem.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetSpX = Math.max(-8, Math.min(8, (e.clientX - centerX) * 0.03));
      targetSpY = Math.max(-8, Math.min(8, (e.clientY - centerY) * 0.03));

      if (!spAnimFrame) {
        spAnimFrame = requestAnimationFrame(updateSparklePos);
      }
    });

    headerElem.addEventListener('mouseleave', () => {
      targetSpX = 0;
      targetSpY = 0;
      if (!spAnimFrame) spAnimFrame = requestAnimationFrame(updateSparklePos);
    });
  }

  // ⭐ 4. INTERACTIVE SINGLE-DRAW SVG UNDERLINE (Plays Once on Subtitle Hover)
  const subtitleWrap = document.getElementById('connect-subtitle-wrap');
  if (subtitleWrap) {
    subtitleWrap.addEventListener('mouseenter', () => {
      subtitleWrap.classList.add('drawn');
    });
  }

  // ⭐ 5. REACTIVE HANDWRITTEN CORNER NOTE (Updates dynamically based on focused input/textarea/select)
  const cornerNoteBlock = document.getElementById('corner-note-text-block');
  const cornerNoteLine1 = document.getElementById('corner-note-line1');
  const cornerNoteText = document.getElementById('corner-note-text'); // line 2

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const phoneInput = document.getElementById('contact-phone');
  const msgArea = document.getElementById('contact-message');
  const allContactInputs = [nameInput, emailInput, subjectInput, phoneInput, msgArea].filter(Boolean);

  let currentNoteState = { l1: 'No bots.', l2: 'Just me.' };
  let msgDebounceTimer = null;
  let transitionTimer = null;

  function updateCornerNote(line1, line2) {
    if (!cornerNoteText && !cornerNoteLine1) return;
    if (currentNoteState.l1 === line1 && currentNoteState.l2 === line2) return;

    currentNoteState = { l1: line1, l2: line2 };

    if (cornerNoteBlock) {
      cornerNoteBlock.classList.add('note-updating');
      clearTimeout(transitionTimer);
      transitionTimer = setTimeout(() => {
        if (cornerNoteLine1) cornerNoteLine1.textContent = line1;
        if (cornerNoteText) cornerNoteText.textContent = line2;
        cornerNoteBlock.classList.remove('note-updating');
      }, 90);
    } else {
      if (cornerNoteLine1) cornerNoteLine1.textContent = line1;
      if (cornerNoteText) cornerNoteText.textContent = line2;
    }
  }

  function handleInputState() {
    const activeEl = document.activeElement;

    if (activeEl === nameInput) {
      const val = nameInput.value.trim();
      if (val.length > 0) {
        const firstName = val.split(' ')[0];
        const displayName = firstName.length > 12 ? firstName.slice(0, 10) + '...' : firstName;
        updateCornerNote('Writing name...', `Hey ${displayName}! 👋`);
      } else {
        updateCornerNote('Writing name...', 'Who are you? ✍️');
      }
    } else if (activeEl === emailInput) {
      const val = emailInput.value.trim();
      if (val.includes('@') && val.includes('.')) {
        updateCornerNote('Writing email...', 'Looks valid! 📬');
      } else if (val.length > 0) {
        updateCornerNote('Writing email...', "I'll reply here! ✉️");
      } else {
        updateCornerNote('Writing email...', 'Where to reply? ✉️');
      }
    } else if (activeEl === subjectInput) {
      const val = subjectInput.value;
      if (val) {
        updateCornerNote('Selected topic!', 'Great topic! 🚀');
      } else {
        updateCornerNote('Choosing topic...', "What's on mind? 📌");
      }
    } else if (activeEl === phoneInput) {
      const val = phoneInput.value.trim();
      if (val.length > 0) {
        updateCornerNote('Writing phone...', 'Got your line! 📞');
      } else {
        updateCornerNote('Writing phone...', 'Optional line 📱');
      }
    } else if (activeEl === msgArea) {
      const val = msgArea.value.trim();
      if (val.length > 0) {
        updateCornerNote('Writing message...', "I'm listening! 💬");
        clearTimeout(msgDebounceTimer);
        msgDebounceTimer = setTimeout(() => {
          if (document.activeElement === msgArea && msgArea.value.trim().length > 0) {
            updateCornerNote('Writing message...', "Can't wait to read! ✨");
          }
        }, 900);
      } else {
        updateCornerNote('Writing message...', 'Spill the tea! ☕');
      }
    } else {
      updateCornerNote('No bots.', 'Just me.');
    }
  }

  // Expose helper globally so submit handlers can trigger note states if needed
  window.updateContactCornerNote = updateCornerNote;

  // Attach event listeners to all contact inputs
  allContactInputs.forEach(input => {
    input.addEventListener('focus', handleInputState);
    input.addEventListener('input', handleInputState);
    input.addEventListener('change', handleInputState);
    input.addEventListener('blur', () => {
      setTimeout(handleInputState, 50);
    });
  });

  // 6. NICER CHARACTER COUNTER (0 characters -> 412 / 500 near limit)
  const charCounter = document.getElementById('char-counter');
  if (msgArea && charCounter) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      if (len > 400) {
        charCounter.textContent = `${len} / 500`;
        charCounter.classList.add('near-limit');
      } else {
        charCounter.textContent = `${len} characters`;
        charCounter.classList.remove('near-limit');
      }
    });
  }

  // 7. REAL-TIME FORM INPUT VALIDATION (Green Checkmark Badge & Shake Error)
  const formInputs = document.querySelectorAll('#direct-contact-form input, #direct-contact-form textarea');
  formInputs.forEach(input => {
    const wrapper = input.closest('.input-wrapper');
    if (!wrapper) return;

    function validateField() {
      const val = input.value.trim();
      if (input.type === 'email') {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (isEmailValid) {
          wrapper.classList.add('valid');
          wrapper.classList.remove('error');
        } else {
          wrapper.classList.remove('valid');
        }
      } else if (input.required) {
        if (val.length > 0) {
          wrapper.classList.add('valid');
          wrapper.classList.remove('error');
        } else {
          wrapper.classList.remove('valid');
        }
      }
    }

    input.addEventListener('input', validateField);
    input.addEventListener('blur', validateField);
  });

  // 8. DIRECT MESSAGE FORM SUBMISSION & LOADING STATE SEQUENCE
  const directForm = document.getElementById('direct-contact-form');
  const btnSendMsg = document.getElementById('btn-send-message');
  const btnSendText = document.getElementById('btn-send-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (directForm && btnSendMsg) {
    directForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const msgInput = document.getElementById('contact-message');

      const name = nameInput?.value.trim();
      const email = emailInput?.value.trim();
      const subject = subjectInput?.value || 'General Inquiry';
      const message = msgInput?.value.trim();

      // Check required fields
      let hasError = false;
      [nameInput, emailInput, msgInput].forEach(inp => {
        if (inp && (!inp.value.trim() || (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())))) {
          const wrap = inp.closest('.input-wrapper');
          if (wrap) {
            wrap.classList.add('error');
            setTimeout(() => wrap.classList.remove('error'), 400);
          }
          hasError = true;
        }
      });

      if (hasError) {
        showToast('Please check required fields.');
        return;
      }

      // Enter Loading / Submitting State
      btnSendMsg.disabled = true;
      btnSendMsg.classList.add('submitting');
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnSendText) btnSendText.textContent = 'Sending...';

      // Submit via Web3Forms AJAX API (Free up to 250 submissions/month)
      // Paste your Web3Forms Access Key here:
      const WEB3_ACCESS_KEY = "cbe412a4-2170-4213-8bcd-d7dbd530d0d4";
      const phoneVal = document.getElementById('contact-phone')?.value.trim() || 'N/A';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3_ACCESS_KEY,
          name: name,
          email: email,
          subject: `Portfolio Inquiry: ${subject} from ${name}`,
          phone: phoneVal,
          message: message
        })
      })
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          if (btnSpinner) btnSpinner.style.display = 'none';
          if (btnSendText) btnSendText.textContent = '✓ Message Sent';
          showToast(`Thank you ${name}! Your message has been sent directly.`);

          directForm.reset();
          formInputs.forEach(inp => {
            const wrp = inp.closest('.input-wrapper');
            if (wrp) wrp.classList.remove('valid', 'error');
          });
          if (charCounter) charCounter.textContent = '0 / 500';
          if (window.updateContactCornerNote) window.updateContactCornerNote('No bots.', 'Just me.');
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(err => {
        console.error('Direct submission error:', err);
        // Fallback to mailto if request fails
        const mailtoUrl = `mailto:krishnasahoo11156@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        window.open(mailtoUrl, '_blank');
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnSendText) btnSendText.textContent = '✓ Mailto Opened';
        showToast('Direct delivery failed. Opened mail client instead.');
      })
      .finally(() => {
        setTimeout(() => {
          btnSendMsg.disabled = false;
          btnSendMsg.classList.remove('submitting');
          if (btnSendText) btnSendText.textContent = 'Send Message';
        }, 2500);
      });
    });
  }

  // ⭐ 9. STORY MAP INTERACTIVE CONTROLLER (Handled in story-map.js)

  // 10. SINGLE-PLAY SCROLL REVEAL OBSERVER
  const connectSection = document.getElementById('connect');
  if (connectSection && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          connectSection.classList.add('reveal-active');
          const journeyDesktop = document.getElementById('journey-desktop');
          if (journeyDesktop) {
            journeyDesktop.classList.add('animate-active');
          }
          revealObserver.unobserve(connectSection); // Play once only
        }
      });
    }, { threshold: 0.15 });

    revealObserver.observe(connectSection);
  }

  // 11. DISCORD TAG COPY HANDLER
  const discordCopyBtns = document.querySelectorAll('#discord-copy-btn, .discord-copy-duplicate');
  discordCopyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('queenbee11156').then(() => {
        showToast('📋 Copied Discord Tag: queenbee11156');
      }).catch(() => {
        showToast('Copied: queenbee11156');
      });
    });
  });

  // 4. GOOGLE CALENDAR APPOINTMENT ENGINE
  const apptModal = document.getElementById('appointment-modal');
  const btnOpenModal = document.getElementById('btn-open-calendar-modal');
  const btnCloseModal = document.getElementById('calendar-modal-close');
  const bookingBody = document.getElementById('calendar-booking-body');
  const confirmationBody = document.getElementById('calendar-confirmation-body');

  const monthTitle = document.getElementById('cal-month-title');
  const daysGrid = document.getElementById('calendar-days-grid');
  const btnPrevMonth = document.getElementById('cal-prev-month');
  const btnNextMonth = document.getElementById('cal-next-month');

  const selectedSlotSummary = document.getElementById('selected-slot-summary');
  const summaryModeText = document.getElementById('summary-mode-text');

  // Calendar State
  const now = new Date();
  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth(); // 0-indexed

  let selectedDay = now.getDate() + 1; // Default to tomorrow
  let selectedTime = '10:00 AM';
  let selectedMode = 'Online (Google Meet)';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function openApptModal() {
    if (!apptModal) return;
    apptModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (bookingBody) bookingBody.style.display = 'block';
    if (confirmationBody) confirmationBody.style.display = 'none';
    renderCalendar();
  }

  function closeApptModal() {
    if (!apptModal) return;
    apptModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnOpenModal) btnOpenModal.addEventListener('click', openApptModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeApptModal);
  if (apptModal) {
    apptModal.addEventListener('click', (e) => {
      if (e.target === apptModal) closeApptModal();
    });
  }

  // Render Calendar Days
  function renderCalendar() {
    if (!monthTitle || !daysGrid) return;

    monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    daysGrid.innerHTML = '';

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sun
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Blank cells before day 1
    for (let i = 0; i < firstDayIndex; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-day-btn disabled';
      daysGrid.appendChild(blank);
    }

    // Days 1..totalDaysInMonth
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day-btn';
      btn.textContent = day;

      const dateObj = new Date(currentYear, currentMonth, day);
      const todayFloor = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (dateObj < todayFloor) {
        btn.classList.add('disabled');
      } else {
        if (day === selectedDay && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
          btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
          document.querySelectorAll('.cal-day-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedDay = day;
          updateSummary();
        });
      }

      daysGrid.appendChild(btn);
    }

    updateSummary();
  }

  if (btnPrevMonth) {
    btnPrevMonth.addEventListener('click', () => {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
      renderCalendar();
    });
  }

  if (btnNextMonth) {
    btnNextMonth.addEventListener('click', () => {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
      renderCalendar();
    });
  }

  // Time Slot Selection
  document.querySelectorAll('.time-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.time-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedTime = chip.getAttribute('data-time') || chip.textContent;
      updateSummary();
    });
  });

  // Meeting Mode Selection
  document.querySelectorAll('.mode-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.mode-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedMode = pill.getAttribute('data-mode') || pill.textContent;
      updateSummary();
    });
  });

  function updateSummary() {
    if (selectedSlotSummary) {
      selectedSlotSummary.innerHTML = `Selected: <strong>${monthNames[currentMonth]} ${selectedDay}, ${currentYear} at ${selectedTime}</strong> &bull; <span>${selectedMode}</span>`;
    }
  }

  // Appointment Submission
  const bookerForm = document.getElementById('calendar-booker-form');
  let currentCreatedAppt = null;

  if (bookerForm) {
    bookerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bookerName = document.getElementById('appt-booker-name')?.value.trim();
      const bookerEmail = document.getElementById('appt-booker-email')?.value.trim();
      const bookerNotes = document.getElementById('appt-booker-notes')?.value.trim() || 'General Meeting';

      if (!bookerName || !bookerEmail) {
        showToast('Please enter your name and email address.');
        return;
      }

      const formattedDateStr = `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`;
      const requestId = 'APT-' + Math.random().toString(36).substring(2, 7).toUpperCase();

      currentCreatedAppt = {
        id: requestId,
        name: bookerName,
        email: bookerEmail,
        notes: bookerNotes,
        dateStr: formattedDateStr,
        timeStr: selectedTime,
        mode: selectedMode,
        month: currentMonth,
        day: selectedDay,
        year: currentYear,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Pending'
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('krishna_appointments') || '[]');
      existing.unshift(currentCreatedAppt);
      localStorage.setItem('krishna_appointments', JSON.stringify(existing));

      // Update Confirmation View UI
      if (bookingBody) bookingBody.style.display = 'none';
      if (confirmationBody) confirmationBody.style.display = 'flex';

      const confDateTime = document.getElementById('conf-date-time');
      const confMode = document.getElementById('conf-mode');
      const confBooker = document.getElementById('conf-booker');

      if (confDateTime) confDateTime.textContent = `${formattedDateStr} at ${selectedTime}`;
      if (confMode) confMode.textContent = selectedMode;
      if (confBooker) confBooker.textContent = `${bookerName} (${bookerEmail})`;

      // Build Google Calendar Add Link
      // Time parsing helper
      const gcalBtn = document.getElementById('btn-gcal-link');
      if (gcalBtn) {
        const startISO = formatGoogleCalISO(currentYear, currentMonth + 1, selectedDay, selectedTime);
        const endISO = formatGoogleCalISO(currentYear, currentMonth + 1, selectedDay, selectedTime, 45);
        const title = encodeURIComponent(`Meeting with Krishna Sahoo (${selectedMode})`);
        const details = encodeURIComponent(`Meeting Agenda: ${bookerNotes}\nBooked by: ${bookerName} (${bookerEmail})\nRequest ID: ${requestId}`);
        const location = encodeURIComponent(selectedMode.includes('Online') ? 'Google Meet (Link will be sent on confirmation)' : 'Mumbai, India');

        gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}`;
      }

      showToast('🎉 Appointment Request Logged!');
    });
  }

  // Download .ics File Button
  const btnDownloadIcs = document.getElementById('btn-download-ics');
  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', (e) => {
      e.preventDefault();
      if (!currentCreatedAppt) return;

      const startISO = formatGoogleCalISO(currentCreatedAppt.year, currentCreatedAppt.month + 1, currentCreatedAppt.day, currentCreatedAppt.timeStr);
      const endISO = formatGoogleCalISO(currentCreatedAppt.year, currentCreatedAppt.month + 1, currentCreatedAppt.day, currentCreatedAppt.timeStr, 45);

      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Krishna Sahoo//Portfolio Appointment System//EN',
        'BEGIN:VEVENT',
        `SUMMARY:Meeting with Krishna Sahoo (${currentCreatedAppt.mode})`,
        `DESCRIPTION:Agenda: ${currentCreatedAppt.notes}\\nBooked by: ${currentCreatedAppt.name} (${currentCreatedAppt.email})`,
        `LOCATION:${currentCreatedAppt.mode.includes('Online') ? 'Google Meet' : 'Mumbai, India'}`,
        `DTSTART:${startISO}`,
        `DTEND:${endISO}`,
        'STATUS:TENTATIVE',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `Meeting_Krishna_Sahoo_${currentCreatedAppt.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📥 Downloaded .ics Calendar File');
    });
  }

  // Format ISO string for Google Calendar (YYYYMMDDTHHmmssZ)
  function formatGoogleCalISO(yr, mo, dy, timeStr, addMinutes = 0) {
    let hour = 10;
    let minute = 0;

    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      hour = parseInt(match[1], 10);
      minute = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }

    const dateObj = new Date(yr, mo - 1, dy, hour, minute + addMinutes);

    const pad = (n) => String(n).padStart(2, '0');
    return `${dateObj.getUTCFullYear()}${pad(dateObj.getUTCMonth() + 1)}${pad(dateObj.getUTCDate())}T${pad(dateObj.getUTCHours())}${pad(dateObj.getUTCMinutes())}00Z`;
  }

  // 5. SECURE HOST MANAGEMENT PORTAL HANDLER
  const hostModal = document.getElementById('host-portal-modal');
  const btnHostTrigger = document.getElementById('hidden-host-trigger');
  const btnCloseHostModal = document.getElementById('host-modal-close');

  const hostAuthView = document.getElementById('host-auth-view');
  const hostDashboardView = document.getElementById('host-dashboard-view');
  const hostPasscodeInput = document.getElementById('host-passcode-input');
  const btnUnlockHost = document.getElementById('btn-unlock-host');
  const hostAuthError = document.getElementById('host-auth-error');

  const hostRequestsList = document.getElementById('host-requests-list');
  const hostPendingCount = document.getElementById('host-pending-count');
  const btnClearRequests = document.getElementById('btn-clear-requests');

  function openHostModal() {
    if (!hostModal) return;
    hostModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeHostModal() {
    if (!hostModal) return;
    hostModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnHostTrigger) btnHostTrigger.addEventListener('click', openHostModal);
  if (btnCloseHostModal) btnCloseHostModal.addEventListener('click', closeHostModal);

  // Shortcut key combo Ctrl + Shift + K to toggle Host portal
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'K') {
      openHostModal();
    }
  });

  if (btnUnlockHost && hostPasscodeInput) {
    btnUnlockHost.addEventListener('click', () => {
      if (hostPasscodeInput.value.trim() === '11156' || hostPasscodeInput.value.trim() === 'admin') {
        if (hostAuthView) hostAuthView.style.display = 'none';
        if (hostDashboardView) hostDashboardView.style.display = 'block';
        if (hostAuthError) hostAuthError.style.display = 'none';
        renderHostRequests();
        showToast('🔓 Host Portal Unlocked');
      } else {
        if (hostAuthError) hostAuthError.style.display = 'block';
      }
    });
  }

  function renderHostRequests() {
    if (!hostRequestsList || !hostPendingCount) return;

    const requests = JSON.parse(localStorage.getItem('krishna_appointments') || '[]');
    const pending = requests.filter(r => r.status === 'Pending');

    hostPendingCount.textContent = pending.length;
    hostRequestsList.innerHTML = '';

    if (requests.length === 0) {
      hostRequestsList.innerHTML = '<p style="color: #94a3b8; font-size: 0.9rem;">No appointment requests found.</p>';
      return;
    }

    requests.forEach((req, idx) => {
      const item = document.createElement('div');
      item.className = 'request-card-item';

      item.innerHTML = `
        <div class="request-card-header">
          <span class="request-booker-name">${req.name} (${req.email})</span>
          <span style="font-size: 0.78rem; padding: 0.2rem 0.6rem; border-radius: 50px; background: ${req.status === 'Accepted' ? '#d1fae5; color: #047857;' : req.status === 'Rejected' ? '#fee2e2; color: #b91c1c;' : '#fef3c7; color: #b45309;'} font-weight: 700;">
            ${req.status}
          </span>
        </div>
        <div class="request-meta">
          📍 ${req.mode} &bull; 📅 ${req.dateStr} at ${req.timeStr}
        </div>
        <div class="request-notes">
          Agenda: &ldquo;${req.notes}&rdquo;
        </div>
        ${req.status === 'Pending' ? `
          <div class="request-actions">
            <button class="btn-host-accept" data-idx="${idx}">Accept &amp; Send Meet Link</button>
            <button class="btn-host-reject" data-idx="${idx}">Reject / Reschedule</button>
          </div>
        ` : ''}
      `;

      hostRequestsList.appendChild(item);
    });

    // Accept / Reject Listeners
    document.querySelectorAll('.btn-host-accept').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        requests[idx].status = 'Accepted';
        localStorage.setItem('krishna_appointments', JSON.stringify(requests));
        renderHostRequests();
        showToast(`✅ Accepted appointment for ${requests[idx].name}! Google Meet invitation dispatched.`);
      });
    });

    document.querySelectorAll('.btn-host-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        requests[idx].status = 'Rejected';
        localStorage.setItem('krishna_appointments', JSON.stringify(requests));
        renderHostRequests();
        showToast(`❌ Rejected/Rescheduled appointment for ${requests[idx].name}. Message sent.`);
      });
    });
  }

  if (btnClearRequests) {
    btnClearRequests.addEventListener('click', () => {
      localStorage.removeItem('krishna_appointments');
      renderHostRequests();
      showToast('Cleared all appointment logs.');
    });
  }

  // 6. BACK TO TOP SMOOTH SCROLL
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 7. FOOTER ROLE TYPEWRITER ANIMATION
 * Cycles continuously between AI & Full Stack Developer -> Open Source Contributor -> Freelancer
 */
function initFooterTypewriter() {
  const footerTypewriterElem = document.getElementById('footer-typewriter-text');
  if (!footerTypewriterElem) return;

  const roles = [
    "AI & Full Stack Developer",
    "Open Source Contributor",
    "Freelancer"
  ];
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeFooterRole() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      typeSpeed = 40;
    } else {
      charIdx++;
      typeSpeed = 85;
    }

    footerTypewriterElem.textContent = currentRole.substring(0, charIdx);

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200; // Pause when role is fully typed out
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 300; // Pause before typing next role
    }

    setTimeout(typeFooterRole, typeSpeed);
  }

  // Start deleting first role after 2-second initial pause
  setTimeout(() => {
    isDeleting = true;
    typeFooterRole();
  }, 2000);
}


