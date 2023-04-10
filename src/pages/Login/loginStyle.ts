import styled from "styled-components"

export const LoginForm = styled.form`
     width: 100%;
     max-width: 412px;
     height: 542px;
     padding: 16px;
     border-radius: 4px;
     background-color: var(--gray-10);
     box-shadow: 0px 2px 9px 2px var(--gray-4);

     & > h2 {
          font: var(--font-heading-8);
          color: #000000;
     }

     & > .forgotPassword{
          margin: 10px 18px 32px 0px;
          font: var(--font-body-3);
          color: var(--gray-2);
          text-align: right;
     }
     & > .dontAccount{
          text-align: center;
          margin: 20px;
          color: var(--gray-2);
          font: var(--font-body-4);
     }
     
     @media (min-width: 768px) {
          & {
               padding: 32px;
          }
     }

`