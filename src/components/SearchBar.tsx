'use client'

import { useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onClose: () => void
  autoFocus?: boolean
}

export default function SearchBar({ value, onChange, onSubmit, onClose, autoFocus = false }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-black/80 border border-gray-600 rounded px-3 py-2 min-w-64">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search titles, people, genres"
          className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  )
}