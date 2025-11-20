"use client"

import React from 'react'
import { Button } from './ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
  totalItems?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 20,
  totalItems,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 7 // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || currentPage * itemsPerPage)

  return (
    <div className="flex items-center justify-between py-8">
      {/* Info Text */}
      {totalItems && (
        <div className="text-sm text-gray-400">
          Showing <span className="text-white font-semibold">{startItem}</span> to{' '}
          <span className="text-white font-semibold">{endItem}</span> of{' '}
          <span className="text-white font-semibold">{totalItems}</span> results
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="h-10 px-4 border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-10 h-10 px-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Mobile: Current Page Display */}
        <div className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
          <span className="text-white font-semibold">{currentPage}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{totalPages}</span>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          className="h-10 px-4 border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
