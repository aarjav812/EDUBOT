# 🤖 EduBot - Intelligent Campus Assistant

An AI-powered educational chatbot with a stunning landing page built with modern web technologies. Fully optimized for performance and ready for deployment on Vercel.

## ✨ Features

- **🚀 Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **🎨 Stunning Animations**: Framer Motion for smooth transitions and micro-interactions
- **🌟 3D Effects**: Three.js integration for immersive visual experiences
- **📱 Responsive Design**: Beautiful on all devices
- **🎯 Interactive Components**: Engaging UI with hover effects and animations
- **💬 Interactive Chat**: Functional chatbot with smart responses
- **🎭 Glassmorphism**: Modern glass-like UI elements
- **🌈 Gradient Magic**: Beautiful color gradients throughout
- **⚡ Performance Optimized**: Lazy loading, code splitting, and memoization
- **🔧 Modular Architecture**: Clean, maintainable, and scalable code structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd EDUBOT
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/
│   ├── chat/
│   │   └── page.tsx              # Chat interface page
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main landing page (optimized)
├── components/
│   ├── Hero/
│   │   ├── AnimatedLogo.tsx      # Modular animated logo component
│   │   ├── CTAButtons.tsx        # Call-to-action buttons
│   │   └── MouseFollower.tsx     # Mouse tracking effect
│   ├── Features/
│   │   └── FeatureCard.tsx       # Reusable feature card
│   ├── Chat/
│   │   ├── MessageBubble.tsx     # Individual message component
│   │   ├── TypingIndicator.tsx   # Typing animation
│   │   └── ChatInput.tsx         # Chat input field
│   ├── BackgroundScene.tsx       # Optimized 3D background
│   ├── Hero.tsx                  # Hero section (optimized)
│   ├── Features.tsx              # Features section (optimized)
│   ├── About.tsx                 # About section
│   ├── ChatPreview.tsx           # Chat preview section
│   └── Footer.tsx                # Footer component
├── lib/
│   ├── chatUtils.ts              # Chat bot response logic
│   └── utils.ts                  # Utility functions
└── types/
    └── global.d.ts               # TypeScript type definitions
```

## 🎨 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Deployment on Vercel

### Quick Deploy

The easiest way to deploy your EduBot is to use the [Vercel Platform](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Manual Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository

3. Configure your project:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. Click "Deploy" and wait for the build to complete

5. Your site will be live at `https://your-project-name.vercel.app`

### Environment Variables

If you need environment variables:

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your variables to `.env.local`

3. In Vercel Dashboard, go to Project Settings → Environment Variables and add them there

## ⚡ Performance Optimizations

This project includes several performance optimizations:

- **Code Splitting**: Components are lazy-loaded using `next/dynamic`
- **React Memoization**: Components use `React.memo`, `useMemo`, and `useCallback`
- **Optimized Animations**: Reduced animation complexity and viewport-based triggers
- **Image Optimization**: Next.js Image component for automatic optimization
- **3D Scene Optimization**: Reduced particle count and disabled antialiasing
- **Tree Shaking**: Automatic removal of unused code
- **Minification**: Production builds are minified with SWC

## 📦 Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build in the `.next` folder.

## 🧪 Development

- **Linting**: `npm run lint`
- **Type Checking**: TypeScript automatically checks types during build

## 🎯 Features

### Landing Page
- Animated hero section with interactive logo
- Feature showcase with hover effects
- About section with statistics
- Chat preview
- Smooth scrolling between sections

### Chat Interface
- Real-time message display
- Typing indicators
- Smart bot responses for:
  - Deadlines and assignments
  - Campus events
  - Course syllabi
  - Exam schedules
  - General queries
- Quick action buttons
- Responsive design

## 🛠️ Customization

### Colors
Modify the color scheme in `tailwind.config.js` and component files.

### Content
- Update bot responses in `src/lib/chatUtils.ts`
- Modify features in `src/components/Features.tsx`
- Change hero content in `src/components/Hero.tsx`

### Animations
Adjust animation parameters in component files using Framer Motion props.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Support

If you have any questions or need help with deployment, please open an issue.

---

Built with ❤️ using Next.js and modern web technologies
