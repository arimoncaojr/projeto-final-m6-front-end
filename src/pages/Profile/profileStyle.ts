import styled from "styled-components";

export const ProfileContainer = styled.main`
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
          flex-wrap: wrap;
          margin: 10px;
          gap: 16px;
`;

export const HeaderBackground = styled.div`
  background-color: #4529e6;
  width: 100vh;
  heigth: 80px;
  padding: 0;
`;
