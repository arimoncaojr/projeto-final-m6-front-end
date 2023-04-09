import { Button } from "../../components/button/button"
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import { DivT } from "./homepageStyle"



export const HomePage = () => {
     return (
          <>
               <Header/>
               <div className="container">
                    {/* <h1>HomePage</h1> */}
                    {/* <Button typeStyle="callRegister">Registrar</Button>
                    <Button typeStyle="actionForm-1">Finalizar Cadastro</Button>
                    <Button typeStyle="createAds">Criar anuncio</Button>
                    <Button typeStyle="callControl">Registrar</Button>
                    <Button typeStyle="callAction">Finalizar Cadastro</Button>
                    <Button typeStyle="seeAllAds">Criar anuncio</Button>
                    <Button typeStyle="detail">2021</Button> */}
               </div>
               {/* <DivT /> 
               
               <Footer/> */}
          </>
         
     )
}