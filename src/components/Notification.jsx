import { useEffect } from 'react'
import { createRef } from 'react'

export function Notification({ message, variant = 'sucess' }) {
  const ref = createRef()
  const className = `notification ${variant}`

  useEffect(() => {
    if (!message) return

    setTimeout(() => {
      ref.current?.classList.remove(variant)
    }, 5000)
  }, [message])

  if (!message) {
    return null
  }

  return (
    <aside ref={ref} className={className}>
      {message}
    </aside>
  )
}
