import React, {useState, ChangeEvent, useContext} from 'react'

import Cleave from "cleave.js/react"

import Numeral from 'numeral'

import Axios from 'axios'

import URL from "../Api/Url";

import {UserContext} from '../global/context/Actions'

import {useHistory} from 'react-router-dom'

import Swal from 'sweetalert2'

const CreateEntradas = ({ HandleClose }) => {
  

  const [title, setTitle] = useState<string>("")

  const [value, setValue] = useState<string>("")

  const [data, setData] = useState<string>("")

  const [successMsg, setSuccessMsg] = useState<boolean>(false)

  const [errorMsg, setErrorMsg] = useState<string>("")

  let valueNew = Numeral(value).format('0')

  const {state} = useContext(UserContext)

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      let response = await Axios.post(`${URL}entradas/create`, {
        title: title,
        value: valueNew,
        data: data,
        user: state._id
    })

    setSuccessMsg(true)
      
      setTitle("")
      setValue("")
      setData("")

      setTimeout(() => {
        window.location.reload()
     }, 2000)
   
    }
    catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Titulo : </label><br/>
        <input type="text"
          placeholder="Digite o titulo"
          required name="title"
          autoFocus={true}
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Valor : </label><br/>
        <Cleave 
          placeholder="Digite o valor"
          required
          name="value"
          value={value}
          options={{
            numeral: true,
            delimiter: ',',
          }}
          className="form-control"
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <label>Data : </label><br/>
        <input type="date"
          value={data}
          className="form-control"
          name="date"
          onChange={(e) => setData(e.target.value)}/>
        <br />
        <button className="btn btn-danger" style={{marginRight: 10}} onClick={HandleClose}>Fechar</button>
        <button type="submit"  className="btn btn-success" >Salvar</button>
    
      </form>
      {
          successMsg == true ? (
            <div style={{marginTop: 10}} className="alert alert-success" role="alert">
            Entrada Adicionada com Sucesso!
      </div>
          ) : ''
        }
  </div>
  )
}
export default CreateEntradas