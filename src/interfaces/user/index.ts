export interface IAddressRequest {
     cep: string;
     state: string;
     street: string;
     city: string;
     number?: string | null;
     complement?: string | null;
}
   

export interface IUserCreated{
     name: string;
     email: string;
     cpf: string;
     phoneNumber: string ;
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

export interface IUserCreatedRequest{
     name: string;
     email: string;
     cpf: string;
     phoneNumber: string ;
     dateOfBirth: Date;
     description?: string;
     address: IAddressRequest;
     typeOfAccount: string;
     password: string;
}


