import { Api } from "../services/api";
import React, { useState, createContext, useEffect } from "react";

interface IListPostsContextProps {
  children: React.ReactNode;
}

interface IUser {
  phoneNumber: string;
  name: string;
  email: string;
  id: string;
}

interface IImages {
  imageLink: string;
}

interface IComments {
  id: string;
  description: string;
  userComment: string;
  createdAt: string;
}

export interface IPosts {
  id: string;
  imageCap: string;
  isGoodPurchase: boolean;
  mark: string;
  model: string;
  description: string;
  user: IUser;
  kilometers: string;
  year: string;
  price: string;
  fuelType: string;
  color: string;
  images: IImages[];
  comments: IComments[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IListPostsContext {
  postsInfo: IPosts[] | [];
  setPostsInfo: React.Dispatch<React.SetStateAction<IPosts[]>>;
}

export const ListPostsContext = createContext<IListPostsContext>(
  {} as IListPostsContext
);

export const ListPostsProvider = ({ children }: IListPostsContextProps) => {
  const [postsInfo, setPostsInfo] = useState<IPosts[]>([]);

  useEffect(() => {
    Api.get<IPosts[]>("/posts")
      .then((res) => {
        setPostsInfo(res.data);
      })
      .catch((err) => console.log(`Mensagem de erro: ${err.message}`));
  }, []);

  return (
    <ListPostsContext.Provider value={{ postsInfo, setPostsInfo }}>
      {children}
    </ListPostsContext.Provider>
  );
};
