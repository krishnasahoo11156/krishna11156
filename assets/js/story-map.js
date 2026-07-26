// ── Single Interactive World Map Hover & Grace Controller ──
document.addEventListener('DOMContentLoaded', () => {
  const mapWrapper = document.getElementById('world-map-wrapper');
  const paperPlane = document.getElementById('map-paper-plane');
  const flightRoutePath = document.getElementById('flight-route-path');
  const pulseRing = document.getElementById('mumbai-pulse-ring');

  if (!mapWrapper) return;

  let animFrame = null;
  let graceTimer = null;
  let flightProgress = 0;
  let isHovered = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startHoverSequence() {
    // 1. Cancel any active 900ms grace timer
    if (graceTimer) {
      clearTimeout(graceTimer);
      graceTimer = null;
    }

    if (isHovered) return;
    isHovered = true;
    mapWrapper.classList.add('hovered');

    // 2. Reduced motion fallback
    if (prefersReducedMotion) {
      if (paperPlane) {
        paperPlane.setAttribute('transform', 'translate(554, 188) rotate(15)');
        paperPlane.style.opacity = '0.75';
      }
      return;
    }

    // 3. Trigger single ripple on Mumbai pin
    if (pulseRing) {
      pulseRing.style.animation = 'none';
      void pulseRing.offsetWidth; // Force reflow
      pulseRing.style.animation = 'singleRipple 1.6s ease-out 1 forwards';
    }

    // 4. Animate Paper Plane along Bézier path to Mumbai (554, 188)
    if (flightRoutePath && flightRoutePath.getTotalLength) {
      const routeLength = flightRoutePath.getTotalLength();
      if (animFrame) cancelAnimationFrame(animFrame);
      flightProgress = 0;

      function stepFlight() {
        if (!isHovered) return;

        flightProgress += 0.022; // Smooth 60 FPS flight step
        if (flightProgress >= 1) {
          flightProgress = 1;
          if (paperPlane) paperPlane.style.opacity = '0.75'; // Keep plane parked
        }

        const pt = flightRoutePath.getPointAtLength(flightProgress * routeLength);
        const nextPt = flightRoutePath.getPointAtLength(Math.min(routeLength, flightProgress * routeLength + 2));
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

        if (paperPlane) {
          paperPlane.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
        }

        if (flightProgress < 1) {
          animFrame = requestAnimationFrame(stepFlight);
        }
      }

      animFrame = requestAnimationFrame(stepFlight);
    }
  }

  function startGraceTimer() {
    isHovered = false;

    // Start 900ms grace timer before smoothly reversing to idle state
    if (graceTimer) clearTimeout(graceTimer);
    graceTimer = setTimeout(() => {
      resetToIdle();
    }, 900);
  }

  function resetToIdle() {
    if (isHovered) return; // User returned within grace period
    mapWrapper.classList.remove('hovered');

    if (animFrame) cancelAnimationFrame(animFrame);

    // Smoothly reset paper plane back to start position (248, 134)
    if (paperPlane) {
      paperPlane.style.opacity = '1';
      paperPlane.setAttribute('transform', 'translate(248, 134) rotate(15)');
    }

    // Reset pulse ring animation
    if (pulseRing) {
      pulseRing.style.animation = 'none';
    }
  }

  // Event Listeners for Hover & Keyboard Focus
  mapWrapper.addEventListener('mouseenter', startHoverSequence);
  mapWrapper.addEventListener('mouseleave', startGraceTimer);
  mapWrapper.addEventListener('focusin', startHoverSequence);
  mapWrapper.addEventListener('focusout', (e) => {
    if (!mapWrapper.contains(e.relatedTarget)) {
      startGraceTimer();
    }
  });
});
