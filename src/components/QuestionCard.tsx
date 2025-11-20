"use client"

import React from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Avatar } from './ui/avatar'
import { useVotes, useAnswers, useAuthor } from '@/hooks/useAppwrite'

interface QuestionCardProps {
  id: string
  title: string
  content: string
  authorId: string
  tags: string[]
  createdAt: string
}

export function QuestionCard({
  id,
  title,
  content,
  authorId,
  tags,
  createdAt,
}: QuestionCardProps) {
  const { voteCount, loading: votesLoading } = useVotes(id, 'question')
  const { answers, loading: answersLoading } = useAnswers(id)
  const { author, loading: authorLoading } = useAuthor(authorId)
  
  const answerCount = answers.length
  const isAnswered = answers.length > 0
  const views = 0 // We can add a views collection later
  
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex gap-6">
        {/* Stats Column */}
        <div className="flex flex-col gap-3 text-center min-w-20">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">
              {votesLoading ? '...' : voteCount}
            </span>
            <span className="text-xs text-gray-400">votes</span>
          </div>
          <div className="flex flex-col">
            <span 
              className={`text-2xl font-bold ${
                isAnswered ? 'text-green-500' : answerCount > 0 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {answersLoading ? '...' : answerCount}
            </span>
            <span className="text-xs text-gray-400">answers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-300">{views}</span>
            <span className="text-xs text-gray-400">views</span>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          <Link href={`/questions/${id}`} className="block group/title">
            <h3 className="text-xl font-semibold text-white mb-3 group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {content.replace(/[#*`]/g, '').substring(0, 200)}...
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <Link key={idx} href={`/tags/${tag}`}>
                <Badge variant="default" className="cursor-pointer hover:scale-105 transition-transform">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {!authorLoading && author && (
                <>
                  <Avatar
                    src={author.avatar}
                    alt={author.name}
                    fallback={author.name.charAt(0)}
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <Link
                      href={`/users/${authorId}`}
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
            <span className="text-gray-500 text-xs">
              asked {formatDistanceToNow(createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}
