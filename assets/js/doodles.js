// Interactive Coding Doodles Canvas Background

const canvas = document.getElementById('doodle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 45; // Amount of doodles on screen
const repelRadius = 180; // Area of cursor influence
const maxSpeed = 0.5; // Gentler floating speed

const mouse = {
  x: null,
  y: null
};

// Handle window sizing and CSS variables
let centerXPercent = 0.5;
let slantPercent = 0.05;

function updateImageCenter() {
  const bodyStyle = getComputedStyle(document.body);
  
  // Read --image-center-x
  const centerXStr = bodyStyle.getPropertyValue('--image-center-x').trim() || '50vw';
  if (centerXStr.endsWith('vw')) {
    centerXPercent = parseFloat(centerXStr) / 100;
  } else if (centerXStr.endsWith('%')) {
    centerXPercent = parseFloat(centerXStr) / 100;
  } else if (centerXStr.endsWith('px')) {
    centerXPercent = parseFloat(centerXStr) / window.innerWidth;
  } else {
    const val = parseFloat(centerXStr);
    centerXPercent = val > 1 ? val / 100 : val || 0.5;
  }

  // Read --slant-offset
  const slantStr = bodyStyle.getPropertyValue('--slant-offset').trim() || '5vw';
  if (slantStr.endsWith('vw')) {
    slantPercent = parseFloat(slantStr) / 100;
  } else if (slantStr.endsWith('%')) {
    slantPercent = parseFloat(slantStr) / 100;
  } else if (slantStr.endsWith('px')) {
    slantPercent = parseFloat(slantStr) / window.innerWidth;
  } else {
    const val = parseFloat(slantStr);
    slantPercent = val > 1 ? val / 100 : val || 0.05;
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateImageCenter();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Track mouse position
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// Helper for lerp
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Particle Class representing a single doodle
class DoodleParticle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    // Start initial particles randomly in height, new ones start off screen
    this.y = initial ? Math.random() * canvas.height : -30;
    
    this.vx = (Math.random() - 0.5) * maxSpeed;
    this.vy = (Math.random() - 0.5) * maxSpeed;
    this.size = Math.random() * 20 + 35; // Size scale
    
    // Type of doodle
    this.type = Math.floor(Math.random() * 10);
    this.angle = Math.random() * Math.PI * 2;
    this.wobbleSpeed = (Math.random() - 0.5) * 0.02;
    this.opacity = Math.random() * 0.15 + 0.22; // Darker opacity (22% to 37%)
    
    // Random word index if type is text
    this.wordIndex = Math.floor(Math.random() * 10);
  }

  update() {
    // Wander motion (Brownian noise)
    this.vx += (Math.random() - 0.5) * 0.05;
    this.vy += (Math.random() - 0.5) * 0.05;

    // Dampen and limit velocity
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.wobbleSpeed;

    // Repelling effect from cursor (Wave effect)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < repelRadius) {
        // Stronger repulsion the closer the cursor is
        const force = (repelRadius - dist) / repelRadius;
        const pushAngle = Math.atan2(dy, dx);
        
        // Displace particle away from cursor smoothly
        const targetX = this.x + Math.cos(pushAngle) * force * 45;
        const targetY = this.y + Math.sin(pushAngle) * force * 45;
        
        this.x = lerp(this.x, targetX, 0.12);
        this.y = lerp(this.y, targetY, 0.12);
      }
    }

    // Wrap screen edges
    const pad = 50;
    if (this.x < -pad) this.x = canvas.width + pad;
    if (this.x > canvas.width + pad) this.x = -pad;
    if (this.y < -pad) this.y = canvas.height + pad;
    if (this.y > canvas.height + pad) this.y = -pad;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    
    // Calculate if particle is to the right of the slanted division line
    const lineX = canvas.width * (centerXPercent + slantPercent - (2 * slantPercent) * (this.y / canvas.height));
    const isRightSide = this.x > lineX;
    
    // Light bg (left) -> dark doodles; Dark bg (right) -> light doodles
    const strokeStyleColor = isRightSide ? `rgba(240, 240, 240, ${this.opacity})` : `rgba(51, 51, 51, ${this.opacity})`;
    const fillStyleColor = isRightSide ? `rgba(200, 200, 200, ${this.opacity})` : `rgba(115, 115, 115, ${this.opacity})`;
    
    // Set style: thin lines and subtle opacity
    ctx.strokeStyle = strokeStyleColor;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (this.type) {
      case 0: // Code Tag </>
        ctx.beginPath();
        // <
        ctx.moveTo(-12, -8);
        ctx.lineTo(-20, 0);
        ctx.lineTo(-12, 8);
        // /
        ctx.moveTo(-2, 12);
        ctx.lineTo(2, -12);
        // >
        ctx.moveTo(12, -8);
        ctx.lineTo(20, 0);
        ctx.lineTo(12, 8);
        ctx.stroke();
        break;

      case 1: // Curly Braces {}
        ctx.beginPath();
        // {
        ctx.moveTo(-6, -12);
        ctx.bezierCurveTo(-14, -12, -10, -4, -15, 0);
        ctx.bezierCurveTo(-10, 4, -14, 12, -6, 12);
        // }
        ctx.moveTo(6, -12);
        ctx.bezierCurveTo(14, -12, 10, -4, 15, 0);
        ctx.bezierCurveTo(10, 4, 14, 12, 6, 12);
        ctx.stroke();
        break;

      case 2: // Square Brackets []
        ctx.beginPath();
        // [
        ctx.moveTo(-6, -12);
        ctx.lineTo(-14, -12);
        ctx.lineTo(-14, 12);
        ctx.lineTo(-6, 12);
        // ]
        ctx.moveTo(6, -12);
        ctx.lineTo(14, -12);
        ctx.lineTo(14, 12);
        ctx.lineTo(6, 12);
        ctx.stroke();
        break;

      case 3: // Terminal Window
        ctx.beginPath();
        ctx.rect(-18, -12, 36, 24);
        ctx.moveTo(-18, -6);
        ctx.lineTo(18, -6);
        // Dots
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(-13, -9, 1, 0, Math.PI * 2);
        ctx.arc(-9, -9, 1, 0, Math.PI * 2);
        ctx.arc(-5, -9, 1, 0, Math.PI * 2);
        ctx.fillStyle = fillStyleColor;
        ctx.fill();
        break;

      case 4: // Database
        ctx.beginPath();
        // Top ellipse
        ctx.ellipse(0, -8, 12, 4, 0, 0, Math.PI * 2);
        // Cylindrical sides
        ctx.moveTo(-12, -8);
        ctx.lineTo(-12, 8);
        ctx.moveTo(12, -8);
        ctx.lineTo(12, 8);
        // bottom curves
        ctx.ellipse(0, 0, 12, 4, 0, 0, Math.PI);
        ctx.ellipse(0, 8, 12, 4, 0, 0, Math.PI);
        ctx.stroke();
        break;

      case 5: // Parentheses ()
        ctx.beginPath();
        // (
        ctx.arc(-4, 0, 12, Math.PI * 0.7, Math.PI * 1.3);
        // )
        ctx.arc(4, 0, 12, Math.PI * 1.7, Math.PI * 0.3);
        ctx.stroke();
        break;

      case 6: // Binary 0
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 11, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 7: // Binary 1
        ctx.beginPath();
        ctx.moveTo(-3, -7);
        ctx.lineTo(1, -11);
        ctx.lineTo(1, 11);
        ctx.moveTo(-4, 11);
        ctx.lineTo(6, 11);
        ctx.stroke();
        break;

      case 8: // Comment slashes //
        ctx.beginPath();
        ctx.moveTo(-6, 11);
        ctx.lineTo(1, -11);
        ctx.moveTo(1, 11);
        ctx.lineTo(8, -11);
        ctx.stroke();
        break;

      case 9: // Code keywords (Outline style)
        ctx.font = 'bold 13px "Outfit", sans-serif';
        ctx.strokeStyle = strokeStyleColor;
        ctx.lineWidth = 0.8;
        const words = ['const', 'function', 'return', 'import', 'await', '=>', 'null', 'true', 'if', 'class'];
        const word = words[this.wordIndex];
        const wWidth = ctx.measureText(word).width;
        ctx.strokeText(word, -wWidth / 2, 4);
        break;
    }

    ctx.restore();
  }
}

// Initial particle generation
function init() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new DoodleParticle());
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animate);
}

init();
animate();
