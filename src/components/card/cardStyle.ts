import styled from "styled-components"

export const CardStyle = styled.article`
     width: 312px;
     height: 350px;
     background-color: mistyrose;

     & > figure {
          display: flex;
          justify-content: center;
          background-color: var(--gray-7);

          & > img {
               width: 262px;
               height: 150px;
          }
     }
`