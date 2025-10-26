import { app } from './firebase.js'
import {
  getFirestore,
  collection,
  orderBy,
  getDocs,
  query,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { CATEGORY_MAP, formatDate } from './helpers.js'

const db = getFirestore(app)
const videosList = document.getElementById('videos-list')

function extractYouTubeId(url = '') {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

function createVideoCard(video) {
  const card = document.createElement('article')
  card.className = 'card video-card'

  const thumb = document.createElement('a')
  thumb.href = video.youtubeUrl
  thumb.target = '_blank'
  thumb.rel = 'noreferrer'
  thumb.className = 'video-thumb'

  const img = document.createElement('img')
  img.src = video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
  img.alt = video.title
  thumb.appendChild(img)

  const title = document.createElement('h4')
  title.textContent = video.title

  const description = document.createElement('p')
  description.textContent = video.description

  const footer = document.createElement('div')
  footer.className = 'meta'
  footer.innerHTML = `
    <span>📅 ${formatDate(video.publishedAt)}</span>
    <span class="badge-category">${CATEGORY_MAP[video.category]?.label || video.category}</span>
  `

  const button = document.createElement('a')
  button.href = video.youtubeUrl
  button.target = '_blank'
  button.rel = 'noreferrer'
  button.className = 'btn-primary'
  button.textContent = 'Watch on YouTube'

  card.append(thumb, title, description, footer, button)
  return card
}

async function loadVideos() {
  try {
    const videosRef = collection(db, 'videos')
    const snapshot = await getDocs(query(videosRef, orderBy('publishedAt', 'desc')))

    if (snapshot.empty) {
      const empty = document.createElement('div')
      empty.className = 'empty-state'
      empty.textContent = 'No videos yet. Add one from the admin area to see it appear here.'
      videosList.appendChild(empty)
      return
    }

    snapshot.forEach((doc) => {
      const raw = doc.data()
      const youtubeId = extractYouTubeId(raw.youtubeUrl)
      videosList.appendChild(createVideoCard({ id: doc.id, youtubeId, ...raw }))
    })
  } catch (error) {
    console.error('Failed to load videos', error)
    const message = document.createElement('div')
    message.className = 'error-message'
    message.textContent = 'Something went wrong while loading videos.'
    videosList.appendChild(message)
  }
}

document.addEventListener('DOMContentLoaded', loadVideos)
