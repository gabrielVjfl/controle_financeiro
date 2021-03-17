import React from "react";

import {
  Container,
  TemplateLogo,
  TemplateIllustration,
  Logo,
  TemplateSlogan,
  Slogan,
  TemplateButton,
  BtnSignIn,
  BtnSignUp,
  TextButton
} from "./styled";

import { FaMoneyBill } from "react-icons/fa";

import Imagem from "../../assets/undraw_Finance_re_gnv2 (2).svg";

import {Link} from 'react-router-dom'
const Landing = () => {
  return (
    <Container>
      <TemplateLogo>
        <br />
        <Logo>
          GoFinances <FaMoneyBill size={35} color="green" />
        </Logo>
      </TemplateLogo>

      <TemplateSlogan>
        <Slogan>
          Faça o melhor controle e gerenciamento do seu dinheiro com a
          GoFinances
        </Slogan>
      </TemplateSlogan>

      <TemplateIllustration>
        <img src={Imagem} />
      </TemplateIllustration>

      <TemplateButton>
      <Link to="signin"><BtnSignIn className="btn btn-dark">
   <TextButton>Fazer login</TextButton>
        </BtnSignIn></Link>

        <Link to="signup"><BtnSignUp className="btn btn-dark">
        <TextButton>Criar Conta</TextButton>
        </BtnSignUp></Link>
      </TemplateButton>
    </Container>
  );
};

export default Landing;
