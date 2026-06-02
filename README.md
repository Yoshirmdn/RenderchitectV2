# ArchVault — 3D Architecture Design Marketplace

Premium marketplace for professional 3D architecture & interior design assets.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── GlowCard.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── StarRating.jsx
│   │   └── ThemeToggle.jsx
│   ├── layout/             # Page structure
│   │   ├── Layout.jsx      # Root layout with animated page transitions
│   │   ├── Navbar.jsx      # Sticky navbar with cart badge & mobile menu
│   │   └── Footer.jsx      # Full footer with links & socials
│   ├── sections/           # Home page sections
│   │   ├── HeroSection.jsx       # Fullscreen hero + 3D viewer + GSAP parallax
│   │   ├── MarqueeSection.jsx    # Infinite scrolling text marquee
│   │   ├── StatsSection.jsx      # Animated statistics
│   │   ├── FeaturedProjects.jsx  # Featured designs grid
│   │   ├── ServiceShowcase.jsx   # Services highlight grid
│   │   ├── TestimonialSection.jsx
│   │   ├── FAQSection.jsx        # Accordion FAQ
│   │   └── CTASection.jsx        # Call-to-action banner
│   ├── 3d/
│   │   └── HouseViewer.jsx  # React Three Fiber 3D viewer w/ orbit, wireframe, fullscreen
│   ├── chatbot/
│   │   └── ChatBotWidget.jsx # Floating AI chat assistant
│   └── animations/
│       ├── AnimatedText.jsx
│       └── AnimatedCounter.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Projects.jsx         # Grid w/ search, category filter, sort
│   ├── ProjectDetail.jsx    # Full detail + 3D viewer + related
│   ├── Contact.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   ├── Login.jsx            # Auth with sign in / register tabs
│   ├── TrackOrder.jsx       # Order tracking with timeline
│   └── NotFound.jsx
├── router/
│   └── index.jsx            # React Router v6 with lazy loading
├── context/
│   └── ThemeContext.jsx     # Dark/light mode provider
├── store/
│   └── useStore.js          # Zustand store (cart + wishlist, persisted)
├── data/
│   └── projects.js          # Mock data: projects, testimonials, FAQs
├── utils/
│   └── format.js            # Price & number formatters
└── styles/
    └── globals.css          # Tailwind base + custom utilities
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Vite + React 18 | Build tool & UI framework |
| React Router v6 | Client-side routing + lazy loading |
| TailwindCSS v3 | Utility-first styling |
| Framer Motion | Page transitions, scroll reveals, micro-interactions |
| GSAP + ScrollTrigger | Parallax effects on hero |
| React Three Fiber | WebGL 3D rendering |
| @react-three/drei | 3D helpers: OrbitControls, Environment |
| Three.js | Underlying 3D engine |
| Zustand | Global state (cart, wishlist) with localStorage persist |
| React Icons | Icon library |

## 🎨 Design System

- **Colors**: Dark `#0a0a0a` base, Gold `#C8A96E` accent
- **Typography**: Bebas Neue (display), Syne (headings), DM Sans (body)
- **Components**: Glassmorphism cards, gradient text, animated hover states
- **Animations**: Page transitions, scroll reveals, floating elements, marquee

## 📄 Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, featured projects, stats, services, testimonials, FAQ |
| `/about` | About — Story, values, team |
| `/services` | Services — Pricing tiers |
| `/projects` | Projects — Full marketplace with search, filter, sort |
| `/projects/:slug` | Project Detail — Gallery, 3D viewer, purchase |
| `/contact` | Contact — Form + info |
| `/cart` | Shopping cart with order summary |
| `/wishlist` | Saved designs |
| `/login` | Auth — Sign in / Register |
| `/track-order` | Order tracking with step timeline |

## ✨ Key Features

- **3D Viewer** — React Three Fiber with OrbitControls, wireframe mode, fullscreen
- **Floating Chatbot** — AI assistant with typing animation, glassmorphism UI
- **Cart & Wishlist** — Zustand store persisted to localStorage
- **Dark Mode** — Default dark, togglable, smooth transition
- **Lazy Loading** — All pages code-split for fast initial load
- **Animated Page Transitions** — Framer Motion exit/enter animations
- **GSAP Parallax** — Blob backgrounds animate on scroll
- **Infinite Marquee** — CSS animation marquee rows
- **Responsive** — Mobile-first, works on all screen sizes

## 🔧 Customization

Edit `src/data/projects.js` to add real designs. Replace placeholder images with actual renders. Connect to a real API by replacing functions in `src/services/`.
