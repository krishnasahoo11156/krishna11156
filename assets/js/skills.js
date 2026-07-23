/**
 * Krishna Sahoo Portfolio - Skills Interactive Script
 * Implements the Sketch-to-Code Workbench features.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSkillsSection();
});

// Dictionary containing file name, code contents, and SVGs for each skill category
const SKILLS_DATA = {
  languages: {
    fileName: 'languages.js',
    code: `// Primary programming languages
const developer = {
  name: "Krishna Sahoo",
  role: "Java Full Stack Developer",
  languages: [
    "Java", 
    "Python", 
    "JavaScript Core", 
    "HTML5", 
    "CSS3"
  ],
  proficiency: {
    Java: "Expert",
    Python: "Advanced",
    JavaScript: "Advanced"
  }
};`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Blueprint Guide Lines -->
      <line x1="50" y1="125" x2="350" y2="125" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="4 4" />
      <line x1="200" y1="30" x2="200" y2="220" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="4 4" />
      
      <!-- Java Cup Sketch (Left) -->
      <path class="sketch-path" d="M 80,105 L 140,105 L 132,165 C 130,172 120,178 110,178 L 90,178 C 80,178 70,172 68,165 Z" />
      <path class="sketch-path" d="M 130,118 C 146,118 156,128 156,138 C 156,148 146,158 130,158" />
      <path class="sketch-path" d="M 95,90 C 90,80 102,75 98,65" />
      <path class="sketch-path" d="M 112,90 C 107,80 119,75 115,65" />
      <path class="sketch-path" d="M 127,90 C 122,80 134,75 130,65" />
      <path class="sketch-path" d="M 55,185 C 80,195 120,195 155,185" />
      <!-- Java Accent Fill -->
      <path class="sketch-fill" fill="#f05032" d="M 80,105 L 140,105 L 132,165 C 130,172 120,178 110,178 L 90,178 C 80,178 70,172 68,165 Z" />

      <!-- Python Logo Sketch (Center) -->
      <path class="sketch-path" d="M 215,90 C 215,75 225,65 240,65 L 255,65 C 270,65 280,75 280,90 L 280,105 C 280,115 270,125 255,125 L 220,125 C 205,125 195,135 195,150 L 195,165 C 195,180 205,190 220,190 L 235,190 C 250,190 260,180 260,165 L 260,150" />
      <path class="sketch-path" d="M 220,125 L 220,150 C 220,160 230,170 245,170 L 260,170 C 275,170 285,160 285,145 L 285,130 C 285,115 275,105 260,105 L 240,105 C 225,105 215,95 215,80 L 215,65" />
      <circle cx="230" cy="80" r="2.5" fill="#2c2c2c" class="sketch-path" />
      <circle cx="250" cy="150" r="2.5" fill="#2c2c2c" class="sketch-path" />
      
      <!-- JS Square Sketch (Right) -->
      <path class="sketch-path" d="M 305,95 L 355,95 L 355,145 L 305,145 Z" stroke-dasharray="0" />
      <path class="sketch-path" d="M 320,118 L 328,118 L 328,136 C 328,141 324,143 320,143 C 316,143 313,141 313,136" />
      <path class="sketch-path" d="M 348,121 C 345,119 339,119 339,124 C 339,129 348,127 348,133 C 348,138 342,141 338,139" />
      <!-- JS Accent Fill -->
      <rect class="sketch-fill" fill="#f7df1e" x="305" y="95" width="50" height="50" />
    </svg>`
  },
  backend: {
    fileName: 'BackendConfig.java',
    code: `package com.krishna.portfolio.backend;

@RestController
@RequestMapping("/api/v1/backend")
public class BackendController {
    
    // Tech: Java Core, Adv Java, Spring Boot
    @GetMapping("/skills")
    public ResponseEntity<Map<String, String>> getBackend() {
        Map<String, String> stack = new HashMap<>();
        stack.put("core", "Java Standard Edition");
        stack.put("advanced", "JSP, Servlets, JDBC");
        stack.put("framework", "Spring Boot v3.x");
        stack.put("dependency_injection", "Spring Core");
        
        return ResponseEntity.ok(stack);
    }
}`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Grid guides -->
      <line x1="50" y1="125" x2="350" y2="125" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="3 3" />
      
      <!-- Server Rack (Left) -->
      <path class="sketch-path" d="M 80,65 L 170,65 L 170,185 L 80,185 Z" />
      <!-- Rack shelves -->
      <line class="sketch-path" x1="80" y1="105" x2="170" y2="105" />
      <line class="sketch-path" x1="80" y1="145" x2="170" y2="145" />
      
      <!-- Server details -->
      <circle cx="95" cy="85" r="4" class="sketch-path" fill="none" />
      <circle cx="110" cy="85" r="2" class="sketch-path" fill="none" />
      <line class="sketch-path" x1="125" y1="85" x2="155" y2="85" />
      
      <circle cx="95" cy="125" r="4" class="sketch-path" fill="none" />
      <circle cx="110" cy="125" r="2" class="sketch-path" fill="none" />
      <line class="sketch-path" x1="125" y1="125" x2="155" y2="125" />
      
      <circle cx="95" cy="165" r="4" class="sketch-path" fill="none" />
      <circle cx="110" cy="165" r="2" class="sketch-path" fill="none" />
      <line class="sketch-path" x1="125" y1="165" x2="155" y2="165" />

      <!-- Spring Leaf Shield (Right) -->
      <path class="sketch-path" d="M 230,125 C 230,85 270,65 295,65 C 320,65 330,85 330,125 C 330,165 295,185 295,185 C 295,185 230,165 230,125 Z" />
      <!-- leaf details -->
      <path class="sketch-path" d="M 295,185 C 295,185 285,135 295,95" />
      <path class="sketch-path" d="M 295,125 C 280,120 270,110 265,100" />
      <path class="sketch-path" d="M 295,145 C 310,140 318,130 322,120" />
      
      <!-- Connection line -->
      <path class="sketch-path" d="M 170,125 C 190,125 210,125 230,125" stroke-dasharray="5 5" />
      <!-- Arrow pointer -->
      <path class="sketch-path" d="M 222,120 L 230,125 L 222,130" />
      <!-- Spring Accent Fill -->
      <path class="sketch-fill" fill="#6db33f" d="M 230,125 C 230,85 270,65 295,65 C 320,65 330,85 330,125 C 330,165 295,185 295,185 Z" />
    </svg>`
  },
  frontend: {
    fileName: 'FrontendApp.jsx',
    code: `import React from 'react';
import { NextSeo } from 'next-seo';

// Tech: React.js, Next.js, Tailwind CSS
export default function FrontendStack() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <NextSeo 
        title="Web Interface | Front-end Portfolio" 
        description="Crafted using MERN & AI workflows" 
      />
      <section className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight">
          React & Next.js Interface
        </h1>
        <p className="max-w-md text-center text-slate-600">
          Tailwind CSS layout with highly interactive, 
          fluid components and responsive typography.
        </p>
      </section>
    </main>
  );
}`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Grid lines -->
      <line x1="200" y1="30" x2="200" y2="220" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="3 3" />
      
      <!-- Screen Monitor (Left) -->
      <path class="sketch-path" d="M 60,70 L 210,70 L 210,160 L 60,160 Z" />
      <path class="sketch-path" d="M 115,160 L 105,190 L 165,190 L 155,160" />
      <!-- Code sketch on screen -->
      <line class="sketch-path" x1="75" y1="85" x2="115" y2="85" />
      <line class="sketch-path" x1="75" y1="100" x2="135" y2="100" />
      <line class="sketch-path" x1="90" y1="115" x2="175" y2="115" />
      <line class="sketch-path" x1="90" y1="130" x2="155" y2="130" />
      <line class="sketch-path" x1="75" y1="145" x2="105" y2="145" />
      
      <!-- React Atom (Right) -->
      <circle cx="300" cy="125" r="8" class="sketch-path" />
      <!-- Ellipse 1 (Horizontal) -->
      <ellipse rx="55" ry="18" class="sketch-path" transform="translate(300, 125) rotate(30)" />
      <!-- Ellipse 2 (Rotated Left) -->
      <ellipse rx="55" ry="18" class="sketch-path" transform="translate(300, 125) rotate(-30)" />
      <!-- Ellipse 3 (Rotated Right) -->
      <ellipse rx="55" ry="18" class="sketch-path" transform="translate(300, 125) rotate(90)" />
      
      <!-- React Accent Glow -->
      <circle class="sketch-fill" fill="#61dafb" cx="300" cy="125" r="8" />
    </svg>`
  },
  databases: {
    fileName: 'schema.sql',
    code: `-- Setup PostgreSQL and Supabase Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    sgpa_sem1 NUMERIC(3,2) DEFAULT 9.82,
    sgpa_sem2 NUMERIC(3,2) DEFAULT 9.65,
    cgpa_overall NUMERIC(4,3) DEFAULT 9.735,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS) policies for Firestore-like protection
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" 
ON users FOR SELECT USING (true);`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Blueprint axes -->
      <line x1="50" y1="125" x2="350" y2="125" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="3 3" />

      <!-- Database Stack Cylinder (Left) -->
      <!-- Cyl 1 (Top) -->
      <ellipse cx="140" cy="80" rx="35" ry="12" class="sketch-path" />
      <path class="sketch-path" d="M 105,80 L 105,115 A 35,12 0 0,0 175,115 L 175,80" />
      <!-- Cyl 2 (Middle) -->
      <path class="sketch-path" d="M 105,115 L 105,150 A 35,12 0 0,0 175,150 L 175,115" />
      <!-- Cyl 3 (Bottom) -->
      <path class="sketch-path" d="M 105,150 L 105,185 A 35,12 0 0,0 175,185 L 175,150" />
      
      <!-- Firestore Flame (Right) -->
      <path class="sketch-path" d="M 285,185 C 265,170 250,140 255,115 C 260,90 280,65 295,55 C 295,55 305,80 295,95 C 310,85 325,75 335,95 C 345,115 340,145 325,170 C 315,180 295,190 285,185 Z" />
      <path class="sketch-path" d="M 285,185 C 290,165 305,150 295,130 C 285,145 275,160 285,185 Z" />
      
      <!-- Sync arrows -->
      <path class="sketch-path" d="M 175,125 C 205,115 220,120 255,125" stroke-dasharray="4 4" />
      <path class="sketch-path" d="M 255,125 L 247,120 M 255,125 L 248,131" />
      <path class="sketch-path" d="M 255,140 C 225,150 210,145 175,140" stroke-dasharray="4 4" />
      <path class="sketch-path" d="M 175,140 L 183,145 M 175,140 L 182,134" />
      
      <!-- Database Accent Fill -->
      <ellipse class="sketch-fill" fill="#339933" cx="140" cy="80" rx="35" ry="12" />
      <path class="sketch-fill" fill="#ff9900" d="M 285,185 C 265,170 250,140 255,115 C 260,90 280,65 295,55 Z" />
    </svg>`
  },
  cloud: {
    fileName: 'docker-compose.yml',
    code: `# Cloud Deployments & DevOps Orchestration
version: "3.8"
services:
  gcp-app-service:
    image: gcr.io/krishna-portfolio/app-runner:v1.0.0
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - GCP_PROJECT_ID=vesit-vesit-vesit
      - CLOUD_RUN_SERVICE=portfolio-backend
      - CLOUD_BUILD_TRIGGER=main-push-deploy
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Grid cross -->
      <line x1="200" y1="30" x2="200" y2="220" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="3 3" />
      
      <!-- Cloud container (Background) -->
      <path class="sketch-path" d="M 110,140 C 95,140 85,130 85,115 C 85,100 100,90 115,90 C 120,65 145,50 170,55 C 190,40 220,50 230,70 C 250,70 265,85 265,105 C 265,125 245,140 225,140 Z" stroke-dasharray="6 3" />

      <!-- Isometric 3D Cube Docker Box (Left-Center) -->
      <path class="sketch-path" d="M 130,115 L 175,90 L 220,115 L 220,165 L 175,190 L 130,165 Z" />
      <line class="sketch-path" x1="175" y1="90" x2="175" y2="190" />
      <line class="sketch-path" x1="130" y1="115" x2="175" y2="140" />
      <line class="sketch-path" x1="220" y1="115" x2="175" y2="140" />
      
      <!-- GCP Hexagon Logo (Right) -->
      <path class="sketch-path" d="M 285,100 L 320,80 L 355,100 L 355,140 L 320,160 L 285,140 Z" />
      <line class="sketch-path" x1="320" y1="80" x2="320" y2="115" />
      <line class="sketch-path" x1="285" y1="100" x2="320" y2="115" />
      <line class="sketch-path" x1="355" y1="100" x2="320" y2="115" />
      <line class="sketch-path" x1="320" y1="115" x2="320" y2="160" />
      
      <!-- GCP Accent Fill -->
      <polygon class="sketch-fill" fill="#4285f4" points="285,100 320,80 320,115" />
      <polygon class="sketch-fill" fill="#ea4335" points="320,80 355,100 320,115" />
    </svg>`
  },
  apis: {
    fileName: 'api_integrations.py',
    code: `# Google APIs, Gemini, Maps, Supabase, Twilio & EmailJS
import google.generativeai as gemini
from supabase import create_client

class ApiIntegrations:
    def __init__(self):
        self.supabase = create_client("SUPABASE_URL", "API_KEY")
        gemini.configure(api_key="GEMINI_API_KEY")
        self.ai_model = gemini.GenerativeModel('gemini-1.5-flash')
        
    def trigger_notifications(self, message, recipient):
        # Dispatch Twilio API SMS & EmailJS payloads
        payload = {"message": message, "to": recipient}
        return self.supabase.table("logs").insert(payload).execute()`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- central crosshair -->
      <circle cx="200" cy="125" r="100" stroke="rgba(0, 92, 197, 0.04)" stroke-width="1" />
      
      <!-- Center client node -->
      <circle cx="200" cy="125" r="16" class="sketch-path" />
      <text x="189" y="129" font-family="sans-serif" font-weight="bold" font-size="11" fill="#2c2c2c">API</text>

      <!-- Gemini Star (Top Right) -->
      <path class="sketch-path" d="M 285,75 Q 300,75 300,60 Q 300,75 315,75 Q 300,75 300,90 Q 300,75 285,75 Z" />
      <!-- Connection line -->
      <line class="sketch-path" x1="211" y1="114" x2="285" y2="78" stroke-dasharray="4 4" />

      <!-- Map Pin (Left) -->
      <path class="sketch-path" d="M 90,115 C 90,95 110,85 110,85 C 110,85 130,95 130,115 C 130,135 110,155 110,155 C 110,155 90,135 90,115 Z" />
      <circle cx="110" cy="110" r="5" class="sketch-path" />
      <!-- Connection line -->
      <line class="sketch-path" x1="184" y1="125" x2="130" y2="125" stroke-dasharray="4 4" />

      <!-- GitHub Octocat / Branch Node (Bottom) -->
      <circle cx="200" cy="195" r="12" class="sketch-path" />
      <path class="sketch-path" d="M 194,188 Q 200,185 206,188 M 197,192 A 2,2 0 0,0 203,192" />
      <!-- Connection line -->
      <line class="sketch-path" x1="200" y1="141" x2="200" y2="183" stroke-dasharray="4 4" />
      
      <!-- Accent colors -->
      <circle class="sketch-fill" fill="#4285f4" cx="200" cy="125" r="16" />
      <path class="sketch-fill" fill="#9333ea" d="M 285,75 Q 300,75 300,60 Q 300,75 315,75 Q 300,75 300,90 Q 300,75 285,75 Z" />
    </svg>`
  },
  tools: {
    fileName: 'workspace.json',
    code: `{
  "developer_environment": {
    "ide": [
      "IntelliJ IDEA", 
      "VS Code"
    ],
    "version_control": {
      "system": "Git",
      "hosting": "GitHub"
    },
    "ai_tooling": {
      "assistant": "Antigravity AI Agent",
      "ecosystem": "StitchMCP Server / Gemini"
    },
    "status": "fully_integrated",
    "ready": true
  }
}`,
    svg: `<svg viewBox="0 0 400 250">
      <!-- Guide coordinate crosses -->
      <line x1="50" y1="125" x2="350" y2="125" stroke="rgba(0, 92, 197, 0.08)" stroke-width="1" stroke-dasharray="4 4" />
      
      <!-- Git Branch Tree (Left) -->
      <line class="sketch-path" x1="100" y1="75" x2="100" y2="175" />
      <path class="sketch-path" d="M 100,140 C 125,140 145,130 145,110 L 145,95" />
      <circle cx="100" cy="75" r="6" class="sketch-path" fill="#fff" />
      <circle cx="100" cy="140" r="6" class="sketch-path" fill="#fff" />
      <circle cx="100" cy="175" r="6" class="sketch-path" fill="#fff" />
      <circle cx="145" cy="95" r="6" class="sketch-path" fill="#fff" />

      <!-- VS Code stylized ribbon (Center) -->
      <path class="sketch-path" d="M 205,155 L 235,185 L 245,180 L 205,100 L 245,70 L 235,65 L 205,95 Z" />
      <path class="sketch-path" d="M 205,95 L 205,155" />
      
      <!-- Floating Apple Gravity/Antigravity symbol (Right) -->
      <!-- Leaf -->
      <path class="sketch-path" d="M 320,95 Q 330,85 335,95 Q 325,105 320,95" />
      <!-- Apple body -->
      <path class="sketch-path" d="M 315,105 C 300,105 295,115 295,125 C 295,145 315,155 325,155 C 335,155 350,140 345,125 C 342,115 330,105 315,105 Z" />
      <!-- Antigravity up arrow -->
      <path class="sketch-path" d="M 320,135 L 320,115 M 315,122 L 320,115 L 325,122" />
      
      <!-- Accent fills -->
      <circle class="sketch-fill" fill="#f05032" cx="100" cy="175" r="6" />
      <path class="sketch-fill" fill="#007acc" d="M 205,155 L 235,185 L 245,180 Z" />
    </svg>`
  }
};

/**
 * Custom Syntax Highlighter Function
 * Lexes text into code blocks and wraps tokens in styled spans
 */
function highlightText(text) {
  // Return early if empty
  if (!text) return '';

  // Escape HTML tags to prevent code markup breaking the browser DOM
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Combined lexical token matches
  const tokenRegex = new RegExp(
    '(//.*|/\\*[\\s\\S]*?\\*/|#.*|--.*)' + // Group 1: Comments (single & multi)
    '|("[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|\'[^\'\\\\]*(?:\\\\.[^\'\\\\]*)*\'|`[^`\\\\]*(?:\\\\.[^`\\\\]*)*`)' + // Group 2: Strings
    '|\\b(const|let|var|class|interface|package|import|export|default|extends|from|return|function|if|else|for|while|new|public|private|static|void|int|double|float|boolean|def|as|and|or|not|version|services|image|ports|environment|build|context|dockerfile|deploy|limits|cpus|memory|resources|CREATE|TABLE|PRIMARY|KEY|DEFAULT|VARCHAR|UNIQUE|NOT|NULL|NUMERIC|TIMESTAMP|WITH|TIME|ZONE|ALTER|ENABLE|ROW|LEVEL|SECURITY|POLICY|ON|FOR|SELECT|USING)\\b' + // Group 3: Keywords
    '|\\b(String|Map|HashMap|ResponseEntity|RestController|GetMapping|RequestMapping|users|timezone|uuid_generate_v4|gen_random_uuid|ApiIntegrations)\\b' + // Group 4: Native Types / Classes
    '|\\b(\\w+)(?=\\()' + // Group 5: Function calls (matching word followed by paren)
    '|\\b(\\d+\\.?\\d*)\\b', // Group 6: Numbers
    'g'
  );

  return escaped.replace(tokenRegex, (match, g1, g2, g3, g4, g5, g6) => {
    if (g1) return `<span class="code-comment">${match}</span>`;
    if (g2) return `<span class="code-string">${match}</span>`;
    if (g3) return `<span class="code-keyword">${match}</span>`;
    if (g4) return `<span class="code-type">${match}</span>`;
    if (g5) return `<span class="code-function">${match}</span>`;
    if (g6) return `<span class="code-number">${match}</span>`;
    return match;
  });
}

/**
 * Controller class to manage category switching, SVG line tracing, and typewriter simulation
 */
function initSkillsSection() {
  const section = document.getElementById('skills');
  const navButtons = document.querySelectorAll('.category-btn');
  const sketchpadCanvas = document.getElementById('sketchpad-canvas');
  const editorCode = document.getElementById('editor-code');
  const editorFileName = document.getElementById('editor-file-name');
  const lineNumbers = document.getElementById('editor-line-numbers');
  const codeContainer = document.querySelector('.editor-code-container');

  if (!section || !sketchpadCanvas || !editorCode) return;

  let typingTimeout = null;
  let currentCategory = null;

  /**
   * Updates Line Numbers container dynamically based on line counts of text
   */
  function updateLineNumbers(text) {
    const lines = text.split('\n').length || 1;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = html;
  }

  /**
   * Simulates typing character-by-character into the editor container
   */
  function startTypewriter(text, onComplete) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    editorCode.innerHTML = '';
    let currentAccumulated = '';
    let index = 0;

    function typeStep() {
      if (index < text.length) {
        currentAccumulated += text[index];
        index++;

        // Render highlighted text chunk
        editorCode.innerHTML = highlightText(currentAccumulated);
        updateLineNumbers(currentAccumulated);

        // Keep editor scrolled to current typed line
        codeContainer.scrollTop = codeContainer.scrollHeight;

        // Snappy workspace spacing skip speeds
        let delay = 14;
        if (text[index - 1] === ' ' || text[index - 1] === '\n') {
          delay = 3;
        }

        typingTimeout = setTimeout(typeStep, delay);
      } else {
        if (onComplete) onComplete();
      }
    }

    typeStep();
  }

  /**
   * Renders the category SVG into the sketchpad and triggers line-drawing tracing
   */
  function renderSVGDrawing(svgMarkup) {
    sketchpadCanvas.innerHTML = svgMarkup;

    // Grab all path-like vectors
    const paths = sketchpadCanvas.querySelectorAll('path, line, circle, ellipse, polyline, polygon');
    
    paths.forEach(path => {
      // Calculate native length dynamically
      const length = path.getTotalLength ? path.getTotalLength() : 400;
      
      // Initialize hidden drawing offset
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      
      // Trigger browser layout flush
      path.getBoundingClientRect();

      // Apply transition animations
      path.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
      path.style.strokeDashoffset = '0';
    });

    // Fade-in accent fills once line paths finish drawing
    setTimeout(() => {
      const fills = sketchpadCanvas.querySelectorAll('.sketch-fill');
      fills.forEach(fill => fill.classList.add('drawn'));
    }, 100);
  }

  /**
   * Triggers a smooth 0.5s border highlight transition on the imagery section (.sketchpad-canvas-wrapper)
   */
  function triggerWrapperBorderHighlight() {
    const wrapper = sketchpadCanvas ? sketchpadCanvas.parentElement : null;
    if (!wrapper) return;

    wrapper.classList.remove('border-highlight');
    void wrapper.offsetWidth; // Flush layout to restart transition
    wrapper.classList.add('border-highlight');

    setTimeout(() => {
      wrapper.classList.remove('border-highlight');
    }, 550);
  }

  /**
   * Main orchestrator to load category details
   */
  function loadCategory(categoryKey) {
    if (currentCategory === categoryKey) return;
    currentCategory = categoryKey;

    const data = SKILLS_DATA[categoryKey];
    if (!data) return;

    // Trigger smooth 0.5s border highlight on imagery section
    triggerWrapperBorderHighlight();

    // Update tab bar title
    editorFileName.textContent = data.fileName;

    // Reset code area scroll
    codeContainer.scrollTop = 0;

    // Start drawing and typing simultaneously
    renderSVGDrawing(data.svg);
    startTypewriter(data.code);
  }

  // Bind click handlers to category buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all and reset animation
      navButtons.forEach(b => {
        b.classList.remove('active');
      });

      // Reflush DOM layout on clicked button to restart border trace animation from 0deg
      void btn.offsetWidth;
      btn.classList.add('active');

      // If editor was minimized, auto-expand on category click so code is visible
      if (codeEditorPanel && codeEditorPanel.classList.contains('minimized')) {
        codeEditorPanel.classList.remove('minimized');
        if (btnMaximize && btnMinimize) {
          btnMaximize.classList.remove('active');
          btnMaximize.classList.add('disabled');
          btnMinimize.classList.remove('disabled');
          btnMinimize.classList.add('active');
        }
      }

      const cat = btn.getAttribute('data-category');
      loadCategory(cat);
    });
  });

  // Minimize & Maximize Code Editor Panel controls
  const btnMinimize = document.getElementById('editor-btn-minimize');
  const btnMaximize = document.getElementById('editor-btn-maximize');
  const codeEditorPanel = document.querySelector('.code-editor-panel');

  if (btnMinimize && btnMaximize && codeEditorPanel) {
    btnMinimize.addEventListener('click', () => {
      if (codeEditorPanel.classList.contains('minimized')) return;

      // Shrink code editor down to header height
      codeEditorPanel.classList.add('minimized');

      // Minimize option fades / becomes disabled
      btnMinimize.classList.remove('active');
      btnMinimize.classList.add('disabled');

      // Maximize option becomes active / clickable
      btnMaximize.classList.remove('disabled');
      btnMaximize.classList.add('active');
    });

    btnMaximize.addEventListener('click', () => {
      if (!codeEditorPanel.classList.contains('minimized')) return;

      // Expand code editor back to full height
      codeEditorPanel.classList.remove('minimized');

      // Maximize option fades / becomes disabled
      btnMaximize.classList.remove('active');
      btnMaximize.classList.add('disabled');

      // Minimize option becomes active / clickable
      btnMinimize.classList.remove('disabled');
      btnMinimize.classList.add('active');
    });
  }

  // Automatically start with "languages" once the section enters the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('in-view');
        // Load initial category if nothing loaded yet
        if (!currentCategory) {
          loadCategory('languages');
        }
      }
    });
  }, {
    threshold: 0.18 // Trigger once 18% of section is visible
  });

  observer.observe(section);
}
