import * as yup from 'yup';
import { Ilogin } from '../../interfaces/login';

export const loginSchema = yup.object().shape({
     email: yup.string().email("Informe um email valido").required("Informe um email cadastrado"),
     password: yup.string().required("Insira sua senha"),
}) as yup.ObjectSchema<Ilogin>