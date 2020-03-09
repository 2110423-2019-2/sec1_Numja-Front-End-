import React, { createContext, useReducer } from 'react'
import AuthReducer from './hooks/AuthReducer'

const initialAuthState = {
  isLoggedIn: false,
  isAdmin: false,
}

export const AuthContext = createContext<any>(initialAuthState)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState)

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
