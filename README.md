# 📈 Live Stock Ticker Simulator

A lightweight, high-performance financial chart visualizer built entirely with **Vanilla JavaScript (ES6 Modules)** and **HTML5 Canvas**. It features a real-time updating price ticker, interactive hover tooltips, and deterministic price generation powered by a custom **Mulberry32 Pseudo-Random Number Generator (PRNG)**.

---

## ✨ Features

* **Deterministic PRNG Engine:** Uses a stateless, indexed **Mulberry32** algorithm to generate consistent, index-based price sequences.
* **HTML5 Canvas Rendering:** Fast, smooth line-chart plotting with dynamic grid scaling, padding calculations, and color styling.
* **Interactive Tooltips:** Precise mouse-proximity hit detection that highlights data points and displays formatted price cards on hover.
* **Live Ticker Simulation:** Background interval looping that pushes new market data points while maintaining proper memory hygiene and state separation.
* **Smooth UI Navigation:** Integrated header buttons with smooth-scrolling behaviors to jump across sections seamlessly.
* **Modern CSS Flexbox Layout:** Clean dark-mode aesthetic (`hsl` color palette) with aligned metrics and sidebar info displays[cite: 1].

---

## 🛠️ Tech Stack

* **JavaScript (ES6+)**: Modules, canvas rendering contexts, array mapping, and timer management.
* **HTML5**: Semantic markup and canvas element architecture.
* **CSS3**: Flexbox layouts, custom variables, and responsive positioning.

---

## Credits
- **Gemini AI**: Helped With Charts, Tooltips And For The Idea
- **Me**: Main Coding, HTMl, CSS and JS
├── style.css           # Dark-mode styling and flexbox containers
├── main.js             # Entry point, event listeners, and ticker loop
└── mulberry.js         # PRNG engine, interval utility, and canvas rendering module
