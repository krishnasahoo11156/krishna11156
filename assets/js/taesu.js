/**
 * Taesu — Master Character Engine (v2.0 Master Specification)
 * Krishna Sahoo Portfolio — Taesu's Workshop
 *
 * Implements Finite State Machine (FSM), frame-relative inertia physics chain,
 * 250px specular interaction radius, 750ms emotional cooldown throttle,
 * clean typography status panel, category personality modes, and "The Goodbye" scroll reaction.
 */

const TaesuState = {
  IDLE: 'Idle',
  TRACKING: 'Tracking',
  FOCUSED: 'Focused',
  TRANSITION: 'Transition',
  CELEBRATING: 'Celebrating',
  SLEEPING: 'Sleeping'
};

class TaesuController {
  constructor(mascotEl) {
    if (!mascotEl) return;
    this.el = mascotEl;
    this.bodyEl = mascotEl.querySelector('.taesu-body');
    this.faceEl = mascotEl.querySelector('.taesu-face');
    this.ringEl = mascotEl.querySelector('.taesu-ring');
    this.shadowEl = mascotEl.querySelector('.taesu-shadow');
    this.labelEl = mascotEl.querySelector('.taesu-label');
    this.leftEye = mascotEl.querySelector('.taesu-eye.left');
    this.rightEye = mascotEl.querySelector('.taesu-eye.right');

    // FSM State & Cooldown Throttle
    this.currentState = TaesuState.IDLE;
    this.lastReactionTime = 0;
    this.reactionCooldownMs = 750;

    // Trackers
    this.isSleeping = false;
    this.isCelebrating = false;
    this.isFlying = false;
    this.isHovered = false;
    this.visitedProjects = new Set();
    this.totalProjectsCount = 6;
    this.currentCategory = 'projects';
    this.activePersonality = 'Focused';

    // Physics Targets & Frame-Relative Inertia Chains
    this.eyeTargetX = 0;
    this.eyeTargetY = 0;
    this.eyeCurrentX = 0;
    this.eyeCurrentY = 0;

    this.headTiltX = 0;
    this.headTiltY = 0;
    this.headCurrentX = 0;
    this.headCurrentY = 0;

    this.bodyCurrentX = 0;
    this.bodyCurrentY = 0;

    this.ringCurrentX = 0;
    this.shadowCurrentX = 0;

    // Specular Highlight Radius (250px Max Interaction Radius)
    this.specTargetX = 32;
    this.specTargetY = 24;
    this.specCurrentX = 32;
    this.specCurrentY = 24;

    this.hoverTimer = null;
    this.inactivityTimer = null;
    this.lookAroundTimer = null;
    this.blinkTimer = null;
    this.activeEmotion = 'neutral';

    this._init();
  }

  _init() {
    this._startBlinkLoop();
    this._startPhysicsLoop();
    this._attachEventListeners();
    this._resetInactivity();
    this._observeProjects();
    this._initGoodbyeObserver();
    this.updateStatusPanel('Focused', 'Constellation');
  }

  /* ── Finite State Machine Transition ───────────────────── */
  setState(newState, force = false) {
    const now = Date.now();
    if (!force && (now - this.lastReactionTime < this.reactionCooldownMs)) {
      return false; // Throttled emotional cooldown
    }
    if (this.currentState === newState) return true;

    this.currentState = newState;
    this.lastReactionTime = now;

    // Update Status Card UI (Clean Typography, No Emojis)
    let statusText = 'Curious';
    if (newState === TaesuState.FOCUSED) statusText = 'Focused';
    else if (newState === TaesuState.CELEBRATING) statusText = 'Celebrating';
    else if (newState === TaesuState.SLEEPING) statusText = 'Resting';
    else if (newState === TaesuState.TRANSITION) statusText = 'Adapting';
    else if (newState === TaesuState.IDLE) statusText = this.activePersonality;

    this.updateStatusPanel(statusText);
    return true;
  }

  /* ── Right Panel Clean Typography Status Updater ───────── */
  updateStatusPanel(moodText, watchingText) {
    const moodEl = document.getElementById('taesu-status-mood');
    const watchEl = document.getElementById('taesu-watching-val');
    const exploredEl = document.getElementById('taesu-explored-val');

    if (moodEl && moodText) {
      moodEl.textContent = `Status: ${moodText}`;
    }
    if (watchEl && watchingText !== undefined) {
      watchEl.textContent = watchingText;
    }
    if (exploredEl) {
      exploredEl.textContent = `${this.visitedProjects.size} / ${this.totalProjectsCount}`;
    }
  }

  /* ── Category Personality Modes ────────────────────────── */
  setCategoryPersonality(category) {
    this.currentCategory = category;
    this.setState(TaesuState.TRANSITION, true);

    if (category === 'projects') {
      this.activePersonality = 'Focused';
    } else if (category === 'hackathons') {
      this.activePersonality = 'Energetic';
    } else if (category === 'opensource') {
      this.activePersonality = 'Calm';
    }

    this.setEmotion('curious', 1200);
    this.nod();

    setTimeout(() => {
      this.setState(TaesuState.IDLE, true);
    }, 1200);
  }

  /* ── Event Listeners ────────────────────────────────────── */
  _attachEventListeners() {
    window.addEventListener('mousemove', (e) => this._onMouseMove(e), { passive: true });

    this.el.addEventListener('mouseenter', () => this._onHoverStart());
    this.el.addEventListener('mouseleave', () => this._onHoverEnd());
    this.el.addEventListener('click', () => this._onClickTaesu());

    ['mousemove', 'click', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, () => this._resetInactivity(), { passive: true });
    });
  }

  /* ── Frame-Relative Inertia Physics Loop ────────────────── */
  _startPhysicsLoop() {
    const loop = () => {
      if (!this.isSleeping && !this.isFlying) {
        // Frame 0: Eyes update immediately (lerp 0.22)
        this.eyeCurrentX += (this.eyeTargetX - this.eyeCurrentX) * 0.22;
        this.eyeCurrentY += (this.eyeTargetY - this.eyeCurrentY) * 0.22;

        if (this.faceEl) {
          this.faceEl.style.transform = `translate(calc(-50% + ${this.eyeCurrentX.toFixed(2)}px), calc(-46% + ${this.eyeCurrentY.toFixed(2)}px)) translateZ(26px)`;
        }

        // Frame +1: Head tilt follows in 3D perspective space (lerp 0.14)
        this.headCurrentX += (this.headTiltX - this.headCurrentX) * 0.14;
        this.headCurrentY += (this.headTiltY - this.headCurrentY) * 0.14;

        if (this.bodyEl && !this.isHovered) {
          this.bodyEl.style.transform = `rotateX(${this.headCurrentX.toFixed(2)}deg) rotateY(${this.headCurrentY.toFixed(2)}deg)`;
        }

        // Frame +2: Body shift (lerp 0.09)
        this.bodyCurrentX += (this.eyeCurrentX * 0.4 - this.bodyCurrentX) * 0.09;
        this.bodyCurrentY += (this.eyeCurrentY * 0.4 - this.bodyCurrentY) * 0.09;

        // Frame +3: Anti-gravity ring inertia (lerp 0.06)
        this.ringCurrentX += (this.eyeCurrentX * 0.5 - this.ringCurrentX) * 0.06;
        if (this.ringEl) {
          this.ringEl.style.transform = `translateX(calc(-50% + ${this.ringCurrentX.toFixed(2)}px)) translateZ(12px)`;
        }

        // Frame +4: Ground shadow settles last (lerp 0.04)
        this.shadowCurrentX += (this.eyeCurrentX * 0.3 - this.shadowCurrentX) * 0.04;
        if (this.shadowEl) {
          this.shadowEl.style.transform = `translateX(calc(-50% + ${this.shadowCurrentX.toFixed(2)}px))`;
        }

        // Vision Pro Specular Highlight Tracking (lerp 0.10)
        this.specCurrentX += (this.specTargetX - this.specCurrentX) * 0.10;
        this.specCurrentY += (this.specTargetY - this.specCurrentY) * 0.10;
        if (this.bodyEl) {
          this.bodyEl.style.setProperty('--spec-x', `${this.specCurrentX.toFixed(2)}%`);
          this.bodyEl.style.setProperty('--spec-y', `${this.specCurrentY.toFixed(2)}%`);
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ── Cursor Tracking (Expanded Section-Wide Tracking) ─────── */
  _onMouseMove(e) {
    if (this.isSleeping || this.isFlying) return;

    // Check if cursor is within the Works section bounds
    const section = document.getElementById('works');
    if (section) {
      const sRect = section.getBoundingClientRect();
      if (e.clientY < sRect.top - 120 || e.clientY > sRect.bottom + 120) {
        if (this.currentState === TaesuState.TRACKING) {
          this.eyeTargetX = 0;
          this.eyeTargetY = 0;
          this.headTiltX = 0;
          this.headTiltY = 0;
          this.specTargetX = 32;
          this.specTargetY = 24;
          this.setState(TaesuState.IDLE);
        }
        return;
      }
    }

    const rect = this.el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Expanded tracking radius across section (maxDist: 800px)
    const maxDist = 800;
    const factor = Math.min(1, dist / maxDist);

    this.eyeTargetX = (dx / dist) * 12 * factor;
    this.eyeTargetY = (dy / dist) * 9 * factor;

    // Enhanced 3D pitch/yaw tilt response (-16deg to +16deg)
    this.headTiltX = (dy / dist) * -16 * factor;
    this.headTiltY = (dx / dist) * 16 * factor;

    // Dynamic specular highlight tracking across expanded section
    this.specTargetX = 32 + (dx / dist) * 18 * factor;
    this.specTargetY = 24 + (dy / dist) * 14 * factor;

    this.setState(TaesuState.TRACKING);
  }

  /* ── Natural Blinking ────────────────────────────────────── */
  _startBlinkLoop() {
    const triggerBlink = () => {
      if (this.isSleeping) return;

      if (this.leftEye && this.rightEye) {
        this.leftEye.classList.add('blinking');
        this.rightEye.classList.add('blinking');

        setTimeout(() => {
          this.leftEye.classList.remove('blinking');
          this.rightEye.classList.remove('blinking');

          // 15% probability double blink
          if (Math.random() < 0.15) {
            setTimeout(() => {
              this.leftEye.classList.add('blinking');
              this.rightEye.classList.add('blinking');
              setTimeout(() => {
                this.leftEye.classList.remove('blinking');
                this.rightEye.classList.remove('blinking');
              }, 100);
            }, 80);
          }
        }, 120);
      }

      const nextDelay = 3000 + Math.random() * 4000;
      this.blinkTimer = setTimeout(triggerBlink, nextDelay);
    };

    this.blinkTimer = setTimeout(triggerBlink, 3500);
  }

  /* ── Looking Around on Inactivity ────────────────────────── */
  _triggerLookAround() {
    if (this.isSleeping || this.isHovered || this.isFlying) return;

    this.setState(TaesuState.FOCUSED);
    this.setEmotion('curious', 2500);

    this.eyeTargetX = -8;
    this.eyeTargetY = 0;
    this.headTiltY = -5;

    setTimeout(() => {
      if (this.isSleeping) return;
      this.eyeTargetX = 8;
      this.headTiltY = 5;

      setTimeout(() => {
        if (this.isSleeping) return;
        this.eyeTargetX = 0;
        this.eyeTargetY = -6;
        this.headTiltX = -4;

        setTimeout(() => {
          this.eyeTargetX = 0;
          this.eyeTargetY = 0;
          this.headTiltX = 0;
          this.headTiltY = 0;
          this.setState(TaesuState.IDLE);
        }, 800);
      }, 800);
    }, 800);
  }

  /* ── Hover Reaction ──────────────────────────────────────── */
  _onHoverStart() {
    if (this.isSleeping) {
      this._wakeUp();
      return;
    }

    this.isHovered = true;
    this.setState(TaesuState.FOCUSED);
    this.setEmotion('excited');
    this.ringEl.classList.add('pulse');
  }

  _onHoverEnd() {
    this.isHovered = false;
    this.ringEl.classList.remove('pulse');
    this.setEmotion('neutral');
    this.eyeTargetX = 0;
    this.eyeTargetY = 0;
    this.setState(TaesuState.IDLE);
  }

  /* ── Click Reaction ──────────────────────────────────────── */
  _onClickTaesu() {
    if (this.isSleeping) {
      this._wakeUp();
      return;
    }

    this.setState(TaesuState.FOCUSED, true);
    this.setEmotion('happy', 1200);
    this.ringEl.classList.add('pulse');
    setTimeout(() => this.ringEl.classList.remove('pulse'), 1000);

    // Smooth bounce
    this.bodyEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    this.bodyEl.style.transform = 'translateY(-12px) rotate(8deg)';
    setTimeout(() => {
      this.bodyEl.style.transform = '';
      setTimeout(() => this.bodyEl.style.transition = '', 300);
    }, 300);
  }

  /* ── Project Node Hover & Click Interactions ─────────────── */
  _observeProjects() {
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.project-node');
      if (card) {
        const title = card.querySelector('.node-title')?.textContent || 'Project';
        this.updateStatusPanel(undefined, title);

        const rect = card.getBoundingClientRect();
        const mascotRect = this.el.getBoundingClientRect();
        const dx = (rect.left + rect.width / 2) - (mascotRect.left + mascotRect.width / 2);
        const dy = (rect.top + rect.height / 2) - (mascotRect.top + mascotRect.height / 2);

        this.eyeTargetX = Math.sign(dx) * 8;
        this.eyeTargetY = Math.sign(dy) * 6;
        this.headTiltY = Math.sign(dx) * 4;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.project-node');
      if (card && !e.relatedTarget?.closest('.project-node')) {
        this.updateStatusPanel(undefined, 'Constellation');
      }
    });
  }

  /* ── Fly-Alongside Animation for Project Opening ─────────── */
  flyAlongside(targetRect, callback) {
    if (this.isFlying) { if (callback) callback(); return; }
    this.isFlying = true;
    this.setState(TaesuState.FOCUSED, true);
    this.setEmotion('excited');
    this.ringEl.classList.add('pulse');

    const mascotRect = this.el.getBoundingClientRect();
    const dx = (targetRect.left + targetRect.width / 2) - (mascotRect.left + mascotRect.width / 2);
    const dy = (targetRect.top + targetRect.height / 2) - (mascotRect.top + mascotRect.height / 2);

    this.el.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    this.el.style.transform = `translate(${dx * 0.32}px, ${dy * 0.32}px) scale(0.94)`;

    setTimeout(() => {
      if (callback) callback();

      // Track visited project
      if (targetRect.getAttribute && targetRect.getAttribute('data-id')) {
        this.visitedProjects.add(targetRect.getAttribute('data-id'));
      } else {
        this.visitedProjects.add(Date.now());
      }
      this.updateStatusPanel();

      if (this.visitedProjects.size >= this.totalProjectsCount) {
        this._triggerCelebration();
      }

      setTimeout(() => {
        this._landingDustPuff();
        this.el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        this.el.style.transform = '';

        setTimeout(() => {
          this.el.style.transition = '';
          this.isFlying = false;
          this.ringEl.classList.remove('pulse');
          this.setEmotion('neutral');
          this.setState(TaesuState.IDLE);
        }, 450);
      }, 350);
    }, 300);
  }

  /* ── Companion Recall (`performRecall()`) ───────────────── */
  performRecall(visitedNodeEl) {
    if (!visitedNodeEl || this.isFlying) return;
    const rect = visitedNodeEl.getBoundingClientRect();
    const mascotRect = this.el.getBoundingClientRect();

    const dx = (rect.left + rect.width / 2) - (mascotRect.left + mascotRect.width / 2);
    const dy = (rect.top + rect.height / 2) - (mascotRect.top + mascotRect.height / 2);

    const origX = this.eyeTargetX;
    const origY = this.eyeTargetY;

    // Micro-glance towards remembered node for 120ms
    this.eyeTargetX = Math.sign(dx) * 6;
    this.eyeTargetY = Math.sign(dy) * 4;

    setTimeout(() => {
      this.eyeTargetX = origX;
      this.eyeTargetY = origY;
    }, 140);
  }

  /* ── "The Goodbye" Scroll Observer ───────────────────────── */
  _initGoodbyeObserver() {
    const section = document.getElementById('works');
    if (!section) return;

    let hasInteracted = false;
    section.addEventListener('mouseenter', () => { hasInteracted = true; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && hasInteracted && !this.isSleeping) {
          // Farewell gesture when scrolling out of section
          this.wave();
          hasInteracted = false;
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  }

  /* ── Dust Puff Effect on Landing ───────────────────────── */
  _landingDustPuff() {
    const puff = document.createElement('div');
    puff.className = 'taesu-dust-puff';
    this.el.appendChild(puff);
    setTimeout(() => puff.remove(), 600);
  }

  /* ── Emotion Controller ─────────────────────────────────── */
  setEmotion(emotionName, durationMs = 0) {
    this.activeEmotion = emotionName;
    this.el.classList.remove(
      'emotion-happy', 'emotion-excited', 'emotion-curious',
      'emotion-thinking', 'emotion-sleepy', 'emotion-confused',
      'emotion-embarrassed', 'emotion-celebrating'
    );

    if (emotionName !== 'neutral') {
      this.el.classList.add(`emotion-${emotionName}`);
    }

    if (durationMs > 0) {
      setTimeout(() => {
        if (this.activeEmotion === emotionName) {
          this.setEmotion('neutral');
        }
      }, durationMs);
    }
  }

  /* ── Motion Primitives ──────────────────────────────────── */
  nod() {
    this.bodyEl.style.transition = 'transform 0.18s ease';
    this.bodyEl.style.transform = 'rotateX(8deg)';
    setTimeout(() => {
      this.bodyEl.style.transform = 'rotateX(-4deg)';
      setTimeout(() => {
        this.bodyEl.style.transform = '';
        setTimeout(() => this.bodyEl.style.transition = '', 180);
      }, 150);
    }, 180);
  }

  wave() {
    this.bodyEl.style.transition = 'transform 0.25s ease';
    this.bodyEl.style.transform = 'rotate(-10deg) translateY(-4px)';
    setTimeout(() => {
      this.bodyEl.style.transform = 'rotate(10deg) translateY(-4px)';
      setTimeout(() => {
        this.bodyEl.style.transform = '';
        setTimeout(() => this.bodyEl.style.transition = '', 250);
      }, 250);
    }, 250);
  }

  /* ── Sleep & Wake Up ────────────────────────────────────── */
  _resetInactivity() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.lookAroundTimer) clearTimeout(this.lookAroundTimer);

    if (this.isSleeping) this._wakeUp();

    this.lookAroundTimer = setTimeout(() => this._triggerLookAround(), 6000);
    this.inactivityTimer = setTimeout(() => this._goToSleep(), 22000);
  }

  _goToSleep() {
    this.isSleeping = true;
    this.setState(TaesuState.SLEEPING, true);
    this.setEmotion('sleepy');
    this.el.classList.add('sleeping');
  }

  _wakeUp() {
    this.isSleeping = false;
    this.el.classList.remove('sleeping');
    this.setState(TaesuState.IDLE, true);
    this.setEmotion('excited', 800);
  }

  /* ── Celebration State ─────────────────────────────────── */
  _triggerCelebration() {
    if (this.isCelebrating) return;
    this.isCelebrating = true;
    this.setState(TaesuState.CELEBRATING, true);
    this.setEmotion('celebrating', 1600);
    this.bodyEl.style.animation = 'taesu-spin 0.8s ease';
    setTimeout(() => {
      this.bodyEl.style.animation = '';
      this.isCelebrating = false;
      this.setState(TaesuState.IDLE);
    }, 1600);
  }

  destroy() {
    if (this.blinkTimer) clearTimeout(this.blinkTimer);
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.lookAroundTimer) clearTimeout(this.lookAroundTimer);
    if (this.hoverTimer) clearTimeout(this.hoverTimer);
  }
}

window.TaesuController = TaesuController;
