'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'
import ProfileDropdown from './ProfileDropdown'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const { currentProfile } = useProfile()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'TV Shows', href: '/tv' },
    { name: 'Movies', href: '/movies' },
    { name: 'New & Popular', href: '/new' },
    { name: 'My List', href: '/my-list' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <div 
            className="text-red-600 text-2xl font-bold cursor-pointer"
            onClick={() => router.push('/')}
          >
            NETFLIX
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className="text-white hover:text-gray-300 transition-colors text-sm"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button 
            onClick={() => router.push('/search')}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>

          {/* Notifications */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-sm font-semibold">
                {currentProfile?.avatar || '👤'}
              </div>
              <span className="hidden md:block text-sm">
                {currentProfile?.name || 'Profile'}
              </span>
            </button>

            {showProfileDropdown && (
              <ProfileDropdown
                onClose={() => setShowProfileDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}