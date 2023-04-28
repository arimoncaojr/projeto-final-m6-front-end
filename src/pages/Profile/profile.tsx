import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useContext, useEffect } from "react";
import { HeaderBackground, ProfileContainer } from "./profileStyle";
import { Wrapper } from "../../styles/wrapper";
import { Card } from "../../components/card/card";
import { UserContext } from "../../contexts/UserContext";
import { Api, getProfileUser } from "../../services/api";
import { IUserProfileRequest } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("@motorsShopToken");

      if (token) {
        try {
          const responseApi = await getProfileUser(token);
          setUser(responseApi.data);
          navigate("/profile");
        } catch (error) {
          console.log(error);
          localStorage.removeItem("@motorsShopToken");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    })();
  }, [user]);

  return (
    <Wrapper>
      <Header type="dashboard" />
      <HeaderBackground>
        <div>
          <div className="profileInfo">
            <h2>{user?.name}</h2>
            <span>
              {user?.name.split(" ")[0][0].toUpperCase()}
              {user?.name.split(" ")[1][0].toUpperCase()}
            </span>
            <p>{user?.typeOfAccount}</p>
            <span>{user?.description}</span>
          </div>
        </div>
      </HeaderBackground>
      <ProfileContainer className="container">
        <section className="wrapperContainer">
          <div className="cardsContainer">
            {user?.posts.length ? (
              user?.posts.map((post) => <Card key={post.id} post={post} />)
            ) : (
              <p>Não existe carros cadastrados.</p>
            )}
          </div>
        </section>
      </ProfileContainer>
      <Footer />
    </Wrapper>
  );
};
