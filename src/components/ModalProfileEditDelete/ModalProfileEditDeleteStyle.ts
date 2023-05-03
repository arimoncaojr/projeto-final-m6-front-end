import styled from "styled-components";

export const InputsContainerStyle = styled.div`
  display: flex;
  flex-direction: column;

  height: 300px;

  overflow-y: scroll;

  padding: 0 10px 0 0;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
`;

export const InputDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font: var(--font-btn-medium);
  }

  input {
    padding: 5px 10px;

    border: 1px solid var(--gray-5);
    border-radius: 5px;

    font: var(--font-body-2);

    background-color: var(--whiteFixed);
  }

  p {
    margin-top: -3px;
    margin-left: 3px;

    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-text);

    color: var(--color-alert-1);
  }
`;

export const ButtonsConatinerStyle = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 30px;

  gap: 0.5rem;

  button {
    width: 123px;

    padding: 10px 5px;

    font: var(--font-text);
    font-size: 16px;
    font-weight: 500;

    border: none;
    border-radius: 5px;

    transition: 0.2s ease-in;
  }

  button:hover {
    filter: brightness(110%);
  }

  .updateBtn {
    color: var(--whiteFixed);
    background-color: var(--color-brand-1);
  }

  .deleteBtn {
    color: var(--color-alert-1);
    background-color: var(--color-alert-2);
  }

  .cancelBtn {
    color: var(--gray-2);
    background-color: var(--gray-6);
  }
`;
