import { useEffect } from 'react'

/**
 * Loads the Umami analytics tracker at runtime, but only when both env vars are
 * configured — so local dev and un-configured builds ship no tracking script at
 * all. Set VITE_UMAMI_SRC and VITE_UMAMI_WEBSITE_ID to enable it (see .env.example).
 */
const Analytics: React.FC = () => {
  useEffect(() => {
    const src = import.meta.env.VITE_UMAMI_SRC
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID
    if (!src || !websiteId) return

    const script = document.createElement('script')
    script.defer = true
    script.src = src
    script.dataset.websiteId = websiteId
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

export default Analytics
