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
