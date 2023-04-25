import * as yup from "yup";

export const recoverPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("campo obrigatorio")
    .email("digite um email valido"),
});
