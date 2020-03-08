import React from 'react'
import App from 'next/app'
import AppHead from './utils/head'
import { AuthProvider } from './context/AuthState'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <AppHead />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </div>
    )
  }
}
export default MyApp
