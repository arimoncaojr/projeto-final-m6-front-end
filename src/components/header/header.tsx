import { HeaderStyle } from "./headerStyle";
import { Squash as Hamburger } from "hamburger-react";
import { useContext, useEffect, useState } from "react";
import logoColor from "../../assets/logo-colored.svg";
import { Button } from "../button/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ModalProfileEditDelete from "../../components/ModalProfileEditDelete/ModalProfileEditDelete";
import ModalAddressEdit from "../../components/ModalAdressEdit/ModalAdressEdit";

interface IHeaderProps {
  type?: "dashboard";
}

export const Header = ({ type }: IHeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (menuClicked) {
      setOpen(true);
    }
  }, [menuClicked]);

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

  const handleNameUser = () => {
    return user?.name.replace(/\b\w{1}/g, (match) => match.toUpperCase());
  };

  const handleProfileUser = () => {
    navigate(`/profile/${user?.id}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const typeOfaccount = user?.typeOfAccount;

  return (
    <>
      <HeaderStyle isOpenMenu={isOpen} type={type}>
        <nav className="container">
          <div>
            <a href="/">
              {" "}
              <img src={logoColor} alt="logo motors shop" />{" "}
            </a>
            <Hamburger
              toggled={isOpen}
              toggle={() => {
                setOpen(!isOpen);
                setMenuClicked(true);
              }}
              color="#2C2C2C"
              size={25}
              rounded
            />
            {type && (
              <button
                className="wrapperUser"
                onClick={() => {
                  setOpen(!isOpen);
                  setMenuClicked(true);
                }}
              >
                <div className="iconUser">{handleCipher()}</div>
                <p className="nameUser">{handleNameUser()}</p>
              </button>
            )}
          </div>
          <ul>
            {type ? (
              <>
                <li>
                  <Button
                    typeStyle="menu"
                    title="Editar Perfil"
                    onClick={() => setShowModalProfile(true)}
                  >
                    Editar Perfil
                  </Button>
                </li>
                <li>
                  <Button
                    typeStyle="menu"
                    title="Editar Endereço"
                    onClick={() => setShowModalAddress(true)}
                  >
                    Editar Endereço
                  </Button>
                </li>
                {typeOfaccount === "anunciante" && (
                  <li>
                    <Button
                      typeStyle="menu"
                      title="Meus Anuncios"
                      onClick={() => handleProfileUser()}
                    >
                      Meus Anuncios
                    </Button>
                  </li>
                )}
                <li>
                  <Button typeStyle="menu" title="Sair" onClick={handleLogout}>
                    Sair
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button typeStyle="login" onClick={() => navigate("/login")}>
                    Fazer Login
                  </Button>
                </li>
                <li>
                  <Button
                    typeStyle="noColor"
                    onClick={() => navigate("/register")}
                  >
                    Cadastrar
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </HeaderStyle>
      {showModalProfile && (
        <ModalProfileEditDelete setShowModalProfile={setShowModalProfile} />
      )}
      {showModalAddress && (
        <ModalAddressEdit setShowModalAddress={setShowModalAddress} />
      )}
    </>
  );
};
