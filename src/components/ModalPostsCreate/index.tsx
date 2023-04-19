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
  YesAndNoBtn,
  YesAndNoDiv,
} from "./indexStyle";
import { ModalCreatePostsContext } from "../../contexts/ModalCreatePostsContext";
import { ListCarsKenzieContext } from "../../contexts/ListCarsKenzieContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schemas/yupCreatePost";
import { IPostInfo } from "../../contexts/ModalCreatePostsContext";
import { toast } from "react-toastify";
import { get } from "lodash";

export const ModalPostsCreate = () => {
  const [fuelType, setFuelType] = useState<number | null>(null);
  const [tablePriceFipe, setTablePriceFipe] = useState<number | null>(null);
  const [imageCount, setImageCount] = useState<number>(2);
  const [formattedPrice, setFormattedPrice] = useState<string>("");
  const [formattedKm, setFormattedKm] = useState<string>("");
  const [valueYear, setValueYear] = useState<string>("");
  const [valueColor, setValueColor] = useState<string>("");
  const [valueDescription, setValueDescription] = useState<string>("");
  const [valueImg, setValueImg] = useState<string>("");

  // colocar no context de Edição de Anúncio ou algum outro contexto
  const [editModal, setEditModal] = useState<boolean>(false);

  const checkInputs = () => {
    if (
      !fuelType ||
      !tablePriceFipe ||
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
    clearErrors,
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
    if (brand) {
      getCarDetails(brand);
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    const modelInfo = carDetails.find((model) => model.name === selectedModel);

    if (modelInfo) {
      setValue("fuelType", fuelTypeLabel(modelInfo.fuel));
      setValue("tablePriceFiper", `${formatPrice(modelInfo.value)}`);
      setFuelType(modelInfo.fuel);
      setTablePriceFipe(modelInfo.value);
      clearErrors("tablePriceFiper");
      clearErrors("fuelType");
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

  const getLabelContent = (errorPath: string, defaultMessage: string) => {
    return get(errors, errorPath, defaultMessage);
  };

  return (
    <ContainerModal>
      <FormModal onSubmit={handleSubmit(submitPostInfo)}>
        <TitleAndButton>
          <TitlePost>
            {editModal ? "Editar Anúncio" : "Criar Anúncio"}
          </TitlePost>
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
          <Label errorColor={errors.mark ? "red" : "#212529"} htmlFor="mark">
            {getLabelContent("mark.message", "Marca")}
          </Label>
          <BigSelect
            id="mark"
            {...register("mark", { onChange: handleBrandChange })}
          >
            <option value="">Selecione</option>
            {Object.keys(carBrandsInfo).map((brand) => (
              <option key={brand} value={brand}>
                {capitalizeFirstLetter(brand)}
              </option>
            ))}
          </BigSelect>
          <Label errorColor={errors.model ? "red" : "#212529"} htmlFor="model">
            {errors.model ? errors.model.message : "Modelo"}
          </Label>
          <BigSelect
            id="model"
            {...register("model", { onChange: handleModelChange })}
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
              <Label
                errorColor={errors.fuelType ? "red" : "#212529"}
                htmlFor="fuelType"
              >
                {errors.fuelType ? errors.fuelType.message : "Combustível"}
              </Label>
              <SmallSelect id="fuelType" {...register("fuelType")}>
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
                value={formattedKm}
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
                value={
                  tablePriceFipe ? `R$ ${formatPrice(tablePriceFipe)}` : ""
                }
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
                placeholder="ex: R$ 50.000"
                value={formattedPrice}
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
          {editModal && (
            <>
              <Label htmlFor="isActive">Publicado</Label>

              <YesAndNoDiv>
                <YesAndNoBtn>Sim</YesAndNoBtn>
                <YesAndNoBtn>Não</YesAndNoBtn>
              </YesAndNoDiv>
            </>
          )}
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
          <Label
            errorColor={
              errors.images && errors.images[0]?.imageLink ? "red" : "#212529"
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
              errors.images && errors.images[1]?.imageLink ? "red" : "#212529"
            }
            htmlFor="secondImage"
          >
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
          <DivFinalBtns marginChange={editModal ? "0" : "125px"}>
            <CancelBtn
              widthChange={editModal ? "262px" : "126px"}
              type="button"
              onClick={() => {
                showModalCreatePost(false);
                reset();
              }}
            >
              {editModal ? "Excluir Anúncio" : "Cancelar"}
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
              {editModal ? "Salvar alterações" : "Criar anúncio"}
            </CreatePostBtn>
          </DivFinalBtns>
        </ContentWrapper>
      </FormModal>
    </ContainerModal>
  );
};
