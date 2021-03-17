import React, {useState, useContext, useEffect, FormEvent, ChangeEvent} from 'react'




import URL from '../../Api/Url'


import {
  Container,
  TemplateLogo,
  Logo,
  TemplateInputsLogin,
  Input,
  TemplateIllustration,
  Label,
  BtnSubmit,
  TemplateBtnChange,
  BtnChange
 
} from "./styled";

import c1 from '../../assets/c1.svg'

import { FaMoneyBill } from "react-icons/fa";

import Axios from 'axios'

import {UserContext} from '../../global/context/Actions'

import { useHistory } from 'react-router-dom'

import Swal from 'sweetalert2'

const SignIn = () => {


  const history = useHistory()

  const { state: myuser } = useContext(UserContext)
  const {dispatch: userDispatch} = useContext(UserContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')




  const HandleLogin = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
     e.preventDefault()

      let response = await Axios.post(`${URL}users/login`, {
        email: email,
        password: password
      })

      console.log('Minha resposta', response)


      if (response.data.token) {
      

        console.log('Minha data', response.data.user)

        let json = await response.data.user
        let mytoken = await response.data.token

        localStorage.setItem('userData', JSON.stringify(json))
        
        localStorage.setItem('userToken', JSON.stringify(mytoken))

        localStorage.setItem('userName',JSON.stringify(response.data.user.name))
        
        let userDataStorage = localStorage.getItem('userData')
        let tokenStorage =  localStorage.getItem('userToken')
        let userName = localStorage.getItem('userName')

        if (!userDataStorage) {
           throw new Error() 
        }
        if (!tokenStorage) {
          throw new Error()
        }
        if (!userName) {
          throw new Error()
        }

        let userDataParse = JSON.parse(userDataStorage)

        let tokenParse = JSON.parse(tokenStorage)

        let nameParser = JSON.parse(userName)
        
        console.log('Minha datass', userDataParse)
        console.log('meuuuu token login', tokenParse)
        
    
        // axios authorization
        Axios.defaults.headers.Authorization = `Bearer ${tokenParse}`

        // Salvar no Context Api
        userDispatch({
          type: 'SETid',
          payload: {
            _id: userDataParse._id
          }
        })
        userDispatch({
          type: 'SETemail',
          payload: {
            email: userDataParse.email
          }
        })
        userDispatch({
          type: 'SETtoken',
          payload: {
            token: tokenParse
          }
        })
        userDispatch({
          type: 'SETauth',
          payload: {
          auth: localStorage.getItem('userToken')
          }
        })
        userDispatch({
          type: 'SETname',
          payload: {
            name: nameParser
          }
        })

        setEmail('')
        setPassword('')

        history.push('/home')

      }
      
    }
    catch (err) {
      // sweetalert2
      Swal.fire({
        title: 'Ocorreu um erro',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  return (
    <Container>
   
   <TemplateLogo>
        <Logo>Olá! Faça o seu login!</Logo>
      </TemplateLogo>

      
      <form onSubmit={HandleLogin}>
      <TemplateInputsLogin>
        <br />
        
        
        <Label>Email :</Label>
          <Input
            autoFocus={true}
            type="email" value={email} className="form-control"
            placeholder="Digite o seu melhor email"
            onChange={e => setEmail(e.target.value)}
            required/>
        
        <br />
       
        <Label>Senha :</Label>
          <Input
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
            value={password}
            className="form-control"
            placeholder="Digite a sua senha secreta"
            />
        <br />
           
          <BtnSubmit type="submit">Entrar!</BtnSubmit>
        
        </TemplateInputsLogin>
        </form>
        

      <TemplateIllustration>
        <img src={c1} height="450px" width="450px"/>
      </TemplateIllustration>
      
      <TemplateBtnChange>
        <BtnChange>Criar Conta!</BtnChange>
      </TemplateBtnChange>



    </Container>
  )
}
export default SignIn