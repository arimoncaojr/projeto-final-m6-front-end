import * as yup from "yup";

export const schema = yup.object({
  mark: yup.string().required("Marca não selecionada!"),
  model: yup.string().required("Modelo não selecionado!"),
  year: yup.string().required("Ano não preenchido!"),
  fuelType: yup.string().required("Combustível não selecionado!"),
  kilometers: yup.string().required("Kilometragem não preenchida!"),
  color: yup.string().required("Cor não selecionada!"),
  tablePriceFiper: yup.string().required(),
  price: yup.string().required("Preço não preenchido!"),
  description: yup.string().required("Descrição não preenchida"),
  imageCap: yup.string().url("Url inválida").required("Url não preenchida"),
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
