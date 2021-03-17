import React, { useState, useContext, useEffect, ChangeEvent } from "react";

import Axios from "axios";

import Cleave from "cleave.js/react"

import URL from "../Api/Url";

import {UserContext} from '../global/context/Actions'

import {useHistory} from 'react-router-dom'

import Numeral from 'numeral'

import Swal from 'sweetalert2'

const CreateSaidas = ({ HandleCloseTwo }) => {
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [successMsg, setSuccessMsg] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")

  let numberNew = Numeral(value).format('0') 

  console.log('Meu numero', numberNew)

  const {state} = useContext(UserContext)

  const history = useHistory()


  const HandleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      let response = await Axios.post(`${URL}saidas/create`, {
        title: title,
        value: numberNew,
        data: data,
        status: status,
        user: state._id
      })
      
      console.log('A resposta', response)

        setSuccessMsg(true)

      setTitle("")
      setValue("")
      setStatus("")
      setData("")
     
     
      setTimeout(() => {
        window.location.reload()
     }, 2000)
   
     

    }
    catch (err) {
      console.log('meu erro', err.response.data.errBackend)
     
    }
}
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Titulo : </label>
        <br />
        <input
          type="text"
          placeholder="Digite o titulo"
          required
          name="title"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-control"
        />
        <br />
        <label>Valor : </label>
        <br />
    
          <Cleave placeholder="Digite o valor"
          options={{
            numeral: true,
            delimiter: ',',
           
           }}
        
          onChange={(e) => setValue(e.target.value)}
          required
          value={value}
          name="value"
          className="form-control"
          
                 />
        <br />
        <label>Data : </label>
        <br />
        <input
          type="date"
          onChange={(e) => setData(e.target.value)}
          value={data}
          className="form-control"
          name="date"
        />
        <br />
        <label>Status :</label>
        <br />
        <select
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-control"
          name="status"
        >
          <option value="">Selecione um status</option>
          <option value="PAGO">PAGO</option>
          <option value="ATRASADO">ATRASADO</option>
          <option value="AGENDADO">AGENDADO</option>
        </select>
        <br />
        <button
          style={{ marginRight: 10 }}
          onClick={HandleCloseTwo}
          className="btn btn-danger"
        >
          Fechar
        </button>
        <button type="submit"  className="btn btn-success">
          Salvar
        </button>

        {
          successMsg == true ? (
            <div style={{marginTop: 10}} className="alert alert-success" role="alert">
            Saída Adicionada com Sucesso!
      </div>
          ) : ''
        }

      </form>
    </div>
  );
};
export default CreateSaidas;
