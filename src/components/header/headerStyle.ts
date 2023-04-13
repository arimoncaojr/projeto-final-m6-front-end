import styled from "styled-components"
import "animate.css"

export interface IStyledHeaderProps{
     isOpenMenu: boolean;
}


export const HeaderStyle = styled.header`
     width: 100%;
     height: 80px;
     background-color: var(--gray-10);
     padding: 16px;
     border-bottom: 2px solid var(--gray-6);
    

     & > nav {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          & > div{
               display: flex;
               justify-content: space-between;
               align-items: center;

               & > img {
                    width: 153px;
                    height: 30px;
               }
               
               & > .hamburger-react{
                    margin-right: 9px;
               }
          }

          & > ul {
               width: 100%;
               min-height: 154px;
               display: flex;
               flex-direction: column;
               align-items: flex-start;
               border-bottom-left-radius: 4px;
               border-bottom-right-radius: 4px;
               position: absolute;
               left: 0;
               top: ${({isOpenMenu}:IStyledHeaderProps) => (isOpenMenu ? '72px' : '-94px')};
               gap: 32px;
               padding: 16px;
               transition: top 0.5s ease;
               animation: ${({isOpenMenu}:IStyledHeaderProps) => (isOpenMenu ? "fadeInDown 0.5s ease" : "fadeOutUp 30s ease")};
               z-index: -1;
               background-color: var(--gray-10);
               box-shadow: -1px -2px 10px 0px var(--gray-4);

               & > li:first-child{
                    margin-top: 16px;
               }
               & > li:last-child{
                    width: 100%;
               }

               & > li.wrapperUser{
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    width: 100%;
                    max-width: 80%;

                    .iconUser{
                         background-color: var(--color-brand-2);
                         width: 32px;
                         height: 32px;
                         padding: 6px;
                         border-radius: 50%;
                         font-family: var(--font-text);
                         font-weight: 700;
                         font-size: 14px;
                         color: var(--whiteFixed);
                         display: flex;
                         align-items: center;
                         justify-content: center;
                    } 

                    .nameUser {
                         font: var(--font-body-2);
                         color: var(--gray-2);
                    }
               }
               & > li.wrapperLogout{
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: unset;

                    & > span{
                         white-space: nowrap;
                         font: var(--font-body-2);
                         color: var(--gray-2);
                    }
               }
          }
          
     }



     @media(min-width: 578px){
          & {
               padding: unset;

               & > nav{
                    align-items: center;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-left: 16px;

                    & > div{ 

                         & > .hamburger-react{
                              display: none;
                         }
                    }

                    & > ul {
                         flex-direction: row;
                         align-items: center;
                         justify-content: flex-end;
                         padding-right: 16px;
                         position: unset;
                         top: unset;
                         left: unset;
                         z-index: unset;
                         max-width: 370px;
                         min-height: 100%;
                         border-radius: unset;
                         background-color: unset;
                         box-shadow: unset;
                         animation: unset;
                         transition: unset;
                         border-left: 2px solid var(--gray-6);

                         & > li:first-child{
                              margin-top: unset;
                         }
                         & > li:last-child{
                              max-width: 133px;
                         }
                         & > li.wrapperUser{
                              padding-left: unset;
                         }
                         & > li.wrapperLogout{
                              display: unset;
                              align-items: unset;
                              gap: unset;

                              & > span{
                                   display: none;
                              }
                         }
                    }
               }
          }
     }
`