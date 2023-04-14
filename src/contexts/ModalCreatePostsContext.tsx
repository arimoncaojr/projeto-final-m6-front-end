import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import { Api } from "../services/api";
import { IImages } from "./ListPostsContext";

interface IModalCreatePostsContextProps {
  children: React.ReactNode;
}

interface IModalCreatePostsContext {
  modalCreatePost: boolean;
  showModalCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  submitPostInfo: (infoData: IPostInfo) => void;
}

export interface IPostInfo {
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  color: string;
  kilometers: string;
  description?: string;
  imageCap: string;
  images: IImages[];
}

export const ModalCreatePostsContext = createContext<IModalCreatePostsContext>(
  {} as IModalCreatePostsContext
);

export const ModalCreatePostsProvider = ({
  children,
}: IModalCreatePostsContextProps) => {
  const token: string | null = localStorage.getItem("motorsShop:Token");

  const [modalCreatePost, showModalCreatePost] = useState<boolean>(false);

  const submitPostInfo = (infoData: IPostInfo) => {
    Api.post(
      "/posts",
      { ...infoData },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        toast.success("Anúncio criado com sucesso!");
        showModalCreatePost(false);
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado, tente novamente!");
      });
  };

  return (
    <ModalCreatePostsContext.Provider
      value={{ modalCreatePost, showModalCreatePost, submitPostInfo }}
    >
      {children}
    </ModalCreatePostsContext.Provider>
  );
};
