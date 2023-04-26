import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import { Api } from "../services/api";
import { IImages } from "./ListPostsContext";

interface IModalEditPostsContextProps {
  children: React.ReactNode;
}

interface IModalEditPostsContext {
  modalEditPost: boolean;
  idPost: string;
  setIdPost: React.Dispatch<React.SetStateAction<string>>;
  showModalEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  submitEditedPostInfo: (infoData: Partial<IPostInfoEdit>) => void;
}

export interface IPostInfoEdit {
  mark?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  price?: string;
  tablePriceFiper?: string;
  color?: string;
  kilometers?: string;
  description?: string;
  isActive?: string;
  imageCap?: string;
  images?: IImages[];
}

export const ModalEditPostsContext = createContext<IModalEditPostsContext>(
  {} as IModalEditPostsContext
);

export const ModalEditPostsProvider = ({
  children,
}: IModalEditPostsContextProps) => {
  const token: string | null = localStorage.getItem("motorsShop:Token");

  const [modalEditPost, showModalEditPost] = useState<boolean>(false);
  const [idPost, setIdPost] = useState<string>("");

  const removePunctuation = (value: string) => {
    return value.replace(/[.,]/g, "");
  };

  const submitEditedPostInfo = (infoData: Partial<IPostInfoEdit>) => {
    const formattedImages = infoData.images
      ?.map((image: any) =>
        image.imageLink ? { imageLink: image.imageLink } : null
      )
      .filter((image: any) => image !== null);

    const formattedInfoData = {
      ...infoData,
      kilometers: infoData.kilometers
        ? removePunctuation(infoData.kilometers)
        : undefined,
      tablePriceFiper: infoData.tablePriceFiper
        ? removePunctuation(infoData.tablePriceFiper.replace(/R?\$?/g, ""))
        : undefined,
      price: infoData.price
        ? removePunctuation(infoData.price.replace(/R?\$?/g, ""))
        : undefined,
      images: formattedImages,
    };

    Api.put(`/posts/${idPost}`, formattedInfoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("Anúncio atualizado com sucesso!");
        showModalEditPost(false);
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado, tente novamente!");
      });
  };

  return (
    <ModalEditPostsContext.Provider
      value={{
        modalEditPost,
        idPost,
        setIdPost,
        showModalEditPost,
        submitEditedPostInfo,
      }}
    >
      {children}
    </ModalEditPostsContext.Provider>
  );
};
