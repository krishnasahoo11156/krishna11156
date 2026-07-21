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
 * Handles opening and closing of the Resume Viewer Modal
 */
function initResumeModal() {
  const resumeBtn = document.getElementById('resume-nav-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-close-btn');

  if (!resumeBtn || !modal || !closeBtn) return;

  // Open modal
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent opening the PDF directly
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock main page scrolling
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  };

  // Close on button click
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking overlay backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Typewriter effect for the tagline
 */
function initTypewriter() {
  const target = document.querySelector('.typewriter-text');
  if (!target) return;

  const words = JSON.parse(target.getAttribute('data-words') || '[]');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150; // Typing speed

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75; // Faster deletion
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150; // Normal typing
    }

    // Switch states
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  // Start typewriter loop
  setTimeout(type, 1000);
}

/**
 * Full-Screen Modal Overlay Manager (Blogs & Socials)
 * Opens full-screen 4-column vertical parallax conveyors for Blogs and Socials.
 */
function initHeroPanels() {
  const blogsModal = document.getElementById('blogs-modal-overlay');
  const socialsModal = document.getElementById('socials-modal-overlay');

  const btnOpenBlogs = document.getElementById('btn-open-blogs');
  const btnOpenSocials = document.getElementById('btn-open-socials');

  const blogsClose = document.getElementById('modal-blogs-close');
  const blogsCloseSec = document.getElementById('modal-blogs-close-sec');
  const blogsBackdrop = document.getElementById('blogs-modal-backdrop');

  const socialsClose = document.getElementById('modal-socials-close');
  const socialsCloseSec = document.getElementById('modal-socials-close-sec');
  const socialsBackdrop = document.getElementById('socials-modal-backdrop');

  const switchBlogsToSocials = document.getElementById('modal-blogs-to-socials');
  const switchSocialsToBlogs = document.getElementById('modal-socials-to-blogs');

  function openModal(modal) {
    closeAllModals();
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllModals() {
    [blogsModal, socialsModal].forEach(m => {
      if (m) {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      }
    });
    document.body.style.overflow = '';
  }

  if (btnOpenBlogs) btnOpenBlogs.addEventListener('click', () => openModal(blogsModal));
  if (btnOpenSocials) btnOpenSocials.addEventListener('click', () => openModal(socialsModal));

  if (blogsClose) blogsClose.addEventListener('click', closeAllModals);
  if (blogsCloseSec) blogsCloseSec.addEventListener('click', closeAllModals);
  if (blogsBackdrop) blogsBackdrop.addEventListener('click', closeAllModals);

  if (socialsClose) socialsClose.addEventListener('click', closeAllModals);
  if (socialsCloseSec) socialsCloseSec.addEventListener('click', closeAllModals);
  if (socialsBackdrop) socialsBackdrop.addEventListener('click', closeAllModals);

  if (switchBlogsToSocials) switchBlogsToSocials.addEventListener('click', () => openModal(socialsModal));
  if (switchSocialsToBlogs) switchSocialsToBlogs.addEventListener('click', () => openModal(blogsModal));

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Intercept nav links targeting #blogs or #socials
  document.querySelectorAll('a[href="#blogs"], a[href="#socials"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#blogs') {
        e.preventDefault();
        openModal(blogsModal);
      } else if (target === '#socials') {
        e.preventDefault();
        openModal(socialsModal);
      }
    });
  });

  initBlogReader();
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
