import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

const Home = () => {
  useEffect(() => {
    const { pathname } = Router
    // *** temporary
    // if auth -> redirect to user home
    // else -> redirect to login
    if (pathname == '/') {
      Router.push('/login')
    }
  })

  return (
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      {/* <style jsx global>
        {`
          html {
            min-height: 100vh;
          }
        `}
      </style> */}
    </Head>
  )
}

export default Home
