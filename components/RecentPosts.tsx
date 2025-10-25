'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { getRecentPosts } from '@/lib/firebase'

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

export default function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentPosts = await getRecentPosts()
        setPosts(recentPosts)
      } catch (error) {
        console.error('Error fetching recent posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
        <Link
          href="/posts"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex space-x-4">
                {post.imageUrl && (
                  <div className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
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
                    <div className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span className="text-primary-600">{post.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="hover:text-primary-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}


