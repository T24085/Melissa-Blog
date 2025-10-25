'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getPostsByCategory, type Post } from '@/lib/firebase'

const CATEGORY_MAP: Record<string, { label: string; description: string }> = {
  faith: {
    label: 'Faith & Spirituality',
    description: 'Stories and reflections on faith, prayer, and spiritual growth.'
  },
  life: {
    label: 'Life Lessons',
    description: 'Practical insights from life experiences and everyday moments.'
  },
  reflection: {
    label: 'Personal Reflection',
    description: 'Deeper reflections on identity, purpose, and the journey of life.'
  },
  books: {
    label: 'Book Reviews',
    description: 'Reviews and takeaways from the books currently on my shelf.'
  },
  random: {
    label: 'Random Thoughts',
    description: 'Unexpected musings that inspired or challenged me recently.'
  },
}

const toDate = (value: Post['publishedAt']) => {
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

export default function CategoryPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const categoryDetails = useMemo(() => {
    if (!slug) {
      return null
    }

    return CATEGORY_MAP[slug] ?? {
      label: slug.replace(/^\w/, (c) => c.toUpperCase()),
      description: 'Posts from this category.'
    }
  }, [slug])

  useEffect(() => {
    if (!slug) {
      return
    }

    const fetchPosts = async () => {
      try {
        const postsData = await getPostsByCategory(slug)
        setPosts(postsData)
      } catch (error) {
        console.error('Error retrieving posts by category:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [slug])

  if (!slug) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <Link href="/posts" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all posts</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">{categoryDetails?.label}</h1>
          <p className="text-gray-600 max-w-2xl">{categoryDetails?.description}</p>
        </div>

        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg">No posts have been published in this category yet.</p>
            <p className="text-gray-500 text-sm mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => {
              const publishedDate = toDate(post.publishedAt)

              return (
                <article key={post.id} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {publishedDate && (
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={publishedDate.toISOString()}>
                            {publishedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </time>
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                      <Link href={`/posts/${post.id}`} className="hover:text-primary-600 transition-colors duration-200">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                        {categoryDetails?.label || post.category}
                      </span>
                      {post.tags?.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
