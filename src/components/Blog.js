import { useState } from 'react'

const Blog = ({ blog, addNewLike, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const owner = blog.user.username === user.username ? true : false

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const newLikes = blog.likes +1
    const blogObject = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    addNewLike(blogObject, blog.id)
  }

  const handleDeletion = () => {
    if (!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      return
    }
    deleteBlog(blog.id)
  }

  const deleteButton = () => {
    return(
      <button onClick={handleDeletion} id='removebutton'>remove</button>
    )}

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='hiddenAsDefault'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={handleLikes}>like</button>
        <br></br>
        {blog.user.name}
        {owner && deleteButton()}
      </div>
    </div>
  )}

export default Blog