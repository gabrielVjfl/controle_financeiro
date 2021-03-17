import React, { useState, ChangeEvent, useEffect, useContext } from 'react'
import Axios from 'axios'

import {UserContext} from '../../global/context/Actions.jsx'

import URL from "../../Api/Url";
const TesteEmail = () => {

  const [nameI, setNameI] = useState<string>('')

  const [_id, setId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [nameNew, setNameNew] = useState<string>("")


  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    let token = localStorage.getItem('userToken')
    let data = localStorage.getItem('userName')

  
    console.log('Meus dados', data)

    if (token && data) {
      let tokenParse = JSON.parse(token)
      let dataParse = JSON.parse(data)

      setNameI(dataParse)

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
      dispatch({
        type: 'SETname',
        payload: {
          name: dataParse
        }
      })
     
    }
    else {
    
    }
  }, [])

  const HandleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      
      let response = await Axios.post(`${URL}users/changename`, {
        _id: state._id,
        name: name,
        nameNew: nameNew
      })

      
       localStorage.setItem('userName', JSON.stringify(nameNew))

      
      

     
    
      setId('')
      setName('')
      setNameNew('')

      /**  */ //localStorage.setItem('userName', name)

      alert('Mudou ok!')

      //setTimeout(() => {
      // window.location.reload()
     // }, 2000)

    }
    catch (err) {
      alert('Error')
      console.log(err)
    }
  }


  return (
    <div>
    <h1>Nome do local { nameI }</h1>
      <h2>Nome do context { state.name }</h2>


      <form onSubmit={HandleSubmit}>
        <label style={{color: 'white'}}>Nome Atual :</label>
        <br/>
        <input
          type="text"
          placeholder="Digite o nome atual"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus={true}
          name="name"
          className="form-control"
        />
        <br/>
        <label style={{color: 'white'}}>Novo Nome :</label>
        <br />
        <input
          type="text"
          placeholder="Digite o novo nome"
          value={nameNew}
          onChange={(e) => setNameNew(e.target.value)}
          required
          name="nameNew"
          className="form-control"
        />
        <br />


        <button type="submit" style={{marginLeft: 10}} className="btn btn-success">Salvar</button>
        
        
      </form>
    </div>
  )
}
export default TesteEmail