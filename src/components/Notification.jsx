import { useEffect } from 'react'
import { createRef } from 'react'

export function Notification(props) {
  const { message, variant = 'success' } = props

  const ref = createRef()
  const className = `notification ${variant}`

  useEffect(() => {
    if (!message) return

    setTimeout(() => {
      ref.current?.classList.remove(className.replace(' ', '.'))
    }, 5000)
  }, [props])

  if (!message) {
    return null
  }

  return (
    <aside ref={ref} className={className}>
      {message}
    </aside>
  )
}
