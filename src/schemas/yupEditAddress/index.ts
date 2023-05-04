import * as yup from "yup";

export const updateAddressSchema = yup.object().shape({
  cep: yup.string().min(6, "digite um cep valido").required(),
  state: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  number: yup.string().nullable(),
  complement: yup.string().nullable(),
});
