import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ilogin } from "../interfaces/login";
import { IUserCreatedRequest } from "../interfaces/user";
import { getProfileUser, loginApi, registerApi } from "../services/api";
import { toast, Flip } from "react-toastify";

interface IUserContextProps {
  children: React.ReactNode;
}

interface IUserContext {
  createdUser: (data: IUserCreatedRequest) => Promise<void>;
  showModal: string;
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  sucessModal: boolean;
  setSucessModal: React.Dispatch<React.SetStateAction<boolean>>;
  loginUser: (data: Ilogin) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [showModal, setShowModal] = useState("none");
  const [sucessModal, setSucessModal] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     const token = localStorage.getItem("@motorsShopToken");

  //     if (token) {
  //       try {
  //         const responseApi = await getProfileUser(token);
  //         navigate("/dashboard");
  //       } catch (error) {
  //         console.log(error);
  //         localStorage.removeItem("@motorsShopToken");
  //         navigate("/");
  //       }
  //     } else {
  //       navigate("/");
  //     }
  //   })();
  // }, []);

  const createdUser = async (data: IUserCreatedRequest) => {
    try {
      const userCreated = await registerApi(data);
      setSucessModal(true);
      setShowModal("flex");
    } catch (error) {
      console.log(error);
      setSucessModal(false);
      setShowModal("flex");
    }
  };

  const loginUser = async (data: Ilogin) => {
    const loadingToast = toast.loading("Carregando...");

    try {
      const token = await loginApi(data);
      localStorage.setItem("@motorsShopToken", token.data.token);

      toast.update(loadingToast, {
        render: "Seja bem vindo",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        theme: "dark",
        position: "top-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        style: {
          backgroundColor: "#f8f9fa",
          font: "var(--font-body-1)",
          color: "var(--color-sucess-1)",
          border: "1.5px solid var(--color-sucess-1)",
          padding: "8px",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      toast.update(loadingToast, {
        render: `Senha ou e-mail invalido`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
        theme: "dark",
        position: "top-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        style: {
          backgroundColor: "#f8f9fa",
          font: "var(--font-body-1)",
          color: "var(--color-alert-1)",
          border: "1.5px solid var(--color-alert-1)",
          padding: "8px",
        },
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        createdUser,
        showModal,
        setShowModal,
        sucessModal,
        setSucessModal,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
