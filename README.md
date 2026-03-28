# 🚀 Portfolio Website

A stunning, fully interactive portfolio built with **React + Vite**, featuring:
- 🎯 Custom cursor with magnetic hover
- 🏷️ 3D Lanyard ID Card (draggable with elastic spring physics)
- 🃏 3D Tilt Cards for Skills & Projects
- 🎲 Fully playable 3D Rubik's Cube
- 💬 Web3Forms contact form
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

### Step 3 — Configure Environment Variables
Rename `.env.example` to `.env` (or edit the existing `.env`) and fill in your keys:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

**Get a free Web3Forms key:**
1. Go to https://web3forms.com
2. Enter your email → Get Access Key
3. Paste the key in `.env`

### Step 4 — Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 🎨 Customization

### Change Your Name / Info
Edit these files:
- `src/components/Home/Home.jsx` — Name, title, stats
- `src/components/About/About.jsx` — Bio text, ID card name
- `src/components/Contact/Contact.jsx` — Email, social links
- `src/components/Footer/Footer.jsx` — Social links

### Add Your Photo
Replace the SVG avatar in `About.jsx` with:
```jsx
<img src="/your-photo.jpg" alt="Your Name" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```
Place `your-photo.jpg` in the `/public` folder.

### Change Projects
Edit the `projects` array in `src/components/Projects/Projects.jsx`

### Change Skills
Edit the `skills` array in `src/components/Skills/Skills.jsx`

---

## 🏗️ Build for Production
```bash
npm run build
```
Output goes to the `/dist` folder.

---

## 🚀 Deploy to Vercel

### Option A — GitHub + Vercel (Recommended)
1. Push your project to GitHub
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. In **Environment Variables**, add `VITE_WEB3FORMS_ACCESS_KEY`
5. Click **Deploy** → Done! 🎉

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

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
