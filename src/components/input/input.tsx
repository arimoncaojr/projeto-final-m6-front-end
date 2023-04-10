import { UseFormRegister } from "react-hook-form";
import { WrapperStyle, InputStyle, LabelStyle, SelectStyle } from "./inputStyle";

interface ISelectOption {
     value: string;
     label: string;
}

interface IInputProps {
     type: string;
     label?: string;    
     name: string;
     placeholder: string;
     register: UseFormRegister<any>;
     errors: Record<string, any>;
     options?: ISelectOption[];
     tipo?: "filter";
}


export const Input = ({type,label, name, placeholder, register, errors, options, tipo}:IInputProps) => {
     
     
     return (
          <WrapperStyle>
               {label && <LabelStyle htmlFor={name}>{label}</LabelStyle>}
               {type === 'select' ?
                    (
                         <SelectStyle id={name} {...register(name)}>
                              {options?.map((option) => (
                                   <option key={option.value} value={option.value}>
                                        {option.label}
                                   </option>
                              ))}
                         </SelectStyle>
                    )
                    :
                    (
                         <InputStyle
                              id={name}
                              type={type}
                              placeholder={placeholder}
                              {...register(name)}
                              tipo={tipo}
                         />
                    )}
               
               {errors[name] && <span>{errors[name].message}</span>}
        </WrapperStyle>
     )
}