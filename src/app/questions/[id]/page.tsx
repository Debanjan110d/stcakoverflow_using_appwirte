"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { VoteButtons } from '@/components/VoteButtons'
import { Answers } from '@/components/Answers'
import { Comments } from '@/components/Comments'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { AnimatedCardReveal } from '@/components/ui/animated-card-reveal'
import { Spinner } from '@/components/ui/spinner'
import { useQuestion, useAuthor, useVotes, useAnswers } from '@/hooks/useAppwrite'
import { formatDistanceToNow } from '@/lib/utils'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Markdown = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown!),
  { ssr: false }
)

export default function QuestionDetailPage() {
  const params = useParams()
  const questionId = params.id as string
  
  const { question, loading: questionLoading, error: questionError } = useQuestion(questionId)
  const { author, loading: authorLoading } = useAuthor(question?.authorId || '')
  const { voteCount } = useVotes(questionId, 'question')
  const { answers } = useAnswers(questionId)

  const [showComments, setShowComments] = useState(false)

  if (questionLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
        <Footer />
      </div>
    )
  }

  if (questionError || !question) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Question not found</h2>
            <p className="text-gray-400">The question you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">
              ← Back to Questions
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <main className="space-y-6">
            <AnimatedCardReveal direction="top">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Asked {formatDistanceToNow(question.$createdAt)}</span>
                  <span>•</span>
                  <span>Viewed 0 times</span>
                  <span>•</span>
                  <span className="text-primary">{answers.length} answers</span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {question.tags.map((tag, idx) => (
                    <Link key={idx} href={`/tags/${tag}`}>
                      <Badge variant="default" className="cursor-pointer hover:scale-105 transition-transform">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedCardReveal>

            <AnimatedCardReveal delay={200} direction="left">
              <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6 mb-8">
                <div className="flex gap-6">
                  {/* Vote Buttons */}
                  <div className="shrink-0">
                    <VoteButtons
                      id={questionId}
                      type="question"
                      initialVoteCount={voteCount}
                    />
                  </div>

                  {/* Question Content */}
                  <div className="flex-1 min-w-0">
                    <div data-color-mode="dark" className="prose prose-invert max-w-none mb-6">
                      <Markdown source={question.content} />
                    </div>

                    {/* Question Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <button
                        onClick={() => setShowComments(!showComments)}
                        className="text-sm text-gray-400 hover:text-primary transition-colors"
                      >
                        {showComments ? 'Hide' : 'Show'} comments
                      </button>

                      {/* Author Info */}
                      <div className="flex items-center gap-3">
                        {!authorLoading && author && (
                          <>
                            <Avatar
                              src={author.avatar}
                              alt={author.name}
                              fallback={author.name.charAt(0)}
                              size="md"
                            />
                            <div className="flex flex-col">
                              <Link
                                href={`/users/${question.authorId}`}
                                className="text-primary hover:text-primary/80 font-medium"
                              >
                                {author.name}
                              </Link>
                              <span className="text-xs text-gray-500">
                                {author.reputation} reputation
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Comments Section */}
                    {showComments && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <Comments questionId={questionId} type="question" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedCardReveal>

            {/* Answers Section */}
            <AnimatedCardReveal delay={400} direction="bottom">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
                </h2>
                <Answers questionId={questionId} />
              </div>
            </AnimatedCardReveal>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
