import styled from "styled-components"

export const ResetPasswordStyle = styled.section`
     background-color: var(--gray-7);
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     gap: 16px;
   
     & > form{
          width: 100%;
          max-width: 500px;
          height: 400px;
          background-color: var(--gray-6);
          border-radius: 6px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap:32px;
     }
    
`