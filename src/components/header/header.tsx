import { HeaderStyle } from "./headerStyle"
import { Squash as Hamburger } from 'hamburger-react'
import { useEffect, useState } from "react"
import logoColor from "../../assets/logo-colored.svg"
import { Button } from "../button/button"
import {RiLogoutBoxRFill as Logout} from "react-icons/ri"


interface IHeaderProps {
     type?: "dashboard";
}


// função de teste para mockup do nome do user
const name = "thiago clodoadl rodrigues"
const firstLetter = name.split(" ")[0][0]
const secondLetter = name.split(" ")[1][0]
const siglaName = (firstLetter + secondLetter).toUpperCase()

export const Header = ({type}:IHeaderProps) => {
     const [isOpen, setOpen] = useState(false)
     const [menuClicked, setMenuClicked] = useState(false);


     useEffect(() => {
          if (menuClicked) {
               setOpen(true);
          }
     }, [menuClicked]);

     return (
          <HeaderStyle isOpenMenu={isOpen}>
               <nav className="container">
                    <div>
                         <img src={logoColor} alt="logo motors shop" />
                         <Hamburger
                              toggled={isOpen}
                              toggle={() => {
                                   setOpen(!isOpen);
                                   setMenuClicked(true);
                              }}
                              color="#2C2C2C"
                              size={25}
                              rounded
                         />
                    </div>
                    <ul>
                         {type ? 
                              <>
                                   <li className={type && 'wrapperUser'}>
                                        <div className="iconUser">{siglaName}</div>
                                        <p className="nameUser">{name}</p>
                                   </li>
                                   <li className={type && 'wrapperLogout'}>
                                        <Button typeStyle="logout" title="Sair">
                                             <Logout />
                                        </Button>
                                        <span>Fazer logout</span>
                                   </li>
                              </>   
                              :
                              <>
                                   <li>
                                        <Button typeStyle="login">Fazer Login</Button>
                                   </li>
                                   <li>
                                        <Button typeStyle="callRegister">Cadastrar</Button>
                                   </li>
                              </>         
                         }
                    </ul>
               </nav>
          </HeaderStyle>
         
     )
}