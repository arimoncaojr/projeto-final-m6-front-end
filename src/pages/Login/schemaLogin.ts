import * as yup from 'yup';

export const loginSchema = yup.object().shape({
     user: yup.string().required("Informe um usuario cadastrado"),
     password: yup.string().required("Insira sua senha")
})