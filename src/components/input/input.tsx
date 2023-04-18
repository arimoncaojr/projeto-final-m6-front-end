import { UseFormRegister } from "react-hook-form";
import { WrapperStyle, InputStyle, LabelStyle, SelectStyle, InputMaskStyle, TextAreaStyle } from "./inputStyle";

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
     typeStyled?: "filter" | "tel";
     disabled?: boolean;
     onChange?: React.ChangeEventHandler<HTMLInputElement>;
     value?: string
     maxLength?:number;
}


export const Input = ({
     type,
     label,
     name,
     placeholder,
     register,
     errors,
     options,
     typeStyled,
     onChange,
     value,
     maxLength }: IInputProps) => {
   

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
                    : typeStyled === "tel" ?
                         (
                              <InputMaskStyle
                                   mask="(99) 9 9999-9999"
                                   id={name}
                                   type={type}
                                   placeholder={placeholder}
                                   {...register(name)}
                                   className="input_mask"
                              />
                           
                         )
                    : name === "cpf" ?
                         (
                              <InputMaskStyle
                                   mask="999.999.999-99"
                                   id={name}
                                   type={type}
                                   placeholder={placeholder}
                                   {...register(name)}
                                   className="input_mask"
                              />     
                         )        
                    : type === "textarea" ? 
                         (
                              <TextAreaStyle
                                   id={name}  
                                   placeholder={placeholder}        
                                   {...register(name)}
                                   maxLength={200}          
                              />                   

                         )
                    :               
                         (
                              <InputStyle
                                   id={name}
                                   type={type}
                                   placeholder={placeholder}
                                   {...register(name)}
                                   typeStyled={typeStyled}
                                   onChange={onChange}
                                   value={value} 
                                   maxLength={maxLength}          
                              />
                         )
               }

               {errors[name] && <span className="messageErrors">{errors[name].message}</span>}
        </WrapperStyle>
     )
}