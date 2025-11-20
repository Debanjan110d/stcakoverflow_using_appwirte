// Database Models
export interface Question {
  $id: string
  $createdAt: string
  $updatedAt: string
  title: string
  content: string
  authorId: string
  tags: string[]
  attachmentId?: string
}

export interface Answer {
  $id: string
  $createdAt: string
  $updatedAt: string
  questionId: string
  content: string
  authorId: string
  isAccepted?: boolean
}

export interface Vote {
  $id: string
  $createdAt: string
  typeId: string
  type: 'question' | 'answer'
  votedById: string
  voteStatus: 'upvoted' | 'downvoted'
}

export interface Comment {
  $id: string
  $createdAt: string
  typeId: string
  type: 'question' | 'answer'
  content: string
  authorId: string
}

export interface User {
  $id: string
  name: string
  email: string
  avatar?: string
  reputation: number
  bio?: string
}
