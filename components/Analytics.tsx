'use client'

import { BarChart3, Eye, Users, Heart, TrendingUp } from 'lucide-react'

export default function Analytics() {
  // Mock data - in a real app, this would come from your analytics service
  const stats = [
    {
      title: 'Total Views',
      value: '12,543',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: 'Subscribers',
      value: '1,234',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Engagement',
      value: '89%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Heart
    },
    {
      title: 'Growth Rate',
      value: '24%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ]

  const topPosts = [
    { title: 'Finding Peace in Daily Prayer', views: 1234, category: 'Faith' },
    { title: 'Lessons from My Morning Routine', views: 987, category: 'Life' },
    { title: 'Book Review: The Purpose Driven Life', views: 756, category: 'Books' },
    { title: 'Reflections on Gratitude', views: 654, category: 'Reflection' },
    { title: 'Random Thoughts on Coffee', views: 543, category: 'Random' }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary-100 rounded-full">
                  <IconComponent className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Views Over Time</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        {/* Top Posts */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Posts</h3>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-500">{post.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{post.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Direct</span>
              <span className="text-sm font-semibold text-gray-900">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Social Media</span>
              <span className="text-sm font-semibold text-gray-900">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Search</span>
              <span className="text-sm font-semibold text-gray-900">25%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Faith & Spirituality</span>
              <span className="text-sm font-semibold text-gray-900">40%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Life Lessons</span>
              <span className="text-sm font-semibold text-gray-900">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Personal Reflection</span>
              <span className="text-sm font-semibold text-gray-900">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Other</span>
              <span className="text-sm font-semibold text-gray-900">15%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900">New post published</p>
              <p className="text-gray-500 text-xs">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Video added to library</p>
              <p className="text-gray-500 text-xs">1 day ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900">Post featured on homepage</p>
              <p className="text-gray-500 text-xs">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


