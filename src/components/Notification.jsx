import { useSelector } from 'react-redux'

export function Notification() {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <aside className={`notification ${notification.variant}`}>
      {notification.message}
    </aside>
  )
}
