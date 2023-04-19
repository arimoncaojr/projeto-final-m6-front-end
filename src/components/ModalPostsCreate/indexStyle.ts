import styled from "styled-components";

interface IStyledProps {
  opacityLimit?: string;
  cursorLimit?: string;
  transitionLimit?: string;
  transformLimit?: string;
  changeGap?: boolean;
  errorColor?: string;
  backgroundChange?: string;
  widthChange?: string;
  marginChange?: string;
}

export const ContainerModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 40px);

  @media (max-width: 768px) {
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4529e6;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 520px;
  max-height: 90%;
  background: #ffffff;
  padding: 10px;
  gap: 20px;
  border-radius: 8px;
  border: none;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const TitleAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CloseBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 12px;
  height: 12px;
  color: #adb5bd;
  transition: transform 0.3s ease-in-out;
  margin-bottom: 5px;

  :hover {
    transform: scale(0.8);
  }
`;

export const TitlePost = styled.h2`
  font-family: "Lexend";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 20px;
  color: #212529;
`;

export const SubTitlePost = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 24px;
  color: #000000;
`;

export const LabelAndFieldDiv = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 541px) {
    flex-wrap: wrap;
  }
`;

export const LabelAndInputWrapper = styled.div<IStyledProps>`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  min-width: 45%;
`;

export const Label = styled.label<IStyledProps>`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${(props) => props.errorColor};
`;

export const BigInput = styled.input`
  border: 1.5px solid #e9ecef;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`;

export const BigSelect = styled.select`
  border: 1.5px solid #e9ecef;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`;

export const SmallInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  padding: 0px 16px;
  border: 1.5px solid #e9ecef;
  box-sizing: border-box;
`;

export const SmallSelect = styled.select`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  padding: 16px;
  border: 1.5px solid #e9ecef;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 40%;
  border-radius: 4px;
  padding: 40px 0px;
  border: 1.5px solid #e9ecef;
  box-sizing: border-box;
`;

export const AddImageBtn = styled.button<IStyledProps>`
  width: 70%;
  height: 40%;
  background: #edeafd;
  border: 1.5px solid #edeafd;
  border-radius: 4px;
  color: #4529e6;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px;
  opacity: ${(props) => props.opacityLimit};
  cursor: ${(props) => props.cursorLimit};
  transition: ${(props) => props.transitionLimit};

  :hover {
    transform: ${(props) => props.transformLimit};
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.713rem;
  }
`;

export const DivFinalBtns = styled.div<IStyledProps>`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: ${(props) => props.marginChange};

  @media (max-width: 768px) {
    align-items: center;
    margin-left: 0;
  }
`;

export const CancelBtn = styled.button<IStyledProps>`
  width: ${(props) => props.widthChange};
  height: 48px;
  background: #dee2e6;
  border: 1.5px solid #dee2e6;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  color: #495057;
  transition: transform 0.3s ease-in-out;

  :hover {
    transform: scale(0.9);
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const CreatePostBtn = styled.button<IStyledProps>`
  width: 193px;
  height: 48px;
  background: ${(props) => props.backgroundChange};
  border: 1.5px solid #b0a6f0;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  color: #edeafd;
  transition: ${(props) => props.transitionLimit};
  cursor: ${(props) => props.cursorLimit};

  :hover {
    transform: ${(props) => props.transformLimit};
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const YesAndNoDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 768px) {
    align-items: center;
    margin-left: 0;
  }
`;

export const YesAndNoBtn = styled.button`
  width: 228px;
  height: 48px;
  border: 1.5px solid #adb5bd;
  border-radius: 4px;
  color: #0b0d0d;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  background-color: #ffffff;

  :hover {
    background-color: #4529e6;
    color: #ffffff;
  }
`;
