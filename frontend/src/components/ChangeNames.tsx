import React, { useState, ChangeEvent, useContext, useEffect,
 } from 'react'

import Axios from 'axios'

import URL from "../Api/Url";

import {UserContext} from '../global/context/Actions'

const ChangeName = ({HandleCloseName}) => {

  const { state } = useContext(UserContext)
  const { dispatch } = useContext(UserContext)
  
  console.log('Meu dispatch', dispatch)

  const [successMsg, setSuccessMsg] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const [_id, setId] = useState<string>("")

  const [name, setName] = useState<string>("")

  const [nameNew, setNameNew] = useState<string>("")

  const HandleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      
      let response = await Axios.post(`${URL}users/changename`, {
        _id: state._id,
        name: name,
        nameNew: nameNew
      })

      console.log('Minha resposta name', response.config.data.nameNew)

      setErrorMsg('')

      setSuccessMsg(true)
    
      localStorage.setItem('userName', JSON.stringify(nameNew))
    
      dispatch({
        type: 'SETname',
        payload: {
          name: nameNew
        }
      })


      setName('')
      setNameNew('')

  
      setTimeout(() => {
       window.location.reload()
      }, 2000)

    }
    catch (err) {

      setErrorMsg(err.response.data.errBackend)
      setSuccessMsg(false)
      console.log(err)
    }
  }


  return (
    
    <div>
      
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

        <button className="btn btn-danger" onClick={HandleCloseName}>Fechar</button>
        <button type="submit" style={{marginLeft: 10}} className="btn btn-success">Salvar</button>
        <br />
        <br/>
        {
          successMsg == true ? (
            <div className="alert alert-success" role="alert">
            Nome Alterado com Sucesso!
          </div>
          ) : ''
        }
        <br/>
        {
          errorMsg ? (
            <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        ) : ''
        }
        
      </form>
      </div>
     
  )
}
export default ChangeName