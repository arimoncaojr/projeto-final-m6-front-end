import * as yup from "yup";

export const newCommentSchema = yup.object().shape({
  description: yup.string().required("Este campo é obrigatorio"),
});
