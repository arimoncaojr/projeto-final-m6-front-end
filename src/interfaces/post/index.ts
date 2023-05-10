import { IUserPostResponse } from "../user";

interface IImage {
  id: string;
  imageLink: string;
  createdAt: string;
}

export interface IComment {
  id: string;
  description: string;
  userComment: string;
  userCommentId: string;
  post: string;
  createdAt: string;
}

export interface IPost {
  id: string;
  color: string;
  description: string | null;
  fuelType: string;
  imageCap: string;
  isActive: boolean;
  isGoodPurchase: boolean;
  kilometers: string;
  mark: string;
  model: string;
  price: string;
  tablePriceFiper: string;
  year: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUserPostResponse;
  images: IImage[];
  comments: IComment[];
}

export interface INewComment {
  description: string;
}
