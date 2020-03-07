import React, { useState } from 'react'
import Router from 'next/router'
import Button from '@material-ui/core/Button'

import WithNav from '../components/layout/withNav'
import WithLink from '../components/layout/withLink'
import InputTextbox from '../components/input-textbox'

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async () => {
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
          <Button variant="outlined" size="medium">
            Log In
          </Button>
          <WithLink href={'/sign-up'}>
            <Button variant="contained" size="medium">
              Sign Up
            </Button>
          </WithLink>
        </form>
      </WithNav>
    </div>
  )
}

export default Login
