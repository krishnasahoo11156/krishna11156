/**
 * Krishna Sahoo Portfolio - Main JS Entry
 * Handles interactive effects (like typewriter tagline) and smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize typewriter effect for tagline
  initTypewriter();
  
  // Initialize subtle mouse glow effect in hero section
  initHeroGlow();

  // Initialize Resume Modal Viewer
  initResumeModal();
});

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
 * Adds a dynamic light follow effect centered on mouse movement
 * inside the hero section, simulating a digital canvas gradient.
 */
function initHeroGlow() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  // Create a glow element dynamically
  const glow = document.createElement('div');
  glow.style.position = 'absolute';
  glow.style.width = '600px';
  glow.style.height = '600px';
  glow.style.borderRadius = '50%';
  glow.style.background = 'radial-gradient(circle, rgba(0, 242, 254, 0.035) 0%, transparent 70%)';
  glow.style.pointerEvents = 'none';
  glow.style.transform = 'translate(-50%, -50%)';
  glow.style.zIndex = '1';
  glow.style.display = 'none';
  hero.appendChild(glow);
  
  hero.addEventListener('mouseenter', () => {
    glow.style.display = 'block';
  });
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  });
  
  hero.addEventListener('mouseleave', () => {
    glow.style.display = 'none';
  });
}
