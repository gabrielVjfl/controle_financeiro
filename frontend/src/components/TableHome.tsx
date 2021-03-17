import React, {useState, useEffect, useContext} from 'react'
import {TemplateMenu, Table, CardTable, CardTableBody, CardHeader} from './styled'

import Axios from 'axios'

import { UserContext } from '../global/context/Actions'

import EntradasHome from '../utils/EntradasHome'
import SaidasHome from '../utils/SaidasHome'

import { FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import URL from '../Api/Url'

const TableHome = () => {

  interface Ientradas {
    _id: string,
    title: string, 
    value: string, 
    date: string
  }
  
  interface Isaidas {
    _id: string,
    title: string, 
    value: string, 
    date: string,
    status: string

  }

  const { state } = useContext(UserContext)
  


  const [listEntradas, setListEntradas] = useState<Ientradas[]>([])
  const [listSaidas, setListSaidas] = useState<Isaidas[]>([])

  const [search1, setSearch1] = useState<string>('')
  const [search2, setSearch2] = useState<string>('')

  console.log(search1)


  
  
useEffect(() => {
  ListEntradas()
 }, [state._id])
 
 
 
  const ListEntradas = async () => {
    try {
      let response = await
        Axios.get(
      `${URL}users/list/entradas/total/like/${state._id}?search=${search1}`
        )

      console.log('Minha resposta', response.data[0].entradas)

      setListEntradas(response.data[0].entradas)

    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    ListEntradas()
  }, [search1])

  useEffect(() => {
  ListSaidas()
  }, [state._id])

  const ListSaidas = async () => {
    try {

      let response = await Axios.get(`
      ${URL}users/list/saidas/total/like/${state._id}?search=${search2}`)

      console.log('Resposta de saidas', response.data[0].saidas)

      setListSaidas(response.data[0].saidas)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  ListSaidas()
  }, [search2])


  return (
    
  <div>
      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-md">

            
              
              <CardTable className="card">
                
                <input id="myInput" name="search1" value={search1} className="form-control"
                  placeholder="Pesquise..." onChange={(e) => setSearch1(e.target.value)} />
              <CardHeader id="card1" color="#020A53" className="card-header">
               Últimas Entradas <FaArrowUp size={22} color="green"/>
            </CardHeader>
                <CardTableBody className="card-body">
                  {
                    listEntradas.length < 1 ? (
                      <span>Sem Entradas!</span>
                    ) : (
                      <Table className="table" id="myTable" >
                      <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Data</th>
                      </tr>
                      {
                 
                        listEntradas.map(item => 
                         <EntradasHome item={item}></EntradasHome>
                          )
                      }
                    
                    </Table>
                    )
                  }
                  
                </CardTableBody>
              </CardTable>
            </div>
            <div className="col-md">

    
            
              
              <CardTable className="card">

                <input id="inputsearch2" name="search2"
                  className="form-control" value={search2}
                  placeholder="Pesquise..." onChange={(e) => setSearch2(e.target.value)} />
                
              <CardHeader color="#AA0063" className="card-header">
                Últimas Saídas <FaArrowDown size={22} color="red"/>
            </CardHeader>
                <CardTableBody className="card-body">

                  {
                    listSaidas.length < 1 ? (
                      <span>Sem Saídas!</span>

                    ) : (
                      <Table className="table" id="mytable" >
                      <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Data</th>
                        
                      </tr>
                      {
                        listSaidas.map(item => 
                        <SaidasHome item={item}/>
                          )
                     }
                  </Table>
                    )
                  }

                 
                </CardTableBody>
               </CardTable>
            </div>
          </div>
        </div>
     </div>
  </div>
  )
}
export default TableHome