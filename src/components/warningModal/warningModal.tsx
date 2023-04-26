import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Button } from "../button/button";
import { ModalStyle, ModalWrapper } from "./warningModalStyle"

interface IWarningModalProps {
     type: "register" | "resetPassword";
     sucess?: boolean;
     showModal: string;
}


export const WarningModal = ({ type, sucess, showModal }: IWarningModalProps) => {
     const navigate = useNavigate()
     const {setShowModal} = useContext(UserContext)

     return (
          <ModalWrapper showModal={showModal}>
               <ModalStyle>
                    {type === "register" ? (
                         <>
                              <div className="closeModal">
                                   <p>{sucess? "Sucesso" : "Erro" }!</p>
                                   <button onClick={()=> setShowModal('none')}>X</button>
                              </div>
                              <div className="containerContent">
                                   <h3>
                                        {
                                             sucess ?
                                                  "Sua conta foi criada com sucesso!"
                                             :
                                                  "Ops! Não foi possivel criar sua conta"
                                        }
                                   </h3>  
                                   <p>
                                        {
                                             sucess ?
                                                  "Agora você poderá ver seus negócios crescendo em grande escala"
                                             :
                                                  "Email/Cpf já foram utilizados"
                                        }
                                   </p>
                                   {sucess &&
                                        <Button
                                             typeStyle="colorBrand1"
                                             onClick={() => (
                                                  // eslint-disable-next-line no-sequences
                                                  navigate("/login"),
                                                  setShowModal('none'))
                                             }>
                                             Ir para login
                                        </Button>
                                   }
                              </div>
                         </>
                    )
                    : type === "resetPassword" ? (
                         <>
                              <div className="closeModal">
                                   <p>Sucesso!</p>
                                   <button onClick={()=> setShowModal('none')}>X</button>
                              </div>
                              <div className="containerContent">
                                   <h3>Sua senha foi atualizada com sucesso </h3>  
                                   <p>Agora você poderá fazer login novamente</p>
                                   <Button
                                        typeStyle="colorBrand1"
                                        onClick={() => (
                                             // eslint-disable-next-line no-sequences
                                             navigate("/login"),
                                             setShowModal('none'))
                                        }>
                                        Ir para login
                                   </Button>
                              </div>
                         </>
                    )
                    : false}
               </ModalStyle>
          </ModalWrapper>
     )
}