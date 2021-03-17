import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Landing from './pages/landing/landing'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import Home from './pages/home/Home'
import Dashboards from './pages/Dashboards/Dashboards'
import Teste from './pages/teste/TesteEmail'


import Perfil from './pages/Perfil/Perfil'

import PrivateRoute from './pages/auth/Private/PrivateRoute'
const Routes = () => {
  return (  
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboards" exact component={Dashboards} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/perfil" exact component={Perfil} />
        <PrivateRoute path="/teste" exact component={Teste}/>
        <Redirect to="/"/>
     </Switch>
    </BrowserRouter>
  )
}
export default Routes