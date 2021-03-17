import React, {useState, useEffect, useContext} from 'react'

import Axios from 'axios'

import {UserContext} from '../../global/context/Actions'

import {useHistory} from 'react-router-dom'

import { Container } from './Styled'


import CardsHome from '../../components/Cards'
import HeaderHome from '../../components/Header'
import MenuHome from '../../components/Menu'
import TableHome from '../../components/TableHome'
const Home = () => {

  const history = useHistory()

  const { state } = useContext(UserContext)

  console.log('Meu estado', state)
  
  const {dispatch: userDispatch} = useContext(UserContext)
  
  useEffect(() => {
    let token = localStorage.getItem('userToken')
    let data = localStorage.getItem('userData')
    let userName = localStorage.getItem('userName')

    if (token && data && userName) {
      let tokenParse = JSON.parse(token)
      let dataParse = JSON.parse(data)
      let nameParser = JSON.parse(userName)

     

      Axios.defaults.headers.Authorization = `Bearer ${tokenParse}`;

      

      userDispatch({
        type: 'SETid',
        payload: {
          _id: dataParse._id
        }
      })
     
      userDispatch({
        type: 'SETemail',
        payload: {
          email: dataParse.email
        }
      })
      userDispatch({
        type: 'SETauth',
        payload: {
          auth: localStorage.getItem('userToken'),
        }
      })
      userDispatch({
        type: 'SETtoken',
        payload: {
          token: tokenParse
        }
      })
      userDispatch({
        type: 'SETname',
        payload: {
          name: nameParser
        }
      })
    }
    else {
      history.push('/')
    }
  }, [])

  



 
  
  return (
 
    <Container>
      <HeaderHome name={state.name} email={ state.email }/>
      <CardsHome />

      <div style={{
        display: 'flex', alignItems: 'center', flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <MenuHome />
        <br />
        <br/>
        <TableHome/>
      </div>
   </Container>
    
  )
}
export default Home