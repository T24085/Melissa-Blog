import { Heart, BookOpen, Compass, Users } from 'lucide-react'

const highlights = [
  {
    title: 'Stories from the Journey',
    description: 'I share honest reflections from everyday life—moments of joy, doubt, growth, and grace.',
    icon: BookOpen,
  },
  {
    title: 'Faith in Practice',
    description: 'Faith is lived, not just studied. You will often find prayers, practices, and encouragement here.',
    icon: Heart,
  },
  {
    title: 'Learning Out Loud',
    description: 'I read, listen, and learn a lot. Expect thoughtful notes on books, sermons, podcasts, and conversations.',
    icon: Compass,
  },
  {
    title: 'Community Matters',
    description: 'This isn’t a monologue. Your stories and questions matter—reach out and join the conversation.',
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Meet Melissa</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to my corner of the internet. I created Melissa&rsquo;s Musings as a place to process the big
            questions, celebrate small joys, and explore how faith can shape the way we live, work, and love.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon
            return (
              <div key={highlight.title} className="card flex space-x-4 items-start">
                <div className="rounded-full bg-primary-100 p-3">
                  <IconComponent className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{highlight.title}</h2>
                  <p className="text-gray-600 mt-2">{highlight.description}</p>
                </div>
              </div>
            )
          })}
        </section>

        <section className="card space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">What you can expect</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Weekly posts that weave together faith, practical wisdom, and personal reflection.</li>
            <li>Curated resources to keep learning—books, sermons, playlists, and stories worth sharing.</li>
            <li>Honest conversations about the highs and lows that shape our spiritual lives.</li>
          </ul>
          <p className="text-gray-600">
            I&rsquo;m grateful you&rsquo;re here. Pour a cup of something warm, explore the stories, and—if you feel
            comfortable—share a bit of your own journey.
          </p>
        </section>
      </div>
    </div>
  )
}
