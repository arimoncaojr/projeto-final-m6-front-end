import { ButtonStyle } from "./buttonStyle"
import { ReactNode } from 'react';

interface IButtonProps {
     children: ReactNode;
     typeStyle: "callRegister" | "callControl" | "detail" | "callAction" | "footer" | "seeAllAds";
     onClick?: () => void;
     title?: string;
}

export const Button = ({ children, typeStyle , onClick, title }:IButtonProps) => {

     return (
          <ButtonStyle typeStyle={typeStyle} onClick={onClick} title={title}>
               {children}
          </ButtonStyle>
     )
}