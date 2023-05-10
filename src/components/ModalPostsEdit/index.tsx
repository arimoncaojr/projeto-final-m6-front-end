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
  SmallInput,
  SmallSelect,
  TextArea,
  AddImageBtn,
  DivFinalBtns,
  CancelBtn,
  CreatePostBtn,
  YesAndNoBtn,
  YesAndNoDiv,
} from "../ModalPostsCreate/indexStyle";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editSchema } from "../../schemas/yupEditPost";
import { IPostInfoEdit } from "../../contexts/ModalEditPostsContext";
import { toast } from "react-toastify";
import { get } from "lodash";
import { ModalEditPostsContext } from "../../contexts/ModalEditPostsContext";

export const ModalPostsEdit = () => {
  const { submitEditedPostInfo, showModalEditPost, infoPost, deletePost } =
    useContext(ModalEditPostsContext);

  const [fuelType, setFuelType] = useState<string>(infoPost.fuelType);
  const [imageCount, setImageCount] = useState<number>(2);
  const [formattedPrice, setFormattedPrice] = useState<string>(infoPost.price);
  const [formattedKm, setFormattedKm] = useState<string>(infoPost.kilometers);
  const [valueYear, setValueYear] = useState<string>(infoPost.year);
  const [valueColor, setValueColor] = useState<string>(infoPost.color);
  const [valueDescription, setValueDescription] = useState<string>(
    `${infoPost.description}`
  );
  const [valueImg, setValueImg] = useState<string>(infoPost.imageCap);
  const [isActive, setIsActive] = useState<boolean>(infoPost.isActive);

  const checkInputs = () => {
    if (
      !fuelType ||
      formattedPrice.length <= 3 ||
      formattedKm.length === 0 ||
      valueColor.length === 0 ||
      valueYear.length < 4 ||
      valueDescription.length === 0 ||
      valueImg.length === 0
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    countImages();
  }, [infoPost]);

  const countImages = () => {
    if (infoPost.images && infoPost.images.length > 0) {
      setImageCount(infoPost.images.length);
    }
  };

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
          <Label
            errorColor={
              errors.images && errors.images[i]?.imageLink ? "red" : "#212529"
            }
            key={`image${i + 1}`}
            htmlFor={`image${i + 1}`}
          >
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

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR");
  };

  const formatPriceInput = (price: string) => {
    return price.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const formatKmInput = (km: string) => {
    return km.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleIsActiveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    if (value === "true") {
      setValue("isActive", "true");
      setIsActive(true);
    } else if (value === "false") {
      setValue("isActive", "false");
      setIsActive(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IPostInfoEdit>({
    resolver: yupResolver(editSchema),
    defaultValues: {
      fuelType: infoPost.fuelType,
      year: infoPost.year,
      color: infoPost.color,
      kilometers: formatKmInput(infoPost.kilometers),
      tablePriceFiper: `R$ ${formatPrice(Number(infoPost.tablePriceFiper))}`,
      price: `R$ ${formatPriceInput(infoPost.price)}`,
      description: infoPost.description,
      isActive: infoPost.isActive,
      imageCap: infoPost.imageCap,
    },
  });

  return (
    <ContainerModal>
      <FormModal onSubmit={handleSubmit(submitEditedPostInfo)}>
        <TitleAndButton>
          <TitlePost>Editar Anúncio</TitlePost>
          <CloseBtn
            type="button"
            onClick={() => {
              showModalEditPost(false);
              reset();
            }}
          >
            X
          </CloseBtn>
        </TitleAndButton>
        <ContentWrapper>
          <SubTitlePost>Informações do veículo</SubTitlePost>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label
                errorColor={errors.fuelType ? "red" : "#212529"}
                htmlFor="fuelType"
              >
                {errors.fuelType ? errors.fuelType.message : "Combustível"}
              </Label>
              <SmallSelect
                id="fuelType"
                value={fuelType}
                {...register("fuelType", {
                  onChange: (e) => setFuelType(e.target.value),
                })}
              >
                <option value="">Selecione</option>
                <option value="flex">Flex</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">Elétrico</option>
              </SmallSelect>
            </LabelAndInputWrapper>
            <LabelAndInputWrapper changeGap>
              <Label
                errorColor={errors.year ? "red" : "#212529"}
                htmlFor="year"
              >
                {errors.year ? errors.year.message : "Ano"}
              </Label>
              <SmallInput
                id="year"
                placeholder="ex: 2018"
                {...register("year", {
                  onChange: (e) => setValueYear(e.target.value),
                })}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label
                errorColor={errors.color ? "red" : "#212529"}
                htmlFor="color"
              >
                {errors.color ? errors.color.message : "Cor"}
              </Label>
              <SmallSelect
                id="color"
                {...register("color", {
                  onChange: (e) => setValueColor(e.target.value),
                })}
              >
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
              <Label
                errorColor={errors.kilometers ? "red" : "#212529"}
                htmlFor="kilometers"
              >
                {errors.kilometers
                  ? errors.kilometers.message
                  : "Quilometragem"}
              </Label>
              <SmallInput
                id="kilometers"
                placeholder="ex: 30.000"
                value={formatKmInput(formattedKm)}
                {...register("kilometers", {
                  onChange: (e) => {
                    setValue("kilometers", e.target.value);
                    setFormattedKm(formatKmInput(e.target.value));
                  },
                })}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <LabelAndFieldDiv>
            <LabelAndInputWrapper changeGap>
              <Label
                errorColor={errors.tablePriceFiper ? "red" : "#212529"}
                htmlFor="tablePriceFiper"
              >
                {errors.tablePriceFiper
                  ? errors.tablePriceFiper.message
                  : "Preço tabela FIPE"}
              </Label>
              <SmallInput
                id="tablePriceFiper"
                readOnly
                {...register("tablePriceFiper")}
              />
            </LabelAndInputWrapper>
            <LabelAndInputWrapper changeGap>
              <Label
                errorColor={errors.price ? "red" : "#212529"}
                htmlFor="price"
              >
                {errors.price ? errors.price.message : "Preço"}
              </Label>
              <SmallInput
                id="price"
                value={`R$ ${formatPriceInput(formattedPrice)}`}
                placeholder="ex: R$ 50.000"
                {...register("price", {
                  onChange: (e) => {
                    setValue("price", e.target.value);
                    setFormattedPrice(`R$ ${formatPriceInput(e.target.value)}`);
                  },
                })}
              />
            </LabelAndInputWrapper>
          </LabelAndFieldDiv>
          <Label
            errorColor={errors.description ? "red" : "#212529"}
            htmlFor="description"
          >
            {errors.description ? errors.description.message : "Descrição"}
          </Label>
          <TextArea
            {...register("description", {
              onChange: (e) => setValueDescription(e.target.value),
            })}
          ></TextArea>
          <Label htmlFor="isActive">Publicado</Label>
          <YesAndNoDiv>
            <YesAndNoBtn
              type="button"
              data-value="true"
              onClick={handleIsActiveClick}
              isActiveBG={isActive ? "#4529e6" : "#ffffff"}
              isActiveText={isActive ? "#ffffff" : "#adb5bd"}
            >
              Sim
            </YesAndNoBtn>
            <YesAndNoBtn
              type="button"
              data-value="false"
              onClick={handleIsActiveClick}
              isActiveBG={isActive ? "#ffffff" : "#4529e6"}
              isActiveText={isActive ? "#adb5bd" : "#ffffff"}
            >
              Não
            </YesAndNoBtn>
          </YesAndNoDiv>
          <Label
            errorColor={errors.imageCap ? "red" : "#212529"}
            htmlFor="imageCap"
          >
            {" "}
            {errors.imageCap ? errors.imageCap.message : "Imagem da capa"}
          </Label>
          <BigInput
            id="imageCap"
            {...register("imageCap", {
              onChange: (e) => setValueImg(e.target.value),
            })}
          />
          {infoPost.images.length < 6 && (
            <>
              <Label
                errorColor={
                  errors.images && errors.images[0]?.imageLink
                    ? "red"
                    : "#212529"
                }
                htmlFor="firstImage"
              >
                {errors.images && errors.images[0]?.imageLink
                  ? errors.images[0].imageLink.message
                  : "1° Imagem da galeria"}
              </Label>
              <BigInput id="firstImage" {...register("images.0.imageLink")} />
              <Label
                errorColor={
                  errors.images && errors.images[1]?.imageLink
                    ? "red"
                    : "#212529"
                }
                htmlFor="secondImage"
              >
                {errors.images && errors.images[1]?.imageLink
                  ? errors.images[1].imageLink.message
                  : "2° Imagem da galeria"}
              </Label>
              <BigInput id="secondImage" {...register("images.1.imageLink")} />
              {infoPost.images.length < 6 && renderAdditionalImages()}
              <AddImageBtn
                type="button"
                onClick={addImageField}
                opacityLimit={imageCount === 6 ? "0.5" : "1"}
                cursorLimit={imageCount === 6 ? "not-allowed" : "pointer"}
                transitionLimit={
                  imageCount === 6 ? "none" : "transform 0.3s ease-in-out"
                }
                transformLimit={imageCount === 6 ? "none" : "scale(0.9)"}
              >
                Adicionar campo para imagem da galeria
              </AddImageBtn>
            </>
          )}
          <DivFinalBtns marginChange={"0"}>
            <CancelBtn
              widthChange={"262px"}
              type="button"
              onClick={() => {
                deletePost();
                reset();
              }}
            >
              Excluir Anúncio
            </CancelBtn>
            <CreatePostBtn
              type="submit"
              transformLimit={checkInputs() ? "scale(0.9)" : "none"}
              transitionLimit={
                checkInputs() ? "transform 0.3s ease-in-out" : "none"
              }
              cursorLimit={checkInputs() ? "pointer" : "not-allowed"}
              backgroundChange={checkInputs() ? "#4529E6" : "#b0a6f0"}
            >
              Salvar alterações
            </CreatePostBtn>
          </DivFinalBtns>
        </ContentWrapper>
      </FormModal>
    </ContainerModal>
  );
};
