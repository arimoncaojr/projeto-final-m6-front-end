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
  infoPost: IPostInfo;
  setInfoPost: React.Dispatch<React.SetStateAction<IPostInfo>>;
  setIdPost: React.Dispatch<React.SetStateAction<string>>;
  showModalEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  submitEditedPostInfo: (infoData: Partial<IPostInfoEdit>) => void;
  listPostById: (postId: string) => void;
  deletePost: () => void;
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
  isActive?: string | boolean;
  imageCap?: string;
  images?: IImages[];
}

interface IPostInfo {
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  color: string;
  isActive: boolean;
  kilometers: string;
  description?: string;
  imageCap: string;
  images: IImages[];
}

export const ModalEditPostsContext = createContext<IModalEditPostsContext>(
  {} as IModalEditPostsContext
);

export const ModalEditPostsProvider = ({
  children,
}: IModalEditPostsContextProps) => {
  const token: string | null = localStorage.getItem("@motorsShop:Token");

  const [modalEditPost, showModalEditPost] = useState<boolean>(false);
  const [idPost, setIdPost] = useState<string>("");
  const [infoPost, setInfoPost] = useState<IPostInfo>({
    mark: "",
    model: "",
    year: "",
    fuelType: "",
    price: "",
    tablePriceFiper: "",
    color: "",
    isActive: true,
    kilometers: "",
    description: "",
    imageCap: "",
    images: [],
  });

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

    Api.patch(`/posts/${idPost}`, formattedInfoData, {
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

  const listPostById = (postId: string) => {
    Api.get<IPostInfo>(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setInfoPost(res.data);
        showModalEditPost(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = () => {
    Api.delete(`/posts/${idPost}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      toast.success("Anúncio deletado com sucesso!");
      showModalEditPost(false);
    });
  };

  return (
    <ModalEditPostsContext.Provider
      value={{
        modalEditPost,
        idPost,
        infoPost,
        setInfoPost,
        setIdPost,
        listPostById,
        showModalEditPost,
        submitEditedPostInfo,
        deletePost,
      }}
    >
      {children}
    </ModalEditPostsContext.Provider>
  );
};
