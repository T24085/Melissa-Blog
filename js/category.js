import { app } from './firebase.js'
import {
  getFirestore,
  collection,
  where,
  orderBy,
  query,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { CATEGORY_MAP, formatDate, createTagPills } from './helpers.js'

const db = getFirestore(app)

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')

const nameEl = document.getElementById('category-name')
const titleEl = document.getElementById('category-title')
const descriptionEl = document.getElementById('category-description')
const postsEl = document.getElementById('category-posts')
const errorEl = document.getElementById('category-error')

function showError(message) {
  errorEl.textContent = message
  errorEl.classList.remove('hidden')
  postsEl.innerHTML = ''
}

function createPostCard(post) {
  const card = document.createElement('article')
  card.className = 'card'

  const meta = document.createElement('div')
  meta.className = 'meta'
  meta.innerHTML = `
    <span>🗓 ${formatDate(post.publishedAt)}</span>
    <span>⏱ ${post.readTime || 3} min read</span>
  `

  const heading = document.createElement('h3')
  heading.textContent = post.title

  const excerpt = document.createElement('p')
  excerpt.textContent = post.excerpt

  const tagsContainer = document.createElement('div')
  tagsContainer.className = 'tag-list'
  createTagPills(tagsContainer, post.tags)

  const link = document.createElement('a')
  link.href = `post.html?id=${encodeURIComponent(post.id)}`
  link.className = 'btn-primary'
  link.textContent = 'Read post'

  card.append(meta, heading, excerpt, tagsContainer, link)
  return card
}

async function loadCategory() {
  if (!slug) {
    showError('No category specified.')
    return
  }

  const category = CATEGORY_MAP[slug]
  if (!category) {
    showError('This category does not exist.')
    return
  }

  nameEl.textContent = category.label
  titleEl.textContent = category.label
  descriptionEl.textContent = category.description

  try {
    const postsRef = collection(db, 'posts')
    const snapshot = await getDocs(
      query(postsRef, where('category', '==', slug), orderBy('publishedAt', 'desc')),
    )

    if (snapshot.empty) {
      const empty = document.createElement('div')
      empty.className = 'empty-state'
      empty.textContent = 'No posts yet in this category. Check back soon!'
      postsEl.appendChild(empty)
      return
    }

    snapshot.forEach((doc) => {
      postsEl.appendChild(createPostCard({ id: doc.id, ...doc.data() }))
    })
  } catch (error) {
    console.error('Failed to load category posts', error)
    showError('Something went wrong while loading this category.')
  }
}

document.addEventListener('DOMContentLoaded', loadCategory)
