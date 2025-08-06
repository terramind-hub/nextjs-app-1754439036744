'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline'
import SearchBar from './SearchBar'
import { useProfile } from '@/contexts/ProfileContext'
import { useNetflix } from '@/contexts/NetflixContext'

export default function Header() {
  const { currentProfile } = useProfile()
  const { searchQuery, setSearchQuery } = useNetflix()
  const [showSearch, setShowSearch] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would trigger search functionality
    console.log('Searching for:', query)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-netflix-red text-2xl font-bold">
              NETFLIX
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link href="/new-popular" className="text-white hover:text-gray-300 transition-colors">
              New & Popular
            </Link>
            <Link href="/my-list" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          {showSearch ? (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              onClose={() => setShowSearch(false)}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          )}

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            {currentProfile ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-sm font-bold">
                  {currentProfile.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm hidden md:block">
                  {currentProfile.name}
                </span>
              </div>
            ) : (
              <UserIcon className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}