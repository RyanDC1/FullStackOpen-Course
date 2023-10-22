import React from 'react'

export default function Loader({ loading, children }) {
  return (
    loading ?
    <div>Loading...</div>
    :
    children
  )
}
