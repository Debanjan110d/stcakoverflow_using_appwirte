"use client"

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuestionCard } from '@/components/QuestionCard'
import { AnimatedCardReveal } from '@/components/ui/animated-card-reveal'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import Link from 'next/link'
import { FiCode, FiUsers, FiZap } from 'react-icons/fi'
import { useQuestions, useStats } from '@/hooks/useAppwrite'

export default function Home() {
  const [filter, setFilter] = useState<'newest' | 'active' | 'unanswered'>('newest')
  const { questions, loading, error } = useQuestions(25, 0)
  const { stats, loading: statsLoading } = useStats()

  // Filter questions based on selected tab
  const filteredQuestions = React.useMemo(() => {
    if (filter === 'newest') {
      return [...questions].sort((a, b) => 
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
      )
    } else if (filter === 'unanswered') {
      // Questions with 0 answers - we'll need to check this via the answers
      // For now, return all questions (we'd need answer counts from the API)
      return questions
    } else if (filter === 'active') {
      // Sort by most recent activity (we'll use creation time as proxy for now)
      return [...questions].sort((a, b) => 
        new Date(b.$updatedAt || b.$createdAt).getTime() - 
        new Date(a.$updatedAt || a.$createdAt).getTime()
      )
    }
    return questions
  }, [questions, filter])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="text-xl text-primary">Loading DevQnA...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Questions</h1>
          <p className="text-gray-400">{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-linear-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-20">
          <AnimatedCardReveal direction="top" className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-primary">Welcome to</span>{' '}
              <span className="text-white">DevQnA</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A modern developer community where you can ask questions, share knowledge, 
              and grow together with thousands of developers worldwide.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/ask">
                <ShimmerButton shimmerDuration="2s" className="px-8 py-3">
                  <FiCode className="mr-2" />
                  Ask a Question
                </ShimmerButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {statsLoading ? '...' : `${stats.questions}+`}
                </div>
                <div className="text-sm text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {statsLoading ? '...' : `${stats.answers}+`}
                </div>
                <div className="text-sm text-gray-400">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {statsLoading ? '...' : stats.users}
                </div>
                <div className="text-sm text-gray-400">Users</div>
              </div>
            </div>
          </AnimatedCardReveal>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Questions Feed */}
          <main className="flex-1 space-y-6">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold">Latest Questions</h2>
              <div className="flex gap-2">
                {(['newest', 'active', 'unanswered'] as const).map((tab) => (
                  <Button
                    key={tab}
                    variant={filter === tab ? 'default' : 'ghost'}
                    onClick={() => setFilter(tab)}
                    className="capitalize"
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.$id}
                    id={question.$id}
                    title={question.title}
                    content={question.content}
                    authorId={question.authorId}
                    createdAt={question.$createdAt}
                    tags={question.tags}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No questions yet. Be the first to ask!</p>
                  <Link href="/ask" className="inline-block mt-4">
                    <ShimmerButton>Ask a Question</ShimmerButton>
                  </Link>
                </div>
              )}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" className="px-6 py-3">
                Load More Questions
              </Button>
            </div>
          </main>

          {/* Right Sidebar - Features */}
          <aside className="hidden xl:block w-80 space-y-6">
            <AnimatedCardReveal delay={300} direction="left">
              <div className="rounded-xl border border-primary/20 bg-linear-to-br from-primary/10 to-black/50 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FiZap className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">Why DevQnA?</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Real-time responses from expert developers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Modern, clean interface built with latest tech</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Reputation system to reward quality contributions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Rich markdown editor for code formatting</span>
                  </li>
                </ul>
              </div>
            </AnimatedCardReveal>

            <AnimatedCardReveal delay={500} direction="left">
              <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FiUsers className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">Get Started</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>
                    <span>Create your free account</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</div>
                    <span>Ask your first question</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</div>
                    <span>Help others and earn reputation</span>
                  </div>
                </div>
              </div>
            </AnimatedCardReveal>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}

