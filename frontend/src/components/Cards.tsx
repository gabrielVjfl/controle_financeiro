import React, {useState, useEffect, useContext} from 'react'

import { ContainerCard, Cards, CardsBody, TitleCard, TitleValue,TemplateCard1, TemplateCard2} from './styled'

import {FaDollarSign, FaArrowUp, FaArrowDown} from 'react-icons/fa'
import Axios from 'axios'
import { UserContext } from '../global/context/Actions'

import Numeral from 'numeral'

import URL from '../Api/Url'
const CardsHome = () => {

  const { state } = useContext(UserContext)
  
  interface IcountS {
    saidasSum: number
  }
  interface IcountE {
    entradasSum: number
  }

const [countSaidas, setCountSaidas] = useState<IcountS[]>([])
const [countEntradas, setCountEntradas] = useState<IcountE[]>([])

  
  useEffect(() => {
  HandleCountSaidas()
  }, [state._id])

  useEffect(() => {
    HandleCountSaidas()
  }, [countSaidas])

  const HandleCountSaidas = async() => {
    try {
    let response = await Axios.get(
      `${URL}users/list/saidas/sum/${state._id}`
      )
      
      setCountSaidas(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  HandleCountEntradas()
  }, [state._id])

  useEffect(() => {
  HandleCountEntradas()
  }, [countEntradas])
  
  const HandleCountEntradas = async () => {
    try {
      let response = await Axios.get(
      `${URL}users/list/entradas/sum/${state._id}`
      )
      
      setCountEntradas(response.data)
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
    <ContainerCard className="container">
    <div className="main">
      <div className="row">
        <div className="col-md">
          <Cards color="#020A53" className="card">
            <CardsBody className="card-body">

                  {
             countEntradas.map(item => 
                  
              <TemplateCard1>
                      <FaArrowUp size={25} color="#07F75D" />
                 <TitleValue>R$ {Numeral(item.entradasSum).format('0,0')}</TitleValue>
               </TemplateCard1>
                )
                    
                  }

              <TemplateCard2>
                <TitleCard>Entradas +</TitleCard>
                
              </TemplateCard2>
             
              
            </CardsBody>
          </Cards>
        </div>
        <div className="col-md">
          <Cards color="#AA0063" className="card">
            <CardsBody className="card-body">

            {
                      countSaidas.map(item =>
            <TemplateCard1>
                    <FaArrowDown size={25} color="red" />
                    
                    
                <TitleValue>R$ {Numeral( item.saidasSum ).format('0,0')}</TitleValue>
                        
                    
             
              </TemplateCard1>
    )
  }
              <TemplateCard2>
              <TitleCard>Saidas -</TitleCard>
              </TemplateCard2>
             

            </CardsBody>
          </Cards>
        </div>
        <div className="col-md">
          <Cards color="#F56E1B" className="card">
            <CardsBody className="card-body">

                  {
                    countSaidas.map(saida =>
                      countEntradas.map(entrada =>
                        <TemplateCard1>
                        <FaDollarSign size={25} color="white" />
                          <TitleValue>R$ {Numeral(entrada.entradasSum - saida.saidasSum)
                            .format('0,0')}</TitleValue>
                      </TemplateCard1>
                        )
                    
                      )
                  }
           

              <TemplateCard2>
              <TitleCard>Total</TitleCard>
              </TemplateCard2>
             

            </CardsBody>
          </Cards>
          </div>
      
      </div>
    </div>
  </ContainerCard>
  </div>
  )
}

export default CardsHome
