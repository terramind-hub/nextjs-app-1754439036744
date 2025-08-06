'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'
import ProfileDropdown from './ProfileDropdown'
import SearchBar from './SearchBar'

export default function Header() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentProfile } = useProfile()
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    } else {
      router.push('/')
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (showSearch && searchQuery) {
      setSearchQuery('')
      router.push('/')
    }
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex-shrink-0">
            <div className="text-netflix-red text-2xl font-bold">
              NETFLIX
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
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

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearch}
                onClose={toggleSearch}
                autoFocus
              />
            ) : (
              <button
                onClick={toggleSearch}
                className="p-2 text-white hover:text-gray-300 transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 text-white hover:text-gray-300 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                {currentProfile?.name.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${
                showProfileDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            {showProfileDropdown && (
              <ProfileDropdown onClose={() => setShowProfileDropdown(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}