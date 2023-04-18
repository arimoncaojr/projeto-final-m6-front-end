import styled from "styled-components"

interface IModalWrapperProps {
     showModal: string;
}


export const ModalWrapper = styled.div`
     width: 100vw;
     height: 100vh;
     background-color: #0b0d0d8a;
     position: fixed;
     z-index: 2;
     top: 0;
     left: 0;
     padding: 16px;
     display:  ${({showModal}:IModalWrapperProps)=> showModal};
     
` 

export const ModalStyle = styled.section`
     width: 100%;
     max-width: 512px;
     height: 287px;
     background-color: var(--whiteFixed);
     margin: 62px auto;
     border-radius: 8px;
     
     .closeModal{
          width: 100%;
          height: 56px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          & > p{
               font: var( --font-heading-10);
               color: var(--gray-1);
          }

          & > button{
               background-color: transparent;
               border-style: none;
               font: var( --font-heading-10);
               color: var(--gray-4);
          }
     }
     .containerContent{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px;
          gap: 32px;
          
          & > h3{
               font: var( --font-heading-10);
               color: var(--gray-1);
          }

          & > p{
               font: var(--font-body-2);
               color: var(--gray-2);
          }

          & > button{
               width: unset;
          }
     }
`