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

  // Initialize Infinite Canvas Pan & Zoom Engine
  initCanvasPanAndZoom();

  // Initialize Interactive Splitter Resizer for Canvas & Preview Panel
  initPanelResizer();

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

// Global Pan & Zoom State
let canvasScale = 1.0;
let canvasPanX = 0;
let canvasPanY = 0;
let isPanningCanvas = false;

/**
 * Initialize Infinite Grid Pan & Zoom Engine for Engineering Desk
 */
function initCanvasPanAndZoom() {
  const surface = document.getElementById('desk-canvas-surface');
  const world = document.getElementById('desk-canvas-world');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomReset = document.getElementById('btn-zoom-reset');
  const zoomText = document.getElementById('zoom-level-text');

  if (!surface || !world) return;

  function updateTransform() {
    world.style.transform = `translate3d(${canvasPanX}px, ${canvasPanY}px, 0px) scale(${canvasScale})`;
    // Scale and shift dot grid pattern dynamically for infinite desk depth
    surface.style.backgroundPosition = `${canvasPanX}px ${canvasPanY}px`;
    surface.style.backgroundSize = `${24 * canvasScale}px ${24 * canvasScale}px`;
    if (zoomText) {
      zoomText.textContent = `${Math.round(canvasScale * 100)}%`;
    }
  }

  // Mouse wheel zoom focused on cursor
  surface.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newScale = Math.min(Math.max(canvasScale * zoomFactor, 0.4), 2.5);

    const rect = surface.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    canvasPanX = mouseX - (mouseX - canvasPanX) * (newScale / canvasScale);
    canvasPanY = mouseY - (mouseY - canvasPanY) * (newScale / canvasScale);
    canvasScale = newScale;

    updateTransform();
  }, { passive: false });

  // Pan canvas when dragging empty surface or background world
  let startX, startY;
  surface.addEventListener('mousedown', (e) => {
    // Only pan if clicking canvas background, doodle, or world container (not card or controls)
    if (
      e.target === surface ||
      e.target === world ||
      e.target.classList.contains('doodle-annotation') ||
      e.target.tagName === 'svg' ||
      e.target.tagName === 'path'
    ) {
      if (e.target.closest('.desk-card') || e.target.closest('.canvas-controls-bar') || e.target.closest('.desk-floating-btn')) return;
      isPanningCanvas = true;
      surface.classList.add('panning');
      startX = e.clientX - canvasPanX;
      startY = e.clientY - canvasPanY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanningCanvas) return;
    canvasPanX = e.clientX - startX;
    canvasPanY = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isPanningCanvas) {
      isPanningCanvas = false;
      surface.classList.remove('panning');
    }
  });

  // Touch panning support for mobile/trackpads
  let touchStartX, touchStartY;
  surface.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && (e.target === surface || e.target === world)) {
      isPanningCanvas = true;
      surface.classList.add('panning');
      touchStartX = e.touches[0].clientX - canvasPanX;
      touchStartY = e.touches[0].clientY - canvasPanY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isPanningCanvas || e.touches.length !== 1) return;
    canvasPanX = e.touches[0].clientX - touchStartX;
    canvasPanY = e.touches[0].clientY - touchStartY;
    updateTransform();
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isPanningCanvas = false;
    surface.classList.remove('panning');
  });

  // Zoom Control Buttons
  if (btnZoomIn) {
    btnZoomIn.onclick = () => {
      canvasScale = Math.min(canvasScale * 1.2, 2.5);
      updateTransform();
    };
  }
  if (btnZoomOut) {
    btnZoomOut.onclick = () => {
      canvasScale = Math.max(canvasScale / 1.2, 0.4);
      updateTransform();
    };
  }
  if (btnZoomReset || zoomText) {
    const resetView = () => {
      canvasScale = 1.0;
      canvasPanX = 0;
      canvasPanY = 0;
      updateTransform();
    };
    if (btnZoomReset) btnZoomReset.onclick = resetView;
    if (zoomText) zoomText.onclick = resetView;
  }
}

/**
 * Enable Smooth Drag Physics for Desk Cards
 */
function initCardDragging() {
  const cards = document.querySelectorAll('.desk-card');
  const world = document.getElementById('desk-canvas-world');
  if (!world) return;

  cards.forEach(card => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      e.stopPropagation();
      isDragging = true;
      card.classList.add('dragging');
      startX = e.clientX || e.touches?.[0].clientX;
      startY = e.clientY || e.touches?.[0].clientY;

      const rect = card.getBoundingClientRect();
      const parentRect = world.getBoundingClientRect();
      initialLeft = (rect.left - parentRect.left) / canvasScale;
      initialTop = (rect.top - parentRect.top) / canvasScale;

      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      card.style.zIndex = 50;

      selectCardForPreview(card);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || e.touches?.[0].clientX;
      const currentY = e.clientY || e.touches?.[0].clientY;
      const dx = (currentX - startX) / canvasScale;
      const dy = (currentY - startY) / canvasScale;

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

    card.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);
  });
}

/**
 * Full Articles Database for Direct Right-Column Inline Reading
 */
const JOURNAL_ARTICLES = {
  "How I Think Before I Code": {
    category: "DEEP DIVE",
    date: "May 20, 2025",
    readTime: "6 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">A peek into my problem-solving mindset and how I structure complex software architectures before writing lines of code.</p>
      
      <h3>1. Understand the Core Problem</h3>
      <p>Before jumping into IDEs or writing functions, I take time to define what problem needs solving. Writing code prematurely often leads to building the wrong abstractions.</p>
      
      <blockquote class="article-quote">"First, solve the right problem. Then, code the right way." — Krishna Sahoo</blockquote>
      
      <h3>2. System Breakdown & Edge Cases</h3>
      <p>I sketch out component interactions on digital dot-grid paper: data flow, API endpoints, error handling boundaries, and caching layers.</p>
      
      <div class="article-code-block">
        <pre><code>// Mental Model Execution Flow
async function solveSystemProblem(inputData) {
  const verifiedInput = validateSchema(inputData);
  const coreResult = await executeBusinessLogic(verifiedInput);
  return formatResponse(coreResult);
}</code></pre>
      </div>

      <h3>3. Build, Refine & Ship</h3>
      <p>Iteration speed matters. Prototype early, test thoroughly, measure performance, and keep interfaces clean for future maintainability.</p>
    `
  },
  "Simplicity is not about doing less. It's about doing what matters most.": {
    category: "QUICK THOUGHT",
    date: "May 19, 2025",
    readTime: "2 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">Simplicity is an intentional design choice, not a compromise.</p>
      <p>In software development, complexity accumulates silently—unnecessary dependencies, over-engineered helper functions, and premature optimization. True elegance is removing non-essential friction until only the core essence remains.</p>
      <h3>Key Takeaways:</h3>
      <ul>
        <li>Prefer simple, readable code over clever one-liners.</li>
        <li>Eliminate dead code aggressively.</li>
        <li>Focus on delivering real user value first.</li>
      </ul>
    `
  },
  "Building NoteNest – An AI Study Companion": {
    category: "BUILD LOG",
    date: "May 18, 2025",
    readTime: "7 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">From concept to production in 72 hours. How I built and shipped NoteNest—an AI-powered study companion.</p>
      <h3>The Inspiration</h3>
      <p>Students and developers struggle with parsing lengthy technical docs and lecture notes. NoteNest uses LLMs to convert raw notes into interactive flashcards, concise summaries, and mind maps.</p>
      
      <div class="article-code-block">
        <pre><code>// NoteNest AI Pipeline
const generateStudyDeck = async (rawNotes) => {
  const summary = await ai.summarize(rawNotes);
  const flashcards = fillTemplates(summary.keyTerms);
  return { summary, flashcards };
};</code></pre>
      </div>

      <h3>Results & Metrics</h3>
      <p>Shipped with clean HTML/CSS/JS frontend, fast backend API response times (&lt; 250ms), and 99.4% uptime across user test runs.</p>
    `
  },
  "Designing Scalable REST APIs": {
    category: "DEEP DIVE",
    date: "May 8, 2025",
    readTime: "8 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">Principles, patterns, and production-proven practices for building resilient, high-throughput RESTful APIs.</p>
      <h3>Core Architectural Rules</h3>
      <ol>
        <li><strong>Nouns over verbs:</strong> Use <code>GET /api/v1/projects</code> rather than <code>GET /api/v1/getProjects</code>.</li>
        <li><strong>Consistent HTTP Status Codes:</strong> 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Error.</li>
        <li><strong>Idempotency & Caching:</strong> Leverage ETag, Cache-Control, and rate-limiting headers.</li>
      </ol>
      
      <div class="article-code-block">
        <pre><code>// Express API Endpoint Example
app.get('/api/v1/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  return res.status(200).json({ data: note });
});</code></pre>
      </div>
    `
  },
  "What Hackathons Taught Me": {
    category: "QUICK THOUGHT",
    date: "May 15, 2025",
    readTime: "4 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">Lessons learned beyond winning: team dynamics, fast prioritization, and execution under pressure.</p>
      <p>Participating in competitive hackathons taught me how to compress product timelines from months into hours without sacrificing core quality.</p>
      <h3>3 Core Hackathon Pillars:</h3>
      <ul>
        <li><strong>Alignment:</strong> Clear scope within the first 60 minutes.</li>
        <li><strong>Modular Workflows:</strong> Split frontend, backend, and API integrations cleanly.</li>
        <li><strong>Storytelling & Demo:</strong> A great product needs a clear, compelling presentation.</li>
      </ul>
    `
  },
  "Java Streams Explained Simply": {
    category: "LEARNING",
    date: "May 10, 2025",
    readTime: "5 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">Understanding Java Streams functional processing pipeline from basics to real-world code snippets.</p>
      <h3>Filter, Map & Reduce</h3>
      <p>Java Streams allow declarative operations over data collections cleanly without verbose imperative loops.</p>
      
      <div class="article-code-block">
        <pre><code>List&lt;String&gt; activeProjects = projects.stream()
  .filter(Project::isActive)
  .map(Project::getName)
  .collect(Collectors.toList());</code></pre>
      </div>
    `
  },
  "Balancing College, Projects & Growth": {
    category: "CAREER & GROWTH",
    date: "May 5, 2025",
    readTime: "6 min read",
    author: "Krishna Sahoo",
    content: `
      <p class="article-lead">My personal productivity framework for staying consistent, building real-world projects, and maintaining balance.</p>
      <h3>Time-Blocking & Deep Work</h3>
      <p>I allocate focused 2-hour deep work blocks for coding and project development daily, treating learning as an active continuous habit.</p>
    `
  },
  "Philosophy": {
    category: "PINNED THOUGHT",
    date: "Always",
    readTime: "Pinned",
    author: "Krishna Sahoo",
    content: `
      <blockquote class="article-quote">"First, solve the right problem. Then, code the right way."</blockquote>
      <p class="article-lead">Great engineering is not measured by lines of code written, but by the clarity of the solution delivered.</p>
    `
  }
};

/**
 * Render Full Article Direct into Right Column when Note is Clicked
 */
function selectCardForPreview(card) {
  const emptyState = document.getElementById('preview-empty-state');
  const previewBox = document.getElementById('preview-content-box');
  if (!emptyState || !previewBox) return;

  const title = card.querySelector('h3, .handwritten-text')?.textContent || 'Developer Note';
  const category = card.getAttribute('data-category') || 'DEEP DIVE';
  const date = card.getAttribute('data-date') || 'May 2025';
  const readTime = card.getAttribute('data-readtime') || '5 min read';
  const desc = card.querySelector('p')?.textContent || '';

  emptyState.style.display = 'none';
  previewBox.classList.add('active');

  const titleEl = document.getElementById('preview-title');
  const catEl = document.getElementById('preview-category');
  const dateEl = document.getElementById('preview-date');
  const metaEl = document.getElementById('preview-readtime');
  const authorEl = document.getElementById('preview-author');
  const descEl = document.getElementById('preview-text');

  if (titleEl) titleEl.textContent = title;
  if (catEl) catEl.textContent = category;
  if (dateEl) dateEl.textContent = date;
  if (metaEl) metaEl.textContent = readTime;
  if (authorEl) authorEl.textContent = 'Krishna Sahoo';

  // Check if full article exists in database or generate dynamic rich blog post
  const matchedArticle = JOURNAL_ARTICLES[title.trim()] || JOURNAL_ARTICLES[title.trim().replace(/^"|"$/g, '')];

  if (matchedArticle && descEl) {
    descEl.innerHTML = matchedArticle.content;
  } else if (descEl) {
    descEl.innerHTML = `
      <p class="article-lead">${escapeHtml(desc)}</p>
      <h3>Overview</h3>
      <p>When building systems, focusing on fundamental principles ensures maintainability and scalability.</p>
      <div class="article-code-block">
        <pre><code>// ${escapeHtml(title)} — Core Log
const note = {
  title: "${escapeHtml(title)}",
  category: "${escapeHtml(category)}",
  timestamp: Date.now()
};</code></pre>
      </div>
      <h3>Key Takeaways</h3>
      <ul>
        <li>Focus on core functionality first.</li>
        <li>Iterate rapidly based on user feedback.</li>
        <li>Maintain clean, documented, self-describing code.</li>
      </ul>
    `;
  }

  // Scroll preview panel to top on note selection
  const previewPanel = document.querySelector('.desk-preview-panel');
  if (previewPanel) previewPanel.scrollTop = 0;
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

/**
 * Interactive Panel Resizer (Canvas vs. Preview Splitter)
 * Allows sliding left and right to adjust section widths dynamically (default: 70% canvas, 30% preview)
 */
function initPanelResizer() {
  const grid = document.querySelector('.desk-layout-grid');
  const resizer = document.getElementById('desk-resizer');
  if (!grid || !resizer) return;

  let isResizing = false;

  const onMouseDown = (e) => {
    isResizing = true;
    resizer.classList.add('resizing');
    document.body.style.cursor = 'col-resize';
    grid.style.userSelect = 'none';
    if (e.preventDefault) e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!isResizing) return;
    const clientX = e.clientX || e.touches?.[0].clientX;
    if (!clientX) return;

    const gridRect = grid.getBoundingClientRect();
    const relativeX = clientX - gridRect.left;

    // Calculate percentage (bounded between 45% minimum canvas width and 85% maximum)
    let canvasPercent = (relativeX / gridRect.width) * 100;
    canvasPercent = Math.min(Math.max(canvasPercent, 45), 85);
    const previewPercent = 100 - canvasPercent;

    grid.style.gridTemplateColumns = `${canvasPercent}% ${previewPercent}%`;
    resizer.style.left = `${canvasPercent}%`;
  };

  const onMouseUp = () => {
    if (isResizing) {
      isResizing = false;
      resizer.classList.remove('resizing');
      document.body.style.cursor = '';
      grid.style.userSelect = '';
    }
  };

  resizer.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  resizer.addEventListener('touchstart', onMouseDown, { passive: false });
  window.addEventListener('touchmove', onMouseMove, { passive: false });
  window.addEventListener('touchend', onMouseUp);
}
