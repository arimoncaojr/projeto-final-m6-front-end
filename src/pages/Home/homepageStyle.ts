import styled from "styled-components"
import imageBanner from "../../assets/motorsShop.png";

interface IStyledFilterProps{
     filterClickMobile: boolean
}



export const BannerStyle = styled.div`
     width: 100%;
     height: 468px;
     background-image: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.29) 0%,
          #000000 100%
     ),
     url(${imageBanner});
     background-size: 100%;
     background-repeat: no-repeat;
     background-position: center;
     flex: 1 1 auto;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     gap: 18px;
     position: relative;
     z-index: -2;

     & > h1 {
          color: var(--whiteFixed);
          font: var(--font-heading-4);
          text-align: center;
     }

     & > p{
          margin-bottom: 250px;
          font: var(--font-heading-7);
          color: var(--whiteFixed);
          line-height: 40px;
          text-align: center;
     }

     @media(min-width: 767px){
          & {
               height: 517px;
               background-size: contain;
          }
     }

`;

export const MainContainer = styled.main`
     display: flex;
     flex-direction: column;
     width: calc(100% - 32px) !important;
     padding: 16px;

     & > .wrapperContainer{
          display: flex;
          flex-direction: column;
          width: 100%;
          
          & >.cardsContainer{
               display: flex;
               overflow: auto;
               margin: 10px;
               gap: 16px;
          }
          
          & > .filterContainer{
               display: flex;
               justify-content: center;
               align-items: center;
               margin: 32px 0px;
     
               & > button{
                    max-width: 279px;
               }
          }
     }
     & > .paginationContainer{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 10px 0px 56px 0px;

          & > p {
               color: var(--gray-3);
               font: var(--font-heading-10);

               & > span {
                    color: #868E9680;
               }
          }

          & > button {
               background-color: transparent;
               border-style: none;
               font: var(--font-heading-9);
               color: var(--color-brand-2);
               display: flex;
               align-items: center;
               gap: 12px;

               & > svg{
                    font-size: 23px;
               }
          }
          
     }

     @media(min-width: 767px){
          &{
               gap: 80px;
             
               & > .wrapperContainer{
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    gap:16px;
                    
                    & > .cardsContainer{
                         flex-wrap: wrap;
                         overflow: unset;
                         margin-top: 30px;
                         gap: 16px;
                         height: max-content;
                         justify-content: flex-end;
                    }
                    & > .filterContainer{
                         width: 30%;
                         height: 100%;
     
                         & > button{
                              display: none;
                         }
                    }
               }
               & > .paginationContainer{
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
               }
          }
     }
`


export const Filter = styled.div`
     display: ${({filterClickMobile}:IStyledFilterProps)=> filterClickMobile? "flex" : "none"};
     flex-direction: column;
     width: 100%;
     padding: 16px;
     position: absolute;
     background-color: var(--whiteFixed);
     top: 80px;
     left: 0;

     & > .containerClickFilterModal{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          max-width: 348px;
          width: 100%;
          margin: 0 auto;

          & > p {
               color: var(--gray-1);
               font: var(--font-heading-12);
          }
          & > button {
               background-color: transparent;
               border-style: none;
               color: var(--gray-4);
               font: var(--font-heading-12);
          }
     }

     & > h2{
          font: var(--font-heading-5);
          color: var(--gray-0);
          text-align: left;
          width: 100%;
          max-width: 353px;
          margin: 0 auto;
     }

     & > div{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: max-content;
          max-height: 310px;
          overflow: auto;
          margin: 16px auto;
          width: 100%;
          max-width: 353px;
        
          & > .inputContainer{
               display: flex;
               justify-content: space-between;
               max-width: 348px;
               gap: 8px;
          }
     }
     & > div::-webkit-scrollbar {
          width: 7px;              
     }

     & > div::-webkit-scrollbar-track {
          background: transparent;      
     }

     & > div::-webkit-scrollbar-thumb {
          background-color: cornflowerblue;
          border-radius: 6px;
     }

    
     & > button{
          margin: 8px auto;
          width: 100%;
          max-width: 353px;
     }
     
     

     @media (min-width: 768px){
          display: flex;
          width: 312px;
          position: unset;
          height: unset;
          top: unset;
          left: unset;
          background-color: unset;
          max-width: unset;
          
          & > .containerClickFilterModal{
               display: none
          }
          & > button:nth-child(even){
               display: none;
          }

     }
     
`

