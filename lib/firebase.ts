import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, query, orderBy, limit, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

function getFirebaseConfig(): FirebaseOptions {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase configuration value(s): ${missing.join(', ')}. ` +
      'Double-check your NEXT_PUBLIC_FIREBASE_* environment variables.'
    )
  }

  return config as FirebaseOptions
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig())

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Types
export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: any
  category: string
  tags: string[]
  featured: boolean
  readTime: number
  imageUrl?: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  createdAt: any
  updatedAt: any
}

export interface Video {
  id: string
  title: string
  description: string
  youtubeUrl: string
  thumbnailUrl: string
  category: string
  tags: string[]
  publishedAt: any
  createdAt: any
}

// Posts functions
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(
      postsRef,
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(2)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
  } catch (error) {
    console.error('Error getting featured posts:', error)
    return []
  }
}

export async function getRecentPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(
      postsRef,
      orderBy('publishedAt', 'desc'),
      limit(5)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
  } catch (error) {
    console.error('Error getting recent posts:', error)
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const postRef = doc(db, 'posts', id)
    const postSnap = await getDoc(postRef)
    
    if (postSnap.exists()) {
      return {
        id: postSnap.id,
        ...postSnap.data()
      } as Post
    }
    return null
  } catch (error) {
    console.error('Error getting post:', error)
    return null
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts')
    const q = query(
      postsRef,
      where('category', '==', category),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Post))
  } catch (error) {
    console.error('Error getting posts by category:', error)
    return []
  }
}

export async function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const postsRef = collection(db, 'posts')
    const now = new Date()
    const docRef = await addDoc(postsRef, {
      ...postData,
      createdAt: now,
      updatedAt: now
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<void> {
  try {
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, {
      ...postData,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export async function deletePost(id: string): Promise<void> {
  try {
    const postRef = doc(db, 'posts', id)
    await deleteDoc(postRef)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

// Videos functions
export async function getAllVideos(): Promise<Video[]> {
  try {
    const videosRef = collection(db, 'videos')
    const q = query(videosRef, orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Video))
  } catch (error) {
    console.error('Error getting videos:', error)
    return []
  }
}

export async function createVideo(videoData: Omit<Video, 'id' | 'createdAt'>): Promise<string> {
  try {
    const videosRef = collection(db, 'videos')
    const now = new Date()
    const docRef = await addDoc(videosRef, {
      ...videoData,
      createdAt: now
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating video:', error)
    throw error
  }
}

export default app
