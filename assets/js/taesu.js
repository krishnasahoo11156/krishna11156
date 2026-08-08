/**
 * Taesu — Master Character Engine (v4.1 Dynamic Emotion Emojis & Kinetic Physics)
 * Krishna Sahoo Portfolio — Taesu's Workshop
 *
 * Implements:
 * - Multi-State Dynamic Emotional Emoji Particle Engine (Curious, Happy, Fast Drag, Dizzy Spin, Swirl Orbit, Petting Purr, Wall Impact, Suspense, Drop Landing, Sadness & Comfort)
 * - Pure Motion & Spatial Dragging from Point A to Point B across the stage
 * - Boundary Collision & Tactile Wall Wiggle Animation with Squash-and-Stretch elasticity
 * - 5-Tap Ring Easter Egg & Light-Pink Porcelain Sandbox Mode
 * - Complete Physics Gesture Engine: Fling/Toss, High-Speed Jerk Rebound, Rapid Shake Dizziness, Crown Petting, Double-Tap Bounce, Mid-Air Suspense, and Superhero Landing
 * - Expressive Eyes, Dynamic Blinking, Specular Shading, and Torus Pulse
 */

const TaesuState = {
  IDLE: 'Idle',
  TRACKING: 'Tracking',
  FOCUSED: 'Focused',
  TRANSITION: 'Transition',
  CELEBRATING: 'Celebrating',
  SLEEPING: 'Sleeping',
  SANDBOX: 'Sandbox'
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
    this.wrapEl = mascotEl.closest('.taesu-center-wrap') || mascotEl.parentElement;
    this.stageEl = document.getElementById('workshop-stage');

    // FSM State & Cooldown Throttle
    this.currentState = TaesuState.IDLE;
    this.lastReactionTime = 0;
    this.reactionCooldownMs = 750;

    // Trackers
    this.isSleeping = false;
    this.isCelebrating = false;
    this.isFlying = false;
    this.isHovered = false;
    this.isSandboxActive = false;
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

    // Specular Highlight Radius
    this.specTargetX = 32;
    this.specTargetY = 24;
    this.specCurrentX = 32;
    this.specCurrentY = 24;

    // Easter Egg Ring Tap Tracker (5 rapid taps within 2500ms)
    this.ringTapTimestamps = [];
    this.ringTapThreshold = 5;
    this.ringTapWindowMs = 2500;

    // Sandbox Physics & Gesture Classification
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.initialWrapX = 0;
    this.initialWrapY = 0;
    this.currentWrapX = 0;
    this.currentWrapY = 0;
    this.dragMoveCount = 0;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.lastPointerTime = 0;
    this.velocityHistory = [];
    this.directionReversals = 0;
    this.lastMoveDirection = 0;
    this.cumulativeAngle = 0;
    this.lastAngle = null;
    this.lastTapTime = 0;
    this.isWigglingOnEdge = false;
    this.dragDistanceSinceParticle = 0;
    this.lastEmojiEmissionTime = 0;
    this.emojiCategoryIndices = {
      curious: 0,
      happy: 0,
      drag: 0,
      fast_jerk: 0,
      dizzy: 0,
      swirl: 0,
      pet: 0,
      double_tap: 0,
      wall: 0,
      suspense: 0,
      high_drop: 0,
      sad: 0,
      comfort: 0
    };

    // Inactivity & Timers
    this.hoverTimer = null;
    this.inactivityTimer = null;
    this.lookAroundTimer = null;
    this.blinkTimer = null;
    this.lonelyStage1Timer = null;
    this.lonelyStage2Timer = null;
    this.stareTimer = null;
    this.suspenseTimer = null;
    this.isSad = false;
    this.activeEmotion = 'neutral';

    this._init();
  }

  _init() {
    this._startBlinkLoop();
    this._startPhysicsLoop();
    this._attachEventListeners();
    this._attachRingTapListener();
    this._resetInactivity();
    this._observeProjects();
    this._initGoodbyeObserver();
    this.updateStatusPanel('Focused', 'Constellation');
  }

  /* ── Multi-State Dynamic Emotional Emoji Particle Engine ─── */
  _createEmotionEmoji(emotionType = 'curious', count = 1, intervalMs = 450) {
    const emotionEmojiMap = {
      curious:    ['✨', '⭐', '🧭', '🌟', '👀', '🛸'],
      happy:      ['💖', '🥰', '🌸', '💕', '✨', '🤗'],
      drag:       ['✨', '⭐', '🎈', '🌟', '🧭', '🛸'],
      fast_jerk:  ['💨', '⚡', '🚀', '🏎️', '🔥', '🌪️'],
      dizzy:      ['💫', '🌀', '😵', '🎡', '⭐'],
      swirl:      ['🎠', '🪐', '🛰️', '🌀', '✨'],
      pet:        ['🥰', '💖', '✨', '🌸', '🐱', '🤍'],
      double_tap: ['🤭', '✨', '💖', '🎉', '🌟', '🥰'],
      wall:       ['💥', '🧱', '🤕', '⚡', '⚠️', '🛑'],
      suspense:   ['🪂', '☁️', '🧗', '👀', '❓'],
      high_drop:  ['💥', '🦸', '🤸', '⚡', '✨'],
      sad:        ['🥺', '💧', '🌧️', '💔', '🕯️'],
      comfort:    ['💖', '✨', '🤗', '🌟', '🥰']
    };

    const emojis = emotionEmojiMap[emotionType] || [emotionType];
    if (this.emojiCategoryIndices[emotionType] === undefined) {
      this.emojiCategoryIndices[emotionType] = 0;
    }

    const container = this.bodyEl || this.el;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (!container) return;
        const idx = this.emojiCategoryIndices[emotionType] % emojis.length;
        this.emojiCategoryIndices[emotionType]++;
        const emoji = emojis[idx];

        const el = document.createElement('div');
        el.className = 'taesu-floating-emoji';
        el.textContent = emoji;
        el.style.setProperty('--rand', Math.random().toFixed(2));
        el.style.left = `${Math.random() * 36 + 58}px`;
        el.style.top = `${-4 - Math.random() * 8}px`;
        container.appendChild(el);
        setTimeout(() => el.remove(), 1250);
      }, i * intervalMs);
    }
  }

  /* ── 5-Tap Ring Easter Egg Trigger ──────────────────────── */
  _attachRingTapListener() {
    if (!this.ringEl) return;

    this.ringEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const now = Date.now();

      // Clean old timestamps outside the rolling window
      this.ringTapTimestamps = this.ringTapTimestamps.filter(t => now - t < this.ringTapWindowMs);
      this.ringTapTimestamps.push(now);

      // Pulse feedback on every tap
      this.ringEl.classList.add('pulse');
      setTimeout(() => this.ringEl.classList.remove('pulse'), 300);

      if (this.ringTapTimestamps.length >= this.ringTapThreshold) {
        this.ringTapTimestamps = [];
        this.activateEasterEggSandbox();
      } else {
        this._onClickTaesu();
      }
    });
  }

  /* ── Activate Sandbox Mode (Light-Pink & Free Motion) ─────── */
  activateEasterEggSandbox() {
    if (this.isSandboxActive) return;
    this.isSandboxActive = true;
    this.setState(TaesuState.SANDBOX, true);

    // 1. Excited wobble + Light-Pink Porcelain Morph
    this.el.classList.add('easter-egg-mode', 'activating-wobble');
    setTimeout(() => this.el.classList.remove('activating-wobble'), 650);

    // 2. Set happy smile face & create celebratory burst of emotional emojis
    this.setEmotion('happy');
    this._createEmotionEmoji('happy', 4);

    // 3. Notify Constellation to hide project nodes
    if (window.worksConstellation && typeof window.worksConstellation.enterSandboxMode === 'function') {
      window.worksConstellation.enterSandboxMode();
    } else if (this.stageEl) {
      this.stageEl.classList.add('sandbox-active');
    }

    // 4. Mount Sandbox Return Button & Gesture Hints
    this._mountSandboxControls();

    // 5. Reset inactivity timer
    this._resetInactivity();
  }

  exitEasterEggSandbox() {
    if (!this.isSandboxActive) return;
    this.isSandboxActive = false;

    // Pirouette spin back to normal
    this.bodyEl.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    this.bodyEl.style.transform = 'rotate(360deg)';

    setTimeout(() => {
      this.bodyEl.style.transition = '';
      this.bodyEl.style.transform = '';
      this.el.classList.remove('easter-egg-mode', 'emotion-sad', 'emotion-dizzy', 'emotion-jerk', 'emotion-purr', 'edge-wiggling', 'edge-wiggling-left', 'edge-wiggling-right', 'edge-wiggling-top', 'edge-wiggling-bottom');

      // Notify constellation to restore project cards and center position
      if (window.worksConstellation && typeof window.worksConstellation.exitSandboxMode === 'function') {
        window.worksConstellation.exitSandboxMode();
      } else if (this.stageEl) {
        this.stageEl.classList.remove('sandbox-active');
      }

      this._unmountSandboxControls();
      this.setState(TaesuState.IDLE, true);
      this.setEmotion('neutral');
    }, 600);
  }

  _mountSandboxControls() {
    if (!this.stageEl || this.stageEl.querySelector('.sandbox-return-btn')) return;

    const returnBtn = document.createElement('button');
    returnBtn.className = 'sandbox-return-btn';
    returnBtn.innerHTML = `<span>✦</span> Return to Constellation`;
    returnBtn.setAttribute('aria-label', 'Return to Constellation view');

    returnBtn.addEventListener('click', () => {
      this.exitEasterEggSandbox();
    });

    const hintBar = document.createElement('div');
    hintBar.className = 'sandbox-hint-bar';
    hintBar.innerHTML = `
      <span class="hint-dot"></span>
      <span>Double-Tap • Drag Anywhere • Fling • Shake • Pet • Wall Wiggle</span>
    `;

    this.stageEl.appendChild(returnBtn);
    this.stageEl.appendChild(hintBar);

    // Escape key shortcut to return
    this._escSandboxHandler = (e) => {
      if (e.key === 'Escape' && this.isSandboxActive) {
        this.exitEasterEggSandbox();
      }
    };
    document.addEventListener('keydown', this._escSandboxHandler);
  }

  _unmountSandboxControls() {
    if (!this.stageEl) return;
    const btn = this.stageEl.querySelector('.sandbox-return-btn');
    const hint = this.stageEl.querySelector('.sandbox-hint-bar');
    if (btn) btn.remove();
    if (hint) hint.remove();
    if (this._escSandboxHandler) {
      document.removeEventListener('keydown', this._escSandboxHandler);
    }
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

    // Update Status Card UI
    let statusText = 'Curious';
    if (newState === TaesuState.FOCUSED) statusText = 'Focused';
    else if (newState === TaesuState.CELEBRATING) statusText = 'Celebrating';
    else if (newState === TaesuState.SLEEPING) statusText = 'Resting';
    else if (newState === TaesuState.TRANSITION) statusText = 'Adapting';
    else if (newState === TaesuState.SANDBOX) statusText = 'Loving ❤️';
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

  /* ── Event Listeners & Sandbox Pointer Physics ─────────── */
  _attachEventListeners() {
    window.addEventListener('mousemove', (e) => this._onMouseMove(e), { passive: true });

    this.el.addEventListener('mouseenter', () => this._onHoverStart());
    this.el.addEventListener('mouseleave', () => this._onHoverEnd());
    this.el.addEventListener('click', (e) => {
      if (e.target.closest('.taesu-ring')) return;
      this._onClickTaesu();
    });

    // Sandbox Pointer & Drag Physics Handlers
    this.el.addEventListener('pointerdown', (e) => this._onPointerDown(e));
    window.addEventListener('pointermove', (e) => this._onPointerMove(e));
    window.addEventListener('pointerup', (e) => this._onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this._onPointerUp(e));

    ['mousemove', 'click', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, () => this._resetInactivity(), { passive: true });
    });
  }

  /* ── Sandbox Drag & Inertia Gesture Handling ─────────────── */
  _onPointerDown(e) {
    if (!this.isSandboxActive) return;

    // Double-tap detection
    const now = Date.now();
    if (now - this.lastTapTime < 380) {
      this._onDoubleTap();
      this.lastTapTime = 0;
      return;
    }
    this.lastTapTime = now;

    this.isDragging = true;
    this.el.setPointerCapture(e.pointerId);
    this.el.classList.add('is-dragging');
    if (this.wrapEl) this.wrapEl.style.transition = 'none';

    // Reset sadness if user re-engages
    if (this.isSad) {
      this._onComfortSadTaesu();
    }

    const rect = this.wrapEl.getBoundingClientRect();
    const stageRect = this.stageEl ? this.stageEl.getBoundingClientRect() : { left: 0, top: 0 };

    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.initialWrapX = rect.left - stageRect.left;
    this.initialWrapY = rect.top - stageRect.top;

    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    this.lastPointerTime = now;
    this.velocityHistory = [];
    this.directionReversals = 0;
    this.isWigglingOnEdge = false;
    this.dragDistanceSinceParticle = 0;

    // Initial touch emotion & emoji
    this.setEmotion('curious');
    this._createEmotionEmoji('curious', 1);

    // Suspense hover timer (holding in mid-air > 3.5s)
    if (this.suspenseTimer) clearTimeout(this.suspenseTimer);
    this.suspenseTimer = setTimeout(() => {
      if (this.isDragging) {
        this.el.classList.add('is-suspended');
        this._createEmotionEmoji('suspense', 2);
      }
    }, 3500);
  }

  _onPointerMove(e) {
    if (!this.isSandboxActive || !this.isDragging) {
      if (this.isSandboxActive && !this.isDragging) {
        this._checkStaringContest(e);
      }
      return;
    }

    const now = Date.now();
    const dt = Math.max(1, now - this.lastPointerTime);
    const dx = e.clientX - this.lastPointerX;
    const dy = e.clientY - this.lastPointerY;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt; // px/ms

    this.velocityHistory.push({ dx, dy, dt, speed, time: now });
    if (this.velocityHistory.length > 8) this.velocityHistory.shift();

    // Check for Rapid Shake Direction Reversals
    if (Math.abs(dx) > 6) {
      const currentDir = Math.sign(dx);
      if (this.lastMoveDirection !== 0 && currentDir !== this.lastMoveDirection) {
        this.directionReversals++;
        if (this.directionReversals >= 4) {
          this._onShakeDizzy();
          this.directionReversals = 0;
        }
      }
      this.lastMoveDirection = currentDir;
    }

    // Check for Circular Swirl Orbit
    const mascotRect = this.el.getBoundingClientRect();
    const cx = mascotRect.left + mascotRect.width / 2;
    const cy = mascotRect.top + mascotRect.height / 2;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    if (this.lastAngle !== null) {
      let dTheta = currentAngle - this.lastAngle;
      if (dTheta > Math.PI) dTheta -= 2 * Math.PI;
      if (dTheta < -Math.PI) dTheta += 2 * Math.PI;
      this.cumulativeAngle += Math.abs(dTheta);
      if (this.cumulativeAngle > Math.PI * 3.5) {
        this._onSwirlOrbit();
        this.cumulativeAngle = 0;
      }
    }
    this.lastAngle = currentAngle;

    // Move Taesu wrap smoothly from Point A to Point B across stage bounds
    const totalDx = e.clientX - this.dragStartX;
    const totalDy = e.clientY - this.dragStartY;
    let targetX = this.initialWrapX + totalDx;
    let targetY = this.initialWrapY + totalDy;

    // Boundary & Wall Collision with Tactile Wiggle
    if (this.stageEl) {
      const stageW = this.stageEl.offsetWidth || 850;
      const stageH = this.stageEl.offsetHeight || 600;
      let hitEdge = false;

      this.el.classList.remove('edge-wiggling-left', 'edge-wiggling-right', 'edge-wiggling-top', 'edge-wiggling-bottom');

      if (targetX <= 10) {
        targetX = 10;
        this.el.classList.add('edge-wiggling-left');
        hitEdge = true;
      } else if (targetX >= stageW - 190) {
        targetX = stageW - 190;
        this.el.classList.add('edge-wiggling-right');
        hitEdge = true;
      }

      if (targetY <= 10) {
        targetY = 10;
        this.el.classList.add('edge-wiggling-top');
        hitEdge = true;
      } else if (targetY >= stageH - 220) {
        targetY = stageH - 220;
        this.el.classList.add('edge-wiggling-bottom');
        hitEdge = true;
      }

      if (hitEdge && !this.isWigglingOnEdge) {
        this.isWigglingOnEdge = true;
        this.setEmotion('shocked', 600);
        this._createEmotionEmoji('wall', 2);
      } else if (!hitEdge) {
        this.isWigglingOnEdge = false;
      }
    }

    if (this.wrapEl) {
      this.wrapEl.style.left = `${targetX}px`;
      this.wrapEl.style.top = `${targetY}px`;
    }
    this.currentWrapX = targetX;
    this.currentWrapY = targetY;

    // Dynamic Trail Emotion Emojis while dragging (clean single-emoji cadence with 520ms cooldown)
    this.dragDistanceSinceParticle += Math.hypot(dx, dy);
    if (this.dragDistanceSinceParticle > 80 && (now - this.lastEmojiEmissionTime > 520)) {
      this.dragDistanceSinceParticle = 0;
      this.lastEmojiEmissionTime = now;
      if (speed > 2.6) {
        this._createEmotionEmoji('fast_jerk', 1);
      } else {
        this._createEmotionEmoji('drag', 1);
      }
    }

    // Check for Petting Gestures (Slow rhythmic strokes on top crown)
    if (speed < 1.8 && Math.abs(dx) > 12 && totalDy < 40 && (now - this.lastEmojiEmissionTime > 650)) {
      this.lastEmojiEmissionTime = now;
      this._onPetPurr();
    }

    this.lastPointerX = e.clientX;
    this.lastPointerY = e.clientY;
    this.lastPointerTime = now;
    this._resetInactivity();
  }

  _onPointerUp(e) {
    if (!this.isSandboxActive || !this.isDragging) return;
    this.isDragging = false;
    this.el.releasePointerCapture(e.pointerId);
    this.el.classList.remove('is-dragging', 'is-suspended', 'edge-wiggling-left', 'edge-wiggling-right', 'edge-wiggling-top', 'edge-wiggling-bottom');
    if (this.suspenseTimer) clearTimeout(this.suspenseTimer);

    if (this.wrapEl) {
      this.wrapEl.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    this.dragMoveCount++;

    // Calculate Release Velocity
    const recentMoves = this.velocityHistory.slice(-4);
    let avgSpeed = 0;
    let avgDx = 0;
    let avgDy = 0;
    if (recentMoves.length > 0) {
      recentMoves.forEach(m => {
        avgSpeed += m.speed;
        avgDx += m.dx;
        avgDy += m.dy;
      });
      avgSpeed /= recentMoves.length;
      avgDx /= recentMoves.length;
      avgDy /= recentMoves.length;
    }

    // High Speed Jerk / Fling Reaction
    if (avgSpeed > 3.2) {
      this._onFastJerk(avgSpeed);
    } else if (avgSpeed > 1.6) {
      this._onFlingToss(avgDx, avgDy);
    } else {
      this.setEmotion('happy', 1200);
      this._createEmotionEmoji('happy', 1);
    }

    // Check for High Drop Superhero Landing
    if (this.stageEl && this.currentWrapY < this.stageEl.offsetHeight * 0.25) {
      this._onHighDropLanding();
    }

    this.velocityHistory = [];
    this.lastAngle = null;
    this._resetInactivity();
  }

  /* ── Specific Gesture Reactions ─────────────────────────── */
  _onFastJerk(speed) {
    this.setEmotion('shocked', 1200);
    this.el.classList.add('emotion-jerk');
    this._createEmotionEmoji('fast_jerk', 2, 450);
    setTimeout(() => this.el.classList.remove('emotion-jerk'), 550);
  }

  _onFlingToss(vx, vy) {
    this.setEmotion('fling', 1500);
    this._createEmotionEmoji('fast_jerk', 2, 450);
  }

  _onShakeDizzy() {
    this.setEmotion('dizzy', 2500);
    this.el.classList.add('emotion-dizzy', 'dizzy-spin');
    this._createEmotionEmoji('dizzy', 2, 450);
    setTimeout(() => this.el.classList.remove('dizzy-spin'), 900);
  }

  _onSwirlOrbit() {
    this.setEmotion('excited', 2000);
    this.ringEl.classList.add('pulse');
    this._createEmotionEmoji('swirl', 2, 450);
    setTimeout(() => this.ringEl.classList.remove('pulse'), 1000);
  }

  _onPetPurr() {
    this.setEmotion('purr', 2500);
    this._createEmotionEmoji('pet', 1);
  }

  _onDoubleTap() {
    this.setEmotion('happy', 2500);
    this.bodyEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    this.bodyEl.style.transform = 'translateY(-18px) scale(1.08)';
    setTimeout(() => {
      this.bodyEl.style.transform = '';
      setTimeout(() => this.bodyEl.style.transition = '', 300);
    }, 300);
    this._createEmotionEmoji('double_tap', 2, 450);
  }

  _onHighDropLanding() {
    this._landingDustPuff();
    this.setEmotion('excited', 1500);
    this._createEmotionEmoji('high_drop', 2, 450);
  }

  _checkStaringContest(e) {
    const rect = this.el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < 40) {
      if (!this.stareTimer) {
        this.stareTimer = setTimeout(() => {
          this.setEmotion('curious', 3000);
          this._createEmotionEmoji('curious', 3);
        }, 4500);
      }
    } else {
      if (this.stareTimer) {
        clearTimeout(this.stareTimer);
        this.stareTimer = null;
      }
    }
  }

  /* ── Inactivity, Sleep & Loneliness Progression ─────────── */
  _resetInactivity() {
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.lookAroundTimer) clearTimeout(this.lookAroundTimer);
    if (this.lonelyStage1Timer) clearTimeout(this.lonelyStage1Timer);
    if (this.lonelyStage2Timer) clearTimeout(this.lonelyStage2Timer);

    if (this.isSleeping) this._wakeUp();

    if (this.isSandboxActive) {
      this.lonelyStage1Timer = setTimeout(() => this._onLonelyStage1(), 9000);
      this.lonelyStage2Timer = setTimeout(() => this._onLonelyStage2(), 22000);
    } else {
      this.lookAroundTimer = setTimeout(() => this._triggerLookAround(), 6000);
      this.inactivityTimer = setTimeout(() => this._goToSleep(), 24000);
    }
  }

  _onLonelyStage1() {
    if (!this.isSandboxActive || this.isDragging) return;
    this.setEmotion('curious', 3000);
    this._createEmotionEmoji('curious', 1);
  }

  _onLonelyStage2() {
    if (!this.isSandboxActive || this.isDragging) return;
    this.isSad = true;
    this.setEmotion('sad');
    this.el.classList.add('emotion-sad');
    this._createEmotionEmoji('sad', 2);
  }

  _onComfortSadTaesu() {
    this.isSad = false;
    this.el.classList.remove('emotion-sad');
    this.setEmotion('happy', 2500);
    this._createEmotionEmoji('comfort', 4);
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

        if (this.bodyEl && !this.isHovered && !this.isDragging) {
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

        // Specular Highlight Tracking (lerp 0.10)
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
    if (this.isSleeping || this.isFlying || this.isDragging) return;

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

    const maxDist = 800;
    const factor = Math.min(1, dist / maxDist);

    this.eyeTargetX = (dx / dist) * 12 * factor;
    this.eyeTargetY = (dy / dist) * 9 * factor;

    this.headTiltX = (dy / dist) * -16 * factor;
    this.headTiltY = (dx / dist) * 16 * factor;

    this.specTargetX = 32 + (dx / dist) * 18 * factor;
    this.specTargetY = 24 + (dy / dist) * 14 * factor;

    if (!this.isSandboxActive) {
      this.setState(TaesuState.TRACKING);
    }
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
    if (this.isSleeping || this.isHovered || this.isFlying || this.isSandboxActive) return;

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
    if (!this.isSandboxActive) {
      this.setState(TaesuState.FOCUSED);
    }
    this.setEmotion('excited');
    this.ringEl.classList.add('pulse');
  }

  _onHoverEnd() {
    this.isHovered = false;
    this.ringEl.classList.remove('pulse');
    if (!this.isSandboxActive) {
      this.setEmotion('neutral');
      this.eyeTargetX = 0;
      this.eyeTargetY = 0;
      this.setState(TaesuState.IDLE);
    }
  }

  /* ── Click Reaction ──────────────────────────────────────── */
  _onClickTaesu() {
    if (this.isSleeping) {
      this._wakeUp();
      return;
    }

    if (this.isSandboxActive) {
      this._onDoubleTap();
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
      if (this.isSandboxActive) return;
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
      if (this.isSandboxActive) return;
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
    if (!visitedNodeEl || this.isFlying || this.isSandboxActive) return;
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
        if (!entry.isIntersecting && hasInteracted && !this.isSleeping && !this.isSandboxActive) {
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
      'emotion-embarrassed', 'emotion-celebrating', 'emotion-dizzy',
      'emotion-jerk', 'emotion-purr', 'emotion-sad', 'emotion-shocked', 'emotion-fling'
    );

    if (emotionName !== 'neutral') {
      this.el.classList.add(`emotion-${emotionName}`);
    }

    if (durationMs > 0) {
      setTimeout(() => {
        if (this.activeEmotion === emotionName && !this.isSad) {
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
    if (this.lonelyStage1Timer) clearTimeout(this.lonelyStage1Timer);
    if (this.lonelyStage2Timer) clearTimeout(this.lonelyStage2Timer);
    if (this.stareTimer) clearTimeout(this.stareTimer);
    if (this.suspenseTimer) clearTimeout(this.suspenseTimer);
    this._unmountSandboxControls();
  }
}

window.TaesuController = TaesuController;
