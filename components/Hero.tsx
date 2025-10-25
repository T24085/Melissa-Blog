import Link from 'next/link'
import { ArrowRight, BookOpen, Video, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary-100 rounded-full">
              <Heart className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              Melissa&apos;s Musings
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A thoughtful space where faith meets life, where questions find answers, 
            and where every story matters. Join me on this journey of discovery, 
            reflection, and growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/posts"
              className="btn-primary text-lg px-8 py-3 flex items-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Read Posts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              href="/videos"
              className="btn-secondary text-lg px-8 py-3 flex items-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Watch Videos</span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Thoughtful Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-600">Video Reflections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


