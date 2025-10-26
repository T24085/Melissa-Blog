import { app } from './firebase.js'
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { CATEGORY_LIST, CATEGORY_MAP, formatDate, createTagPills } from './helpers.js'

const db = getFirestore(app)

const featuredContainer = document.getElementById('featured-posts')
const recentContainer = document.getElementById('recent-posts')
const videosContainer = document.getElementById('latest-videos')
const categoriesContainer = document.getElementById('categories')

const postsStatEl = document.getElementById('stat-posts-count')
const videosStatEl = document.getElementById('stat-videos-count')

function createPostCard(post) {
  const card = document.createElement('article')
  card.className = 'card'

  const meta = document.createElement('div')
  meta.className = 'meta'
  meta.innerHTML = `
    <span>🗓 ${formatDate(post.publishedAt)}</span>
    <span>⏱ ${post.readTime || 3} min read</span>
    <span class="badge-category">${CATEGORY_MAP[post.category]?.label || post.category}</span>
  `

  const title = document.createElement('h3')
  title.textContent = post.title

  const excerpt = document.createElement('p')
  excerpt.textContent = post.excerpt

  const action = document.createElement('a')
  action.href = `post.html?id=${encodeURIComponent(post.id)}`
  action.className = 'btn-secondary'
  action.textContent = 'Read post'

  const tagsContainer = document.createElement('div')
  tagsContainer.className = 'tag-list'
  createTagPills(tagsContainer, post.tags)

  card.append(meta, title, excerpt, action, tagsContainer)
  return card
}

function createVideoCard(video) {
  const wrapper = document.createElement('article')
  wrapper.className = 'card'
  wrapper.classList.add('video-card')

  const thumb = document.createElement('div')
  thumb.className = 'video-thumb'
  const img = document.createElement('img')
  img.src = video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
  img.alt = video.title
  thumb.appendChild(img)

  const heading = document.createElement('h4')
  heading.textContent = video.title

  const description = document.createElement('p')
  description.textContent = video.description

  const footer = document.createElement('div')
  footer.className = 'meta'
  footer.innerHTML = `
    <span>📅 ${formatDate(video.publishedAt)}</span>
    <span class="badge-category">${CATEGORY_MAP[video.category]?.label || video.category}</span>
  `

  const link = document.createElement('a')
  link.href = video.youtubeUrl
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.className = 'btn-primary'
  link.textContent = 'Watch on YouTube'

  wrapper.append(thumb, heading, description, footer, link)
  return wrapper
}

function renderEmptyState(target, message) {
  const div = document.createElement('div')
  div.className = 'empty-state'
  div.textContent = message
  target.innerHTML = ''
  target.appendChild(div)
}

async function loadFeaturedPosts() {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where('featured', '==', true), orderBy('publishedAt', 'desc'), limit(2))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      renderEmptyState(featuredContainer, 'Featured posts will appear here soon.')
      return
    }

    featuredContainer.innerHTML = ''
    snapshot.forEach((doc) => {
      featuredContainer.appendChild(createPostCard({ id: doc.id, ...doc.data() }))
    })
  } catch (error) {
    console.error('Failed to load featured posts', error)
    renderEmptyState(featuredContainer, 'We could not load featured stories right now.')
  }
}

async function loadRecentPosts() {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, orderBy('publishedAt', 'desc'), limit(5))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      renderEmptyState(recentContainer, 'Once posts are published, they will appear here.')
      return
    }

    const posts = []
    recentContainer.innerHTML = ''
    snapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() }
      posts.push(data)
      recentContainer.appendChild(createPostCard(data))
    })

    postsStatEl.textContent = posts.length
  } catch (error) {
    console.error('Failed to load recent posts', error)
    renderEmptyState(recentContainer, 'We could not load recent stories right now.')
  }
}

async function loadLatestVideos() {
  try {
    const videosRef = collection(db, 'videos')
    const q = query(videosRef, orderBy('publishedAt', 'desc'), limit(3))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      renderEmptyState(videosContainer, 'Video reflections will appear here when they are added.')
      return
    }

    videosContainer.innerHTML = ''
    let count = 0
    snapshot.forEach((doc) => {
      const raw = doc.data()
      const youtubeId = extractYouTubeId(raw.youtubeUrl)
      videosContainer.appendChild(createVideoCard({ id: doc.id, youtubeId, ...raw }))
      count += 1
    })
    videosStatEl.textContent = count
  } catch (error) {
    console.error('Failed to load videos', error)
    renderEmptyState(videosContainer, 'We could not load videos right now.')
  }
}

function extractYouTubeId(url = '') {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function renderCategories() {
  categoriesContainer.innerHTML = ''
  CATEGORY_LIST.forEach((category) => {
    const card = document.createElement('a')
    card.className = 'category-card'
    card.href = `category.html?slug=${encodeURIComponent(category.slug)}`
    card.innerHTML = `
      <h4>${category.label}</h4>
      <p>${category.description}</p>
    `
    categoriesContainer.appendChild(card)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories()
  loadFeaturedPosts()
  loadRecentPosts()
  loadLatestVideos()
})
