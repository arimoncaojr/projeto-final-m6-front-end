import styled from "styled-components"

export const RegisterForm = styled.form`
     width: 100%;
     max-width: 412px;
     margin: 42px auto;
     padding: 16px;
     border-radius: 4px;
     background-color: var(--gray-10);
     box-shadow: 0px 2px 9px 2px var(--gray-4);
     position: relative;
     z-index: -2;

     & > h2 {
          font: var(--font-heading-8);
          color: #000000;
     }

     & > .info{
          font: var(--font-body-3);
          color: #000000;
          margin: 32px 0px 16px 0px;
     }

     & > #joinInputs{
          display: flex;
          justify-content: space-between;
          gap: 10px; 

          #state,#city,#number,#complement{
               width: 75%;
               
          }
     }
     .errorsMessageTypeAccount{
          color: var( --color-alert-1);
          font-weight: 600;
          font-family: var(--font-text);
          font-size: 14px;
          margin-top: 6px;
          margin-left: 3px;
     }


     @media (min-width: 342px) {
          & {
               & > #joinInputs{ 

                    #state,#city,#number,#complement{
                         width: 80%;
                    }
               }
          }
     }
     @media (min-width: 768px) {
          & {
               padding: 32px;
          }
     }
`