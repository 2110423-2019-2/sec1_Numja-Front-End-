import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from '../components/button'

import WithNav from '../components/layout/withNav'
import InputTextbox from '../components/input-textbox'

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async () => {
    // temporary
    await console.log(data)
    Router.push('/')
  }

  const updateData = e => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login">
      <WithNav>
        <form>
          <InputTextbox
            value={data.username}
            name="username"
            onChange={updateData}
            placeholder="username"
          />
          <InputTextbox
            value={data.password}
            name="password"
            onChange={updateData}
            placeholder="password"
            usingPassword
          />
          <Button width={'170px'} height={'65px'} onClick={handleLogin}>
            Log In
          </Button>
          <Link href="/sign-up">
            <a>Don't have an account? Sign Up</a>
          </Link>
        </form>
      </WithNav>
    </div>
  )
}

export default Login
