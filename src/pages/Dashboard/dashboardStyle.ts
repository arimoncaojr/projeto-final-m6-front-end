import styled from "styled-components";
import motorsShopImage from "../../assets/motorsShop.png";

export const ImgPrincipal = styled.div`
  width: 100%;
  padding-top: 33.59%;
  position: fixed;
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.29) 0%,
      #000000 100%
    ),
    url(${motorsShopImage});
  background-size: cover;
  background-position: center;
  margin-top: 5rem;
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
