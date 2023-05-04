import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ilogin } from "../interfaces/login";
import {
  IResetPasswordRequest,
  IUserCreatedRequest,
  IUserProfileRequest,
} from "../interfaces/user";
import {
  getProfileUser,
  loginApi,
  registerApi,
  resetPasswordUser,
} from "../services/api";
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
  user: IUserProfileRequest | null;
  setUser: React.Dispatch<React.SetStateAction<IUserProfileRequest | null>>;
  resetPassword: (
    data: IResetPasswordRequest,
    token: string | undefined
  ) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [showModal, setShowModal] = useState("none");
  const [sucessModal, setSucessModal] = useState(false);
  const [user, setUser] = useState<IUserProfileRequest | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("@motorsShopToken");
      if (token) {
        try {
          const { data } = await getProfileUser(token);
          setUser(data);
        } catch (error) {
          console.log(error);
          localStorage.clear();
        }
      }
    };
    autoLogin();
  }, []);

  const createdUser = async (data: IUserCreatedRequest) => {
    try {
      await registerApi(data);
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

      const getUser = await getProfileUser(token.data.token);
      setUser(getUser.data);

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

  const resetPassword = async (
    data: IResetPasswordRequest,
    token: string | undefined
  ) => {
    try {
      await resetPasswordUser(token, data);
      setShowModal("flex");
    } catch (error: any) {
      const loadingToast = toast.loading("Carregando...");
      toast.update(loadingToast, {
        render: `${error.response.data.message}, você será redirecionado para homepage`,
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
      setTimeout(() => {
        navigate("/");
      }, 3400);
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
        user,
        setUser,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
