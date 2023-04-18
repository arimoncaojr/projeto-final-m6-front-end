import { ButtonStyle } from "./buttonStyle";
import { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
     typeStyle:
     | "noColor"
     | "colorBrand2"
     | "detail"
     | "colorBrand1"
     | "colorBrand1Withlimit"
     | "footer"
     | "seeAllAds"
     | "createAds"
     | "login"
     | "logout"
     | "colorGray6"
     | "colorGray5"
     | "delete"
     | "filter"
     
  onClick?: ((event: any) => void);
  title?: string;
}

export const Button = ({children,typeStyle,onClick,title,}: IButtonProps) => {
  return (
    <ButtonStyle typeStyle={typeStyle} onClick={onClick} title={title}>
      {children}
    </ButtonStyle>
  );
};
