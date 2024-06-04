import { useState } from 'react'
import { useEffect } from 'react'

export function Notification(props) {
  const { message, variant = 'success' } = props
  const initial = `notification ${variant}`

  const [className, setClassname] = useState(initial)

  useEffect(() => {
    if (!message) return
    setClassname(initial)

    setTimeout(() => setClassname(undefined), 3000)
  }, [initial, message])

  if (!message || !className) {
    return null
  }

  return <aside className={className}>{message}</aside>
}
