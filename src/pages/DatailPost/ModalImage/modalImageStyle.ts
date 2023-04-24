import styled from "styled-components";

export const BackGroundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  padding: 5%;

  z-index: 100;

  background-color: #0b0d0d50;
`;

export const ModalCantainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  padding: 15px;

  border-radius: 5px;
  gap: 1rem;

  background-color: var(--gray-10);
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    border: none;
    background-color: transparent;
    width: 25px;
    height: 25px;
    font-size: 17px;
    color: #adb5bd;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 10px;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;
