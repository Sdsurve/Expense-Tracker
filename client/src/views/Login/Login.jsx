import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/login`, {
      email: email,
      password: password
    })
    if (response.data.success) {
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading('Redirecting to dashboard...')

      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    }
    else {
      toast.error(response.data.message)
    }

  }

  return (
    <div>
      <h1 className="auth-heading">User Login</h1>
      <form className="auth-form">
        <input
          type="email"
          placeholder="Enter Email"
          className="user-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="user-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        <button type='button' className='btn-auth' onClick={loginNow}>Login</button>
      </form>
      <Link to='/signup' className='pg-link'>Don't have an account? Signup</Link>
      <Toaster />
    </div>
  )
}

export default Login