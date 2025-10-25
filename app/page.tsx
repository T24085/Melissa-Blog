import { Suspense } from 'react'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import RecentPosts from '@/components/RecentPosts'
import Categories from '@/components/Categories'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>}>
              <FeaturedPosts />
            </Suspense>
            
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
              <RecentPosts />
            </Suspense>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>}>
              <Categories />
            </Suspense>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Melissa</h3>
              <p className="text-gray-600 leading-relaxed">
                Welcome to my little corner of the internet! I&apos;m Melissa, and I love sharing thoughts 
                about faith, life, and everything in between. Join me on this journey of discovery 
                and reflection.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to get notified when I post new content.
              </p>
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="btn-primary text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


