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

  const removePunctuation = (value: string) => {
    return value.replace(/[.,]/g, "");
  };

  const submitPostInfo = (infoData: IPostInfo) => {
    console.log("submitPostInfo executado");
    const formattedImages = infoData.images
      .map((image: any) =>
        image.imageLink ? { imageLink: image.imageLink } : null
      )
      .filter((image: any) => image !== null);

    const formattedInfoData = {
      ...infoData,
      kilometers: removePunctuation(infoData.kilometers),
      tablePriceFiper: removePunctuation(infoData.tablePriceFiper),
      price: removePunctuation(infoData.price.replace(/R?\$?/g, "")),
      images: formattedImages,
    };

    Api.post("/posts", formattedInfoData, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlT2ZBY2NvdW50IjoiY29tcHJhZG9yIiwiaWF0IjoxNjgxODMxMjAzLCJleHAiOjE2ODE5MTc2MDMsInN1YiI6IjUxMjEyMDE4LTRhNGYtNDM2ZS1iY2Y4LTQ1YjM0YTU1NDRiNCJ9.fBteTObPynH4oqx8Y7-CoOfe-NYX0EIdMMI1V5tdkCY`,
      },
    })
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
