import React, { useState } from "react";

import { TemplateMenu, ButtonHome } from "./styled";

import Modal from "@material-ui/core/Modal";

import CreateEntradas from './CreateEntradas';
import CreateSaidas from './CreateSaidas'
import {Link} from 'react-router-dom'
const MenuHome = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [openTwo, setOpenTwo] = useState<boolean>(false);

  const HandleClose = () => {
    setOpen(false);
  };

  const HandleCloseTwo = () => {
    setOpenTwo(false);
  };

  return (
    <div>
      {

        open == true ? (
          <div>
          <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50%', padding: 20, backgroundColor: 'white'}}>
                  <CreateEntradas HandleClose={HandleClose}/>
                </div>
             </div>
              
            </Modal>
            </div>
        ) : ''
      }

{

openTwo == true ? (
  <div>
  <Modal
open={openTwo}
onClose={HandleCloseTwo}
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ width: '50%', padding: 20, backgroundColor: 'white'}}>
          <CreateSaidas HandleCloseTwo={HandleCloseTwo}/>
        </div>
     </div>
      
    </Modal>
    </div>
) : ''
}

      <TemplateMenu>
        <ButtonHome color="#020A53" className="btn btn-dark">
          Entradas
        </ButtonHome>
        <ButtonHome color="#AA0063" className="btn btn-dark">
          Saídas
        </ButtonHome>

        <Link to="/dashboards">
        <ButtonHome color="green" className="btn btn-dark">
           Dashboards
        </ButtonHome>
        </Link>

        <ButtonHome
          color="#020A53"
          onClick={() => setOpen(true)}
          className="btn btn-dark"
        >
          + Adicionar Entradas
        </ButtonHome>
        <ButtonHome
          color="#AA0063"
          onClick={() => setOpenTwo(true)}
          className="btn btn-dark"
        >
          {" "}
          + Adicionar Saídas
        </ButtonHome>
      </TemplateMenu>
    </div>
  );
};
export default MenuHome;
