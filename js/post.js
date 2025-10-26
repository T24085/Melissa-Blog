import { app } from './firebase.js'
import {
  getFirestore,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { CATEGORY_MAP, formatDate, createTagPills } from './helpers.js'

const db = getFirestore(app)

const errorEl = document.getElementById('post-error')
const articleEl = document.getElementById('post-article')
const metaEl = document.getElementById('post-meta')
const titleEl = document.getElementById('post-title')
const excerptEl = document.getElementById('post-excerpt')
const imageWrapper = document.getElementById('post-image')
const contentEl = document.getElementById('post-content')
const videoWrapper = document.getElementById('post-video')
const videoDescription = document.getElementById('post-video-description')
const videoEmbed = document.getElementById('post-video-embed')
const tagsEl = document.getElementById('post-tags')

function showError(message) {
  errorEl.textContent = message
  errorEl.classList.remove('hidden')
  articleEl.classList.add('hidden')
}

function extractYouTubeId(url = '') {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

async function loadPost() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  if (!id) {
    showError('No post id was provided.')
    return
  }

  try {
    const snap = await getDoc(doc(db, 'posts', id))
    if (!snap.exists()) {
      showError('This post could not be found.')
      return
    }

    const post = snap.data()
    articleEl.classList.remove('hidden')
    errorEl.classList.add('hidden')

    titleEl.textContent = post.title
    excerptEl.textContent = post.excerpt || ''
    metaEl.innerHTML = `
      <span>🗓 ${formatDate(post.publishedAt)}</span>
      <span>⏱ ${post.readTime || 3} min read</span>
      <span class="badge-category">${CATEGORY_MAP[post.category]?.label || post.category}</span>
    `

    if (post.imageUrl) {
      const img = document.createElement('img')
      img.src = post.imageUrl
      img.alt = post.title
      imageWrapper.innerHTML = ''
      imageWrapper.appendChild(img)
      imageWrapper.classList.remove('hidden')
    } else {
      imageWrapper.classList.add('hidden')
    }

    const markdown = post.content || ''
    contentEl.innerHTML = window.marked.parse(markdown)

    createTagPills(tagsEl, post.tags)

    if (post.videoUrl) {
      const youtubeId = extractYouTubeId(post.videoUrl)
      if (youtubeId) {
        videoEmbed.innerHTML = `
          <iframe
            src="https://www.youtube.com/embed/${youtubeId}"
            title="${post.videoTitle || 'Embedded video'}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `
        videoDescription.textContent = post.videoDescription || ''
        videoWrapper.classList.remove('hidden')
      }
    }
  } catch (error) {
    console.error('Failed to load post', error)
    showError('Something went wrong while loading this post.')
  }
}

document.addEventListener('DOMContentLoaded', loadPost)
