import styled, { css } from "styled-components";

interface IStyledIconUserProps{
  firstLetter: string;
}

export const ProfileUserContainer = styled.section`
  width: 95%;
  max-width: 1240px;
  height: fit-content;
  min-height:386px;
  margin: 0 auto;
  padding: 16px;
  background-color: var(--gray-10);
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 4px;
  position: absolute;
  top: 120px;

  
  .iconUser{
      width: 104px;
      height: 104px;
      padding: 6px;
      border-radius: 50%;
      font: var(--font-heading-2);
      color: var(--whiteFixed);
      display: flex;
      align-items: center;
      justify-content: center;
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
  .IconUserWrapper{
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;

    .nameUser {
          font: var(--font-heading-9);
          color: var(--gray-1);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
    }

    .typeAccount{
      border-radius: 4px;
      font: var(--font-body-3);
      color: var(--color-brand-1);
      width: 100%;
      max-width: fit-content; 
      height: 32px;
      padding: 4px 8px;
      background-color: var(--color-brand-4);
      display: flex;
      align-items: center;            
    }
  }

  .descriptionUser{
     font: var(--font-body-2);
     color: var(--gray-2);
     line-height: 24px;
     text-align: justify;
     max-height: 101px;
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -moz-box-orient: vertical;
     -ms-flex-direction: column;
     line-height: 1.4em;
     -webkit-line-clamp: 4;
     -moz-box-lines: 4;

     @media (max-width: 600px) {
          -webkit-line-clamp: 3;
          -moz-box-lines: 3;
     }
  }

`



export const ProfileAdds = styled.main`
     display: flex;
     flex-direction: column;
     width: 95%;
     padding: 16px 0px;
     margin-top: 200px !important;
     overflow: scroll;


     
     & >.cardsContainer{
          display: flex;  
          gap: 16px;

          & > p {
               font: var( --font-heading-2);
               color: var(--gray-2);
               height: 188px;
          }
     }

@media(min-width: 767px){
     & {
          overflow: unset;
          
          & >.cardsContainer{
               flex-wrap: wrap;
               justify-content: center;
          }
     }
}

`

