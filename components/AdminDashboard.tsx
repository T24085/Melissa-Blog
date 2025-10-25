'use client'

import { useState } from 'react'
import { Plus, FileText, Video, BarChart3, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import PostEditor from './PostEditor'
import VideoManager from './VideoManager'
import Analytics from './Analytics'

type TabType = 'posts' | 'videos' | 'analytics' | 'settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('posts')
  const [showPostEditor, setShowPostEditor] = useState(false)
  const { user, signOut } = useAuth()

  const tabs = [
    { id: 'posts' as TabType, name: 'Posts', icon: FileText },
    { id: 'videos' as TabType, name: 'Videos', icon: Video },
    { id: 'analytics' as TabType, name: 'Analytics', icon: BarChart3 },
    { id: 'settings' as TabType, name: 'Settings', icon: Settings },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                  <button
                    onClick={() => setShowPostEditor(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Post</span>
                  </button>
                </div>
                
                {showPostEditor ? (
                  <PostEditor onClose={() => setShowPostEditor(false)} />
                ) : (
                  <div className="card">
                    <p className="text-gray-600">Post management interface will be here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
                  <button className="btn-primary flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Video</span>
                  </button>
                </div>
                <VideoManager />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                <Analytics />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <div className="card">
                  <p className="text-gray-600">Settings panel will be here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


