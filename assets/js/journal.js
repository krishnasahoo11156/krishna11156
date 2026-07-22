/**
 * ENGINEERING DESK — DEVELOPER JOURNAL INTERACTIVE ENGINE
 * Krishna Sahoo Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initDeveloperJournal();
});

function initDeveloperJournal() {
  const backdrop = document.getElementById('engineering-desk-modal');
  const appWrapper = document.getElementById('app-wrapper');
  const closeBtn = document.getElementById('desk-close-btn');
  const navTriggers = document.querySelectorAll('.journal-trigger-btn, #btn-open-blogs, a[href="#blogs"], a[href="#journal"]');
  const searchInput = document.getElementById('desk-search-input');
  const navItems = document.querySelectorAll('.desk-nav-item');
  const filterPills = document.querySelectorAll('.filter-pill');
  const timelineYears = document.querySelectorAll('.timeline-year');
  const newNoteBtn = document.getElementById('desk-floating-btn');

  if (!backdrop) return;

  // Open Journal Modal with spring physics (400-500ms)
  const openJournal = (e) => {
    if (e) e.preventDefault();
    backdrop.classList.add('active');
    if (appWrapper) appWrapper.classList.add('journal-open');
    document.body.classList.add('journal-modal-active');
  };

  // Close Journal Modal
  const closeJournal = () => {
    backdrop.classList.remove('active');
    if (appWrapper) appWrapper.classList.remove('journal-open');
    document.body.classList.remove('journal-modal-active');
  };

  // Bind Triggers
  navTriggers.forEach(btn => btn.addEventListener('click', openJournal));
  if (closeBtn) closeBtn.addEventListener('click', closeJournal);

  // Close on Backdrop Click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeJournal();
  });

  // Keyboard Shortcuts (ESC to close, ⌘K or Ctrl+K for search)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const readerOverlay = document.getElementById('journal-reader-overlay');
      if (readerOverlay && readerOverlay.classList.contains('active')) {
        readerOverlay.classList.remove('active');
      } else if (backdrop.classList.contains('active')) {
        closeJournal();
      }
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      if (backdrop.classList.contains('active')) {
        e.preventDefault();
        if (searchInput) searchInput.focus();
      }
    }
  });

  // Initialize Draggable Desk Cards
  initCardDragging();

  // Sidebar Nav Filtering
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const category = item.getAttribute('data-category');
      filterCardsByCategory(category);
    });
  });

  // Top Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterCardsByCategory(filter);
    });
  });

  // Timeline Year Filter
  timelineYears.forEach(year => {
    year.addEventListener('click', () => {
      timelineYears.forEach(y => {
        y.classList.remove('active');
        const dot = y.querySelector('.active-year-dot');
        if (dot) dot.remove();
      });
      year.classList.add('active');
      const dot = document.createElement('span');
      dot.className = 'active-year-dot';
      year.appendChild(dot);
    });
  });

  // Search Filter Lexer
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.desk-card');
      cards.forEach(card => {
        const title = card.querySelector('h3, .handwritten-text')?.textContent.toLowerCase() || '';
        const text = card.textContent.toLowerCase();
        if (title.includes(query) || text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Floating + New Note Button
  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => {
      const title = prompt('Enter note title:');
      if (!title) return;
      const content = prompt('Enter your thought/note:');
      if (!content) return;
      createNewStickyNote(title, content);
    });
  }

  // Article Reader Close Handler
  const readerCloseBtn = document.getElementById('reader-close-btn');
  const readerOverlay = document.getElementById('journal-reader-overlay');
  if (readerCloseBtn && readerOverlay) {
    readerCloseBtn.addEventListener('click', () => {
      readerOverlay.classList.remove('active');
    });
  }
}

/**
 * Filter Desk Cards by Category
 */
function filterCardsByCategory(category) {
  const cards = document.querySelectorAll('.desk-card');
  if (!category || category.toLowerCase() === 'all' || category.toLowerCase() === 'all notes') {
    cards.forEach(card => card.style.display = 'block');
    return;
  }
  const target = category.toLowerCase();
  cards.forEach(card => {
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
    const cardType = (card.getAttribute('data-type') || '').toLowerCase();
    if (cardCat.includes(target) || cardType.includes(target)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Enable Smooth Drag Physics for Desk Cards
 */
function initCardDragging() {
  const cards = document.querySelectorAll('.desk-card');
  const surface = document.getElementById('desk-canvas-surface');
  if (!surface) return;

  cards.forEach(card => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onMouseDown = (e) => {
      // Don't drag if clicking buttons inside card
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      isDragging = true;
      card.classList.add('dragging');
      startX = e.clientX || e.touches?.[0].clientX;
      startY = e.clientY || e.touches?.[0].clientY;

      const rect = card.getBoundingClientRect();
      const parentRect = surface.getBoundingClientRect();
      initialLeft = rect.left - parentRect.left;
      initialTop = rect.top - parentRect.top;

      // Bring clicked card to top
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      card.style.zIndex = 50;

      // Render in preview panel
      selectCardForPreview(card);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches?.[0].clientX;
      const currentY = e.clientY || e.touches?.[0].clientY;
      const dx = currentX - startX;
      const dy = currentY - startY;

      card.style.left = `${initialLeft + dx}px`;
      card.style.top = `${initialTop + dy}px`;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        card.classList.remove('dragging');
      }
    };

    card.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile/tablet
    card.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Double click to open full article reader
    card.addEventListener('dblclick', () => {
      const title = card.querySelector('h3, .handwritten-text')?.textContent || 'Journal Note';
      openFullReader(title, card);
    });
  });
}

/**
 * Render Selected Card Content into Right Column Preview Panel
 */
function selectCardForPreview(card) {
  const emptyState = document.getElementById('preview-empty-state');
  const previewBox = document.getElementById('preview-content-box');
  if (!emptyState || !previewBox) return;

  const title = card.querySelector('h3, .handwritten-text')?.textContent || 'Developer Note';
  const category = card.getAttribute('data-category') || 'DEEP DIVE';
  const date = card.getAttribute('data-date') || 'May 2025';
  const readTime = card.getAttribute('data-readtime') || '5 min read';
  const desc = card.querySelector('p')?.textContent || 'Detailed thoughts and learnings from Krishna Sahoo\'s engineering journey.';

  emptyState.style.display = 'none';
  previewBox.classList.add('active');

  const titleEl = document.getElementById('preview-title');
  const catEl = document.getElementById('preview-category');
  const dateEl = document.getElementById('preview-date');
  const metaEl = document.getElementById('preview-readtime');
  const descEl = document.getElementById('preview-text');
  const fullBtn = document.getElementById('preview-full-btn');

  if (titleEl) titleEl.textContent = title;
  if (catEl) catEl.textContent = category;
  if (dateEl) dateEl.textContent = date;
  if (metaEl) metaEl.textContent = readTime;
  if (descEl) descEl.innerHTML = `<p>${desc}</p><p>Explore full architectural breakdowns, code samples, and lessons learned during development.</p>`;

  if (fullBtn) {
    fullBtn.onclick = () => openFullReader(title, card);
  }
}

/**
 * Open Fullscreen Article Reader Overlay
 */
function openFullReader(title, card) {
  const overlay = document.getElementById('journal-reader-overlay');
  const readerTitle = document.getElementById('reader-title');
  const readerBody = document.getElementById('reader-body');
  if (!overlay || !readerTitle || !readerBody) return;

  readerTitle.textContent = title;

  const desc = card.querySelector('p')?.textContent || '';
  const category = card.getAttribute('data-category') || 'Article';

  readerBody.innerHTML = `
    <div style="margin-bottom: 24px; color: #10B981; font-weight: 700; text-transform: uppercase; font-size: 12px;">${category}</div>
    <p class="lead" style="font-size: 18px; color: #374151; font-weight: 500;">${desc}</p>
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
    <h2>Overview & Core Problem</h2>
    <p>When approaching software architecture or AI features, the primary goal is clarity. First solve the right problem, then code the right way.</p>
    <pre><code>// Krishna Sahoo — Dev Workflow
const problem = identifyCoreChallenge();
const solution = designArchitecture(problem);
if (solution.isValid) {
  shipProduct();
}</code></pre>
    <h2>Key Learnings</h2>
    <ul>
      <li>Keep code decoupled and modular.</li>
      <li>Optimize performance and accessibility for real users.</li>
      <li>Always learn in public and share raw experiments.</li>
    </ul>
  `;

  overlay.classList.add('active');
}

/**
 * Dynamically Spawn a New Sticky Note on Canvas
 */
function createNewStickyNote(title, text) {
  const surface = document.getElementById('desk-canvas-surface');
  if (!surface) return;

  const note = document.createElement('div');
  note.className = 'desk-card card-green-sticky';
  note.style.top = '120px';
  note.style.left = '160px';
  note.style.transform = 'rotate(2deg)';
  note.setAttribute('data-category', 'QUICK THOUGHT');
  note.setAttribute('data-date', 'Today');
  note.setAttribute('data-readtime', '1 min read');

  note.innerHTML = `
    <div class="push-pin"></div>
    <span class="card-badge">NEW NOTE</span>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(text)}</p>
    <div class="card-footer-meta">
      <span>Today • Just now</span>
      <span class="card-arrow">→</span>
    </div>
  `;

  surface.appendChild(note);
  initCardDragging();
  selectCardForPreview(note);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
