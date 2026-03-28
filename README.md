# 🚀 Portfolio Website

A stunning, fully interactive portfolio built with **React + Vite**, featuring:
- 🎯 Custom cursor with magnetic hover
- 🏷️ 3D Lanyard ID Card (draggable with elastic spring physics)
- 🃏 3D Tilt Cards for Skills & Projects
- 💬 Formspree contact form
- ✨ Smooth scroll animations + GSAP-ready
- 📱 Fully Responsive

---

## 📦 Installation & Setup

### Step 1 — Prerequisites
Make sure you have installed:
- **Node.js** v18 or later → https://nodejs.org
- **npm** (comes with Node.js)
- **VS Code** → https://code.visualstudio.com

### Step 2 — Install Dependencies
Open the portfolio folder in VS Code, then open the integrated terminal:
```
Terminal → New Terminal
```
Run:
```bash
npm install
```

### Step 4 — Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar/          # Fixed navigation
│   │   ├── Home/            # Hero section
│   │   ├── About/           # About + 3D Lanyard card
│   │   ├── Skills/          # 3D tilt skill cards
│   │   ├── Projects/        # 3D project cards
│   │   ├── TechChallenge/   # Interactive 3D Rubik's Cube
│   │   ├── Contact/         # Web3Forms contact
│   │   ├── Footer/          # Footer
│   │   ├── Cursor.jsx       # Custom cursor
│   │   └── Loader.jsx       # Loading screen
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ VS Code Extensions (Recommended)
Install these from the Extensions panel (`Ctrl+Shift+X`):
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **Auto Rename Tag**
- **CSS Peek**
- **GitLens**

---

## 📦 Key Packages Used
| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `vite` | Build tool |
| `framer-motion` | Page animations |
| `gsap` | Advanced animations |
| `react-type-animation` | Typewriter effect |
| `react-intersection-observer` | Scroll animations |
| `react-icons` | Icon library |
| `react-tilt` | 3D card tilt |

---

**Built with ❤️ and lots of coffee**
