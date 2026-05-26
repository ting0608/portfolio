import { useEffect } from 'react'
import { trackPageView } from '../lib/analytics'
import { initFirebaseAnalytics, isFirebaseConfigured } from '../lib/firebase'

/** Initialize Analytics and log the first page view. */
export function usePageAnalytics() {
  useEffect(() => {
    if (!isFirebaseConfigured()) return

    void initFirebaseAnalytics().then((analytics) => {
      if (!analytics) return
      trackPageView(window.location.pathname || '/')
    })
  }, [])
}
