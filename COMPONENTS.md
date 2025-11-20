# StackOverflow Components Documentation

A comprehensive guide to all the components used in this StackOverflow clone built with Next.js, TypeScript, Appwrite, and Tailwind CSS.

---

## 📦 Components Overview

All components are located in `src/components/` directory. This project uses modern, glassmorphic designs inspired by **react-bits**, **magic-ui**, and **shadcn/ui**.

---

## 🎨 Design System

### Color Palette
- **Primary**: `#0ea5a4` (Teal-500)
- **Secondary**: `#111827` (Gray-900)
- **Background**: `#000000` (Black)
- **Text**: `#ffffff` (White)
- **Muted**: `#94a3b8` (Slate-400)

### Component Style
- **Glassmorphism**: `backdrop-blur-sm` with `bg-gradient-to-br from-gray-900/50 to-black/50`
- **Borders**: `border-white/10` for subtle separation
- **Hover Effects**: Smooth transitions with `duration-300` and subtle scale/color changes

---

## 📝 Components

### 1. RTE.tsx (Rich Text Editor)
**Source**: `@uiw/react-md-editor`  
**Location**: `src/components/RTE.tsx`

A markdown editor component with dark theme support.

#### Features:
- Client-side only (uses `dynamic` import with `ssr: false`)
- Full markdown support
- Dark mode optimized
- Preview and edit modes

#### Usage:
```tsx
import RTE from '@/components/RTE'

function MyComponent() {
  const [content, setContent] = useState('')

  return (
    <div data-color-mode="dark">
      <RTE
        value={content}
        onChange={(val) => setContent(val || '')}
        height={300}
        preview="edit"
      />
    </div>
  )
}
```

#### Props:
- `value`: string - Current markdown content
- `onChange`: (value?: string) => void - Content change handler
- `height`: number - Editor height in pixels
- `preview`: "edit" | "live" | "preview" - Editor mode

---

### 2. QuestionForm.tsx
**Inspired by**: shadcn/ui forms + magic-ui animations  
**Location**: `src/components/QuestionForm.tsx`

A beautiful form for creating new questions with validation.

#### Features:
- Title input with 200 character limit
- Rich text editor for question details
- Image upload support
- Tag input with comma-separated values
- Real-time tag preview
- Form validation
- Loading states
- Error handling

#### Usage:
```tsx
import { QuestionForm, QuestionData } from '@/components/QuestionForm'

function AskQuestionPage() {
  const handleSubmit = async (data: QuestionData) => {
    // Submit to API
    await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <QuestionForm
      authorId={currentUser.id}
      onSubmit={handleSubmit}
    />
  )
}
```

#### Props:
- `authorId`: string - Current user ID
- `onSubmit?`: (data: QuestionData) => void | Promise<void> - Submit handler

#### QuestionData Type:
```typescript
interface QuestionData {
  title: string
  content: string
  tags: string[]
  authorId: string
  attachmentId?: string
}
```

---

### 3. QuestionCard.tsx
**Inspired by**: react-bits cards + glassmorphism  
**Location**: `src/components/QuestionCard.tsx`

A stunning card component for displaying question summaries.

#### Features:
- Glassmorphic design with gradient borders
- Vote, answer, and view counts
- Tag badges
- Author information with avatar
- Relative time display
- Hover animations
- Responsive layout

#### Usage:
```tsx
import { QuestionCard } from '@/components/QuestionCard'

function QuestionsList() {
  return (
    <div className="space-y-4">
      {questions.map(q => (
        <QuestionCard
          key={q.id}
          id={q.id}
          title={q.title}
          content={q.content}
          author={{
            name: q.authorName,
            reputation: q.authorReputation,
            avatar: q.authorAvatar
          }}
          tags={q.tags}
          votes={q.votes}
          answers={q.answerCount}
          views={q.views}
          createdAt={new Date(q.createdAt)}
          isAnswered={q.hasAcceptedAnswer}
        />
      ))}
    </div>
  )
}
```

#### Props:
- `id`: string - Question ID
- `title`: string - Question title
- `content`: string - Question content (will be truncated)
- `author`: { name, reputation, avatar? } - Author info
- `tags`: string[] - Question tags
- `votes`: number - Vote count
- `answers`: number - Answer count
- `views`: number - View count
- `createdAt`: Date - Creation date
- `isAnswered?`: boolean - Has accepted answer

---

### 4. Answers.tsx
**Inspired by**: Stack Overflow answer layout  
**Location**: `src/components/Answers.tsx`

Displays all answers for a question with voting and acceptance.

#### Features:
- Answer list with markdown rendering
- Vote buttons (up/down)
- Accept answer button (for question author)
- Answer submission form
- Delete functionality
- Accepted answer highlighting
- Author cards with reputation
- Relative timestamps

#### Usage:
```tsx
import { Answers } from '@/components/Answers'

function QuestionDetailPage() {
  return (
    <Answers
      questionId={questionId}
      answers={answers}
      currentUserId={currentUser?.id}
      questionAuthorId={question.authorId}
      onVote={(answerId, voteType) => handleVote(answerId, voteType)}
      onAccept={(answerId) => handleAccept(answerId)}
      onDelete={(answerId) => handleDelete(answerId)}
    />
  )
}
```

#### Props:
- `questionId`: string - Question ID
- `answers`: Answer[] - Array of answers
- `currentUserId?`: string - Current user ID
- `questionAuthorId?`: string - Question author ID (for accept button)
- `onVote?`: (answerId, voteType) => void - Vote handler
- `onAccept?`: (answerId) => void - Accept handler
- `onDelete?`: (answerId) => void - Delete handler

#### Answer Type:
```typescript
interface Answer {
  id: string
  content: string
  author: {
    name: string
    reputation: number
    avatar?: string
  }
  votes: number
  isAccepted?: boolean
  createdAt: Date
  updatedAt?: Date
}
```

---

### 5. Comments.tsx
**Inspired by**: Minimal comment threads  
**Location**: `src/components/Comments.tsx`

Compact comment component for questions and answers.

#### Features:
- Collapsible comment list
- Inline comment form
- Character counter (500 max)
- Delete functionality
- Minimal, clean design

#### Usage:
```tsx
import { Comments } from '@/components/Comments'

function QuestionOrAnswer() {
  return (
    <Comments
      typeId={questionOrAnswerId}
      type="question" // or "answer"
      comments={comments}
      currentUserId={currentUser?.id}
      onDelete={(commentId) => handleDelete(commentId)}
    />
  )
}
```

#### Props:
- `typeId`: string - Question or answer ID
- `type`: "question" | "answer" - Comment type
- `comments`: Comment[] - Array of comments
- `currentUserId?`: string - Current user ID
- `onDelete?`: (commentId) => void - Delete handler

---

### 6. VoteButtons.tsx
**Inspired by**: Stack Overflow voting UI  
**Location**: `src/components/VoteButtons.tsx`

Interactive voting buttons with optimistic updates.

#### Features:
- Upvote/downvote buttons
- Optimistic UI updates
- Vote cancellation
- Color-coded vote count
- Disabled state during API calls
- Smooth animations

#### Usage:
```tsx
import { VoteButtons } from '@/components/VoteButtons'

function Question() {
  return (
    <VoteButtons
      itemId={question.id}
      type="question"
      initialVotes={question.votes}
      currentUserId={currentUser?.id}
      currentUserVote={userVote}
      onVote={(voteType) => console.log('Voted:', voteType)}
    />
  )
}
```

#### Props:
- `itemId`: string - Item ID (question/answer)
- `type`: "question" | "answer" - Item type
- `initialVotes`: number - Initial vote count
- `currentUserId?`: string - Current user ID
- `currentUserVote?`: "upvoted" | "downvoted" | null - User's current vote
- `onVote?`: (voteType) => void - Vote callback

---

### 7. Pagination.tsx
**Inspired by**: Modern pagination patterns  
**Location**: `src/components/Pagination.tsx`

Beautiful pagination with smart page number display.

#### Features:
- Smart page ellipsis (shows ... when needed)
- Previous/Next buttons
- Active page highlighting
- Mobile-responsive (shows page X/Y on mobile)
- Results counter
- Disabled states

#### Usage:
```tsx
import { Pagination } from '@/components/Pagination'

function QuestionsList() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(totalQuestions / 20)

  return (
    <>
      {/* Your list */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        itemsPerPage={20}
        totalItems={totalQuestions}
      />
    </>
  )
}
```

#### Props:
- `currentPage`: number - Current page number
- `totalPages`: number - Total number of pages
- `onPageChange`: (page: number) => void - Page change handler
- `itemsPerPage?`: number - Items per page (default: 20)
- `totalItems?`: number - Total items (for display)

---

## 🎨 UI Components (Shadcn-based + Magic UI + React Bits)

Located in `src/components/ui/`

### Button.tsx (shadcn/ui)
```tsx
import { Button } from '@/components/ui/button'

<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Input.tsx (shadcn/ui)
```tsx
import { Input } from '@/components/ui/input'

<Input type="text" placeholder="Enter text..." />
```

### Label.tsx (shadcn/ui)
```tsx
import { Label } from '@/components/ui/label'

<Label htmlFor="input">Label text</Label>
```

### Card.tsx (shadcn/ui)
```tsx
import { Card } from '@/components/ui/card'

<Card>
  {children}
</Card>
```

### Badge.tsx (shadcn/ui)
**NEW** - Tag badges with multiple variants
```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="default">Tag</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
```

### Avatar.tsx (shadcn/ui)
**NEW** - User avatar with fallback support
```tsx
import { Avatar } from '@/components/ui/avatar'

<Avatar 
  src={user.avatar}
  alt={user.name}
  fallback={user.name.charAt(0)}
  size="md" // sm | md | lg | xl
/>
```

### Textarea.tsx (shadcn/ui)
**NEW** - Multi-line text input
```tsx
import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="Write something..." rows={4} />
```

### Spinner.tsx (shadcn/ui)
**NEW** - Loading spinner
```tsx
import { Spinner } from '@/components/ui/spinner'

<Spinner size="md" /> // sm | md | lg
```

### ShimmerButton.tsx (Magic UI)
**NEW** - Animated button with shimmer effect
```tsx
import { ShimmerButton } from '@/components/ui/shimmer-button'

<ShimmerButton 
  shimmerColor="#0ea5a4"
  shimmerDuration="2s"
>
  Click me ✨
</ShimmerButton>
```

### AnimatedGradientText.tsx (Magic UI)
**NEW** - Glowing gradient text badge
```tsx
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

<AnimatedGradientText>
  New Feature 🎉
</AnimatedGradientText>
```

### BorderBeam.tsx (Magic UI)
**NEW** - Animated border effect for cards
```tsx
import { BorderBeam } from '@/components/ui/border-beam'

<div className="relative">
  <BorderBeam size={200} duration={8} />
  <div>Your content</div>
</div>
```

---

## 🛠️ Utility Functions

Located in `src/lib/utils.ts`

### cn(...inputs)
Merge Tailwind classes with clsx and tailwind-merge
```tsx
cn("text-white", isActive && "bg-primary")
```

### formatDistanceToNow(date)
Format date to relative time
```tsx
formatDistanceToNow(new Date()) // "just now"
formatDistanceToNow(new Date(Date.now() - 3600000)) // "1 hour ago"
```

### formatNumber(num)
Format number with commas
```tsx
formatNumber(1000) // "1,000"
```

### truncate(text, length)
Truncate text with ellipsis
```tsx
truncate("Long text here", 10) // "Long text..."
```

---

## 🎭 Styling Guidelines

### Glassmorphism Pattern
```tsx
className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10"
```

### Hover Effects
```tsx
className="transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
```

### Text Colors
- Primary text: `text-white`
- Secondary text: `text-gray-400`
- Muted text: `text-gray-500`
- Accent: `text-primary`

### Buttons
```tsx
// Primary
className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90"

// Outline
className="border border-white/10 hover:bg-white/5"
```

---

## 📚 Dependencies

### Core
- `next`: 16.0.1
- `react`: 19.2.0
- `typescript`: ^5

### UI Libraries
- `@uiw/react-md-editor`: ^4.0.8 - Markdown editor
- `@radix-ui/react-label`: ^2.1.8 - Accessible labels
- `lucide-react`: ^0.553.0 - Icons
- `react-icons`: ^5.5.0 - Additional icons

### Styling
- `tailwindcss`: ^4
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^3.4.0

### State Management
- `zustand`: ^5.0.8

### Backend
- `appwrite`: ^21.4.0
- `node-appwrite`: ^20.3.0

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:setup
```

### 3. Use Components
```tsx
import { QuestionForm } from '@/components/QuestionForm'
import { QuestionCard } from '@/components/QuestionCard'
import { Answers } from '@/components/Answers'
import { VoteButtons } from '@/components/VoteButtons'
import { Pagination } from '@/components/Pagination'
```

---

## 💡 Best Practices

1. **Always wrap RTE in `data-color-mode="dark"`**
   ```tsx
   <div data-color-mode="dark">
     <RTE ... />
   </div>
   ```

2. **Use formatDistanceToNow for dates**
   ```tsx
   import { formatDistanceToNow } from '@/lib/utils'
   {formatDistanceToNow(createdAt)}
   ```

3. **Implement optimistic UI updates**
   - Update UI immediately
   - Revert on error
   - Show loading states

4. **Use proper TypeScript types**
   - Import interfaces from components
   - Define proper prop types
   - Use strict mode

5. **Follow the glassmorphism pattern**
   - Use consistent background gradients
   - Keep border opacity at 0.1
   - Add backdrop blur

---

## 🎯 Component Sources

| Component | Inspiration | Package |
|-----------|------------|---------|
| RTE | @uiw | `@uiw/react-md-editor` |
| Button, Input, Label | shadcn/ui | Custom + Radix UI |
| QuestionForm | shadcn/ui forms | Custom |
| QuestionCard | react-bits cards | Custom |
| VoteButtons | Stack Overflow | Custom |
| Pagination | magic-ui | Custom |
| Answers | Stack Overflow | Custom |
| Comments | Minimal design | Custom |

---

## 📖 Additional Resources

- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [magic-ui](https://magicui.design/) - Animated components
- [react-bits](https://www.reactbits.dev/) - React component patterns
- [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/) - Markdown editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

**Last Updated**: November 20, 2025  
**Project**: StackOverflow Clone with Appwrite  
**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Appwrite
