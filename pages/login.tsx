import React, { useState } from 'react'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Login = () => {
  return (
    <div className="login">
      <WithNav>
        <WithSidebar current={0}>Login</WithSidebar>
      </WithNav>
    </div>
  )
}

export default Login
