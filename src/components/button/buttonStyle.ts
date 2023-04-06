import styled, { css } from "styled-components"


export interface IStyledButtonProps{
     typeStyle?: string;
}

export const ButtonStyle = styled.button`
     margin: 400 auto 0 auto;
     border-radius: 4px;
     border-style: none;
     background-color: transparent;
     font: var(--font-btn-big);
     width: 100%;
     height: 48px;
     padding: 12px 28px;

     ${({typeStyle}:IStyledButtonProps) => {
          switch (typeStyle) {
               case "callRegister":
                    return css`
                         color: var(--gray-0);
                         border: 1.5px solid var(--gray-4);
                         max-width: 133px;   
                    `;
               case "callControl":
                    return css`
                         background-color: var(--color-brand-2);
                         color: var(--whiteFixed);
                         max-width: 279px; 
                    `;
               case "detail":
                    return css`
                         max-width: 55px; 
                         height: 32px;
                         padding: 4px 8px;
                         font: var(--font-body-3);
                         background-color: var(--color-brand-4);
                         color: var(--color-brand-1);
                         cursor: unset;
                    `;
               case "callAction":
                    return css`
                         max-width: 100px; 
                         height: 38px;
                         padding: 10px 15px; 
                         background-color:  var(--color-brand-1);
                         color: var(--whiteFixed);
                         font: var(--font-btn-medium);
                    `;
               case "footer":
                    return css`
                         max-width: 53px;
                         height: 50px;
                         padding: 9px 4px;
                         font-size: 30px;
                         background-color: var(--gray-1);
                         color: var(--whiteFixed);
                    `;
               case "seeAllAds":
                    return css`
                         max-width: 206px;
                         background-color: var(--gray-0);
                         color: var(--whiteFixed);
                         
                    `;
                    
          }
     }}
`