import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex: 1;
min-height: 100vh;
min-width: 100%;
background-color:  #1E282C;
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
margin-top: 80px;
margin-left: 50px;

`
export const Logo = styled.span`
color: #07F75D;
font-family: 'Nunito';
font-size:32pt;
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

export const TemplateBtnChange = styled.div`
position: absolute;
top: 0;
right: 0;
`


export const BtnChange = styled.button`
width: 200px;
height: 50px;
margin-top: 10px;
background-color: #F5A901;
border: none;
border-radius: 10px;
margin-right: 13px;
color: white;
font-size: 19px;
`


export const BtnSubmit = styled.button`
width: 200px;
height: 50px;
margin-top: 10px;
background-color: purple;
border: none;
border-radius: 10px;
color: white;
border: 1px solid white;
font-size: 19px;
`

export const TemplateInputs = styled.div`
height: 400px;
width: 400px;
display: flex;
background-color: white;
margin-right: 0px;
border-radius:19px;
background-color: black;
border: 1px solid white;
margin-top: 14px;
flex-direction: column;
align-items: center;

`
export const TemplateInputsLogin = styled.div`
height: 340px;
width: 400px;
display: flex;
background-color: white;
margin-right: 0px;
border-radius:19px;
background-color: black;
border: 1px solid white;
margin-top: 14px;
flex-direction: column;
align-items: center;

`
export const Input = styled.input`
width: 90%;
`

export const Label = styled.label`
color: white;
font-family: 'Nunito';
font-size: 19px;
font-weight: 700;

`

