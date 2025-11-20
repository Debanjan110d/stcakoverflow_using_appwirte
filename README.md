# DevQnA - Developer Q&A Community

A modern, full-stack Stack Overflow clone built with cutting-edge technologies and beautiful animations.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with RSC support
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Anime.js** - Advanced animations
- **Magic UI** - Beautiful animated components
- **Shadcn/ui** - Radix UI components
- **Zustand** - State management

### Backend
- **Appwrite** - Backend-as-a-Service
  - Authentication
  - Database (TablesDB)
  - Storage
  - Real-time subscriptions

### UI Components
- **@uiw/react-md-editor** - Markdown editor
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **Framer Motion** - Animation library

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure login/register with Appwrite
- ❓ **Ask Questions** - Rich markdown editor with code syntax highlighting
- 💬 **Answer Questions** - Help community members with detailed answers
- 📝 **Comments** - Threaded discussions on answers
- 👍 **Voting System** - Upvote/downvote questions and answers
- 🏷️ **Tags** - Organize questions by technology
- 👤 **User Profiles** - Track reputation and contributions
- 🔍 **Search** - Find questions quickly

### Animated Components
- **AnimatedLoader** - 5 variants (dots, wave, pulse, orbit, infinity)
- **AnimatedCounter** - Smooth number transitions
- **AnimatedProgress** - Linear, circular, and gradient progress bars
- **AnimatedList** - Staggered list animations
- **AnimatedCardReveal** - Scroll-triggered card animations
- **FloatingElements** - Background particle effects
- **GlitchText** - Hover glitch effect
- **TypingAnimation** - Typewriter text effect
- **AuroraText** - Gradient aurora effect
- **Particles** - Interactive particle system
- **ShimmerButton** - Shimmering button effect
- **BorderBeam** - Animated border glow

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd devqna

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Appwrite credentials

# Set up Appwrite database
npm run db:setup

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_API_KEY=your_api_key
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── (auth)/          # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── ask/             # Ask question page
│   ├── api/             # API routes
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── ui/             # UI library components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── QuestionCard.tsx
│   ├── QuestionForm.tsx
│   ├── Answers.tsx
│   ├── Comments.tsx
│   └── VoteButtons.tsx
├── lib/                # Utility functions
├── models/             # Appwrite models
│   ├── client/        # Client-side SDK
│   └── server/        # Server-side SDK
└── store/             # Zustand state management
```

## 🎨 Component Library

### Basic UI Components (Shadcn-based)
- Button, Input, Label, Card
- Badge, Avatar, Textarea, Spinner

### Magic UI Components
- ShimmerButton, AnimatedGradientText, BorderBeam
- Particles, TypingAnimation, AuroraText

### Anime.js Components
- AnimatedLoader, AnimatedCounter, AnimatedProgress
- AnimatedList, AnimatedCardReveal, FloatingElements
- GlitchText

## 🚦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run db:setup  # Set up Appwrite database schema
```

## 🌟 Key Features Implementation

### Markdown Editor
- Real-time preview
- Code syntax highlighting
- Toolbar with formatting options
- Dark mode support

### Voting System
- Upvote/downvote questions and answers
- Vote count updates in real-time
- Visual feedback with animations

### Reputation System
- Track user contributions
- Award points for helpful answers
- Display user stats on profile

### Search & Filter
- Full-text search across questions
- Filter by tags, date, votes
- Sort by newest, active, unanswered

## 🎯 Roadmap

- [ ] Add badges and achievements
- [ ] Implement notifications
- [ ] Add email verification
- [ ] Create admin dashboard
- [ ] Add analytics tracking
- [ ] Implement rate limiting
- [ ] Add API documentation
- [ ] Create mobile app

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👏 Credits

Built with inspiration from:
- Stack Overflow
- Shadcn/ui
- Magic UI
- React Bits
- Anime.js

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**DevQnA** - Where developers help developers 🚀
