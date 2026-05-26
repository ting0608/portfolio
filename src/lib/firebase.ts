import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getAnalytics,
  isSupported,
  setAnalyticsCollectionEnabled,
  type Analytics,
} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export function isFirebaseConfigured() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_APP_ID &&
      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  )
}

let app: FirebaseApp | null = null
let analytics: Analytics | null = null
let initPromise: Promise<Analytics | null> | null = null

export async function initFirebaseAnalytics() {
  if (!isFirebaseConfigured()) {
    if (import.meta.env.DEV) {
      console.info(
        '[analytics] Firebase env vars missing — copy .env.example to .env',
      )
    }
    return null
  }

  if (analytics) return analytics
  if (initPromise) return initPromise

  initPromise = (async () => {
    if (!(await isSupported())) {
      console.warn('[analytics] Firebase Analytics is not supported in this browser')
      return null
    }

    app = initializeApp(firebaseConfig)
    analytics = getAnalytics(app)
    setAnalyticsCollectionEnabled(analytics, true)

    if (import.meta.env.DEV) {
      console.info('[analytics] Firebase initialized', firebaseConfig.measurementId)
    }

    return analytics
  })()

  return initPromise
}
