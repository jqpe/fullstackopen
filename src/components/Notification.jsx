import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Notification() {
  const notification = useSelector((state) => state.notification)

  const [className, setClassname] = useState(notification.variant)

  useEffect(() => {
    if (!notification.message) return
    setClassname(notification.variant)

    setTimeout(() => setClassname(undefined), 3000)
  }, [notification])

  if (!notification.message || !className) {
    return null
  }

  return <aside className={className}>{notification.message}</aside>
}
