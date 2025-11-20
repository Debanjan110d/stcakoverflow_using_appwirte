"use client"

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuestionCard } from '@/components/QuestionCard'
import { Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/ui/spinner'
import { useQuestions, useStats } from '@/hooks/useAppwrite'

export default function QuestionsIndexPage() {
  const [page, setPage] = useState(1)
  const pageSize = 20
  const offset = (page - 1) * pageSize
  const { questions, total, loading, error } = useQuestions(pageSize, offset)
  const { stats } = useStats()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">All Questions</h1>
          <div className="text-sm text-gray-400 hidden sm:flex gap-6">
            <span><strong className="text-white">{stats.questions}</strong> questions</span>
            <span><strong className="text-white">{stats.answers}</strong> answers</span>
            <span><strong className="text-white">{stats.users}</strong> users</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            Failed to load questions: {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : (
          <div>
            {questions.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
                <h2 className="text-xl font-semibold mb-2">No questions found</h2>
                <p className="text-gray-400 mb-4">Be the first to ask something!</p>
                <a href="/ask" className="text-primary hover:underline">Ask a question &rarr;</a>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map(q => (
                  <QuestionCard
                    key={q.$id}
                    id={q.$id}
                    title={q.title}
                    content={q.content}
                    authorId={q.authorId}
                    tags={q.tags || []}
                    createdAt={q.$createdAt}
                  />
                ))}
              </div>
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => { if (p >= 1 && p <= totalPages) setPage(p) }}
              itemsPerPage={pageSize}
              totalItems={total}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
