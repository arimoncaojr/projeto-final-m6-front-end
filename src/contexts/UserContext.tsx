import React, {createContext} from "react";
import { IUserCreatedRequest } from "../interfaces/user";
import { registerApi } from "../services/api";

interface IUserContextProps {
     children: React.ReactNode;
   }

interface IUserContext {
     createdUser: (data: IUserCreatedRequest) => Promise<void>;
}
   
export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({children}:IUserContextProps) => {
     
     const createdUser = async (data:IUserCreatedRequest) => {         
          try {
               
               const userCreated = await registerApi(data)
               
               
          } catch (error) {
               console.log(error)
          }
          
     }

     return (
          <UserContext.Provider value={{
               createdUser
          }}>
               {children}
          </UserContext.Provider>
     )
}