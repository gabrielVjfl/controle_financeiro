import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
min-height: 100vh;
min-width: 100vw;
background-color: black;
justify-content: center;
align-items: center;
padding:  0;
margin: 0;
flex-direction: column;
overflow:auto;
`

export const ContainerHeader = styled.div`

display: flex;
flex: 1;
flex-direction: column;
height: 10%;
`

export const Title = styled.h1`
color: #07F75D;
font-family: 'Nunito';
font-size:3em;
font-weight: 700;

`


export const BtnVoltar = styled.button`
height: 4em;
width: 4em;
border-radius: 2em;

`
export const ContainerButton = styled.div`
position: absolute;
left: 0;
top: 0;
margin-left: 2em;
margin-top: 2em;
`


export const Card = styled.div`
margin-top: 10px;
border: 2px solid #07F75D;
border-radius: 10px;
height: 50%;
width: 40%;
`

export const CardBody = styled.div`
background-color: #222D32;
border: 2px solid #07F75D;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
flex: 1;

`

export const TitlePerfil = styled.span`
font-family: 'Nunito';
font-weight: 700;
color: ${props => `${props.color}`};
font-size: 1.2em;
text-overflow: ellipsis;
overflow: hidden;
width: 90%;
`


export const TitlePerfilSettings = styled.span`
font-family: 'Nunito';
font-weight: 800;
color: white;
font-size: 1.3em;
text-overflow: ellipsis;
overflow: hidden;
`


export const SettingsContainer = styled.div`
display: flex;
flex-direction: row;
`
