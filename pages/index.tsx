import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Home = () => {
  useEffect(() => {
    const { pathname } = Router
    // if auth -> redirect to user home
    // else -> redirect to login
    // if (pathname == '/') {
    //   Router.push('/login')
    // }
  })

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithNav>
        <WithSidebar>Home</WithSidebar>
      </WithNav>
    </>
  )
}

export default Home
