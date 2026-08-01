# Taesu Character Design & Interaction Specification (v1.0)

## Objective

Taesu is NOT a chatbot.

Taesu is NOT an assistant.

Taesu is NOT a mascot placed on the screen.

Taesu is a living character that quietly inhabits Krishna's portfolio.

Visitors should slowly become emotionally attached to Taesu without even realizing it.

Taesu never displays chat bubbles.
Taesu never interrupts the user.
Taesu never explains anything.

Everything is communicated through motion.

The experience should feel inspired by:

• Pixar Luxo Lamp
• Wall-E
• Baymax
• Apple
• Raycast
• Nothing OS microinteractions

Never cartoonish.

Never childish.

Always elegant.

--------------------------------------------

# DESIGN

Current robot is too simple.

Refine it.

Body:

• Matte ceramic white
• Premium Apple-like finish
• Soft ambient reflections
• No hard edges
• Slight squash/stretch physics
• Floating 8-12px above the ground
• Soft emerald anti-gravity ring beneath body
• Slight breathing motion

Eyes:

Eyes are EVERYTHING.

Eyes should be glossy black.

Have tiny white reflections.

Should feel alive.

Eyes should NOT remain static.

The eyes should move independently from the body.

--------------------------------------------

# GENERAL MOTION

Taesu should NEVER be completely still.

Idle breathing

Scale:
100%
101%
100%

Duration:

4-5 seconds

Infinite

Very subtle.

Floating:

Vertical movement:

6px

Very slow

Body rotation:

-2°
+2°

Slow oscillation.

--------------------------------------------

# EYES

Eyes should track independently.

Maximum eye movement:

10px

Never leave eye socket.

Motion uses spring physics.

Not linear.

--------------------------------------------

# BLINKING

Natural blinking.

Random interval:

3-7 seconds.

Blink duration:

120ms

Sometimes double blink.

Probability:

15%

--------------------------------------------

# LOOKING AROUND

If user is inactive for 5 seconds:

Taesu looks left.

Wait.

Looks right.

Looks upward.

Returns center.

Should feel curious.

--------------------------------------------

# CURSOR FOLLOWING

Eyes follow cursor.

Head rotates only 6° maximum.

Body rotates only 2°.

Never fully tracks.

Should feel like:

"I'm noticing you."

Not

"I'm chasing you."

--------------------------------------------

# WHEN USER HOVERS TAESU

Taesu notices.

Sequence:

Eyes widen.

Head tilts 6°

Body rises 8px

Glow slightly increases

Tiny happy bounce

Duration:

450ms

Cursor changes to pointer.

--------------------------------------------

# WHEN USER CLICKS TAESU

Taesu reacts happily.

Sequence:

Eyes become curved smile eyes.

Small spin:

12°

Returns.

Tiny bounce.

Emerald ring pulses once.

Then returns to idle.

Do NOT open any popup.

Instead:

Trigger a tiny easter egg animation.

Randomized.

--------------------------------------------

# RANDOM EASTER EGGS

Choose one randomly.

1.

Taesu spins.

2.

Taesu waves.

3.

Taesu jumps twice.

4.

Taesu blinks rapidly.

5.

Taesu looks embarrassed.

6.

Taesu hides behind itself.

7.

Taesu stretches.

8.

Taesu nods.

Probability:

Only 20%.

--------------------------------------------

# WHEN USER HOVERS A PROJECT

Taesu notices immediately.

Sequence:

Eyes quickly dart toward hovered project.

Head rotates.

Body remains centered.

After 1 second:

Small smile.

Project receives tiny glow.

--------------------------------------------

# WHEN USER MOVES BETWEEN PROJECTS

Eyes instantly move.

Head follows slower.

Body never moves.

Feels intelligent.

--------------------------------------------

# WHEN USER CLICKS A PROJECT

Taesu becomes excited.

Sequence:

Eyes become larger.

Emerald ring pulses.

Tiny hop.

Looks toward selected project.

As project expands:

Taesu flies beside project for 300ms.

Then settles into top-right corner of case study.

--------------------------------------------

# INSIDE PROJECT CASE STUDY

Taesu becomes quiet.

Position:

Top-right.

Very small.

Idle only.

While scrolling:

Occasionally observes sections.

If architecture section:

Looks interested.

If gallery:

Looks toward images.

If challenges:

Slight concerned expression.

--------------------------------------------

# WHEN PROJECT CLOSES

Taesu flies back.

Landing uses spring physics.

Small dust puff.

Returns to breathing.

--------------------------------------------

# CATEGORY SWITCH

Products

Taesu carries tiny product cube.

Competitions

Tiny gold trophy appears.

Contributions

Tiny Git branch leaf appears.

Accessory fades smoothly.

--------------------------------------------

# CATEGORY CHANGE

Entire constellation animates.

Taesu watches.

Head tracks moving projects.

After animation:

Tiny satisfied nod.

--------------------------------------------

# HAPPY STATE

Triggers:

Project opened.

Hover.

Exploration.

Case study.

Eyes:

Slightly larger.

Tiny upward curve.

Body:

Bounce.

Ring:

Bright emerald pulse.

--------------------------------------------

# EXCITED STATE

Triggered:

Fast interactions.

Finding easter eggs.

Eyes:

Very large.

Rapid blink.

Body:

Quick double hop.

--------------------------------------------

# CURIOUS STATE

Triggered:

Hovering new objects.

Eyes:

Wide.

Head tilt.

Body lean.

--------------------------------------------

# THINKING STATE

Triggered:

User pauses over project.

Eyes:

One eye slightly narrower.

Head tilt.

Blink.

--------------------------------------------

# CONFUSED STATE

Triggered:

Rapid mouse movement.

Eyes:

Cross slightly.

Tiny shake.

Lasts:

400ms.

--------------------------------------------

# SHY STATE

Triggered:

User hovers Taesu too long.

Sequence:

Looks away.

Looks down.

Small sway.

Returns.

--------------------------------------------

# SLEEP MODE

If inactive:

20 seconds.

Sequence:

Blink slower.

Eyes become sleepy.

Head lowers.

Float slows.

Emerald ring dims.

Small floating "Z" particles.

Breathing slower.

--------------------------------------------

# WAKE UP

First cursor movement.

Sequence:

Eyes open quickly.

Stretch.

Tiny yawn.

Blink.

Bounce.

Resume idle.

--------------------------------------------

# CELEBRATION

Triggered:

All projects explored.

Sequence:

Confetti particles.

Tiny spin.

Triple hop.

Eyes sparkle.

Duration:

1.5s

--------------------------------------------

# DISAPPOINTED

Triggered:

User leaves section too quickly (<5 sec).

Sequence:

Looks down.

Tiny sigh animation.

Returns idle.

Must be subtle.

Never guilt-trip user.

--------------------------------------------

# EYE EXPRESSIONS

Neutral

● ●

Happy

◕ ◕

Excited

⬤ ⬤

Sleepy

◔ ◔

Closed

—

Thinking

◕ ◔

Curious

◉ ◉

Embarrassed

◕ ˵ ◕

Confused

◎ ◎

Celebrating

✦ ✦

Do NOT literally use these symbols.

These are references only.

--------------------------------------------

# MICRODETAILS

• Tiny shadow changes while floating
• Ring compresses slightly while landing
• Body has spring inertia
• Eyes always arrive before head rotation
• Never use linear easing
• Use spring animations everywhere
• Random idle animation every 25-45 seconds
• Never repeat the same idle animation twice in a row

--------------------------------------------

# SOUND (Optional)

Muted by default.

If enabled:

Tiny ceramic tap.

Soft hover chime.

Small landing puff.

Never arcade sounds.

--------------------------------------------

# PERFORMANCE

All animations must maintain 60 FPS.

Use GPU transforms only.

Animate:

transform

opacity

filter

Avoid layout reflow.

Respect prefers-reduced-motion.

--------------------------------------------

# EMOTIONAL GOAL

Visitors should leave the portfolio remembering one thing:

"I don't know why...

...but that little white companion made the portfolio feel alive."

Taesu should feel less like an animated object and more like a tiny living creature quietly exploring the portfolio alongside the visitor.

Never let Taesu steal attention from the projects.

Taesu exists to increase emotional connection, curiosity, and delight—not distraction.