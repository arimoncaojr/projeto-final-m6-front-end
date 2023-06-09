import React, { SetStateAction } from "react";
import {
  BackGroundContainer,
  ImageContainer,
  ModalContainer,
  TitleContainer,
} from "./modalImageStyle";

interface ModaImageProps {
  img: string | null;
  setShowImage: React.Dispatch<SetStateAction<string | null>>;
  setShowModalImage: React.Dispatch<SetStateAction<boolean>>;
}

const ModalImage: React.FC<ModaImageProps> = ({
  img,
  setShowImage,
  setShowModalImage,
}) => {
  const closeModal = () => {
    setShowImage(null);
    setShowModalImage(false);
  };

  return img ? (
    <BackGroundContainer>
      <ModalContainer>
        <TitleContainer>
          <h2>Imagem do carro</h2>
          <button onClick={() => closeModal()}>X</button>
        </TitleContainer>
        <ImageContainer>
          <img src={img} alt="" />
        </ImageContainer>
      </ModalContainer>
    </BackGroundContainer>
  ) : (
    <h2>Sem imagem</h2>
  );
};

export default ModalImage;
