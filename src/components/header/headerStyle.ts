import styled, { css } from "styled-components";
import "animate.css";

export interface IStyledHeaderProps {
  isOpenMenu: boolean;
  type?: "dashboard";
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
    justify-content: center;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > a > img {
        width: 153px;
        height: 30px;
      }

      & > .hamburger-react {
        margin-right: 9px;
      }

      .wrapperUser{
        display: none;
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
      top: ${({ isOpenMenu }: IStyledHeaderProps) =>
        isOpenMenu ? "72px" : "-160px"};
      gap: 32px;
      padding: 16px;
      transition: top 0.5s ease;
      animation: ${({ isOpenMenu }: IStyledHeaderProps) =>
        isOpenMenu ? "fadeInDown 0.5s ease" : "fadeOutUp 30s ease"};
      z-index: -1;
      background-color: var(--gray-10);
      box-shadow: -1px -2px 10px 0px var(--gray-4);

      & > li:first-child {
        margin-top: 16px;
      }
      & > li:last-child {
        width: 100%;
      }      
    }
  }

  @media (min-width: 578px) {
    & {
      padding: unset;

      & > nav {
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 16px;
        position: relative;

        & > div {
          width: ${({ type }: IStyledHeaderProps) => type && "95%"};
          justify-content : ${({ type }: IStyledHeaderProps) => type && "space-between"};
         

          & > .hamburger-react {
            display: none;
          }

          & > .wrapperUser {
            display: flex;
            align-items: center;
            gap: 6px;
            border-style: none;
            background-color: transparent;
            cursor: pointer;
            

            .iconUser {
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
        }
    
        & > ul {
          ${({ type }: IStyledHeaderProps) => {
            switch (type) { 
              case "dashboard":
                return css`
                  max-width: 234px;
                  left: unset;
                  right: 0px;
                `;
              default:
                return css`
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-end;
                  padding-right: 16px;
                  position:unset;
                  top: unset;
                  left: unset;
                  z-index: unset;
                  max-width: 370px;
                  min-height: 100%;
                  border-radius: unset;
                  background-color:unset;
                  box-shadow: unset;
                  animation: unset;
                  transition: unset;
                  border-left: 2px solid var(--gray-6);
                `
            }
          }}

          & > li:first-child {
            margin-top: unset;
          }
          & > li:last-child {
            max-width: 133px;
          }         
        }
      }
    }
  }
`;
