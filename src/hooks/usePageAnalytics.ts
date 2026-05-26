import { useEffect } from 'react'
import { trackPageView } from '../lib/analytics'
import { ensureAnalytics, isFirebaseConfigured } from '../lib/firebase'

/** Initialize Analytics and log the first page view. */
export function usePageAnalytics() {
  useEffect(() => {
    if (!isFirebaseConfigured()) return

    void ensureAnalytics().then((instance) => {
      if (!instance) return
      trackPageView(window.location.pathname || '/')
    })
  }, [])
}
