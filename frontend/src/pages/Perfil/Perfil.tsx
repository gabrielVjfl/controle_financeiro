import React, {useState, useEffect, useContext} from 'react'

import Gravatar from 'react-gravatar'

import {UserContext} from '../../global/context/Actions.jsx'

import {Container, Title, ContainerHeader, TitlePerfilSettings, SettingsContainer, TitlePerfil, ContainerButton, BtnVoltar, Card, CardBody} from './Styled'

import { FaArrowLeft } from 'react-icons/fa'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import Modal from '@material-ui/core/Modal';

import ChangeName from '../../components/ChangeNames'
const Perfil = () => {

  const [openName, setOpenName] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false)



  const history = useHistory()


  const { state } = useContext(UserContext)

  const {dispatch} = useContext(UserContext)
  
  
  useEffect(() => {
    let token = localStorage.getItem('userToken')
    let data = localStorage.getItem('userData')
    

    console.log('Meus dados', data)

    if (token && data) {
      let tokenParse = JSON.parse(token)
     

      dispatch({
        type: 'SETauth',
        payload: {
          auth: localStorage.getItem('userToken'),
        }
      })
      dispatch({
        type: 'SETtoken',
        payload: {
          token: tokenParse
        }
      })
     
    }
    else {
      history.push('/')
    }
  }, [])

  useEffect(() => {
  
    let token = localStorage.getItem('userToken')
    let data = localStorage.getItem('userData')
    let userName = localStorage.getItem('userName')

    console.log('Meus dados', data)

    if (data && token && userName) {
      
      let dataParse = JSON.parse(data)
      let tokenParse = JSON.parse(token)
      let userNameParse = JSON.parse(userName)

      Axios.defaults.headers.Authorization = `Bearer ${tokenParse}`;

      dispatch({
        type: 'SETname',
        payload: {
          name: userNameParse
        }
      })

      console.log('Meu nome', state.name);

      dispatch({
        type: 'SET_id',
        payload: {
          _id: dataParse._id
        }
      })
      dispatch({
        type: 'SETemail',
        payload: {
        email: dataParse.email
        }
     })
    
    }
    else {
      history.push('/')
    }
  }, [])

 

  const HandleCloseName = () => {
    setOpenName(false)
  }

  const HandleClosePassword = () => {
     setOpenPassword(false)
  }


  return (
  <div>
      <Container>

      <Modal
        open={openName}
        onClose={HandleCloseName}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ width: '50%', padding: 20, backgroundColor: 'black', border: '2px solid green'}}>
            <ChangeName HandleCloseName={HandleCloseName} />
            </div>
            </div>
      </Modal>
    
          <Title>Meu Perfil</Title>
        
        <br />
        <br/>
     
        <Card className="card">
            <CardBody className="card-body">
              
          <Gravatar id="gravatar"
          default="mm"
            email={state.email}
                size={140} />
              <br/>
            <TitlePerfil color="yellow">Nome :</TitlePerfil>

            <TitlePerfil color="white">{state.name}</TitlePerfil>
              <br />
            <TitlePerfil color="yellow">Email :</TitlePerfil>
            <TitlePerfil color="white">{state.email}</TitlePerfil>
              <br />
              <br />
            <hr style={{ width: '100%', height: '2px', color: 'white' }}></hr>
            
            <TitlePerfilSettings>Configurações</TitlePerfilSettings>
              <br />
                
              <SettingsContainer>
              <button onClick={() => setOpenName(true)}
                style={{ marginRight: 5 }} className="btn btn-primary">Mudar Nome</button>
              
              <button style={{ marginLeft: 5 }} onClick={() => setOpenPassword(true)}
                className="btn btn-warning">Mudar Senha</button>
              </SettingsContainer>

          </CardBody>
        </Card>
        <ContainerButton>
          <BtnVoltar className="btn btn-success" onClick={() => history.goBack()}>
            <FaArrowLeft color="white" size={23}>

          </FaArrowLeft>
          </BtnVoltar>

        </ContainerButton>
        
      </Container>
  </div>
  )
}

export default Perfil