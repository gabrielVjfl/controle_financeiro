import React, { createContext, useReducer } from 'react';
import {InitialState, UserReducer}  from './Reducers.jsx'

export const UserContext = createContext()

export default ({ children }) => {

  const [state, dispatch] = useReducer(UserReducer, InitialState)

  return (
    <UserContext.Provider value={{state, dispatch}}> 
      {children}
    </UserContext.Provider>
    )
}

