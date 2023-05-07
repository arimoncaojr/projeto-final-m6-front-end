import { HeaderStyle } from "./headerStyle";
import { Squash as Hamburger } from "hamburger-react";
import { useContext, useEffect, useState } from "react";
import logoColor from "../../assets/logo-colored.svg";
import { Button } from "../button/button";
import { RiLogoutBoxRFill as Logout } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface IHeaderProps {
  type?: "dashboard";
}

export const Header = ({ type }: IHeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (menuClicked) {
      setOpen(true);
    }
  }, [menuClicked]);

  const handleCipher = () => {
    const name = user?.name.split(" ")
    if (name && name?.length > 1) {
      const firstLetter = name[0][0];
      const secondLetter = name[1][0];
      return (firstLetter + secondLetter).toUpperCase() 
    } else {
      return name && name[0][0].toUpperCase();
    }  
  }

  const handleNameUser = () => { 
    return user?.name.replace(/\b\w{1}/g, (match) =>
      match.toUpperCase()
    );
  }

  const handleProfileUser = () => { 
    navigate("/profile")
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser(null)
    navigate("/")
  }

  return (
    <HeaderStyle isOpenMenu={isOpen}>
      <nav className="container">
        <div>
          <a href="/"> <img src={logoColor} alt="logo motors shop" /> </a>
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
        </div>
        <ul>
          {type ? (
            <>
              <li className={type && "wrapperUser"} onClick={handleProfileUser}>
                <div className="iconUser">
                  {handleCipher()}
                </div>
                <p className="nameUser">{handleNameUser()}</p>
              </li>
              <li className={type && "wrapperLogout"}>
                <Button typeStyle="logout" title="Sair" onClick={handleLogout}>
                  <Logout />
                </Button>
                <span>Fazer logout</span>
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
  );
};
