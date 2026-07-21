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
 * Hero Section Right-Side Interactive Sliding Panels Manager
 * Handles seamless slide-in/slide-out animations between overview, blogs, and socials views.
 */
function initHeroPanels() {
  const panelOverview = document.getElementById('hero-panel-overview');
  const panelBlogs = document.getElementById('hero-panel-blogs');
  const panelSocials = document.getElementById('hero-panel-socials');

  const btnOpenBlogs = document.getElementById('btn-open-blogs');
  const btnOpenSocials = document.getElementById('btn-open-socials');
  
  const btnBlogsClose = document.getElementById('blogs-close-btn');
  const btnSocialsClose = document.getElementById('socials-close-btn');

  const btnBlogsToSocials = document.getElementById('blogs-to-socials-btn');
  const btnSocialsToBlogs = document.getElementById('socials-to-blogs-btn');

  if (!panelOverview || !panelBlogs || !panelSocials) return;

  function setActivePanel(panelName) {
    [panelOverview, panelBlogs, panelSocials].forEach(p => p.classList.remove('active'));
    
    if (panelName === 'blogs') {
      panelBlogs.classList.add('active');
    } else if (panelName === 'socials') {
      panelSocials.classList.add('active');
    } else {
      panelOverview.classList.add('active');
    }
  }

  if (btnOpenBlogs) btnOpenBlogs.addEventListener('click', () => setActivePanel('blogs'));
  if (btnOpenSocials) btnOpenSocials.addEventListener('click', () => setActivePanel('socials'));
  
  if (btnBlogsClose) btnBlogsClose.addEventListener('click', () => setActivePanel('overview'));
  if (btnSocialsClose) btnSocialsClose.addEventListener('click', () => setActivePanel('overview'));

  if (btnBlogsToSocials) btnBlogsToSocials.addEventListener('click', () => setActivePanel('socials'));
  if (btnSocialsToBlogs) btnSocialsToBlogs.addEventListener('click', () => setActivePanel('blogs'));

  // ESC key to return to overview
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (panelBlogs.classList.contains('active') || panelSocials.classList.contains('active'))) {
      setActivePanel('overview');
    }
  });

  // Intercept navigation links targeting #blogs or #socials
  document.querySelectorAll('a[href="#blogs"], a[href="#socials"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#blogs' || target === '#socials') {
        const hero = document.getElementById('hero-section');
        if (hero) {
          hero.scrollIntoView({ behavior: 'smooth' });
          setActivePanel(target === '#blogs' ? 'blogs' : 'socials');
        }
      }
    });
  });
}


