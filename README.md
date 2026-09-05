# 🚀 Modern 3D Developer Portfolio

A premium, cinematic portfolio website built with Next.js 16, React Three Fiber, and advanced animations. Features an interactive 3D AI avatar, particle systems, smooth scrolling, and Awwwards-worthy design.

![Portfolio Preview](public/preview.png)

## ✨ Features

### 🎨 Design & UI
- **Dark Theme** with electric blue/purple gradient accents
- **Glassmorphism** cards and overlays with backdrop blur
- **Custom Cursor** with smooth lerp animation
- **Noise Texture** overlay for premium feel
- **Responsive Design** - Mobile-first approach

### 🎭 Animations
- **Framer Motion** for UI transitions and micro-interactions
- **GSAP ScrollTrigger** for horizontal scroll pinning
- **Scroll-based animations** throughout all sections
- **Smooth scrolling** powered by Lenis
- **Page transitions** with AnimatePresence

### 🌟 3D Graphics
- **Interactive 3D Avatar** with idle animations and speech sync
- **Particle Field** with 2000+ animated particles
- **Floating Geometric Shapes** with parallax effect
- **Rotating 3D Objects** with scroll-driven animation
- **Distorted Sphere** background in contact section
- **60fps Performance** with optimized rendering

### 🎤 Interactive Features
- **Web Speech API** integration for avatar voice
- **Typewriter Effect** for chat bubble
- **Mouth Animation** synced to speech amplitude
- **Mouse Parallax** on 3D elements
- **Magnetic Hover** effects on buttons

### 📱 Sections
1. **Hero** - 3D avatar with speech synthesis and particle background
2. **About** - Scroll-animated timeline, skills visualization, rotating 3D object
3. **Projects** - Horizontal scroll gallery with 3D tilt cards and filtering
4. **Contact** - Working form with API route, 3D background, social links

### 🔧 Technical Stack
- **Next.js 16** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** with custom theme
- **React Three Fiber** (@react-three/fiber, @react-three/drei)
- **Three.js** for 3D graphics
- **Framer Motion** for animations
- **GSAP** with ScrollTrigger
- **Lenis** for smooth scroll

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization Guide

### 1. Personal Information

#### Update About Data
Edit `data/about.json`:
```json
{
  "bio": ["Your bio paragraphs here..."],
  "skills": [
    { "name": "React", "level": 95, "category": "Frontend" }
  ],
  "timeline": [...],
  "location": "Your City, Country",
  "email": "your.email@example.com",
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  }
}
```

#### Update Projects
Edit `data/projects.json`:
```json
[
  {
    "id": "1",
    "title": "Your Project",
    "description": "Short description",
    "longDescription": "Detailed description for modal",
    "tags": ["React", "Next.js"],
    "liveUrl": "https://project.com",
    "githubUrl": "https://github.com/you/project",
    "featured": true,
    "category": "Web App",
    "problem": "What problem did it solve?",
    "solution": "How did you solve it?",
    "results": ["Key achievement 1", "Key achievement 2"]
  }
]
```

### 2. Theme Colors

Edit `app/globals.css` to change the color scheme:
```css
:root {
  --electric-blue: #00d4ff;  /* Change to your primary color */
  --electric-purple: #b620e0; /* Change to your secondary color */
  /* ... other colors */
}
```

### 3. 3D Avatar Customization

#### Option A: Replace with Ready Player Me Avatar
1. Create an avatar at [Ready Player Me](https://readyplayer.me/)
2. Download the GLB file
3. Place it in `public/models/avatar.glb`
4. Update `components/Avatar3D.tsx`:

```typescript
import { useGLTF } from '@react-three/drei';

export default function Avatar3D({ ... }) {
  const { scene } = useGLTF('/models/avatar.glb');
  
  return <primitive object={scene} {...props} />;
}
```

#### Option B: Customize the Current Robot
Edit `components/Avatar3D.tsx` to modify colors, shapes, and sizes of the geometric robot.

### 4. Contact Form Integration

The contact form uses a Next.js API route. To integrate with an email service:

#### Option 1: Resend (Recommended)
```bash
npm install resend
```

Update `app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // ... validation code ...
  
  await resend.emails.send({
    from: 'portfolio@yourdomain.com',
    to: 'your-email@example.com',
    subject: `Portfolio Contact: ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  });
  
  return NextResponse.json({ success: true });
}
```

Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

#### Option 2: EmailJS
Use the client-side EmailJS library for quick setup without backend configuration.

### 5. Metadata & SEO

Update `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Your Name | Portfolio",
  description: "Your custom description",
  keywords: ["your", "keywords"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name | Portfolio",
    description: "Your description",
    images: ['/og-image.png'],
  },
};
```

### 6. Navigation Links

Update `components/Navbar.tsx`:
```typescript
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  // Add more sections as needed
];
```

### 7. Social Links

Update social links in `components/ContactSection.tsx`:
```typescript
const socialLinks = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "🔗" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "💼" },
  // Add more social links
];
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Environment Variables**
If using email integration, add environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add `RESEND_API_KEY` or other required keys

### Deploy to Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. Add environment variables in Netlify dashboard

### Deploy to Custom Server

```bash
npm run build
npm start
```

Or use PM2 for process management:
```bash
pm2 start npm --name "portfolio" -- start
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── globals.css               # Global styles & theme
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main page with all sections
├── components/
│   ├── AboutSection.tsx          # About section with timeline
│   ├── Avatar3D.tsx              # 3D robot avatar
│   ├── ContactForm.tsx           # Contact form with validation
│   ├── ContactSection.tsx        # Contact section
│   ├── CustomCursor.tsx          # Custom animated cursor
│   ├── DistortedSphere.tsx       # 3D distorted sphere
│   ├── FloatingShapes.tsx        # Floating geometric shapes
│   ├── Hero3D.tsx                # Hero section with 3D
│   ├── LoadingScreen.tsx         # Loading screen with progress
│   ├── Navbar.tsx                # Navigation with scroll progress
│   ├── ParticleField.tsx         # Particle system
│   ├── ProjectCard.tsx           # 3D tilt project card
│   ├── ProjectModal.tsx          # Project detail modal
│   ├── ProjectsSection.tsx       # Projects horizontal scroll
│   ├── Rotating3DObject.tsx      # Rotating 3D icosahedron
│   ├── SkillsVisualization.tsx   # Animated skill bars
│   ├── SmoothScroll.tsx          # Lenis smooth scroll wrapper
│   └── Timeline.tsx              # Animated vertical timeline
├── data/
│   ├── about.json                # About, skills, timeline data
│   └── projects.json             # Projects data
├── lib/
│   ├── animations.ts             # Framer Motion variants
│   ├── speech.ts                 # Web Speech API utilities
│   └── 3d-utils.ts               # Three.js helper functions
├── public/
│   └── models/                   # 3D model files (.glb)
├── types/
│   └── index.ts                  # TypeScript interfaces
└── package.json
```

## 🎯 Performance Optimization

- **Dynamic Imports**: Heavy 3D components use `next/dynamic` with `ssr: false`
- **Lazy Loading**: 3D assets load progressively with loading screen
- **Optimized Rendering**: 60fps maintained with efficient render loops
- **Code Splitting**: Automatic code splitting via Next.js
- **Image Optimization**: Use `next/image` for project images

## 🐛 Troubleshooting

### Three.js SSR Errors
If you see errors related to `window` or `document`:
- Ensure 3D components use `"use client"` directive
- Wrap with `dynamic` import and `ssr: false`

### GSAP ScrollTrigger Issues
If horizontal scroll doesn't work:
- Check that GSAP and ScrollTrigger are properly registered
- Ensure the section has proper height and pin settings

### Speech Synthesis Not Working
- Web Speech API requires HTTPS in production
- Some browsers require user interaction before speech
- Check browser compatibility (works in Chrome, Edge, Safari)

### Build Errors
If you encounter module resolution errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **GSAP** - Professional-grade animation
- **Lenis** - Smooth scroll library

## 💬 Support

For questions or issues:
- Open an issue on GitHub
- Email: your.email@example.com

## 🌟 Show Your Support

If you found this helpful, please give it a ⭐️!

---

**Built with ❤️ by [Your Name](https://yourwebsite.com)**
