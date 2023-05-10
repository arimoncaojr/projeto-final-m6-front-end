import styled from "styled-components";

export const FormCommentStyle = styled.form`
  display: flex;
  flex-direction: column;

  gap: -0.5rem;
  textarea {
    height: 5rem;
    font-size: 1rem;
    padding: 5px;
    resize: none;
  }
`;
