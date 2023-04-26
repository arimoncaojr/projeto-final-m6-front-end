import * as yup from 'yup';
import { IResetPassword } from '../../interfaces/user';

export const resetPasswordSchema = yup.object().shape({
     password: yup.string()
          .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
          .matches(/[a-z]/, "Deve conter ao menos 1 letra minuscula")
          .matches(/(\d)/, "Deve conter ao menos um número")
          .matches(/(\W)|_/, "Deve conter um caracter especial")
          .matches(/.{5,}/, "Deve ter no minimo 5 digitos")
          .required('Senha é obrigatória'),
     confirmedPassword: yup.string().oneOf([yup.ref('password')], 'Confirmação de senha deve ser igual a senha')
}) as yup.ObjectSchema<IResetPassword>