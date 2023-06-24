import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage('Login successfull!')
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
    setNotificationMessage('Logout succesfull!')
    setTimeout(() => {
      setNotificationMessage('')
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
          setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
          setTimeout(() => {
             setNotificationMessage('')
          }, 5000)
        })
      .catch(error => {
      setErrorMessage('Creating new post not successfull')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addNewBlogs = () => {
    return(
    <form onSubmit={handleNewBlog}>
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

  if (user === null) {
    return (
      <div>
        <NotificationMessage message={notificationMessage}/>
        <ErrorMessage message={errorMessage}/>
        <h2>Log in to application</h2>
          {!user && loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage message={notificationMessage}/>
      <ErrorMessage message={errorMessage}/>
      {console.log(user)}
      {user.username} is logged in
      <button onClick={handleLogout}>logout</button>
      <br></br>
      <h2>Create new</h2>
      {addNewBlogs()}
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App