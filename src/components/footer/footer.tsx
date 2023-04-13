import { FooterStyle } from "./footerStyle"
import logo from "../../assets/logo-white.svg"
import { Button } from "../button/button"
import {RiArrowDropUpLine as ArrowUp} from "react-icons/ri"

export const Footer = () => {
     const handleScrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          console.log('opa')
     };
     
     return (
          <FooterStyle >
               <div className="container">
                    <img src={logo} alt="logo motors shop" />
                    <p>© 2022 -  Todos os direitos reservados.</p>
                    <Button typeStyle="footer" onClick={handleScrollToTop} title="Voltar ao topo">
                         <ArrowUp />
                    </Button>
               </div>
          </FooterStyle>
     )
}