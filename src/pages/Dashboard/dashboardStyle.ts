import styled from "styled-components";
import motorsShopImage from "../../assets/motorsShop.png";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ImgPrincipal = styled.div`
  width: 100%;
  padding-top: 33.59%;
  position: relative;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.29) 0%,
      #000000 100%
    ),
    url(${motorsShopImage});
  background-size: cover;
  background-position: center;
  margin-bottom: 10rem;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const Title = styled.h1`
  font-family: "Lexend", sans-serif;
  font-weight: 700;
  font-size: 44px;
  color: var(--gray-10);
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

export const Subtitle = styled.p`
  font-family: "Lexend", sans-serif;
  font-weight: 600;
  font-size: 36px;
  color: var(--gray-10);
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 20%;
  padding: 30px;
  margin-top: -5rem;
  margin-bottom: 5rem;
`;

export const FilterTitle = styled.h2`
  font: var(--font-heading-7);
  color: var(--gray-0);
  margin-left: 1.5rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterInput = styled.input`
  width: 125px;
  height: 37px;
  background: #ced4da;
  margin-right: 8px;
  margin-left: 1.5rem;
  border: none;
`;

export const SelectMessage = styled.span`
  font: var(--font-body-2);
  color: var(--gray-2);
  background-color: var(--gray-9);
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 8px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 24px;
  width: calc(100% - 312px);
`;
