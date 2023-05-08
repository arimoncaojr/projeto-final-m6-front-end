import styled from "styled-components";

export const WrapperGlobal = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--gray-8);
`;
export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 0;
`;

export const BackgroundColorBrand1 = styled.div`
  width: 100%;
  height: 331px;
  background-color: var(--color-brand-1);
  position: relative;
  z-index: -2;
  padding: 16px;
  display: flex;
  justify-content: center;
  
  @media(min-width: 767px){
    height: 357px;
  }
`
