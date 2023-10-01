import React from 'react'

export const StatusTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info'
}

export default function Notifications({ message, status = StatusTypes.INFO }) {

  return (
    message &&
    <div className={`notification-banner ${status}`}>
      <p>{message}</p>
    </div>
  )

}
