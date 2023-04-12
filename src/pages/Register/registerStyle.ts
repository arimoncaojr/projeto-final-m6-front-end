import styled from "styled-components"

export const RegisterForm = styled.form`
     width: 100%;
     max-width: 412px;
     margin: 42px auto;
     min-height: 1660px;
     padding: 16px;
     border-radius: 4px;
     background-color: var(--gray-10);
     box-shadow: 0px 2px 9px 2px var(--gray-4);
     
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

     #confirmedPassword{
          margin-bottom: 24px;
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