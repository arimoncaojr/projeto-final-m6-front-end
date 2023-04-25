import * as yup from "yup";

export const editSchema = yup.object({
  mark: yup.string().nullable(),
  model: yup.string().nullable(),
  year: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .typeError("Ano inválido")
    .min(1885, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido")
    .nullable(),
  fuelType: yup.string().nullable(),
  kilometers: yup.string().nullable(),
  color: yup.string().nullable(),
  tablePriceFiper: yup.string().nullable(),
  price: yup.string().nullable(),
  description: yup.string().nullable(),
  isActive: yup.boolean().nullable(),
  imageCap: yup.string().url("Url inválida").nullable(),
  images: yup
    .array()
    .of(
      yup.object({
        imageLink: yup.string().url("Url inválida"),
      })
    )
    .max(6, "No máximo 6 imagens permitidas")
    .nullable()
    .default([]),
});
