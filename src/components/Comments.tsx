"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { useAuthStore } from '@/store/Auth'
import { useComments, useAuthor } from '@/hooks/useAppwrite'
import { createComment } from '@/lib/appwrite'
import { formatDistanceToNow } from '@/lib/utils'
import type { Comment } from '@/models'

interface CommentsProps {
  questionId: string
  type: 'question' | 'answer'
}

function CommentItem({ comment }: { comment: Comment }) {
  const { author } = useAuthor(comment.authorId)
  
  return (
    <div className="group p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-gray-300 flex-1">{comment.content}</p>
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
        {author && (
          <>
            <span className="text-primary font-medium">{author.name}</span>
            <span>•</span>
            <span>{author.reputation} rep</span>
            <span>•</span>
          </>
        )}
        <span>{formatDistanceToNow(comment.$createdAt)}</span>
      </div>
    </div>
  )
}

export function Comments({ questionId, type }: CommentsProps) {
  const { session } = useAuthStore()
  const { comments, refetch } = useComments(questionId, type)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || newComment.length < 10) {
      setError('Comment must be at least 10 characters')
      return
    }

    if (!session) {
      setError('You must be logged in to comment')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const result = await createComment({
        typeId: questionId,
        type,
        content: newComment.trim(),
        authorId: session.$id,
      })

      if (result.success) {
        setNewComment('')
        setShowForm(false)
        refetch()
      } else {
        throw new Error('Failed to submit comment')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-3">
      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.$id} comment={comment} />
          ))}
        </div>
      )}

      {/* Add Comment Button/Form */}
      {session && (
        !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-gray-400 hover:text-primary transition-colors font-medium"
          >
            Add a comment
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              rows={2}
              maxLength={500}
            />
            
            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{newComment.length}/500</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowForm(false)
                    setNewComment('')
                    setError('')
                  }}
                  className="text-xs h-8 px-3"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim()}
                  className="text-xs h-8 px-4 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </form>
        )
      )}
    </div>
  )
}
