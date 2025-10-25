'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)

    try {
      // Hook up your integration of choice (Formspree, Firebase Function, etc.)
      await new Promise((resolve) => setTimeout(resolve, 800))
      toast.success('Message sent! I will reply soon.')
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Failed to send contact message:', error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Let&rsquo;s Connect</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I love hearing from readers, whether you have a question, a story to share, or just want to say hello.
            Drop me a note below and I&rsquo;ll respond as soon as I can.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="card space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Reach out directly</h2>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <a href="mailto:melissa@example.com" className="hover:text-primary-600">
                  melissa@example.com
                </a>
              </p>
              <p className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <span>Nashville, Tennessee</span>
              </p>
            </div>
            <p className="text-sm text-gray-500">
              I respond to messages within a couple of days. For time-sensitive requests, email is the quickest way to
              hear back.
            </p>
          </section>

          <section className="card">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="How should I address you?"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Tell me what&apos;s on your mind."
                />
              </div>

              <button type="submit" className="btn-primary flex items-center justify-center space-x-2 w-full" disabled={sending}>
                <Send className="h-4 w-4" />
                <span>{sending ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}
