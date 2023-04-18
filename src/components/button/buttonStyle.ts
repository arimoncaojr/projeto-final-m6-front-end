import styled, { css } from "styled-components"


export interface IStyledButtonProps{
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
     padding: 12px 27px;

     ${({typeStyle}:IStyledButtonProps) => {
          switch (typeStyle) {
               case "noColor":
                    return css`
                         color: var(--gray-0);
                         border: 1.5px solid var(--gray-4);
                    `;
               case "colorBrand2":
                    return css`
                         background-color: var(--color-brand-2);
                         max-width: 279px; 
                    `;
               case "detail":
                    return css`
                         max-width: fit-content; 
                         height: 32px;
                         padding: 4px 8px;
                         font: var(--font-body-3);
                         background-color: var(--color-brand-4);
                         color: var(--color-brand-1);
                         cursor: unset;
                    `;
               case "colorBrand1Withlimit":
                    return css`
                         max-width: 100px; 
                         height: 38px;
                         padding: 10px 15px; 
                         background-color:  var(--color-brand-1);
                         font: var(--font-btn-medium);
                    `;
               case "colorBrand1":
                    return css`
                         background-color: var(--color-brand-1);
                    `
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
                    `
               case "colorGray6":
                    return css`
                         max-width: fit-content;
                         color: var(--gray-2);
                         background-color: var(--gray-6);
                    `
               case "colorGray5":
                    return css`
                         max-width: fit-content;
                         background-color: var(--gray-5);
                    `
               case "delete":
                    return css`
                         max-width: fit-content;
                         background-color: var(--color-alert-2);
                    `
               case "filter":
                    return css`
                         max-width: fit-content;
                         color: var(--gray-3);
                         font: var(--font-heading-12);
                         padding: unset;
                         height: unset;
                         margin: 4px 0px;
                         text-align: left;
                    `
          }
     }}
`