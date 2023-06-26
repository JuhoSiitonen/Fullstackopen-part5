import { useState } from 'react'
import PropTypes from 'prop-types'

const AddNewBlogs = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const newBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    handleNewBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={newBlog}>
      <div>
        title:
        <input
          value={title}
          name='Title'
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          name='Author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          name='Url'
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <button type='submit'>create</button>
      </div>
    </form>
  )}

AddNewBlogs.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default AddNewBlogs