import React from 'react'

interface HealthStatus {
  status: string
  timestamp: string
  version: string
  uptime: number
}

const HealthCheck: React.FC = () => {
  const [health, setHealth] = React.useState<HealthStatus | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    // This endpoint is handled by Nginx in Docker
    // It's a simple HTTP endpoint that returns 200 OK
    fetch('/health')
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        throw new Error(`HTTP ${response.status}`)
      })
      .then(_ => {
        setHealth({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          uptime: Math.floor(Date.now() / 1000)
        })
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  if (error) {
    return null // Don't render anything in production
  }

  if (!health) {
    return null
  }

  // This component is only used internally by the Nginx health check
  // It doesn't render anything visible to users
  return null
}

export default HealthCheck
