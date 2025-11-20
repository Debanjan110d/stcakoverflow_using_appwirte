"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Avatar } from './ui/avatar'
import { VoteButtons } from './VoteButtons'
import { useAuthStore } from '@/store/Auth'
import { useAnswers, useAuthor } from '@/hooks/useAppwrite'
import { createAnswer } from '@/lib/appwrite'
import { formatDistanceToNow } from '@/lib/utils'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Answer } from '@/models'

const RTE = dynamic(() => import('./RTE'), { ssr: false })
const Markdown = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown!),
  { ssr: false }
)

interface AnswersProps {
  questionId: string
}

function AnswerItem({ answer }: { answer: Answer }) {
  const { author } = useAuthor(answer.authorId)
  
  return (
    <div
      className={`relative rounded-xl border p-6 transition-all duration-300 border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm`}
    >
      <div className="flex gap-6">
        {/* Vote Column */}
        <div className="shrink-0">
          <VoteButtons
            id={answer.$id}
            type="answer"
            initialVoteCount={0}
          />
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <div
            className="prose prose-invert max-w-none mb-6"
            data-color-mode="dark"
          >
            <Markdown source={answer.content} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end pt-4 border-t border-white/10">
            {/* Author Card */}
            {author && (
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <Avatar
                  src={author.avatar}
                  alt={author.name}
                  fallback={author.name.charAt(0)}
                  size="md"
                />
                <div className="flex flex-col">
                  <Link
                    href={`/users/${answer.authorId}`}
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {author.name}
                  </Link>
                  <span className="text-xs text-gray-400">{author.reputation} reputation</span>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-gray-400">answered</div>
                  <div className="text-xs text-gray-300">{formatDistanceToNow(answer.$createdAt)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Answers({ questionId }: AnswersProps) {
  const { session } = useAuthStore()
  const { answers, loading, refetch } = useAnswers(questionId)
  const [newAnswer, setNewAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newAnswer.trim() || newAnswer.length < 20) {
      setError('Answer must be at least 20 characters')
      return
    }

    if (!session) {
      setError('You must be logged in to answer')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const result = await createAnswer({
        questionId,
        content: newAnswer.trim(),
        authorId: session.$id,
      })

      if (result.success) {
        setNewAnswer('')
        refetch() // Refresh answers list
      } else {
        throw new Error('Failed to submit answer')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading answers...</div>
  }

  return (
    <div className="space-y-6">
      {/* Existing Answers */}
      <div className="space-y-6">
        {answers.map((answer) => (
          <AnswerItem key={answer.$id} answer={answer} />
        ))}
      </div>

      {/* Add Answer Form */}
      {session && (
        <div className="mt-12 rounded-xl border border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <div data-color-mode="dark">
              <RTE
                value={newAnswer}
                onChange={(val) => setNewAnswer(val || '')}
                height={250}
                preview="edit"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                }}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewAnswer('')}
                disabled={isSubmitting || !newAnswer}
                className="border-white/10 hover:bg-white/5"
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !newAnswer.trim()}
                className="px-6 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isSubmitting ? 'Posting...' : 'Post Your Answer'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {!session && (
        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
          <p className="text-gray-400">
            Please{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              log in
            </Link>{' '}
            to post an answer.
          </p>
        </div>
      )}
    </div>
  )
}
