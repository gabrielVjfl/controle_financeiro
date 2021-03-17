import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`

min-height: 100vh;
min-width: 100vw;

background-color: #DBE9E0;


`

export const Header = styled.header`
display: flex;
height: 220px;
width: 100%;
justify-content: space-between;
align-items: center;
background-color: black;
border-bottom: 4px solid #07F75D;
`

export const TemplateLogo = styled.div`
margin-left: 40px;
margin-top: -60px;
`
export const Logo = styled.span`
color: #07F75D;
font-family: 'Nunito';
font-size:25pt;
font-weight: 700;
`

export const Cards = styled.div`
height: 200px;
width: 380px;
background-color: ${props => `${ props.color }`};
border-radius: 8px;
margin-top: -70px;
`

export const CardsBody = styled.div`

`

export const ContainerCard = styled.div`

`

export const TemplateCard1 = styled.div`

`

export const TemplateCard2 = styled.div`
position: absolute;
left: 0;
bottom:0;
margin-left: 10px;

`
export const TitleCard = styled.span`
color: white;
font-family: 'Nunito';
font-weight: 600;
font-size: 19pt;
`
export const TitleValue = styled.span`
color: white;
font-family: 'Nunito';
font-weight: 600;
font-size: 16pt;
`

export const Menu = styled.div`
margin-top: -110px;
`
export const TitleMenu = styled.span`
color: white;
font-family: 'Nunito';
font-weight: 600;
font-size: 13pt;
margin-left: 8px;
margin-right: 8px;

`
export const TemplateMenu = styled.div`
  background-color: black;
  height: 70px;
  width: 690px;
  border-radius: 20px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #07F75D;
`

export const ButtonHome = styled.button`
background-color: ${props => `${props.color}`};
margin-left: 8px;
margin-right: 8px;
`
export const Table = styled.table`
background-color: white;
border-bottom: 2px solid black;

td {
  border-bottom: 2px solid black;
  font-family: 'Nunito';
  font-weight: 600;
}
`


export const CardTable = styled.div`
width: 520px;

`

export const CardTableBody = styled.div`

`

export const CardHeader = styled.div`
height: 60px;
background-color: ${props => `${props.color}`};
display: flex;
align-items: center;
justify-content: center;
font-family: 'Nunito';
font-weight: 600;
font-size: 18px;
color: white;

`