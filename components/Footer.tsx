import Link from 'next/link'
import { Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">Melissa&apos;s Musings</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              A thoughtful blog exploring faith, life experiences, and the journey of discovery. 
              Join me as I share insights, stories, and reflections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:melissa@example.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/faith" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Faith & Spirituality
                </Link>
              </li>
              <li>
                <Link href="/category/life" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Life Lessons
                </Link>
              </li>
              <li>
                <Link href="/category/reflection" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Personal Reflection
                </Link>
              </li>
              <li>
                <Link href="/category/books" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Book Reviews
                </Link>
              </li>
              <li>
                <Link href="/category/random" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                  Random Thoughts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            Copyright {new Date().getFullYear()} Melissa&apos;s Musings. Made with{' '}
            <Heart className="inline h-4 w-4 text-red-500" /> and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}






