'use client'

import Link from 'next/link'
import { BookOpen, Heart, Lightbulb, Coffee, Star } from 'lucide-react'

const categories = [
  {
    name: 'Faith & Spirituality',
    slug: 'faith',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    description: 'Thoughts on faith, prayer, and spiritual growth'
  },
  {
    name: 'Life Lessons',
    slug: 'life',
    icon: Lightbulb,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    description: 'Insights from life experiences and challenges'
  },
  {
    name: 'Personal Reflection',
    slug: 'reflection',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Deep thoughts and personal musings'
  },
  {
    name: 'Book Reviews',
    slug: 'books',
    icon: Star,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    description: 'Reviews and thoughts on books I\'ve read'
  },
  {
    name: 'Random Thoughts',
    slug: 'random',
    icon: Coffee,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    description: 'Just random thoughts and observations'
  }
]

export default function Categories() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-3">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link
              key={category.slug}
              href={`/category?slug=${encodeURIComponent(category.slug)}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className={`h-4 w-4 ${category.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                  {category.name}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {category.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


