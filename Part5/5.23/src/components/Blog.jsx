import React from 'react'
import { useState } from 'react'
import BlogService from '../services/BlogService'
import { StatusTypes } from './Notifications'
import { getUserSession } from '../auth/session'
import PropTypes from 'prop-types'

export default function Blog({ onUpdate, onDelete, onLikeClick, showNotification, id, title, author, user, likes, url }) {

  const [showDetails, setShowDetails] = useState(false)
  const userSession = getUserSession()

  return (
    <div className='blog' style={{ padding: 4, border: '1px solid', marginTop: 8}}>
      {
        showDetails ?
          <>
            <button onClick={() => setShowDetails(false)} style={{ float: 'right'}}>hide</button>
            <div>
              Title: <span>{title}</span>
            </div>
            <div>
              Author: <span>{author}</span>
            </div>
            <div>
              URL: <a href={url} target='_blank'>{url}</a>
            </div>
            <div>
              Likes: <span><span id='likes-count'>{likes}</span> <button id='like-btn' onClick={onLike}>Like</button></span>
            </div>
            {
              userSession.id === user.id &&
              <div>
                <button id='delete-btn' style={{ color: 'red' }} onClick={confirmDelete}>Delete</button>
              </div>
            }
          </>
          :
          <div>
            <span>{title}</span> - <i>{author}</i>  <button id='view-btn' onClick={() => setShowDetails(true)} style={{ float: 'right'}}>view</button>
          </div>
      }
    </div>
  )

  function onLike() {
    onLikeClick && onLikeClick()
    BlogService.update(id, {
      title, 
      author, 
      likes: likes + 1, 
      url
    })
    .then((response) => {
      onUpdate()
    })
    .catch((error) => {
      console.error("An error occurred while updating the blog", error)
    })
  }

  function confirmDelete() {
    if(userSession.id !== user.id)
    {
      return
    }
    const allowDelete = window.confirm(`Delete blog ${title}`)
    if(allowDelete)
    {
      deleteBlog()
    }
  }

  function deleteBlog() {
    BlogService.delete(id)
    .then(() => {
      showNotification(`Blog '${title}' deleted successfully`, StatusTypes.SUCCESS)
      onDelete()
    })
    .catch((error) => {
      console.error("An error occurred while deleting the blog", error)
      showNotification(`An error occurred while deleting the blog`, StatusTypes.ERROR)
    })
  }
}


Blog.propTypes = {
  showNotification: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  author: PropTypes.string.isRequired, 
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired, 
  likes: PropTypes.number.isRequired, 
  url: PropTypes.string.isRequired
}