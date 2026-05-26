import { logEvent, type Analytics } from 'firebase/analytics'
import {
  ensureAnalytics,
  isAnalyticsDebugMode,
  isFirebaseConfigured,
} from './firebase'

export type AnalyticsParams = Record<string, string | number | boolean>

function logDebug(eventName: string, params?: AnalyticsParams) {
  if (!isAnalyticsDebugMode()) return
  console.info('[analytics] event', eventName, params ?? {})
}

async function withAnalytics(
  eventName: string,
  run: (analytics: Analytics) => void,
  params?: AnalyticsParams,
) {
  if (!isFirebaseConfigured()) {
    logDebug(`${eventName} (skipped — not configured)`, params)
    return
  }

  const analytics = await ensureAnalytics()
  if (!analytics) {
    logDebug(`${eventName} (skipped — init failed)`, params)
    return
  }

  run(analytics)
  logDebug(eventName, params)
}

/** Fire-and-forget custom event (no-op when Firebase env is missing). */
export function trackEvent(eventName: string, params?: AnalyticsParams) {
  void withAnalytics(eventName, (analytics) => {
    logEvent(analytics, eventName, params)
  }, params)
}

/**
 * Page + screen views for GA4 / Firebase.
 * "Views by page title" uses page_view; screen class uses screen_view.
 */
export function trackPageView(pagePath = window.location.pathname || '/') {
  const pageTitle = document.title || 'Portfolio'

  void withAnalytics(
    'page_view',
    (analytics) => {
      logEvent(analytics, 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
      })

      logEvent(analytics, 'screen_view', {
        firebase_screen: pageTitle,
        firebase_screen_class: 'portfolio_home',
      })
    },
    { page_title: pageTitle, page_path: pagePath },
  )
}

/** Sidebar / CTA / roadmap controls */
export function trackButtonClick(buttonId: string, extra?: AnalyticsParams) {
  trackEvent('button_click', { button_id: buttonId, ...extra })
}

/** Fist bump / “like” on the hero */
export function trackLikeClick(location = 'hero') {
  trackEvent('like_clicked', { location, engagement_type: 'fist_bump' })
}
