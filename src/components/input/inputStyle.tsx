import styled from "styled-components"

export const WrapperStyle = styled.div`
     display: flex;
     flex-direction: column;
     width: 100%;
     gap: 12px;
     padding: 16px;
`

export const LabelStyle = styled.label`
     color: var(--gray-1);
     font: var(--font-label);
`

export const InputStyle = styled.input`
     height: 48px;
     border-radius: 4px;
     border: 1.5px solid var(--gray-7);
     color: var(--gray-3);
     padding: 0px 16px;
     font: var(--font-placeholder);
     outline: none;

     &::placeholder{
          font: var(--font-placeholder);
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