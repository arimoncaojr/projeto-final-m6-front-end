import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1.25rem;

  & > div {
    display: flex;
    flex-direction: column;

    gap: 0.7rem;

    label {
      font: var(--font-body-1);
    }

    input {
      padding: 10px 10px;

      font: var(--font-body-2);

      border: 1px solid var(--gray-5);
      border-radius: 4px;
    }

    p {
      color: var(--color-alert-1);
      font-weight: 500;
      font-family: var(--font-text);
      font-size: 14px;
      margin-top: -3px;
      margin-left: 3px;
    }
  }

  & > button {
    width: 100%;

    padding: 12px 0;

    border: none;
    border-radius: 4px;

    font: var(--font-btn-big);

    color: var(--whiteFixed);
    background-color: var(--color-brand-1);
  }
`;
