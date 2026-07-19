# Krishna Sahoo Portfolio - Feature Implementation Documentation

This document provides a detailed breakdown of the features, interactivity, and design systems implemented in each section of the portfolio.

---

## 1. Core Architecture & Global Features

### Interactive Background Canvas (Coding Doodles)
* **Implementation File**: [`doodles.js`](file:///c:/project/krishna11156/krishna11156/assets/js/doodles.js)
* **Styling**: [`main.css` (lines 49-57)](file:///c:/project/krishna11156/krishna11156/assets/css/main.css#L49-L57)
* **Key Features**:
  * **Particle Physics**: Spawns and controls 45 floating vector particles representing coding symbols: tag characters (`</>`), braces (`{}`), brackets (`[]`), cylinders/databases, terminal frames, binary sequences (`0`, `1`), comment operators (`//`), and code keyword string snippets.
  * **Magnetic Repel**: Tracks cursor movements and dynamically pushes particles away from the cursor using smooth linear interpolation (lerp) when they enter a defined proximity boundary (`repelRadius = 180`).
  * **Bicolor Split Adaptation**: Evaluates the coordinate of each particle relative to the slanted viewport divider. It switches stroke and fill colors dynamically (dark text on the light-left side, light text on the dark-right side) to preserve text readability.
  * **Scroll-Coupling Kinetics**: Listens to page scroll velocity, translating kinetic force into additional particle drift velocity, which slowly decays back to floating speeds (`maxSpeed = 0.5`).

### Custom Easing Smooth Navigation
* **Implementation File**: [`doodles.js` (lines 360-404)](file:///c:/project/krishna11156/krishna11156/assets/js/doodles.js#L360-L404)
* **Key Features**:
  * **Cubic Easing**: Replaces standard browser jump/smooth scrolling with a premium cubic ease-in-out timeline (`easeInOutCubic`), creating slow acceleration and graceful deceleration.
  * **Navbar Offsets**: Automatically deducts the dynamic header navbar height to ensure landing sections align perfectly in the viewport.

### Resume Viewer Modal
* **Implementation Files**: [`main.js` (lines 17-53)](file:///c:/project/krishna11156/krishna11156/assets/js/main.js#L17-L53), [`index.html` (lines 291-326)](file:///c:/project/krishna11156/krishna11156/index.html#L291-L326)
* **Key Features**:
  * **Iframe Embedding**: Embeds the resume PDF using a clean iframe overlay, keeping visitors engaged on the main page.
  * **Action Overlays**: Provides shortcut options to "Open in New Tab" and "Download" the PDF.
  * **UX Event Listeners**:
    * Lock document scrolling on active overlays.
    * Close modal on click backdrops, clicking `x` buttons, or pressing the `Escape` keyboard key.

---

## 2. Hero Section (Bicolor Stencil Split)

* **HTML Structure**: [`index.html` (lines 54-109)](file:///c:/project/krishna11156/krishna11156/index.html#L54-L109)
* **Styling**: [`main.css` (lines 68-200)](file:///c:/project/krishna11156/krishna11156/assets/css/main.css#L68-L200)
* **Key Features**:
  * **Slanted Grid Divisions**: Divides the viewport using an absolute element overlay clipped via `clip-path: polygon()`. The divider shifts smoothly on scrolling by modifying CSS variables `--image-center-x` and `--slant-offset` from the javascript scroll listeners.
  * **Glassmorphic Image Wrapper**: Clones the profile picture using `backdrop-filter: blur(12px)` and clipping masks to produce a glass overlay transition matching the dark slanted side.
  * **Foreground & Background Typography**: Renders two identical layers of name and tagline headings. The background text lies behind the image, while the foreground text is clipped exactly to the profile image container bounds, creating a high-end overlapping stencil effect.

---

## 3. Skills Section (Sketch-to-Code Workbench)

* **Implementation File**: [`skills.js`](file:///c:/project/krishna11156/krishna11156/assets/js/skills.js)
* **HTML Structure**: [`index.html` (lines 133-211)](file:///c:/project/krishna11156/krishna11156/index.html#L133-L211)
* **Key Features**:
  * **Vector Blueprint Animation**:
    * Dynamically injects structured inline SVG artwork representing toolsets (Java cups, Python loops, React atoms, Docker cubes, Git branches).
    * Measures SVG path lengths dynamically using `.getTotalLength()` and animates them inside the viewport via CSS transitions on `stroke-dashoffset`.
  * **Typewriter Editor Emulation**:
    * Simulates a modern IDE editor writing actual configuration scripts and source codes.
    * Implements speed variations, accelerating code spacing and breaking lines automatically.
  * **Custom Lexical Syntax Highlighter**:
    * Evaluates text using a regex lexer to categorize syntax types (Comments, Strings, Keywords, Native types/Classes, and Functions).
    * Wraps matched lexemes in syntax-highlighted classes on the fly.
  * **Tabs Integration**: Coordinates tab buttons (Languages, Backend, Frontend, Databases, DevOps, APIs, Tools) to load relevant blueprint graphics and code blocks synchronously.

---

## 4. Works Section (Bento Grid & Immersive Details Sheet)

* **Implementation File**: [`works.js`](file:///c:/project/krishna11156/krishna11156/assets/js/works.js)
* **HTML Structure**: [`index.html` (lines 214-230)](file:///c:/project/krishna11156/krishna11156/index.html#L214-L230)
* **Key Features**:
  * **Adaptive Bento Grid**:
    * Displays software cards using four distinct configurations: Large (Featured), Tall, Wide, and Compact.
    * Grid column and row ratios are governed by CSS rules.
  * **Height-Lock Switching Transitions**:
    * Prevents jumpy UI page updates when toggling bento categories (Projects, Hackathons, Open Source).
    * *Sequence*: Card exit fade-out -> Locks grid container height -> Renders next category elements -> Calculates target bento height -> Transitions grid height -> Animates new cards in.
  * **Slide-Up Project Sheet**:
    * An interactive modal sheet that slides up from the bottom when a bento card is clicked.
    * **Interactive Carousel**: Runs an automated screenshot slideshow loop that users can manually navigate using swipe buttons or dot indicators.
    * **Resource Links**: Renders custom action buttons linked to live URLs, repositories, videos, and presentation slides.
    * **Specifications Listing**: Displays project metadata (Status, Focus tags, Features, and descriptions).

---

## 5. Achievements Section (Dual-Axis Conveyor)

* **Implementation File**: [`achievements.js`](file:///c:/project/krishna11156/krishna11156/assets/js/achievements.js)
* **HTML Structure**: [`index.html` (lines 233-288)](file:///c:/project/krishna11156/krishna11156/index.html#L233-L288)
* **Key Features**:
  * **Infinite Loop Conveyors**:
    * Renders credentials and badges on two conveyor tracks sliding in opposite directions (Row 1 left, Row 2 right).
    * Triples the dataset arrays, measuring their width after rendering to seamlessly reset position boundaries before the edge is reached (preventing loop gaps).
  * **Scroll Kinetics coupling**:
    * Listens to page scrolls, accelerating the conveyor belt speed temporarily based on scroll speed and direction, with custom deceleration friction physics.
  * **Spotlight & Sibling Hover Dimming**:
    * Hovering on a card pauses row movement, adds high-contrast focus styling to the active card, and blurs/dims neighboring certificates.
  * **Cursor Magnetic Pull**:
    * Measures cursor coordinate offsets relative to the card center, translating the card physically using CSS variables (`--mx`, `--my`) to follow the mouse direction.
  * **Portal Details Viewer & Lightbox**:
    * Opens a detailed credentials view displaying organization badges, dates, verification URLs, and full descriptions.
    * Clicking the badge within the portal triggers a dark lightbox displaying high-resolution certificate images.
