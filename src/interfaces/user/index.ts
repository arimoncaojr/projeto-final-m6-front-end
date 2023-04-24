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
  password: string;
  confirmPassword: string;
}

export interface IUserPostResponse {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
  email: string;
}
