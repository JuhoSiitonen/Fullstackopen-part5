import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import AddNewBlogs from './components/AddNewBlogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }

  const handleNewBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        blogService
          .getAll()
          .then((response) => {
            setBlogs(response)
            setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          })
      })
      .catch(() => {
        setErrorMessage('Creating new post not successfull')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addNewLike = (blogObject, id) => {
    blogService
      .update(blogObject, id)
      .then(() => {
        blogService
          .getAll()
          .then(response => {
            setBlogs(response)
            setNotificationMessage('like added')
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          })
      })
      .catch(() => {
        setErrorMessage('like not succesfull')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  const deleteBlog = id => {
    blogService
      .deletion(id)
      .then( () => {
        blogService
          .getAll()
          .then(response => {
            setBlogs(response)
            setNotificationMessage('deletion succesfull')
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          })
      })
      .catch(() => {
        setErrorMessage('deletion unsuccesfull')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

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
      {user.username} is logged in
      <button onClick={handleLogout}>logout</button>
      <br></br>
      <h2>Create new</h2>
      <Togglable buttonLabel='create'>
        <AddNewBlogs handleNewBlog={handleNewBlog} />
      </Togglable>
      <br></br>
      {blogs
        .sort((firstItem, secondItem) => firstItem.likes - secondItem.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} addNewLike={addNewLike} deleteBlog={deleteBlog} user={user} />
        )}
    </div>
  )
}

export default App