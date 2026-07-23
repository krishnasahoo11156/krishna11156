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
