import { app } from './firebase.js'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

const db = getFirestore(app)
const auth = getAuth(app)

const loginWrapper = document.getElementById('admin-login')
const panelWrapper = document.getElementById('admin-panel')
const loginForm = document.getElementById('login-form')
const loginError = document.getElementById('login-error')
const signOutButton = document.getElementById('sign-out')

const postForm = document.getElementById('post-form')
const postSuccess = document.getElementById('post-success')

const videoForm = document.getElementById('video-form')
const videoSuccess = document.getElementById('video-success')

function toggleVisibility(isAuthenticated) {
  if (isAuthenticated) {
    loginWrapper.classList.add('hidden')
    panelWrapper.classList.remove('hidden')
  } else {
    loginWrapper.classList.remove('hidden')
    panelWrapper.classList.add('hidden')
  }
}

function showTransientBadge(badge) {
  badge.classList.remove('hidden')
  setTimeout(() => badge.classList.add('hidden'), 2800)
}

function extractYouTubeId(url = '') {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

onAuthStateChanged(auth, (user) => {
  toggleVisibility(Boolean(user))
  if (user) {
    loginError.classList.add('hidden')
    loginForm.reset()
  }
})

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  loginError.classList.add('hidden')

  const email = document.getElementById('login-email').value.trim()
  const password = document.getElementById('login-password').value

  try {
    const button = loginForm.querySelector('button[type="submit"]')
    button.disabled = true
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Login error', error)
    loginError.textContent = error.message || 'Unable to sign in.'
    loginError.classList.remove('hidden')
  } finally {
    loginForm.querySelector('button[type="submit"]').disabled = false
  }
})

signOutButton.addEventListener('click', async () => {
  await signOut(auth)
})

postForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const title = document.getElementById('post-title').value.trim()
  const excerpt = document.getElementById('post-excerpt').value.trim()
  const content = document.getElementById('post-content').value.trim()
  const category = document.getElementById('post-category').value
  const tags = document
    .getElementById('post-tags')
    .value.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
  const imageUrl = document.getElementById('post-image').value.trim()
  const videoUrl = document.getElementById('post-video-url').value.trim()
  const videoTitle = document.getElementById('post-video-title').value.trim()
  const videoDescription = document.getElementById('post-video-description').value.trim()
  const featured = document.getElementById('post-featured').checked

  if (!title || !excerpt || !content) {
    alert('Title, excerpt, and content are required.')
    return
  }

  const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200))

  try {
    const button = postForm.querySelector('button[type="submit"]')
    button.disabled = true
    await addDoc(collection(db, 'posts'), {
      title,
      excerpt,
      content,
      category,
      tags,
      featured,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      videoTitle: videoTitle || null,
      videoDescription: videoDescription || null,
      readTime,
      author: auth.currentUser?.email || 'Melissa',
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    postForm.reset()
    showTransientBadge(postSuccess)
  } catch (error) {
    console.error('Failed to create post', error)
    alert(error.message || 'Unable to create post right now.')
  } finally {
    postForm.querySelector('button[type="submit"]').disabled = false
  }
})

videoForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const title = document.getElementById('video-title').value.trim()
  const description = document.getElementById('video-description').value.trim()
  const youtubeUrl = document.getElementById('video-url').value.trim()
  const category = document.getElementById('video-category').value
  const tags = document
    .getElementById('video-tags')
    .value.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  const youtubeId = extractYouTubeId(youtubeUrl)
  if (!youtubeId) {
    alert('Please provide a valid YouTube URL.')
    return
  }

  try {
    const button = videoForm.querySelector('button[type="submit"]')
    button.disabled = true
    await addDoc(collection(db, 'videos'), {
      title,
      description,
      youtubeUrl,
      youtubeId,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      category,
      tags,
      publishedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    })
    videoForm.reset()
    showTransientBadge(videoSuccess)
  } catch (error) {
    console.error('Failed to add video', error)
    alert(error.message || 'Unable to add video right now.')
  } finally {
    videoForm.querySelector('button[type="submit"]').disabled = false
  }
})
