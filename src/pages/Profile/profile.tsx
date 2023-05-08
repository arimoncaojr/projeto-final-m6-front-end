import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useContext, useEffect, useState } from "react";
import { ProfileAdds, ProfileUserContainer } from "./profileStyle";
import { BackgroundColorBrand1, Wrapper } from "../../styles/wrapper";
import { Card } from "../../components/card/card";
import { UserContext } from "../../contexts/UserContext";
import { ModalCreatePostsContext } from "../../contexts/ModalCreatePostsContext";
import { getProfileUser } from "../../services/api";
import { Button } from "../../components/button/button";
import ModalProfileEditDelete from "../../components/ModalProfileEditDelete/ModalProfileEditDelete";
import ModalAddressEdit from "../../components/ModalAdressEdit/ModalAdressEdit";
import { ModalPostsCreate } from "../../components/ModalPostsCreate";
import { ModalPostsEdit } from "../../components/ModalPostsEdit";
import { ModalEditPostsContext } from "../../contexts/ModalEditPostsContext";

export const ProfilePage = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);
  const [advertiser, setAdvertiser] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { modalCreatePost, showModalCreatePost } = useContext(
    ModalCreatePostsContext
  );
  const { modalEditPost } = useContext(ModalEditPostsContext);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("@motorsShop:Token");

      if (token) {
        try {
          const responseApi = await getProfileUser(token);
          const typeOfAccount = responseApi.data.typeOfAccount;
          if (typeOfAccount === "anunciante") {
            setAdvertiser(true);
          }
        } catch (error) {
          console.log(error);
          localStorage.removeItem("@motorsShop:Token");
        }
      } else {
        // logica do id da URL
      }
    })();
  }, []);

  const handleNameUser = () => {
    return user?.name.replace(/\b\w{1}/g, (match) => match.toUpperCase());
  };
  const handleNameTypeAccount = () => {
    return user?.typeOfAccount.replace(/\b\w{1}/g, (match) =>
      match.toUpperCase()
    );
  };

  const handleCipher = () => {
    const name = user?.name.split(" ");
    if (name && name?.length > 1) {
      const firstLetter = name[0][0];
      const secondLetter = name[1][0];
      return (firstLetter + secondLetter).toUpperCase();
    } else {
      return name && name[0][0].toUpperCase();
    }
  };

  const name = user?.name.split(" ");
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
          <p className="descriptionUser">{user?.description}</p>
          <Button
            typeStyle="createAds"
            onClick={() => showModalCreatePost(true)}
          >
            Criar Anuncio
          </Button>
        </ProfileUserContainer>
      </BackgroundColorBrand1>
      <ProfileAdds className="container">
        <div className="cardsContainer">
          {user?.posts.length ? (
            user?.posts.map((post) => (
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
      {showModalProfile && (
        <ModalProfileEditDelete setShowModalProfile={setShowModalProfile} />
      )}
      {showModalAddress && (
        <ModalAddressEdit setShowModalAddress={setShowModalAddress} />
      )}
      <Footer />
      {modalCreatePost && <ModalPostsCreate />}
      {modalEditPost && <ModalPostsEdit />}
    </Wrapper>
  );
};
