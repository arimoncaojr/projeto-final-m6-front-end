import styled from "styled-components";

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

export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 520px;
  max-height: 95%;
  background: #ffffff;
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  border: none;
`;

export const TitleAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 346px;
`;

export const CloseBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: #adb5bd;
`;

export const TitlePost = styled.h2`
  font-family: "Lexend";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #212529;
`;

export const SubTitlePost = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
`;

export const LabelAndInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const LabelAndFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #212529;
`;

export const BigInput = styled.input`
  border: 1.5px solid #e9ecef;
  border-radius: 4px;
  padding: 0px 16px;
  width: 90%;
  height: 48px;
`;

export const BigSelect = styled.select`
  border: 1.5px solid #e9ecef;
  border-radius: 4px;
  padding: 0px 16px;
  width: 98%;
  height: 48px;
`;

export const SmallInput = styled.input`
  width: 40%;
  height: 48px;
  border-radius: 4px;
  padding: 0px 16px;
  border: 1.5px solid #e9ecef;
`;

export const SmallSelect = styled.select`
  width: 50%;
  height: 48px;
  border-radius: 4px;
  padding: 0px 16px;
  border: 1.5px solid #e9ecef;
`;

export const TextArea = styled.textarea`
  width: 90%;
  height: 200px;
  border-radius: 4px;
  padding: 8px 16px;
  border: 1.5px solid #e9ecef;
`;

export const AddImageBtn = styled.button`
  width: 70%;
  height: 20%;
  background: #edeafd;
  border: 1.5px solid #edeafd;
  border-radius: 4px;
  color: #4529e6;
  font-weight: 600;
  font-size: 14px;
`;

export const DivFinalBtns = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 160px;
`;

export const CancelBtn = styled.button`
  width: 126px;
  height: 48px;
  background: #dee2e6;
  border: 1.5px solid #dee2e6;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: #495057;
`;

//Fazer props para alterar o estilo do botão de acordo com os campos preenchidos
export const CreatePostBtn = styled.button`
  width: 193px;
  height: 48px;
  background: #b0a6f0;
  border: 1.5px solid #b0a6f0;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: #edeafd;
`;
