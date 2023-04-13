import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 312px;
  height: 350px;
  position: relative;
`;

export const CardImage = styled.img`
  box-sizing: border-box;
  position: absolute;
  width: 312px;
  height: 152px;
  left: 0px;
  top: 0px;
  background: #e9ecef;
  border: 2px solid #e9ecef;
`;

export const GoodPurchase = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 16px;
  height: 27px;
  right: 4px;
  top: 4px;
  background: #349974;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
`;

export const CardTitle = styled.div`
  position: absolute;
  width: 312px;
  height: 22px;
  left: 0px;
  top: 152px;
  font-family: "Lexend";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #212529;
`;

export const CardDescription = styled.div`
  width: 312px;
  height: 48px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #495057;
  position: absolute;
  top: 174px;
`;

export const UserInitials = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 32px;
  height: 32px;
  background: #4529e6;
  border-radius: 150px;
  position: absolute;
  top: 222px;
`;

export const UserName = styled.div`
  width: 86px;
  height: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #495057;
  position: absolute;
  top: 222px;
  left: 40px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
  position: absolute;
  width: 113px;
  height: 32px;
  left: 0px;
  top: 256px;
`;

export const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
  width: 51px;
  height: 32px;
  background: #edeafd;
  border-radius: 4px;
`;

export const CardPrice = styled.div`
  position: absolute;
  width: 105px;
  height: 20px;
  left: 204px;
  top: 260px;
  font-family: "Lexend";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #212529;
`;

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const PaginationText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #495057;
`;

export const PaginationButton = styled.button`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #495057;
  background: none;
  border: none;
  cursor: pointer;
`;
