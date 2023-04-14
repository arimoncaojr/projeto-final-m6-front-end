import {
  ContainerModal,
  FormModal,
  TitleAndButton,
  CloseBtn,
  TitlePost,
  SubTitlePost,
  LabelAndInputWrapper,
  LabelAndFieldDiv,
  Label,
  BigInput,
  BigSelect,
  SmallInput,
  SmallSelect,
  TextArea,
  AddImageBtn,
  DivFinalBtns,
  CancelBtn,
  CreatePostBtn,
} from "./indexStyle";
import { ModalCreatePostsContext } from "../../contexts/ModalCreatePostsContext";
import { ListCarsKenzieContext } from "../../contexts/ListCarsKenzieContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schemas/yupCreatePost";
import { IPostInfo } from "../../contexts/ModalCreatePostsContext";

export const ModalPostsCreate = () => {
  const { showModalCreatePost, submitPostInfo } = useContext(
    ModalCreatePostsContext
  );
  const { carBrandsInfo, carDetails, getCarDetails } = useContext(
    ListCarsKenzieContext
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostInfo>({ resolver: yupResolver(schema) });

  return (
    <ContainerModal>
      <FormModal>
        <TitleAndButton>
          <TitlePost>Criar anúncio</TitlePost>
          <CloseBtn>X</CloseBtn>
        </TitleAndButton>
        <SubTitlePost>Informações do veículo</SubTitlePost>
        <Label htmlFor="mark">Seleciona a Marca</Label>
        <BigSelect id="mark">
          <option value="">Selecione</option>
          <option value="Mercedes Benz">Mercedes Benz</option>
        </BigSelect>
        <Label htmlFor="model">Selecione o Modelo</Label>
        <BigSelect id="model">
          <option value="">Selecione</option>
          <option value="A 200 CGI ADVANCE SEDAN">
            A 200 CGI ADVANCE SEDAN
          </option>
        </BigSelect>
        <LabelAndFieldDiv>
          <LabelAndInputWrapper>
            <Label htmlFor="year">Ano</Label>
            <Label htmlFor="fuelType">Selecione o Combustível</Label>
          </LabelAndInputWrapper>
          <LabelAndInputWrapper>
            <SmallInput id="year" placeholder="ex: 2018" />
            <SmallSelect id="fuelType">
              <option value="">Selecione</option>
              <option value="flex">Flex</option>
              <option value="hibrido">Hibrido</option>
              <option value="eletrico">Elétrico</option>
            </SmallSelect>
          </LabelAndInputWrapper>
        </LabelAndFieldDiv>
        <LabelAndFieldDiv>
          <LabelAndInputWrapper>
            <Label htmlFor="kilometers">Quilometragem</Label>
            <Label htmlFor="color">Selecione a Cor</Label>
          </LabelAndInputWrapper>
          <LabelAndInputWrapper>
            <SmallInput id="kilometers" placeholder="ex: 30.000" />
            <SmallSelect id="color">
              <option value="azul">Azul</option>
              <option value="branco">Branco</option>
              <option value="preto">Preto</option>
            </SmallSelect>
          </LabelAndInputWrapper>
        </LabelAndFieldDiv>
        <LabelAndFieldDiv>
          <LabelAndInputWrapper>
            <Label htmlFor="tablePriceFiper">Preço tabela FIPE</Label>
            <Label htmlFor="price">Preço</Label>
          </LabelAndInputWrapper>
          <LabelAndInputWrapper>
            <SmallInput id="tablePriceFiper" readOnly />
            <SmallInput id="price" placeholder="ex: R$50.000" />
          </LabelAndInputWrapper>
        </LabelAndFieldDiv>
        <Label htmlFor="description">Descrição</Label>
        <TextArea></TextArea>
        <Label htmlFor="imageCap"> Imagem da capa</Label>
        <BigInput id="imgCap" />
        <Label htmlFor="firstImage"> 1° Imagem da galeria</Label>
        <BigInput id="firstImage" />
        <Label htmlFor="secondImage">2° Imagem da galeria</Label>
        <BigInput id="secondImage" />
        <AddImageBtn>Adicionar campo para imagem da galeria</AddImageBtn>
        <DivFinalBtns>
          <CancelBtn>Cancelar</CancelBtn>
          <CreatePostBtn>Criar anúncio</CreatePostBtn>
        </DivFinalBtns>
      </FormModal>
    </ContainerModal>
  );
};
