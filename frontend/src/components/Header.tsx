import React, {useContext} from 'react';

import { Header, Logo, TemplateLogo, Menu, TitleMenu } from './styled'

import Gravatar from 'react-gravatar'

import {UserContext} from '../global/context/Actions'

import Axios from 'axios'

import {useHistory} from 'react-router-dom'

import {Link} from 'react-router-dom'

const HeaderHome = (props: any) => {


  const history = useHistory()

  const {dispatch} = useContext(UserContext)

  const HandleLogout = () => {
   
    dispatch({
      type: 'SETtoken',
      payload: {
        token: ''
      }
    })

    dispatch({
      type: 'SETauth',
      payload: {
        auth: undefined
      }
    })
    dispatch({
      type: 'SETname',
      payload: {
        name: ''
      }
    })
    dispatch({
      type: 'SETid',
      payload: {
        _id: ''
      }
    })
    dispatch({
      type: 'SETemail',
      payload: {
        email: ''
      }
    })

    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')

    Axios.defaults.headers.Authorization = undefined;

    history.push("/");


  }

  return (
<div>
    <Header>
    <TemplateLogo>
      <Logo>GoFinances</Logo>
        </TemplateLogo>
        
        <Menu>

          <Gravatar  id="gravatar"
          default="mm"
            email={ props.email }
            size={100} />
          
          <TitleMenu>Seja bem vindo! {props.name}</TitleMenu>
          <br />
          
          <Link to="/perfil"><button style={{ marginTop: 10 }}
            className="btn btn-success">Meu Perfil</button></Link>
          
        <button className="btn btn-danger" style={{ marginLeft: 10, marginTop: 10 }}
            onClick={HandleLogout}>Sair</button>
          
          
        </Menu>
    
      </Header>
    </div>
     
  )
}

export default HeaderHome