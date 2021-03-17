import React, {createContext, useState, useEffect} from 'react'

import useAuth from './Reducers2'

export const UserContext = createContext()

export function AuthProvider({children}) {

    const {
        
        auth,
        email,
        password,
        loading,
        HandleRegistre,
        HandleLogout,
        setEmail,
        setPassword,

    } = useAuth()

    return (
<UserContext.Provider value={{setEmail, auth, setPassword, email, password, loading, HandleRegistre, HandleLogout}}>
    {children}
</UserContext.Provider>
    )
}