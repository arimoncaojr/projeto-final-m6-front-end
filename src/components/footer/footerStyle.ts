import styled from "styled-components"

export const FooterStyle = styled.footer`
     height: 80px;
     background-color: var(--gray-0);
     padding: 16px;

     & > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;

          & > img {
               width: 153px;
               height: 30px;
          }

          & > p {
               font: var( --font-body-4);
               color: var(--whiteFixed);
          }
     }

     @media(min-width: 767px){
          & {
              & > div {
                    flex-direction: row;
              }
          }
     }
`