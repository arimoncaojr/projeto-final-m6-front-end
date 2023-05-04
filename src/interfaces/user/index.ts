import { IComments, IImages, IPosts } from "../../contexts/ListPostsContext";

export interface IUserPostResponse {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
  email: string;
}
export interface IAddressRequest {
  cep: string;
  state: string;
  street: string;
  city: string;
  number?: string | null;
  complement?: string | null;
}

export interface IUserCreated {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: Date;
  description?: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  complement?: string;
  typeOfAccount: string;
  password: string;
  confirmPassword: string;
}

export interface IUserCreatedRequest {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: Date;
  description?: string;
  address: IAddressRequest;
  typeOfAccount: string;
  password: string;
}

export interface IUserUpdate {
  name?: string | null;
  email?: string | null;
  cpf?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: Date | null;
  description?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export interface IPostUser {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  mark: string;
  model: string;
  year: string;
  fuelType: string;
  price: string;
  tablePriceFiper: string;
  isGoodPurchase: boolean;
  color: string;
  kilometers: string;
  description: string;
  imageCap: string;
  images: IImages[];
  comments: IComments[];
}

export interface IUserProfileRequest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: string;
  description: string;
  typeOfAccount: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  posts: IPosts[];
}

export interface IResetPassword {
  password: string;
  confirmedPassword: string;
}

export interface IResetPasswordRequest {
  password: string;
}
