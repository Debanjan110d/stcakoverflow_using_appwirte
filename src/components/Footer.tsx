"use client"

import React from 'react'
import Link from 'next/link'
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-primary">Dev</span>
              <span className="text-white">QnA</span>
            </div>
            <p className="text-sm text-gray-400">
              A modern developer community for asking and answering programming questions.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Debanjan110d" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/debanjandutta100/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/questions" className="hover:text-primary transition-colors">
                  Questions
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-primary transition-colors">
                  Tags
                </Link>
              </li>
              <li>
                <Link href="/badges" className="hover:text-primary transition-colors">
                  Badges
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-primary transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevQnA. Built with Next.js and Tailwind CSS. Crafted by Debanjan Dutta.</p>
        </div>
      </div>
    </footer>
  )
}
