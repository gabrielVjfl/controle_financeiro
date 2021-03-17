import React, {useState, ChangeEvent} from "react";

import {Link, useHistory} from 'react-router-dom'



import {
  Container,
  TemplateLogo,
  Logo,
  TemplateInputs,
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

import URL from '../../Api/Url'

import Swal from 'sweetalert2'

const SignUp = () => {

  const history = useHistory()

  const [name, setName] = useState<string>('')

  const [email, setEmail] = useState<string>('')

  const [password, setPassword] = useState<string>('')

  const HandleRegister = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      let response = await Axios.post(`${URL}users/create`, {
        name: name,
        email: email,
        password: password

      })

      console.log(response)

      Swal.fire({
        title: 'Sucesso',
        text: 'Cadastro feito com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      history.push('/signin')
      
      
    }
    catch (err) {

      Swal.fire({
        title: 'Erro',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
 }


  return (
    <Container>
     
      <TemplateLogo>
        <Logo>Crie uma conta! É Grátis!</Logo>
      </TemplateLogo>

      <form onSubmit={HandleRegister}>
      <TemplateInputs>
        <br/>
        <Label>Nome :</Label>
        <Input required autoFocus={true} name="name" onChange={(e) => setName(e.target.value)}
          value={name} className="form-control" placeholder="Digite o seu nome" />
        <br/>
        <Label>Email :</Label>
        <Input type="email" required className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          value={email} name="email" placeholder="Digite o seu melhor email" />
        <br/>
        <Label>Senha :</Label>
        <Input className="form-control" value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password" type="password" placeholder="Digite a sua senha secreta" />
        <br />
        <BtnSubmit type="submit">Criar!</BtnSubmit>
        </TemplateInputs>
        </form>

      <TemplateIllustration>
        <img src={c1} height="450px" width="450px"/>
      </TemplateIllustration>
      
      <TemplateBtnChange>
        <BtnChange>Já tenho uma conta!</BtnChange>
      </TemplateBtnChange>


    </Container>
  );
};
export default SignUp;
