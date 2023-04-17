import styled, {css} from "styled-components"
import InputMask from "react-input-mask";

interface IStyledInputProps{
     typeStyled?: "filter"
}


export const WrapperStyle = styled.div`
     display: flex;
     flex-direction: column;
     width: 100%;
     gap: 12px;
     margin-top: 24px;

     .messageErrors{
          color: var( --color-alert-1);
          font-weight: 600;
          font-family: var(--font-text);
          font-size: 14px;
          margin-top: -6px;
          margin-left: 3px;
     }
`

export const LabelStyle = styled.label`
     color: var(--gray-1);
     font: var(--font-label);
     margin-left: 1px;
`

export const InputStyle = styled.input`
     height: 48px;
     border-radius: 4px;
     border: 1.5px solid var(--gray-7);
     color: var(--gray-3);
     padding: 0px 16px;
     font: var(--font-placeholder);
     outline: none;
   
     ${({ typeStyled }:IStyledInputProps) =>
          typeStyled === "filter" &&
          css`
               max-width: 110px;
               height: 37px;
               padding-left:8px;
               font: var(--font-heading-11);
               border: none;
               border-radius: 3px;
               background-color: var(--gray-5);

          `
     }       
     

     &::placeholder{
          font: var(--font-placeholder);
          
          ${({ typeStyled }: IStyledInputProps) =>
               typeStyled === "filter" &&
                    css`
                         font: var(--font-heading-11);
                    `
          }       
     }

`
export const SelectStyle = styled.select`
     height: 48px;
     border-radius: 4px;
     border: 1.5px solid var(--gray-7);
     color: var(--gray-3);
     padding: 0px 16px;
     font: var(--font-placeholder);
     outline: none;
     appearance: none;
     -webkit-appearance: none;
     -moz-appearance: none;
     
     &::placeholder{
          font: var(--font-placeholder);
     }

     
`

export const InputMaskStyle = styled(InputMask)`
     height: 48px;
     border-radius: 4px;
     border: 1.5px solid var(--gray-7);
     color: var(--gray-3);
     padding: 0px 16px;
     font: var(--font-placeholder);
     outline: none;
`
export const TextAreaStyle = styled.textarea`
     height: 80px;
     border-radius: 4px;
     border: 1.5px solid var(--gray-7);
     color: var(--gray-3);
     padding: 16px;
     font: var(--font-placeholder);
     outline: none;
     resize: none;
`