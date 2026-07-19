/**
 * Krishna Sahoo Portfolio - Main JS Entry
 * Handles interactive effects (like typewriter tagline) and smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize typewriter effect for tagline
  initTypewriter();

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


