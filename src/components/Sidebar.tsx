"use client"

import React from 'react'
import Link from 'next/link'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { AnimatedCounter } from './ui/animated-counter'
import { FiHome, FiMessageSquare, FiTag, FiTrendingUp } from 'react-icons/fi'

interface SidebarProps {
  activePage?: string
}

export function Sidebar({ activePage = 'home' }: SidebarProps) {
  const navItems = [
    { href: '/', label: 'Home', icon: FiHome, count: null },
    { href: '/questions', label: 'Questions', icon: FiMessageSquare, count: 1247 },
    { href: '/tags', label: 'Tags', icon: FiTag, count: 156 },
  ]

  const trendingTags = [
    { name: 'javascript', count: 234 },
    { name: 'react', count: 189 },
    { name: 'typescript', count: 167 },
    { name: 'nextjs', count: 145 },
    { name: 'nodejs', count: 123 },
  ]

  return (
    <aside className="w-64 space-y-6">
      {/* Navigation */}
      <Card className="p-4 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-white/10">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.label.toLowerCase()
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count && (
                  <span className="text-xs">
                    <AnimatedCounter value={item.count} duration={1500} />
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </Card>

      {/* Trending Tags */}
      <Card className="p-4 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp className="text-primary" size={18} />
          <h3 className="font-semibold text-white">Trending Tags</h3>
        </div>
        <div className="space-y-3">
          {trendingTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className="flex items-center justify-between group"
            >
              <Badge variant="secondary" className="group-hover:bg-primary/20 transition-colors">
                {tag.name}
              </Badge>
              <span className="text-xs text-gray-500">
                <AnimatedCounter value={tag.count} duration={1200} />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/tags"
          className="block mt-4 text-sm text-primary hover:underline"
        >
          View all tags →
        </Link>
      </Card>


    </aside>
  )
}
