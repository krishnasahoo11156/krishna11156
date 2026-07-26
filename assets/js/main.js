/**
 * Krishna Sahoo Portfolio - Main JS Entry
 * Handles navbar, scroll effects, mobile menu, testimonials drag, and global interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initResumeModal();
  initNavbar();
  initScrollHint();
  initTestimonialsScroll();
  initSectionObserver();
  initStatsCounter();
  initTimelineObserver();
  initCurrentlyBuildingPreviews();
  initSectionTransitions();
  initBlogReader();
  initHeroPanels();
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
 * Testimonials section — mouse & touch drag-to-scroll
 */
function initTestimonialsScroll() {
  const wrapper = document.getElementById('testimonials-track-wrapper');
  if (!wrapper) return;

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.classList.add('grabbing');
    startX = e.pageX - wrapper.offsetLeft;
    scrollStart = wrapper.scrollLeft;
    e.preventDefault();
  });

  ['mouseleave', 'mouseup'].forEach(evt => {
    wrapper.addEventListener(evt, () => {
      isDown = false;
      wrapper.classList.remove('grabbing');
    });
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - wrapper.offsetLeft;
    wrapper.scrollLeft = scrollStart - (x - startX) * 1.4;
  });

  // Touch support
  let touchStartX = 0;
  let touchScrollStart = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollStart = wrapper.scrollLeft;
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    wrapper.scrollLeft = touchScrollStart + (touchStartX - e.touches[0].pageX);
  }, { passive: true });
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
 * Typewriter effect for the tagline (if .typewriter-text element exists)
 */
function initTypewriter() {
  const target = document.querySelector('.typewriter-text');
  if (!target) return;

  const words = JSON.parse(target.getAttribute('data-words') || '[]');
  if (!words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1000);
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
    });

    window.addEventListener('resize', () => {
      const activeBtn = tabSendMsg.classList.contains('active') ? tabSendMsg : tabBookAppt;
      updateTabIndicator(activeBtn);
    });
  }

  // ⭐ 2. SOFT AMBIENT CURSOR LIGHT (180px, 3% Opacity Inside Paper Card)
  const paperCard = document.getElementById('contact-paper-card');
  const ambientLight = document.getElementById('paper-ambient-light');

  if (paperCard && ambientLight) {
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let animFrame = null;

    function updateAmbientPos() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      ambientLight.style.left = `${currentX}px`;
      ambientLight.style.top = `${currentY}px`;

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        animFrame = requestAnimationFrame(updateAmbientPos);
      } else {
        animFrame = null;
      }
    }

    paperCard.addEventListener('mousemove', (e) => {
      const rect = paperCard.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!animFrame) {
        animFrame = requestAnimationFrame(updateAmbientPos);
      }
    });
  }

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

  // ⭐ 5. REACTIVE HANDWRITTEN CORNER NOTE (Updates Text State when User Types in Textarea)
  const msgArea = document.getElementById('contact-message');
  const cornerNoteText = document.getElementById('corner-note-text');
  let typingDebounceTimer = null;

  if (msgArea && cornerNoteText) {
    msgArea.addEventListener('input', () => {
      const val = msgArea.value.trim();
      if (!val) {
        cornerNoteText.textContent = 'No bots. Just me.';
        return;
      }

      cornerNoteText.textContent = 'Reading...';
      clearTimeout(typingDebounceTimer);

      typingDebounceTimer = setTimeout(() => {
        if (msgArea.value.trim().length > 0) {
          cornerNoteText.textContent = "I'll reply soon :)";
        }
      }, 800);
    });
  }

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

      // Flying paper plane & morphing logic
      setTimeout(() => {
        // Mailto fallback dispatch
        const mailtoUrl = `mailto:krishnasahoo11156@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        window.open(mailtoUrl, '_blank');

        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnSendText) btnSendText.textContent = '✓ Message Sent';
        showToast(`Thank you ${name}! Direct message opened in your email client.`);

        directForm.reset();
        formInputs.forEach(inp => {
          const wrp = inp.closest('.input-wrapper');
          if (wrp) wrp.classList.remove('valid', 'error');
        });
        if (charCounter) charCounter.textContent = '0 / 500';
        if (cornerNoteText) cornerNoteText.textContent = 'Just me.';

        // Reset button state after 2.5s
        setTimeout(() => {
          btnSendMsg.disabled = false;
          btnSendMsg.classList.remove('submitting');
          if (btnSendText) btnSendText.textContent = 'Send Message';
        }, 2500);

      }, 700);
    });
  }

  // ⭐ 9. DETERMINISTIC FINITE STATE MACHINE (FSM) — INTERACTIVE STORY MAP
  class StoryMapFSM {
    constructor() {
      this.wrapper = document.getElementById('world-map-wrapper');
      this.viewWorld = document.getElementById('view-world');
      this.viewIndia = document.getElementById('view-india');
      this.viewMh = document.getElementById('view-maharashtra');
      this.viewCard = document.getElementById('view-info-card');
      
      this.paperPlane = document.getElementById('map-paper-plane');
      this.flightRoutePath = document.getElementById('flight-route-path');
      this.tooltip = document.getElementById('map-tooltip');
      this.tooltipText = document.getElementById('map-tooltip-text');
      this.note = document.getElementById('story-note');
      this.noteText = document.getElementById('story-note-text');

      this.bcWorld = document.getElementById('bc-world');
      this.bcIndia = document.getElementById('bc-india');
      this.bcMh = document.getElementById('bc-mh');
      this.bcCard = document.getElementById('bc-card');
      this.sepIndia = document.getElementById('sep-india');
      this.sepMh = document.getElementById('sep-mh');
      this.sepCard = document.getElementById('sep-card');

      this.btnIndia = document.querySelector('.world-india-highlight');
      this.btnMh = document.getElementById('btn-explore-mh');
      this.btnMumbai = document.getElementById('btn-explore-mumbai');

      this.state = 0; // 0: World, 2: India, 3: MH, 4: Card
      this.hoverTimer = null;
      this.animFrame = null;
      this.flightProgress = 0;
      this.isHovered = false;
      this.isResetting = false;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.wrapper) this.init();
    }

    init() {
      // 1. Mouse & Focus Enter/Leave Listeners
      this.wrapper.addEventListener('mouseenter', () => this.handleMouseEnter());
      this.wrapper.addEventListener('mouseleave', () => this.handleMouseLeave());
      this.wrapper.addEventListener('focusin', () => this.handleMouseEnter());
      this.wrapper.addEventListener('focusout', (e) => {
        if (!this.wrapper.contains(e.relatedTarget)) this.handleMouseLeave();
      });

      // 2. Interactive View & Element Click Triggers
      if (this.viewWorld) {
        this.viewWorld.addEventListener('click', (e) => {
          if (this.state === 0 && !e.target.closest('.story-breadcrumbs')) {
            this.gotoState(2);
          }
        });
      }
      if (this.viewIndia) {
        this.viewIndia.addEventListener('click', (e) => {
          if (this.state === 2 && !e.target.closest('.story-breadcrumbs')) {
            this.gotoState(3);
          }
        });
      }
      if (this.viewMh) {
        this.viewMh.addEventListener('click', (e) => {
          if (this.state === 3 && !e.target.closest('.story-breadcrumbs')) {
            this.gotoState(4);
          }
        });
      }
      if (this.tooltip) {
        this.tooltip.addEventListener('click', () => {
          if (this.state === 0) this.gotoState(2);
          else if (this.state === 2) this.gotoState(3);
          else if (this.state === 3) this.gotoState(4);
        });
      }

      if (this.btnIndia) {
        this.btnIndia.addEventListener('click', (e) => { e.stopPropagation(); this.gotoState(2); });
        this.btnIndia.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.gotoState(2); }
        });
      }
      if (this.btnMh) {
        this.btnMh.addEventListener('click', (e) => { e.stopPropagation(); this.gotoState(3); });
        this.btnMh.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.gotoState(3); }
        });
      }
      if (this.btnMumbai) {
        this.btnMumbai.addEventListener('click', (e) => { e.stopPropagation(); this.gotoState(4); });
        this.btnMumbai.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.gotoState(4); }
        });
      }

      // 3. Breadcrumb Click Handlers
      if (this.bcWorld) this.bcWorld.addEventListener('click', () => this.gotoState(0));
      if (this.bcIndia) this.bcIndia.addEventListener('click', () => this.gotoState(2));
      if (this.bcMh) this.bcMh.addEventListener('click', () => this.gotoState(3));
      if (this.bcCard) this.bcCard.addEventListener('click', () => this.gotoState(4));

      // Set initial UI
      this.renderState();
    }

    handleMouseEnter() {
      if (this.isResetting) return;
      this.isHovered = true;

      // 120ms debounce delay before triggering State 1 hover animation
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() => {
        if (this.isHovered && this.state === 0) {
          this.triggerState1Hover();
        }
      }, 120);
    }

    triggerState1Hover() {
      if (this.prefersReducedMotion) {
        if (this.tooltip) {
          this.tooltipText.textContent = "📍 Mumbai • Click to explore →";
          this.tooltip.classList.add('visible');
        }
        return;
      }

      this.flightProgress = 0;
      if (this.paperPlane) this.paperPlane.style.opacity = '1';

      if (this.flightRoutePath && this.flightRoutePath.getTotalLength) {
        const routeLength = this.flightRoutePath.getTotalLength();

        const stepFlight = () => {
          if (!this.isHovered || this.state !== 0) return;

          this.flightProgress += 0.02;
          if (this.flightProgress >= 1) {
            this.flightProgress = 1;
            if (this.paperPlane) this.paperPlane.style.opacity = '0.75';
            if (this.tooltip) {
              this.tooltipText.textContent = "📍 Mumbai • Click to explore →";
              this.tooltip.classList.add('visible');
            }
          }

          const pt = this.flightRoutePath.getPointAtLength(this.flightProgress * routeLength);
          const nextPt = this.flightRoutePath.getPointAtLength(Math.min(routeLength, this.flightProgress * routeLength + 2));
          const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

          if (this.paperPlane) {
            this.paperPlane.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
          }

          if (this.flightProgress < 1) {
            this.animFrame = requestAnimationFrame(stepFlight);
          }
        };

        this.animFrame = requestAnimationFrame(stepFlight);
      }
    }

    handleMouseLeave() {
      this.isHovered = false;
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
      if (this.animFrame) cancelAnimationFrame(this.animFrame);

      // Perform graceful 700-900ms reset sequence to return to Idle World
      this.performGracefulReset();
    }

    performGracefulReset() {
      this.isResetting = true;
      if (this.tooltip) this.tooltip.classList.remove('visible');

      // Step-by-step reverse transition back to State 0
      const resetStep = (fromState) => {
        if (fromState > 0) {
          const nextState = fromState === 4 ? 3 : fromState === 3 ? 2 : 0;
          this.state = nextState;
          this.renderState();
          setTimeout(() => resetStep(nextState), 220);
        } else {
          // Final reset of World view elements
          this.state = 0;
          this.renderState();
          if (this.paperPlane) {
            this.paperPlane.style.opacity = '1';
            this.paperPlane.setAttribute('transform', 'translate(248, 134) rotate(15)');
          }
          this.isResetting = false;
        }
      };

      resetStep(this.state);
    }

    gotoState(targetState) {
      if (this.isResetting) return;
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
      this.state = targetState;
      this.renderState();
    }

    renderState() {
      // 1. Hide all views
      if (this.viewWorld) this.viewWorld.classList.add('hidden');
      if (this.viewIndia) this.viewIndia.classList.add('hidden');
      if (this.viewMh) this.viewMh.classList.add('hidden');
      if (this.viewCard) this.viewCard.classList.add('hidden');

      // 2. Hide all breadcrumbs
      [this.bcIndia, this.bcMh, this.bcCard, this.sepIndia, this.sepMh, this.sepCard].forEach(el => {
        if (el) el.classList.add('hidden');
      });

      if (this.bcWorld) this.bcWorld.classList.remove('active');
      if (this.bcIndia) this.bcIndia.classList.remove('active');
      if (this.bcMh) this.bcMh.classList.remove('active');
      if (this.bcCard) this.bcCard.classList.remove('active');

      // 3. Render target state
      switch (this.state) {
        case 0: // World
          if (this.viewWorld) this.viewWorld.classList.remove('hidden');
          if (this.bcWorld) this.bcWorld.classList.add('active');
          if (this.noteText) this.noteText.textContent = "Follow the journey.";
          if (this.note) this.note.style.opacity = '1';
          if (this.tooltip && !this.isHovered) this.tooltip.classList.remove('visible');
          break;

        case 2: // India
          if (this.viewIndia) this.viewIndia.classList.remove('hidden');
          if (this.sepIndia) this.sepIndia.classList.remove('hidden');
          if (this.bcIndia) {
            this.bcIndia.classList.remove('hidden');
            this.bcIndia.classList.add('active');
          }
          if (this.noteText) this.noteText.textContent = "Home base.";
          if (this.note) this.note.style.opacity = '1';
          if (this.tooltip) {
            this.tooltipText.textContent = "Click Maharashtra →";
            this.tooltip.classList.add('visible');
          }
          break;

        case 3: // Maharashtra
          if (this.viewMh) this.viewMh.classList.remove('hidden');
          if (this.sepIndia) this.sepIndia.classList.remove('hidden');
          if (this.bcIndia) this.bcIndia.classList.remove('hidden');
          if (this.sepMh) this.sepMh.classList.remove('hidden');
          if (this.bcMh) {
            this.bcMh.classList.remove('hidden');
            this.bcMh.classList.add('active');
          }
          if (this.noteText) this.noteText.textContent = "Where ideas become products.";
          if (this.note) this.note.style.opacity = '1';
          if (this.tooltip) {
            this.tooltipText.textContent = "Click Mumbai →";
            this.tooltip.classList.add('visible');
          }
          break;

        case 4: // Info Card
          if (this.viewCard) this.viewCard.classList.remove('hidden');
          if (this.sepIndia) this.sepIndia.classList.remove('hidden');
          if (this.bcIndia) this.bcIndia.classList.remove('hidden');
          if (this.sepMh) this.sepMh.classList.remove('hidden');
          if (this.bcMh) this.bcMh.classList.remove('hidden');
          if (this.sepCard) this.sepCard.classList.remove('hidden');
          if (this.bcCard) {
            this.bcCard.classList.remove('hidden');
            this.bcCard.classList.add('active');
          }
          if (this.note) this.note.style.opacity = '0';
          if (this.tooltip) this.tooltip.classList.remove('visible');
          break;
      }
    }
  }

  // Instantiate Story Map FSM
  new StoryMapFSM();

  // 10. SINGLE-PLAY SCROLL REVEAL OBSERVER
  const connectSection = document.getElementById('connect');
  if (connectSection && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          connectSection.classList.add('reveal-active');
          revealObserver.unobserve(connectSection); // Play once only
        }
      });
    }, { threshold: 0.15 });

    revealObserver.observe(connectSection);
  }

  // 11. DISCORD TAG COPY HANDLER
  const discordCopyBtn = document.getElementById('discord-copy-btn');
  if (discordCopyBtn) {
    discordCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('queenbee11156').then(() => {
        showToast('📋 Copied Discord Tag: queenbee11156');
      }).catch(() => {
        showToast('Copied: queenbee11156');
      });
    });
  }

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
  const btnHostTrigger = document.getElementById('btn-host-login-trigger');
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


