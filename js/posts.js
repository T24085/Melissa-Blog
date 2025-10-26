import { app } from './firebase.js'
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { CATEGORY_MAP, formatDate, createTagPills } from './helpers.js'

const db = getFirestore(app)

const postsList = document.getElementById('posts-list')
const searchInput = document.getElementById('search-input')
const categoryFilter = document.getElementById('category-filter')

let allPosts = []

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

  const heading = document.createElement('h3')
  heading.textContent = post.title

  const excerpt = document.createElement('p')
  excerpt.textContent = post.excerpt

  const tagsContainer = document.createElement('div')
  tagsContainer.className = 'tag-list'
  createTagPills(tagsContainer, post.tags)

  const action = document.createElement('a')
  action.href = `post.html?id=${encodeURIComponent(post.id)}`
  action.className = 'btn-primary'
  action.textContent = 'Read post'

  card.append(meta, heading, excerpt, tagsContainer, action)
  return card
}

function renderPosts(list) {
  postsList.innerHTML = ''
  if (!list.length) {
    const empty = document.createElement('div')
    empty.className = 'empty-state'
    empty.textContent = 'No posts found. Try adjusting your filters.'
    postsList.appendChild(empty)
    return
  }

  list.forEach((post) => postsList.appendChild(createPostCard(post)))
}

function filterPosts() {
  const term = searchInput.value.trim().toLowerCase()
  const category = categoryFilter.value

  const filtered = allPosts.filter((post) => {
    const matchesCategory = category === 'all' || post.category === category
    if (!matchesCategory) return false

    if (!term) return true

    const haystack = [
      post.title,
      post.excerpt,
      ...(post.tags || []),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(term)
  })

  renderPosts(filtered)
}

async function loadPosts() {
  try {
    const postsRef = collection(db, 'posts')
    const snapshot = await getDocs(query(postsRef, orderBy('publishedAt', 'desc')))
    allPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    renderPosts(allPosts)
  } catch (error) {
    console.error('Failed to load posts', error)
    const errorMessage = document.createElement('div')
    errorMessage.className = 'error-message'
    errorMessage.textContent = 'Something went wrong while loading posts.'
    postsList.innerHTML = ''
    postsList.appendChild(errorMessage)
  }
}

searchInput.addEventListener('input', filterPosts)
categoryFilter.addEventListener('change', filterPosts)

document.addEventListener('DOMContentLoaded', loadPosts)
