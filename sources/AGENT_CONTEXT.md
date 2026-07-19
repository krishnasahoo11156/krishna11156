# Developer & Agent Context: Krishna Sahoo Portfolio

This document is designed to give an AI coding assistant or developer agent a comprehensive context of the architecture, technology stack, directory layout, interactive features, and design systems of this codebase.

---

## 1. Project Overview & Tech Stack
This codebase is a premium, custom-designed single-page portfolio for **Krishna Sahoo**, a 2nd-year B.Tech student in Artificial Intelligence & Data Science at VESIT.

### Core Stack
* **Structure**: Semantic HTML5 ([`index.html`](file:///c:/project/krishna11156/krishna11156/index.html))
* **Styling**: Vanilla CSS3 (located in `assets/css/`). Avoids external CSS frameworks (no Tailwind, bootstrap, etc.), relying on modern CSS features:
  * Lab color spaces (`lab()`).
  * Custom properties/CSS variables for reactive state mapping (`--scroll-percent`, `--mx`, `--my`, etc.).
  * Dynamic `clip-path` polygon values for slanted bicolor layouts.
  * Complex CSS animations (keyframes) and transitions for modal sheets, cards, and text masking.
* **Logic**: Vanilla ES6+ Javascript (located in `assets/js/`). Utilizes asynchronous animations, canvas rendering contexts, event dispatching, and math libraries.

---

## 2. Directory Layout & Key Files
```text
krishna11156/
├── index.html                  # Main viewport markup and section entries
├── assets/
│   ├── css/
│   │   ├── main.css            # Global layout, hero split, navbar, modals, and about styles
│   │   ├── works.css           # Bento grid layouts, tab indicators, and slide-up project details
│   │   └── achievements.css    # dual-axis conveyor track styles, portal details, and lightbox views
│   └── js/
│       ├── main.js             # Basic entry point (tagline typewriter, resume modal controllers)
│       ├── doodles.js          # Interactive coding doodle canvas background & ease scroll physics
│       ├── skills.js           # Sketchpad SVG drawer, text typewriter emulator, and regex highlight lexer
│       ├── works.js            # Bento card generators, transition managers, and project modal sheet
│       └── achievements.js     # Infinite marquee loops, scroll velocity physics, magnetic hovers, and portals
└── sources/
    ├── Hackathons/             # Local hackathon assets
    ├── certificates/           # Scanned credentials and certificates
    ├── openSource/             # Pull request assets
    ├── projects/               # Visual project mockups
    ├── resume/                 # Resume PDFs
    ├── FEATURES.md             # End-user feature list
    └── AGENT_CONTEXT.md        # [This File] Agent developer guidelines
```

---

## 3. Section Walkthrough & Core Algorithms

### Section A: Background Canvas ([`doodles.js`](file:///c:/project/krishna11156/krishna11156/assets/js/doodles.js))
* **Purpose**: Generates an interactive, floating particle environment of coding symbols behind the page content.
* **Core Logic**:
  * **Particle Loop**: Spawns 45 particles tracking coordinate positions, velocity components (`vx`, `vy`), size, symbol types, and angles.
  * **Dividing Line Adaptability**: The page uses a slanted line separating the light-left side from the dark-right side of the viewport. In the `.draw()` loop, the particle checks if its `x` coordinate is to the right of this line:
    `const lineX = canvas.width * (centerXPercent + slantPercent - (2 * slantPercent) * (this.y / canvas.height));`
    It swaps stroke and fill styling values on the fly to guarantee readability.
  * **Repel Physics**: Calculates distance to the mouse cursor using `Math.sqrt(dx*dx + dy*dy)`. If within `repelRadius = 180`, it calculates repulsion angles and applies displacements smoothly using linear interpolation (`lerp`).
  * **Scroll Kinetics**: Translates page scroll events into temporary acceleration force that decays exponentially using friction coefficients.

### Section B: Hero Bicolor Split ([`index.html`](file:///c:/project/krishna11156/krishna11156/index.html#L54-L109), [`main.css`](file:///c:/project/krishna11156/krishna11156/assets/css/main.css#L68-L200))
* **Purpose**: Displays profile pictures, stencil typography, and key call-to-actions.
* **Core Logic**:
  * **Slanted Division Overlay**: Employs a `::after` pseudo-element on the body clipped to a polygon that represents a diagonal split.
  * **Glassmorphic Clipping Mask**: Creates a duplicate profile picture overlay using `backdrop-filter: blur(12px)` and masked to a silhouette image of the profile (`-webkit-mask-image`), creating a glass-like shadow cut exactly along the slanted boundary line.
  * **Overlapping Masks**: Background headings reside behind the solid left profile picture. Foreground headings reside inside a masked container clipped to the silhouette profile, creating a text-wrapping visual effect.

### Section C: Skills Workbench ([`skills.js`](file:///c:/project/krishna11156/krishna11156/assets/js/skills.js))
* **Purpose**: Presents tools and skills in a sketchpad-to-code editor.
* **Core Logic**:
  * **SVG Tracing**: Uses inline SVG schemas for categories. Traces paths by fetching the line length via `.getTotalLength()`, initializing `stroke-dasharray` and `stroke-dashoffset` to that length, and transitioning `stroke-dashoffset` to `0` with custom ease timings.
  * **Simulated IDE Typewriter**: Characters are appended sequentially inside the code preformatted block. A timeout loop manages key-stroke speed offsets (e.g., space and newline indentation characters type faster).
  * **Lexical Highlight Engine**: Highlighting logic uses a regex parser (`highlightText`) that maps matched character patterns to HTML tags (`<span class="...">`) styling comments, strings, language keywords, datatypes, and function calls.

### Section D: Works Bento Grid ([`works.js`](file:///c:/project/krishna11156/krishna11156/assets/js/works.js))
* **Purpose**: Filters and presents projects, hackathons, and open-source contributions.
* **Core Logic**:
  * **Bento Sizing Classes**: Dynamically maps JSON databases to grid configurations:
    * `work-card-large` (Featured project, spans 8 columns, 2 rows)
    * `work-card-tall` (Spans 4 columns, 2 rows)
    * `work-card-wide` (Spans 12 columns, 1 row)
    * `work-card-compact` (Spans 4 columns, 1 row)
  * **Seamless Transitions**: When switching tabs, the container height is locked to avoid layout jumps. Existing cards fade out, the new layout is loaded, the container height transitions to the target dimension using CSS height animations, and new cards are faded in.
  * **Immersive Slide-Up Detail Modal**: Generates dynamic slide-up modal sheets with autoplay carousels, slides, video embedding handlers, and metadata badges.

### Section E: Achievements Dual-Axis Conveyor ([`achievements.js`](file:///c:/project/krishna11156/krishna11156/assets/js/achievements.js))
* **Purpose**: Displays certificates and badges.
* **Core Logic**:
  * **Infinite Scrolling Belt**: Conveyors move in opposite directions (Row 1 left, Row 2 right). The card arrays are tripled; the conveyor offset translates along the tracks, resetting coordinates seamlessly back to their initial offset once the track width is crossed.
  * **Scroll-Velocity Coupling**: Conveyor drift speed accelerates when a user scrolls the page. The extra speed decays over time: `scrollVelocity *= 0.94`.
  * **Magnetic Element Tilting**: Reads the cursor's client coordinates relative to the active card bounding box. It applies custom values (`--mx`, `--my`) to skew/tilt the target card toward the cursor while dimming and blurring all neighboring cards.
  * **Credentials Portal & Lightbox**: Mounts overlays on card clicks, displaying verification URLs and descriptions. Provides a secondary full-width image lightbox on badge image clicks.

---

## 4. Key Developer Considerations
1. **Responsive Scaling**: Layouts utilize `clamp()`, `vw`, and `vh` values. Adjusting layout boundaries should verify mobile breakpoint scales in [`main.css`](file:///c:/project/krishna11156/krishna11156/assets/css/main.css), [`works.css`](file:///c:/project/krishna11156/krishna11156/assets/css/works.css), and [`achievements.css`](file:///c:/project/krishna11156/krishna11156/assets/css/achievements.css).
2. **Scroll Perf**: Ensure script listeners within scroll events keep operations minimal. Always utilize `will-change: transform, opacity` variables where coordinates are mapped or translated dynamically to avoid layout stutter.
3. **No Direct DOM Mutations on Height Transitions**: Maintain the step-by-step layout transition sequence inside `switchCategory()` in [`works.js`](file:///c:/project/krishna11156/krishna11156/assets/js/works.js) to prevent bento cards from breaking.
