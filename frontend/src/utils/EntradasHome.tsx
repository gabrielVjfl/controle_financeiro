import React from 'react'


import dayjs from 'dayjs'

import {FaDollarSign, FaArrowUp, FaArrowDown} from 'react-icons/fa'

import Numeral from 'numeral'

const EntradasHome = ({item}) => {
  return (
    <tr key={item._id}>
    <td>{item.title}</td>
    
  <td>R$ {Numeral(item.value).format(0,0)} <FaArrowUp size={32} color="green"/></td>
    
    
    <td>{dayjs( item.date).format("DD/MM/YYYY")}</td>
  </tr>
  )
}
export default EntradasHome