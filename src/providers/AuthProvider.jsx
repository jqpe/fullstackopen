import { createContext, useState } from 'react'

export const AuthContext = createContext({ token: null })

export const AuthContextProvider = ({ children }) => {
  const initialUser = { token: localStorage.getItem('auth-token') }

  const [user, setUser] = useState(initialUser)

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  )
}
