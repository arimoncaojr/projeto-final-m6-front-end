import * as yup from 'yup';
import { IUserCreated } from '../../interfaces/user';


export const registerSchema = yup.object().shape({
     name: yup.string().required("Informe seu nome"),
     email: yup.string().email("Informe um email valido").required("Informe um email valido"),
     cpf:
          yup.string()
          .transform((value: any, originalValue: any) => {
               if (originalValue) {
                    return originalValue.replace(/\D/g, '');
               }
          })
          .max(11)
          .required("Informe seu cpf"),
     phoneNumber:
          yup.string()
          .transform((value: any, originalValue: any) => {
               if (originalValue) {
                    return originalValue.replace(/\D/g, '');
               }
             })
             .max(11, 'Telefone inválido')
             .required("Informe seu número de celular"),
     dateOfBirth: yup.date().required("Informe sua data de nascimento"),
     description: yup.string().notRequired().max(200),
     cep: yup.string().max(8).required("informe o cep"),
     city: yup.string().max(100).required("Informe a cidade"),
     state: yup.string().max(2).required("Informe o estado").lowercase(),
     street: yup.string().max(200).required("Informe a rua").lowercase(),
     number: yup.string().max(5).required("Informe o número de sua residencia"),
     complement: yup.string().max(200).notRequired().lowercase(),
     typeOfAccount: yup.string().required("Escolha um tipo de conta"),
     password: yup.string()
          .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
          .matches(/[a-z]/, "Deve conter ao menos 1 letra minuscula")
          .matches(/(\d)/, "Deve conter ao menos um número")
          .matches(/(\W)|_/, "Deve conter um caracter especial")
          .matches(/.{5,}/, "Deve ter no minimo 5 digitos")
          .required('Senha é obrigatória'),
     confirmPassword: yup.string().oneOf([yup.ref('password')], 'Confirmação de senha deve ser igual a senha')
}) as yup.ObjectSchema<IUserCreated>

