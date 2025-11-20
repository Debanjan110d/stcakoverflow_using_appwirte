"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuestionForm, type QuestionData } from '@/components/QuestionForm'
import { AnimatedCardReveal } from '@/components/ui/animated-card-reveal'
import { Card } from '@/components/ui/card'
import { FiInfo } from 'react-icons/fi'
import { createQuestion } from '@/lib/appwrite'
import { useAuthStore } from '@/store/Auth'

export default function AskQuestionPage() {
  const router = useRouter()
  const { session } = useAuthStore()

  const handleSubmit = async (data: QuestionData) => {
    try {
      const result = await createQuestion(data)
      if (result.success && result.data) {
        router.push(`/questions/${result.data.$id}`)
      } else {
        throw new Error('Failed to create question')
      }
    } catch (error) {
      throw error
    }
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <main className="space-y-6">
            <AnimatedCardReveal direction="top">
              <div>
                <h1 className="text-3xl font-bold mb-2">Ask a Question</h1>
                <p className="text-gray-400">
                  Get help from our community of developers
                </p>
              </div>
            </AnimatedCardReveal>

            {/* Tips Card */}
            <AnimatedCardReveal delay={200} direction="right">
              <Card className="p-6 bg-linear-to-br from-primary/10 to-black/50 border-primary/20">
                <div className="flex items-start gap-4">
                  <FiInfo className="text-primary shrink-0 mt-1" size={20} />
                  <div className="space-y-3 text-sm">
                    <h3 className="font-semibold text-white">Writing a good question</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Make your title specific and descriptive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Include relevant code snippets and error messages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Explain what you&apos;ve already tried</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Use proper tags to help others find your question</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedCardReveal>

            {/* Question Form */}
            <AnimatedCardReveal delay={400} direction="bottom">
              <QuestionForm 
                authorId={session.$id} 
                onSubmit={handleSubmit}
              />
            </AnimatedCardReveal>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
