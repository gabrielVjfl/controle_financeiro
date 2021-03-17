import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex: 1;
min-height: 100vh;
min-width: 100%;
background-color: black;
align-items: center;
justify-content: center;
padding:  0;
margin: 0;
flex-direction: row;
overflow:auto;
`

export const TemplateLogo = styled.div`
position: absolute;
top: 0;
left: 0;
width: 320px;

`
export const Logo = styled.span`
color: #07F75D;
font-family: 'Nunito';
font-size:28pt;
font-weight: 700;
`
export const TemplateSlogan = styled.div`
 align-items: center;
 justify-content: center;
 max-width: 400px;
 margin-right: 100px;
`

export const Slogan = styled.h1`
color: white;
font-family: 'Nunito';
font-weight: 800;
font-size: 40pt;
`

export const TemplateIllustration = styled.div`
background-color: black;
height: 500px;
width: 600px;
margin-left: 100px;
border-radius: 20px;
`

export const TemplateButton = styled.div`
position: absolute;
height: 100px;
width: 400px;
top: 0;
right: 0;
margin-top: 10;
`
export const BtnSignIn = styled.button`
width: 150px;
height: 50px;
margin-top: 10px;
background-color: purple;
border: none;
border-radius: 10px;
margin-right: 13px;
`

export const BtnSignUp = styled.button`
width: 150px;
height: 50px;
margin-top: 10px;
background-color: #F77407;
border: none;
border-radius: 10px;
`

export const TextButton = styled.span`
color: white;
font-family: 'Nunito';
font-weight: 700;
font-size: 17px;
`