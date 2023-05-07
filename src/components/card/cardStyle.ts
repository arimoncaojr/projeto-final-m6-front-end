import styled, { css } from "styled-components"


interface IStyledCardProps{
     isActive: boolean;
     type?: string;
}
interface IStyledIconUserProps{
     firstLetter: string;
}


export const CardStyle = styled.section`
     width: 300px;
     height: ${({type}:IStyledCardProps)=> type === "profile" ? "420px" : "350px"};
     border-radius: 4px;
     box-shadow: -1px -2px 10px 0px var(--gray-4);
     padding: 4px 10px;

     & > figure {
          display: flex;
          justify-content: center;
          background-color: var(--gray-7);
          position: relative;

          & > img {
               width: 262px;
               height: 150px;
          }
          & > button {
               background-color: transparent;
               border-style: none;
               font-size: 45px;
               position: absolute;
               top: 50px;
               color: var( --gray-4);    
          }

          & > button:disabled {
               cursor: unset;
               opacity: 0.5;
          }

          & > button.next {
              right: -22px;
          }
          & > button.back {
               left: -22px;
          }

          .isGoodPurchase{
               width: 16px;
               height: 27px;
               border-bottom-left-radius: 2px;
               position: absolute;
               top:0;
               right:0;
               background-color: var(--color-random-7);
               color: var(--whiteFixed);
               padding: 4px 3px;
               font-size: 18px;
          }

          & > span {
               padding: 4px 8px;
               border-radius: 4px;
               font: var(--font-body-3);
               position: absolute;
               top:0;
               left:30px;
               color: var(--whiteFixed);
               background-color: ${({isActive}:IStyledCardProps)=> isActive ? "var(--color-brand-1)": "var(--gray-4)"};
          }

         
     }

     & > h2{
          font: var(--font-heading-11);
          padding: 16px 0px;
     }
     & > p{
          width: 312px;
          font: var(--font-body-4);
          color: var(--gray-2);
          overflow: hidden;
          display: -webkit-box;
          display: -moz-box;
          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          -webkit-line-clamp: 2;
          -moz-line-clamp: 2;
          line-height: 24px;
          min-height: 49px;
     }

     & > .containerDetail{
          display: flex;
          gap: 12px;
          margin-top: 16px;
          align-items: center;

          & > p {
               font: var(--font-heading-12);
               margin-left: auto;
          }
     }

     & > .containerButtons{
          display: flex;
          gap: 8px;
          margin-top: 16px;
     }

     @media(min-width: 767px){
          &{
               width: 312px;
          }
     }
`

export const IconUserStyle = styled.div`
     display: flex;
     align-items: center;
     gap: 6px;
     width: 100%;
     max-width: 310px;
     margin-top: 12px;

     .iconUser{
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
          background-color: var(--color-brand-2);
          ${({ firstLetter }: IStyledIconUserProps) => {
          switch (firstLetter) {
               case "A":
               case "B":
               case "C":
               case "D":
               case "E":
                    return css`
                         background-color: var(--color-random-1);
                    `;
               case "F":
               case "G":
               case "H":
               case "I":               
               case "J":               
                    return css`
                         background-color: var(--color-random-3);
                    `;
               case "K":
               case "L":
               case "M":
               case "N":               
               case "O":               
                    return css`
                         background-color: var(--color-random-4);
                    `;
               case "P":
               case "Q":
               case "R":
               case "S":               
               case "T":               
                    return css`
                         background-color: var(--color-random-12);
                    `;
               case "U":
               case "V":
               case "X":
               case "W":               
               case "Z":               
                    return css`
                         background-color: var(--color-random-7);
                    `;
               }
          }}
     
     }

     .nameUser {
          font: var(--font-body-2);
          color: var(--gray-2);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
     }
`