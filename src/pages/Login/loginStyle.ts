import styled from "styled-components";

export const LoginForm = styled.form`
  width: 100%;
  max-width: 412px;
  margin: 42px auto;
  height: 542px;
  padding: 16px;
  border-radius: 4px;
  background-color: var(--gray-10);
  box-shadow: 0px 2px 9px 2px var(--gray-4);
  position: relative;
  z-index: -2;

  & > h2 {
    font: var(--font-heading-8);
    color: #000000;
  }

  & > .containerForgotPassword {
    display: flex;
    justify-content: end;
    margin: 10px 18px 32px 0px;
  }

  & .containerForgotPassword > .forgotPassword {
    /* display: flex;
    margin: 10px 18px 32px 0px; */
    font: var(--font-body-3);
    color: var(--gray-2);
    /* text-align: right; */
    cursor: pointer;
    transition: 0.3s ease;
  }

  .forgotPassword:hover {
    color: var(--gray-1);
  }

  & > .dontAccount {
    text-align: center;
    margin: 20px;
    color: var(--gray-2);
    font: var(--font-body-4);
  }

  @media (min-width: 768px) {
    & {
      padding: 32px;
    }
  }
`;
