import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  initializeAnalytics,
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

export function isAnalyticsDebugMode() {
  return (
    import.meta.env.DEV ||
    new URLSearchParams(window.location.search).has('debug_analytics')
  )
}

let app: FirebaseApp | null = null
let analytics: Analytics | null = null
let initPromise: Promise<Analytics | null> | null = null

export function getAnalyticsInstance() {
  return analytics
}

/** Call once at app startup; safe to await before sending events. */
export function ensureAnalytics() {
  if (!isFirebaseConfigured()) {
    if (isAnalyticsDebugMode()) {
      console.warn(
        '[analytics] Firebase env vars missing in this build — events will not send.',
      )
    }
    return Promise.resolve(null)
  }

  if (analytics) return Promise.resolve(analytics)
  if (initPromise) return initPromise

  initPromise = (async () => {
    if (!(await isSupported())) {
      console.warn('[analytics] Firebase Analytics is not supported in this browser')
      return null
    }

    if (isAnalyticsDebugMode()) {
      ;(window as Window & { FIREBASE_ANALYTICS_DEBUG_MODE?: boolean }).FIREBASE_ANALYTICS_DEBUG_MODE =
        true
    }

    app = initializeApp(firebaseConfig)
    analytics = initializeAnalytics(app, {
      config: {
        send_page_view: false,
        debug_mode: isAnalyticsDebugMode(),
      },
    })
    setAnalyticsCollectionEnabled(analytics, true)

    if (isAnalyticsDebugMode()) {
      console.info('[analytics] ready', firebaseConfig.measurementId)
    }

    return analytics
  })()

  return initPromise
}

/** @deprecated Use ensureAnalytics() */
export async function initFirebaseAnalytics() {
  return ensureAnalytics()
}
