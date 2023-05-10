import { SetStateAction, useState } from "react";
import {
  BackGroundContainer,
  TitleContainer,
} from "../../pages/DatailPost/ModalImage/modalImageStyle";
import { IAddressRequest } from "../../interfaces/user";
import { updateAddressSchema } from "../../schemas/yupEditAddress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAddress } from "../../services/viaCepApi";
import { Api } from "../../services/api";
import { Flip, toast } from "react-toastify";
import {
  ButtonsConatinerStyle,
  InputDivStyle,
} from "../ModalProfileEditDelete/ModalProfileEditDeleteStyle";
import {
  ContainerInputsStyle,
  ModalAddressStyle,
} from "./ModalAdressEditStyle";

interface IModalAdressProps {
  setShowModalAddress: React.Dispatch<SetStateAction<boolean>>;
}

const ModalAddressEdit: React.FC<IModalAdressProps> = ({
  setShowModalAddress,
}) => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const updateAddress = async (dataAddress: IAddressRequest) => {
    const token = window.localStorage.getItem("@motorsShop:Token");
    const address = {
      address: dataAddress,
    };
    const loadingToast = toast.loading("Carregando...", {
      position: "top-center",
    });
    try {
      setLoadingBtn(true);
      await Api.patch("/users/profile", address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.update(loadingToast, {
        render: "Endereço atualizado",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        theme: "dark",
        position: "top-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        style: {
          backgroundColor: "#f8f9fa",
          font: "var(--font-body-1)",
          color: "var(--color-sucess-1)",
          border: "1.5px solid var(--color-sucess-1)",
          padding: "8px",
        },
      });
      setShowModalAddress(false);
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render: `Algo deu errado`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
        theme: "dark",
        position: "top-center",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        style: {
          backgroundColor: "#f8f9fa",
          font: "var(--font-body-1)",
          color: "var(--color-alert-1)",
          border: "1.5px solid var(--color-alert-1)",
          padding: "8px",
        },
      });
    } finally {
      setLoadingBtn(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAddressRequest>({
    resolver: yupResolver(updateAddressSchema),
  });

  const handleAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await getAddress(cep);

        setValue("state", response.data.uf);
        setValue("city", response.data.localidade);
        setValue("street", response.data.logradouro);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <BackGroundContainer>
      <ModalAddressStyle>
        <TitleContainer>
          <h2>Editar endereço</h2>
          <button onClick={() => setShowModalAddress(false)}>X</button>
        </TitleContainer>
        <form onSubmit={handleSubmit(updateAddress)}>
          <InputDivStyle>
            <label>CEP</label>
            <input
              type="text"
              maxLength={8}
              {...register("cep")}
              onChange={handleAddress}
              placeholder="00000000"
            />
            <p>{errors.cep?.message}</p>
          </InputDivStyle>
          <ContainerInputsStyle>
            <div>
              <label>Estado</label>
              <input type="text" disabled={true} {...register("state")} />
            </div>
            <div>
              <label>Cidade</label>
              <input type="text" disabled={true} {...register("city")} />
            </div>
          </ContainerInputsStyle>
          <InputDivStyle>
            <label>Rua</label>
            <input type="text" disabled={true} {...register("street")} />
          </InputDivStyle>
          <ContainerInputsStyle>
            <div>
              <label>Número</label>
              <input
                type="text"
                {...register("number")}
                placeholder="Ex: 1000"
              />
            </div>
            <div>
              <label>Complemento</label>
              <input
                type="text"
                {...register("complement")}
                placeholder="Ex: Ap 12 Bl 2"
              />
            </div>
          </ContainerInputsStyle>
          <ButtonsConatinerStyle>
            <button
              className="cancelBtn"
              type="button"
              onClick={() => setShowModalAddress(false)}
            >
              Cancelar
            </button>
            <button className="updateBtn" type="submit" disabled={loadingBtn}>
              {loadingBtn ? "Salvando..." : "Salvar alterações"}
            </button>
          </ButtonsConatinerStyle>
        </form>
      </ModalAddressStyle>
    </BackGroundContainer>
  );
};

export default ModalAddressEdit;
