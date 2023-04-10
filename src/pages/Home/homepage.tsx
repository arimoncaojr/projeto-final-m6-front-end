import { Header } from "../../components/header/header"
import { Input } from "../../components/input/input"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

interface FormData {
     username: string;
     email: string;
     age: string;
}

export const HomePage = () => {
     
     const schema = yup.object().shape({
          username: yup.string().required(),
          email: yup.string().email().required(),
          // age: yup.number().required().positive().integer(),
        });

     const {register,handleSubmit, formState: { errors }} = useForm<FormData>({
          resolver: yupResolver(schema),
        });
      
        const onSubmit = (data:FormData) => {
          console.log(data);
        };
     
        const genders = [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ];

     return (
          <>
               <Header/>
               <div className="container">
                
                    <form onSubmit={handleSubmit(onSubmit)}>

                         <Input type="text" label="name" name="username" placeholder="Digite seu nome" register={register} errors={errors} />
                         <Input type="text" label="email" name="email" placeholder="Digite seu Email" register={register} errors={errors} />
                         <Input type="select" label="idade" name="age" placeholder="Digite sua idade" options={genders} register={register} errors={errors} />
                         <button type="submit">ok</button>
                    </form>
               </div>
           
          </>
         
     )
}