import styled, { css } from "styled-components"


export interface IStyledButtonProps{
     typeStyle:
          "callRegister" |
          "callControl"  |
          "detail"       |
          "callAction"   |
          "footer"       |
          "seeAllAds"    |
          "actionForm-1" |
          "createAds"    |
          "login"        |
          "logout";
}

export const ButtonStyle = styled.button`
     margin: 400 auto 0 auto;
     border-radius: 4px;
     border-style: none;
     background-color: transparent;
     font: var(--font-btn-big);
     color: var(--whiteFixed);
     width: 100%;
     height: 48px;
     padding: 12px 28px;

     ${({typeStyle}:IStyledButtonProps) => {
          switch (typeStyle) {
               case "callRegister":
                    return css`
                         color: var(--gray-0);
                         border: 1.5px solid var(--gray-4);
                         /* min-width: 133px;   
                         max-width: 315px;    */
                    `;
               case "callControl":
                    return css`
                         background-color: var(--color-brand-2);
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
                         font: var(--font-btn-medium);
                    `;
               case "footer":
                    return css`
                         max-width: 53px;
                         height: 50px;
                         padding: 9px 4px;
                         font-size: 30px;
                         background-color: var(--gray-1);
                    `;
               case "seeAllAds":
                    return css`
                         max-width: 206px;
                         background-color: var(--gray-0); 
                    `;
               case "actionForm-1":
                    return css`
                         max-width: 315px;
                         background-color: var(--color-brand-1);
                    `
               case "createAds":
                    return css`
                         max-width: 160px;
                         padding: 12px 26px;
                         background-color: transparent;
                         color: var(--color-brand-1);
                         border: 1.5px solid var(--color-brand-1);
                    `
               case "login":
                    return css`
                         font: var(--font-body-1);
                         height: unset;
                         padding: 5px;
                         background-color: transparent;
                         color: var(--color-brand-1);
                         border: none;
                    `
               case "logout":
                    return css`
                         max-width: 53px;
                         height: 40px;
                         padding: 9px 0px;
                         border-radius: none;
                         font-size: 30px;
                         color: var(--gray-2);
                         display: flex;
                         align-items: center;
                         justify-content: space-around;
                         /* margin-left: -2px; */
                    `
          }
     }}
`