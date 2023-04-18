import React, {createContext, useState} from "react";
import { IUserCreatedRequest } from "../interfaces/user";
import { registerApi } from "../services/api";

interface IUserContextProps {
     children: React.ReactNode;
   }

interface IUserContext {
     createdUser: (data: IUserCreatedRequest) => Promise<void>;
     showModal: string;
     setShowModal: React.Dispatch<React.SetStateAction<string>>;
     sucessModal: boolean;
     setSucessModal: React.Dispatch<React.SetStateAction<boolean>>;
}
   
export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({children}:IUserContextProps) => {
     const [showModal, setShowModal] = useState("none");
     const [sucessModal, setSucessModal] = useState(false)

     const createdUser = async (data:IUserCreatedRequest) => {         
          try {
               
               const userCreated = await registerApi(data)
               setSucessModal(true)
               setShowModal("flex")

          } catch (error) {
               console.log(error)
               setSucessModal(false)
               setShowModal("flex")
          }
          
     }

     return (
          <UserContext.Provider value={{
               createdUser,
               showModal,
               setShowModal,
               sucessModal,
               setSucessModal
          }}>
               {children}
          </UserContext.Provider>
     )
}