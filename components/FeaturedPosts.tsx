'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { getFeaturedPosts } from '@/lib/firebase'

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: any
  category: string
  tags: string[]
  featured: boolean
  readTime: number
  imageUrl?: string
}

const getPublishedDate = (value: Post['publishedAt']) => {
  if (!value) {
    return null
  }

  try {
    if (typeof (value as any).toDate === 'function') {
      return (value as { toDate: () => Date }).toDate()
    }

    const parsed = new Date(value as unknown as string | number | Date)
    return Number.isNaN(parsed.getTime()) ? null : parsed
  } catch {
    return null
  }
}

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const featuredPosts = await getFeaturedPosts()
        setPosts(featuredPosts)
      } catch (error) {
        console.error('Error fetching featured posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
      
      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg">No featured posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="card hover:shadow-lg transition-shadow duration-300">
              {post.imageUrl && (
                <div className="mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {(() => {
                      const date = getPublishedDate(post.publishedAt)
                      return date ? format(date, 'MMM dd, yyyy') : 'Unpublished'
                    })()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-primary-600" />
                  <span className="text-sm text-primary-600 font-medium">
                    {post.category}
                  </span>
                </div>
                
                <Link
                  href={`/post?id=${encodeURIComponent(post.id)}`}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}


