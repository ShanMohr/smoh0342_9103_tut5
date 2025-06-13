# Seasons of Peace - Individual Reflection and Technical Overview
# smoh0342_9103_tut5

**Name:** Shannon Mohr  
**Unit:** IDEA9103  
**Submission:** Major Project — Individual Animation and Technical Commentary
**Task:** Time-Based:Employ timers and events for animation.

## Contents
1. [Part 1: Interaction Instructions](#part-1-interaction-instructions)  
2. [Part 2: Individual Animation Approach](#part-2-individual-animation-approach)  
3. [Part 3: Technical Exploration](#part-3-technical-exploration)  
4. [Part 4: Tools, Inspirations & References](#part-4-tools-inspirations--references)  
5. [Conclusion](#conclusion)

> Personal animation contribution and technique breakdown for the Seasons of Peace project.

---

## Part 1: Interaction Instructions

Click or press to explore the animation sequence:

- **Click anywhere** to start the visual narrative.
- The **dove descends**, drops an olive branch, and initiates a **seasonal transformation**.
- Experience the **tree's growth**, **leaves falling**, a **bunny's hop**, and **peaceful fireworks**.

**Keyboard Controls:**
- `1` — Show tree
- `2` — Restart bunny
- `3` or `4` — Trigger leaf fall
- `5` — Fade tree into olive branch

---

## Part 2: Individual Animation Approach

My focus was crafting a peaceful, story-driven transformation inspired by the symbolism of the olive branch and seasonal change.

- Central story arc: **Dove → Olive Branch Drop → Nature Rebirth → Celebration**
- Sequence driven by **user interaction** and **internal timers**
- Elements evolve **organically** with symbolic pacing and form

This narrative structure sets my animation apart from the rest of the group through its long-form progression and emotive visual rhythm.

### Group Member Variations

Muhammad’s variation differs from mine by focusing on interactive canvas scaling and key-driven motion, where the user directly controls the visual elements through input. In contrast, my animation is time-based, unfolding in a choreographed sequence triggered by events like mouse presses or state changes (e.g. bird flight, season transitions). Shuyao’s approach introduces audio-reactive visuals, where background particles respond dynamically to sound—something my work doesn’t incorporate. While mine emphasizes narrative timing and visual transitions using millis(), theirs prioritize real-time user interaction (Muhammad) and audio-driven generativity (Shuyao), offering more reactive and input-sensitive experiences.

---

## Part 3: Technical Exploration

### Animation Drivers
- **Time-based** transitions: Trigger seasonal and state changes
- **Interaction-based** input: Triggers animation stages

### Features Developed
- **Tree fade** into olive branch using custom timing logic
- **Looping dove journey** with scale pulses and shadow glow
- **Leaf generation system** with floating and swirling physics
- **Sky/ground cycles** mapped through `lerpColor()`
- **Custom firework bursts** using OOP-based particles

### Code Highlights
- Object-Oriented Programming: `Bird`, `Background`, `Cloud`, `Firework`
- Transformation stacks: `translate()`, `rotate()`, `scale()`
- Leaf arrays: Controlled position, alpha, float motion
- State booleans to choreograph narrative steps

### Group Code Modifications
- Refactored the `draw()` loop for sequential storytelling
- Developed custom rendering logic for symbolic transitions
- Structured reusable components with detailed commenting
- Added new background and made the dove smaller and fly 
- Tree added and more colors to indecate peace
- Final Olive branch to show the story would start or end again - leaving it up to the user 
- Small fireworks at the end 

### Misc.
I added a lot of code to my individual code. I wanted to create a story, but kept hitting road blocks in my code. You will see it is not full clean and some parts are not needed but still exsist. 

---

## Part 4: Tools, Inspirations & References

### Visual & Narrative Influences
- Picasso’s *Dove of Peace*
- Studio Ghibli’s nature transitions
- The Coding Train’s procedural art techniques

### Tools & Guides
- [p5.js Reference](https://p5js.org/reference/)
- [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Firework Tutorial - The Coding Train](https://www.youtube.com/watch?v=KjF6Eydwxzk)
- [tree] (https://editor.p5js.org/hnc247/sketches/l2BCH32Jn) 

### Techniques Referenced
- `lerp()` & `lerpColor()` for smooth transitions
- `noise()` for organic floating motion
- `push()` and `pop()` for isolated transformation logic
- `map()` and `constrain()` for controlling visual flow

### AI Use
- Chat GPT was used for finding errors and formatting

---

## Conclusion

Building this animation taught me how to combine **symbolism**, **time-based progression**, and **user interactivity** in meaningful ways.

From dropping the olive branch to the fireworks finale, I used code to tell a visual story of **peace, nature, and renewal**. My contribution extended the group vision into a cyclical animated journey.

PS: If you just click the whole animation will just go, but when the leaves fall just press "5" and the animation will then grow the olive branch and stop. 

> Submitted for IDEA9103 — University of Sydney, Semester 1 2025.
