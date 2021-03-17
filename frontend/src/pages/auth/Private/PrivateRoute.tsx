import React, {useContext} from 'react'

import {Route, Redirect} from 'react-router-dom'

import {UserContext} from '../../../global/context/Actions'

const PrivateRoute = ({component: Component, ...rest}) => {

  const {state} = useContext(UserContext)
    
    
    return (
      <Route {...rest} render={props => (
        
        state.auth ? (
            <Component {...props}/>

        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )
    )}/>
    )
        }

export default PrivateRoute