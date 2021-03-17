import React, {useState, useEffect} from 'react'

import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


const DashboardsComponents = () => {

  interface Ilist {
    total: number,
    _id: {
    year: number,
    month: number,
   
    }

  }

  interface IlistDash {
 
    
    pv: number,// year
    name: number, // mes
    uv:number // total
   
  

  }

 
  const [list, setList] = useState<Ilist[]>([])
  const [listDashboard, setListDashboard] = useState<IlistDash[]>([])


  useEffect(() => {
  HandleList()
  }, [])

  const HandleList = async() => {
    try {
   let response = await axios.get(
     'http://localhost:8040/api/users/sum/entradas/month/5ff6656dd0af3b20f8402a75')

      let meses = response.data.map((item) => item)

        console.log('Meu filter',meses )

    
      setList(meses)
 

    }
    catch(err) {
   console.log(err)
    }
  }

  useEffect(() => {
    HandleListDashboard()
  }, [])

  const HandleListDashboard = async() => {
    try {
   let response = await axios.get(
     'http://localhost:8040/api/users/sum/entradas/dash/5ff6656dd0af3b20f8402a75')

      
     let total = response.data.map((item) => item.uv)

      let pv = response.data.map((item) => item._id.pv)
      let name = response.data.map((item) => item._id.name)
      let uv = response.data.map((item) => item.uv)


     
     
    
        setListDashboard(total)
 

    }
    catch(err) {
   console.log(err)
    }
  }
console.log(listDashboard)

  
      
      
 

  return (
    <div>
  <LineChart width={600} height={300} data={listDashboard}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
<div>
      {
        list.map(item =>
          <div>
            <span>Ano: {item._id.year}</span><br/>
           
            <span>Mes : 
            {
               item._id.month === 1 ?
                'Janeiro' : item._id.month === 2 ? 'Fevereiro' :
                item._id.month === 3 ? 'Março' : item._id.month === 4 ? 'Abril' :
                item._id.month === 5 ? 'Maio' : item._id.month === 6 ? 'Junho' :
                item._id.month === 7 ? 'Julho' : item._id.month === 8 ? 'Agosto' : 
                item._id.month === 9 ? 'Setembro' : item._id.month === 10 ? 'Outubro' : 
                item._id.month=== 11 ? 'Novembro' : item._id.month === 12 ? 'Dezembro' : ''
              }
            </span><br/>
           
            <span>Total :  R$ { item.total }</span>
            <hr/>
          </div>
          )
        }
        </div>

  </div>
  )
}
export default DashboardsComponents