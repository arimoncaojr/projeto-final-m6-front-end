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
  listPostById: () => void;
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
  const token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlT2ZBY2NvdW50IjoiY29tcHJhZG9yIiwiaWF0IjoxNjgyNjg5NTcxLCJleHAiOjE2ODI3NzU5NzEsInN1YiI6IjBiMGQ3MzZiLTIxNDMtNDMyNy05MmEyLTI5ZTgxNTQ2MmVjOSJ9.gYpKFkQntnfvpDaV8KHqftTgXpR0dW9U-JZjjc-TEzs";

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

    Api.patch(
      `/posts/425b558a-b041-4ab7-8232-7486d2bdaaff`,
      formattedInfoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        toast.success("Anúncio atualizado com sucesso!");
        showModalEditPost(false);
      })
      .catch((err) => {
        toast.error("Ops, algo deu errado, tente novamente!");
      });
  };

  const listPostById = () => {
    Api.get<IPostInfo>(`/posts/425b558a-b041-4ab7-8232-7486d2bdaaff`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setInfoPost(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      }}
    >
      {children}
    </ModalEditPostsContext.Provider>
  );
};
