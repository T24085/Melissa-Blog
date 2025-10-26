import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { firebaseConfig } from '../firebase-config.js'

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
