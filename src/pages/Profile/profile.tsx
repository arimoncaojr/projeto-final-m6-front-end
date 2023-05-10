import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useContext, useEffect, useState } from "react";
import { ProfileAdds, ProfileUserContainer } from "./profileStyle";
import { BackgroundColorBrand1, Wrapper } from "../../styles/wrapper";
import { Card } from "../../components/card/card";
import { UserContext } from "../../contexts/UserContext";
import { ModalCreatePostsContext } from "../../contexts/ModalCreatePostsContext";
import { Api, getProfileUser } from "../../services/api";
import { Button } from "../../components/button/button";
import { useNavigate, useParams } from "react-router-dom";
import { IUserProfileRequest } from "../../interfaces/user";
import { ModalEditPostsContext } from "../../contexts/ModalEditPostsContext";
import { ModalPostsEdit } from "../../components/ModalPostsEdit";
import { ModalPostsCreate } from "../../components/ModalPostsCreate";

export const ProfilePage = () => {
  const [advertiser, setAdvertiser] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { modalCreatePost, showModalCreatePost } = useContext(
    ModalCreatePostsContext
  );
  const { modalEditPost } = useContext(ModalEditPostsContext);
  const [userProfile, setUserProfile] = useState<IUserProfileRequest | null>(
    null
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.get(`/users/profile/${id}`);
        setUserProfile(data);
        if (data.typeOfAccount === "anunciante") {
          setAdvertiser(true);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    })();
  }, [userProfile?.posts]);

  const handleNameUser = () => {
    return userProfile?.name.replace(/\b\w{1}/g, (match) =>
      match.toUpperCase()
    );
  };
  const handleNameTypeAccount = () => {
    return userProfile?.typeOfAccount.replace(/\b\w{1}/g, (match) =>
      match.toUpperCase()
    );
  };

  const handleCipher = () => {
    const name = userProfile?.name.split(" ");
    if (name && name?.length > 1) {
      const firstLetter = name[0][0];
      const secondLetter = name[1][0];
      return (firstLetter + secondLetter).toUpperCase();
    } else {
      return name && name[0][0].toUpperCase();
    }
  };

  const name = userProfile?.name.split(" ");
  const firstLetter = name && name[0][0].toUpperCase();

  return (
    <Wrapper>
      <Header type="dashboard" />
      <BackgroundColorBrand1>
        <ProfileUserContainer firstLetter={firstLetter ? firstLetter : "A"}>
          <p className="iconUser">{handleCipher()}</p>
          <div className="IconUserWrapper">
            <p className="nameUser">{handleNameUser()}</p>
            <span className="typeAccount">{handleNameTypeAccount()}</span>
          </div>
          <p className="descriptionUser">{userProfile?.description}</p>
          {userProfile?.typeOfAccount === "anunciante" && user?.id === id && (
            <>
              <Button
                typeStyle="createAds"
                onClick={() => showModalCreatePost(true)}
              >
                Criar Anuncio
              </Button>
            </>
          )}
        </ProfileUserContainer>
      </BackgroundColorBrand1>
      <ProfileAdds className="container">
        <div className="cardsContainer">
          {userProfile?.posts.length ? (
            userProfile?.posts.map((post) => (
              <Card
                key={post.id}
                post={post}
                type={advertiser ? "profile" : ""}
              />
            ))
          ) : (
            <p>Não existe carros cadastrados.</p>
          )}
        </div>
      </ProfileAdds>
      <Footer />
      {modalCreatePost && <ModalPostsCreate />}
      {modalEditPost && <ModalPostsEdit />}
    </Wrapper>
  );
};
