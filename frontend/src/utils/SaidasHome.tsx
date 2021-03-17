import React from "react";

import dayjs from "dayjs";

import { FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";

import Numeral from 'numeral'

const SaidasHome = ({ item }) => {
  return (
    <tr key={item._id}>
      <td>{item.title}</td>
      <td>
        R$ {Numeral(item.value).format('0,0')} <FaArrowDown size={32} color="red" />
      </td>
      <td>{item.status}</td>
      <td>{dayjs(item.date).format("DD/MM/YYYY")}</td>
    </tr>
  );
};
export default SaidasHome;
