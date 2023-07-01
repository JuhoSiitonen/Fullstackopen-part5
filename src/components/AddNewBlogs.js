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
          id='testTitle'
        />
      </div>
      <div>
        author:
        <input
          value={author}
          name='Author'
          onChange={handleAuthorChange}
          id='testAuthor'
        />
      </div>
      <div>
        url:
        <input
          value={url}
          name='Url'
          onChange={handleUrlChange}
          id='testUrl'
        />
      </div>
      <div>
        <button type='submit' id='createButton'>create</button>
      </div>
    </form>
  )}

AddNewBlogs.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default AddNewBlogs