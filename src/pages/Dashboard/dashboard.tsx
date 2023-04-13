import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Wrapper } from "../../styles/wrapper";
import { ImgPrincipal, TextContainer, Title, Subtitle } from "./dashboardStyle";

export const DashboardPage = () => {
  return (
    <Wrapper>
      <Header />
      <ImgPrincipal>
        <TextContainer>
          <Title>Motors Shop</Title>
          <Subtitle>A melhor plataforma de anúncios de carros do país</Subtitle>
        </TextContainer>
      </ImgPrincipal>
      <Footer />
    </Wrapper>
  );
};
