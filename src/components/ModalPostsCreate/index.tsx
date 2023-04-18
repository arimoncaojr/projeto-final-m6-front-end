import {
  ContainerModal,
  ContentWrapper,
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
import { useContext, useState } from "react";
import { useForm, FieldErrors, FieldPath, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schemas/yupCreatePost";
import { IPostInfo } from "../../contexts/ModalCreatePostsContext";
import { toast } from "react-toastify";
import { get } from "lodash";

export const ModalPostsCreate = () => {
  const [fuelType, setFuelType] = useState<number | null>(null);
  const [tablePriceFipe, setTablePriceFipe] = useState<number | null>(null);
  const [imageCount, setImageCount] = useState<number>(2);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedKm, setFormattedKm] = useState("");

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
    setValue,
    formState: { errors },
  } = useForm<IPostInfo>({ resolver: yupResolver(schema) });

  const addImageField = (event: React.MouseEvent) => {
    event.preventDefault();
    if (imageCount < 6) {
      setImageCount(imageCount + 1);
    } else {
      toast.warning("Você só pode adicionar 6 imagens", { autoClose: 1500 });
    }
  };

  const renderAdditionalImages = () => {
    const additionalImages = [];

    for (let i = 2; i < imageCount; i++) {
      additionalImages.push(
        <>
          <Label key={`image${i + 1}`} htmlFor={`image${i + 1}`}>
            {get(
              errors,
              `images[${i}].imageLink.message`,
              `${i + 1}° Imagem da galeria`
            )}
          </Label>
          <BigInput
            key={`image${i + 1 + 1}`}
            id={`image${i + 1}`}
            {...register(`images.${i}.imageLink`, { required: false })}
          />
        </>
      );
    }

    return additionalImages;
  };

  const fuelTypeLabel = (type: number | null) => {
    switch (type) {
      case 1:
        return "flex";
      case 2:
        return "hibrido";
      case 3:
        return "eletrico";
      default:
        return "";
    }
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = event.target.value;
    getCarDetails(brand);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    const modelInfo = carDetails.find((model) => model.name === selectedModel);

    if (modelInfo) {
      setValue("fuelType", fuelTypeLabel(modelInfo.fuel));
      setValue("tablePriceFiper", `${formatPrice(modelInfo.value)}`);
      setFuelType(modelInfo.fuel);
      setTablePriceFipe(modelInfo.value);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR");
  };

  const formatPriceInput = (price: string) => {
    return price.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const formatKmInput = (km: string) => {
    return km.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  function getFieldErrorMessage<T extends FieldValues>(
    field: FieldPath<T>,
    errors: FieldErrors<T>
  ): string | undefined {
    const error = errors[field as keyof T] as { message: string } | undefined;

    if (error && typeof error === "object" && "message" in error) {
      return error.message;
    }
    return undefined;
  }

  const getLabel = (field: FieldPath<IPostInfo>, defaultMessage: string) => {
    return getFieldErrorMessage(field, errors) ?? defaultMessage;
  };

  return (
    <ContainerModal>
      <FormModal onSubmit={handleSubmit(submitPostInfo)}>
        <TitleAndButton>
          <TitlePost>Criar anúncio</TitlePost>
          <CloseBtn
            type="button"
            onClick={() => {
              showModalCreatePost(false);
              reset();
            }}
          >
            X
          </CloseBtn>
        </TitleAndButton>
        <ContentWrapper>
          <SubTitlePost>Informações do veículo</SubTitlePost>
          <Label htmlFor="mark">{getLabel("mark", "Marca")}</Label>
          <BigSelect
            id="mark"
            {...register("mark")}
            onChange={handleBrandChange}
          >
            <option value="">Selecione</option>
            {Object.keys(carBrandsInfo).map((brand) => (
              <option key={brand} value={brand}>
                {capitalizeFirstLetter(brand)}
              </option>
            ))}
          </BigSelect>
          <Label htmlFor="model">{getLabel("model", "Modelo")}</Label>
          <BigSelect
            id="model"
            {...register("model")}
            onChange={handleModelChange}
          >
            <option value="">Selecione</option>
            {carDetails.map((model) => (
              <option key={model.id} value={model.name}>
                {capitalizeFirstLetter(model.name)}
              </option>
            ))}
          </BigSelect>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="fuelType">
                {getLabel("fuelType", "Combustível")}
              </Label>
              <SmallSelect
                id="fuelType"
                {...register("fuelType")}
                value={fuelTypeLabel(fuelType)}
              >
                <option value="">Selecione</option>
                <option value="flex">Flex</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">Elétrico</option>
              </SmallSelect>
            </LabelAndInputWrapper>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="year">{getLabel("year", "Ano")}</Label>
              <SmallInput
                id="year"
                placeholder="ex: 2018"
                {...register("year")}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="color">{getLabel("color", "Cor")}</Label>
              <SmallSelect id="color" {...register("color")}>
                <option value="">Selecione</option>
                <option value="azul">Azul</option>
                <option value="branco">Branco</option>
                <option value="cinza">Cinza</option>
                <option value="marrom">Marrom</option>
                <option value="prata">Prata</option>
                <option value="preto">Preto</option>
                <option value="verde">Verde</option>
                <option value="vermelho">Vermelho</option>
              </SmallSelect>
            </LabelAndInputWrapper>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="kilometers">
                {getLabel("kilometers", "Quilometragem")}
              </Label>
              <SmallInput
                id="kilometers"
                placeholder="ex: 30.000"
                value={formattedKm}
                {...register("kilometers")}
                onChange={(e) => {
                  setValue("kilometers", e.target.value);
                  setFormattedKm(formatKmInput(e.target.value));
                }}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="tablePriceFiper">
                {getLabel("tablePriceFiper", "Preço tabela FIPE")}
              </Label>
              <SmallInput
                id="tablePriceFiper"
                value={
                  tablePriceFipe ? `R$ ${formatPrice(tablePriceFipe)}` : ""
                }
                readOnly
                {...register("tablePriceFiper")}
              />
            </LabelAndInputWrapper>
            <LabelAndInputWrapper changeGap>
              <Label htmlFor="price">{getLabel("price", "Preço")}</Label>
              <SmallInput
                id="price"
                placeholder="ex: R$ 50.000"
                {...register("price")}
                value={formattedPrice}
                onChange={(e) => {
                  setValue("price", e.target.value);
                  setFormattedPrice(`R$ ${formatPriceInput(e.target.value)}`);
                }}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <Label htmlFor="description">
            {getLabel("description", "Descrição")}
          </Label>
          <TextArea {...register("description")}></TextArea>
          <Label htmlFor="imageCap">
            {getLabel("imageCap", "Imagem da capa")}
          </Label>
          <BigInput id="imageCap" {...register("imageCap")} />
          <Label htmlFor="firstImage">
            {errors.images && errors.images[0]?.imageLink
              ? errors.images[0].imageLink.message
              : "1° Imagem da galeria"}
          </Label>
          <BigInput id="firstImage" {...register("images.0.imageLink")} />
          <Label htmlFor="secondImage">
            {errors.images && errors.images[1]?.imageLink
              ? errors.images[1].imageLink.message
              : "2° Imagem da galeria"}
          </Label>
          <BigInput id="secondImage" {...register("images.1.imageLink")} />
          {renderAdditionalImages()}
          <AddImageBtn
            type="button"
            onClick={addImageField}
            opacityLimit={imageCount >= 6 ? "0.5" : "1"}
            cursorLimit={imageCount >= 6 ? "not-allowed" : "pointer"}
            transitionLimit={
              imageCount >= 6 ? "none" : "transform 0.3s ease-in-out"
            }
            transformLimit={imageCount >= 6 ? "none" : "scale(0.9)"}
          >
            Adicionar campo para imagem da galeria
          </AddImageBtn>
          <DivFinalBtns>
            <CancelBtn
              type="button"
              onClick={() => {
                showModalCreatePost(false);
                reset();
              }}
            >
              Cancelar
            </CancelBtn>
            <CreatePostBtn
              type="submit"
              onClick={() => handleSubmit(submitPostInfo)}
            >
              Criar anúncio
            </CreatePostBtn>
          </DivFinalBtns>
        </ContentWrapper>
      </FormModal>
    </ContainerModal>
  );
};
