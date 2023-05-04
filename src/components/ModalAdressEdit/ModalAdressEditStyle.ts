import styled from "styled-components";

export const ModalAddressStyle = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 400px;
  padding: 15px 15px 35px;

  border-radius: 5px;
  gap: 1rem;

  background-color: var(--gray-10);
`;

export const ContainerInputsStyle = styled.div`
  display: flex;
  gap: 0.5rem;

  div {
    display: flex;
    flex-direction: column;

    width: 50%;
    gap: 0.5rem;

    label {
      font: var(--font-btn-medium);
    }

    input {
      padding: 5px 10px;

      border-radius: 5px;
      border: 1px solid var(--gray-5);

      font: var(--font-body-2);

      background-color: var(--whiteFixed);
    }
  }
`;
