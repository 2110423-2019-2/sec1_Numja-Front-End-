import React from 'react'
import Head from 'next/head'
import WithNav from '../components/layout/withNav'
import WithSidebar from '../components/layout/withSidebar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <WithNav>
        <WithSidebar current={0}>Home</WithSidebar>
      </WithNav>
      <style jsx global>{`
        * {
          font-family: 'Roboto', sans-serif;
        }

        a {
          text-decoration: none;
        }
      `}</style>
    </>
  )
}

export default Home
