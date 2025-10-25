'use client'

'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Calendar, Clock, Tag, ArrowLeft, Youtube } from 'lucide-react'
import Link from 'next/link'
import { getPostById, type Post } from '@/lib/firebase'

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

const getEmbedUrl = (url: string) => {
  if (!url) {
    return ''
  }

  if (url.includes('embed')) {
    return url
  }

  const videoIdMatch = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/)
  const videoId = videoIdMatch?.[1]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

export default function PostDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('id') || undefined
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) {
      router.replace('/posts')
      return
    }

    const fetchPost = async () => {
      try {
        const postData = await getPostById(postId)

        if (!postData) {
          setError('Post not found')
          return
        }

        setPost(postData)
      } catch (err) {
        console.error('Error loading post:', err)
        setError('Something went wrong while loading this post.')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId, router])

  if (!postId) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-3 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900">Post Unavailable</h1>
          <p className="text-gray-600">{error || 'This post could not be found.'}</p>
          <Link href="/posts" className="btn-primary inline-flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </Link>
        </div>
      </div>
    )
  }

  const publishedDate = toDate(post.publishedAt)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/posts" className="text-primary-600 hover:text-primary-700 flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </Link>
          <span className="text-sm text-gray-500">By {post.author || 'Melissa'}</span>
        </div>

        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {publishedDate && (
              <span className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishedDate.toISOString()}>
                  {publishedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              </span>
            )}

            {post.readTime && (
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </span>
            )}

            {post.category && (
              <span className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <Link
                  href={`/category?slug=${encodeURIComponent(post.category)}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {post.category}
                </Link>
              </span>
            )}
          </div>
        </header>

        {post.imageUrl && (
          <div className="rounded-xl overflow-hidden shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        )}

        <article className="card prose lg:prose-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {(post.videoUrl || post.videoTitle) && (
          <section className="card space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
              <Youtube className="h-5 w-5 text-primary-600" />
              <span>Related Video</span>
            </h2>

            {post.videoTitle && (
              <p className="text-gray-900 font-medium">{post.videoTitle}</p>
            )}

            {post.videoDescription && (
              <p className="text-gray-600">{post.videoDescription}</p>
            )}

            {post.videoUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
                <iframe
                  src={getEmbedUrl(post.videoUrl)}
                  title={post.videoTitle || post.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </section>
        )}

        {post.tags?.length ? (
          <footer className="card flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </footer>
        ) : null}
      </div>
    </div>
  )
}
