"use client"

import React, { useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { useQuestions } from '@/hooks/useAppwrite'
import Link from 'next/link'

// Simple tags index derived from fetched questions.
// NOTE: Tag detail pages (/tags/[tag]) are not yet implemented.
export default function TagsIndexPage() {
  // Fetch a larger slice; adjust if you add server-side aggregation later.
  const { questions, loading } = useQuestions(200, 0)

  const tags = useMemo(() => {
    const set = new Set<string>()
    for (const q of questions) {
      (q.tags || []).forEach(t => set.add(t))
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [questions])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-sm text-gray-400">{tags.length} tag{tags.length === 1 ? '' : 's'}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : tags.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">No tags yet</h2>
            <p className="text-gray-400">Tags will appear once questions include them.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tags.map(tag => (
              <Link key={tag} href={`/tags/${tag}`} className="group">
                <div className="rounded-xl border border-white/10 p-4 bg-gray-900/40 backdrop-blur-sm transition-colors group-hover:border-primary/40">
                  <Badge variant="default" className="mb-3">{tag}</Badge>
                  <p className="text-xs text-gray-400">Click to view questions (page TBD)</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
