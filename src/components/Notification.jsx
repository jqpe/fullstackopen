import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

export function Notification() {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return <Alert severity={notification.variant}>{notification.message}</Alert>
}
