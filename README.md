# D. Naga Gowtham Raj — Personal Portfolio

A modern, responsive developer portfolio built with React + Vite + Framer Motion.

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ 
- npm v9+

### Run Locally

```bash
# Navigate to the project folder
cd portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar/          # Responsive navbar with theme toggle
│   │   ├── Hero/            # Hero section with typewriter effect
│   │   ├── About/           # About me with profile card
│   │   ├── Skills/          # Categorized skill cards
│   │   ├── Projects/        # Featured project cards
│   │   ├── GitHub/          # Live GitHub API integration
│   │   ├── Experience/      # Timeline + certification cards
│   │   ├── Education/       # Education cards
│   │   ├── Contact/         # Contact form + info
│   │   ├── Footer/          # Footer with links
│   │   └── ScrollToTop/     # Scroll progress indicator
│   ├── data/
│   │   └── portfolio.js     # ← All your data lives here
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ Customization

### Update Your Content
All personal data is centralized in **`src/data/portfolio.js`**:
- Personal info, links, email
- Skills list
- Featured projects
- Experience & certifications
- Education

### Add Your Resume
1. Place your `resume.pdf` in the `public/` folder
2. In `src/data/portfolio.js`, change:
   ```js
   resumeLink: '/resume.pdf'
   ```

### Add Your Photo
Replace the initials avatar in `Hero.jsx` and `About.jsx` with:
```jsx
<img src="/profile.jpg" alt="Profile" className="hero__avatar-img" />
```
Put `profile.jpg` in the `public/` folder.

---

## 🌐 Deploy

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder to netlify.com
```

Or connect your GitHub repo in Netlify dashboard — it auto-detects Vite.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 8 | Build tool |
| Framer Motion | Animations |
| React Icons | Icon library |
| React Type Animation | Typewriter effect |
| React Intersection Observer | Scroll-triggered animations |
| Axios | GitHub API requests |
| CSS Variables | Dark/light theming |

---

## 📞 Contact

**D. Naga Gowtham Raj**  
📧 gowthamraj4633@gmail.com  
🐙 [github.com/gowthamraj016](https://github.com/gowthamraj016)  
💼 [LinkedIn](https://linkedin.com/in/d-naga-gowtham-raj-a0a7132b2)
