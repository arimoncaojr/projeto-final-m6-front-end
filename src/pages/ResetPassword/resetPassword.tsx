import { Wrapper } from "../../styles/wrapper"
import { ResetPasswordStyle } from "./resetPasswordStyle"
import Logo from "../../assets/logo-colored.svg"
import { IResetPassword, IResetPasswordRequest } from "../../interfaces/user"
import { useForm } from "react-hook-form"
import { resetPasswordSchema } from "./schemaResetPassword"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "../../components/input/input"
import { Button } from "../../components/button/button"
import { useNavigate, useParams } from "react-router-dom"
import { accessAuthenticationTokenSendEmail } from "../../services/api"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { WarningModal } from "../../components/warningModal/warningModal"

export const ResetPassword = () => {
     const [load, setLoad] = useState(true)
     const { register, handleSubmit , formState:{errors} } = useForm<IResetPassword>({
          resolver: yupResolver(resetPasswordSchema),
     })
     const { token } = useParams()
     const navigate = useNavigate()
     const {resetPassword, showModal} = useContext(UserContext)

     // const validationAccess = async() => {
     //      try {
     //           await accessAuthenticationTokenSendEmail(token)
     //           setLoad(false)  
     //      } catch (erros) { 
     //           navigate('/')
     //           setLoad(true)
     //      }
     // }
     // validationAccess()

     useEffect(() => {
          const validationAccess = async () => {
               try {
                    await accessAuthenticationTokenSendEmail(token)
                    setLoad(false)
               } catch (erros) {
                    navigate('/')
                    setLoad(true)
               }
          }
          validationAccess()
     },[])

     const handleResetPassword = (data: IResetPasswordRequest) => { 
          resetPassword(data, token)
     }

     return (
          <Wrapper>
               {!load &&
                    <ResetPasswordStyle className="container">
                         <img src={Logo} alt="logo da motor shop" />
                         <form>
                              <Input
                                   type="password"
                                   name="password"
                                   label="Digite sua nova senha"
                                   placeholder="digite sua nova senha"
                                   register={register}
                                   errors={errors}
                              />
                              <Input
                                   type="password"
                                   name="confirmedPassword"
                                   label="Confirmar senha"
                                   placeholder="digite sua senha novamente"
                                   register={register}
                                   errors={errors}
                              />
                              <Button
                                   typeStyle="colorBrand1"
                                   onClick={handleSubmit(handleResetPassword)}
                              >
                                   Trocar senha
                              </Button>
                         </form>
                    </ResetPasswordStyle>
               }
               <WarningModal type="resetPassword" showModal={showModal}/>
          </Wrapper>
     )
}