import React from 'react'
import { users } from '@/models/server/config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

// Simple user profile: name + reputation. Server component.
export const revalidate = 0

interface UserProfileProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: UserProfileProps): Promise<Metadata> {
  const { id } = await params
  try {
    const user = await users.get(id)
    return {
      title: `${user.name} – DevQnA Profile`,
    }
  } catch {
    return { title: 'User Profile – DevQnA' }
  }
}

export default async function UserProfilePage({ params }: UserProfileProps) {
  const { id } = await params

  let name = 'Unknown User'
  let reputation = 0
  let avatarUrl: string | undefined

  try {
    const user = await users.get(id)
    name = user.name || name
    // prefs may hold reputation & avatar
    const prefs = (user.prefs || {}) as { reputation?: number; avatar?: string }
    reputation = typeof prefs.reputation === 'number' ? prefs.reputation : 0
    avatarUrl = prefs.avatar
  } catch {
    // Fallback: abbreviated id
    name = 'User#' + id.substring(0, 6)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-8">
          <div className="flex items-center gap-6">
            <Avatar src={avatarUrl} alt={name} fallback={name.charAt(0)} size="lg" />
            <div>
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <Badge variant="secondary" className="text-sm">{reputation} reputation</Badge>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
