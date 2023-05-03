import * as yup from "yup";
import { IUserUpdate } from "../../interfaces/user";

export const updateUserSchema = yup.object().shape({
  name: yup.string().nullable(),
  email: yup.string().email("digite um email valido").nullable(),
  cpf: yup
    .string()
    .nullable()
    .min(11, "digite um cpf valido")
    .transform((_, ov) => {
      if (ov) {
        return ov.replace(/\D/g, "");
      }
    }),
  password: yup
    .string()
    .nullable()
    .test("password", (value) => {
      if (!value) {
        return true;
      }
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return regex.test(value);
    }),
  confirmPassword: yup
    .string()
    .max(150)
    .nullable()
    .oneOf([yup.ref("password")], "as senhas devem ser iguais"),
  phoneNumber: yup
    .string()
    .nullable()
    .min(11, "digite um celular valido")
    .transform((_, ov) => {
      if (ov) {
        return ov.replace(/\D/g, "");
      }
    }),
  dateOfBirth: yup.string().nullable(),
  description: yup.string().max(200).nullable(),
}) as yup.ObjectSchema<IUserUpdate>;
