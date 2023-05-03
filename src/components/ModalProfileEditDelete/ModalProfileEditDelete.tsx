import { SetStateAction, useContext, useState } from "react";
import {
  BackGroundContainer,
  ModalContainer,
  TitleContainer,
} from "../../pages/DatailPost/ModalImage/modalImageStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "../../schemas/yupEditProfile";
import { IUserUpdate } from "../../interfaces/user";
import InputMask from "react-input-mask";
import { Api } from "../../services/api";
import { Flip, toast } from "react-toastify";
import {
  ButtonsConatinerStyle,
  InputDivStyle,
  InputsContainerStyle,
} from "./ModalProfileEditDeleteStyle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface IModalProfileProps {
  setShowModalProfile: React.Dispatch<SetStateAction<boolean>>;
}

const ModalProfileEditDelete: React.FC<IModalProfileProps> = ({
  setShowModalProfile,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();

  const formatedDataforRequest = (obj: IUserUpdate) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => {
        if (typeof value === "object" && value) {
          value = formatedDataforRequest(value);
        }
        return value;
      })
    );
  };

  const updateUser = async (data: IUserUpdate) => {
    const dataRequest = formatedDataforRequest(data);
    const token = window.localStorage.getItem("@motorsShopToken");
    const loadingToast = toast.loading("Carregando...", {
      position: "top-center",
    });
    if (token) {
      try {
        setLoadingBtn(true);
        const { data } = await Api.patch("/users/profile", dataRequest, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        toast.update(loadingToast, {
          render: "Dados atualizados",
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
        setShowModalProfile(false);
      } catch (error) {
        console.log(error);
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
    }
  };

  const deleteUser = async (userId: string) => {
    const token = window.localStorage.getItem("@motorsShopToken");
    const loadingToast = toast.loading("Carregando...", {
      position: "top-center",
    });
    try {
      setLoadingBtn(true);
      await Api.delete("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.update(loadingToast, {
        render: "Conta removida",
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
      setShowModalProfile(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render: `Algo deu errado!`,
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
  } = useForm<IUserUpdate>({
    resolver: yupResolver(updateUserSchema),
  });

  return (
    <BackGroundContainer>
      <ModalContainer>
        <TitleContainer>
          <h2>Editar perfil</h2>
          <button onClick={() => setShowModalProfile(false)}>X</button>
        </TitleContainer>
        <form onSubmit={handleSubmit(updateUser)}>
          <InputsContainerStyle>
            <InputDivStyle>
              <label>Nome</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.name}
              />
              <p className="erroMenssage">{errors.name?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>Email</label>
              <input
                type="text"
                placeholder="Digite seu email"
                {...register("email")}
                defaultValue={user?.email}
              />
              <p className="erroMenssage">{errors.email?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>CPF</label>
              <InputMask
                mask="999.999.999-99"
                type="text"
                placeholder="000.000.000-00"
                {...register("cpf")}
                defaultValue={user?.cpf}
              />
              <p className="erroMenssage">{errors.cpf?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>Celular</label>
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                placeholder="(00) 00000-0000"
                {...register("phoneNumber")}
                defaultValue={user?.phoneNumber}
              />
              <p className="erroMenssage">{errors.phoneNumber?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>Data de nascimento</label>
              <input type="date" {...register("dateOfBirth")} />
              <p className="erroMenssage">{errors.dateOfBirth?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>Descrição</label>
              <input
                type="text"
                placeholder="Digite sua descrição"
                {...register("description")}
                defaultValue={user?.description}
              />
              <p className="erroMenssage">{errors.description?.message}</p>
            </InputDivStyle>
            <InputDivStyle>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              {errors.password ? (
                <p className="erroMenssage">
                  A senha deve conter pelo menos uma letra maiúscula, uma letra
                  minúscula, um número, um caractere especial e ter no mínimo 8
                  caracteres
                </p>
              ) : (
                <></>
              )}
            </InputDivStyle>
            <InputDivStyle>
              <label>Confirme sua senha</label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                {...register("confirmPassword")}
              />
              <p className="erroMenssage">{errors.confirmPassword?.message}</p>
            </InputDivStyle>
          </InputsContainerStyle>
          <ButtonsConatinerStyle>
            <button
              className="cancelBtn"
              type="button"
              onClick={() => setShowModalProfile(false)}
            >
              Cancelar
            </button>
            {user ? (
              <button
                onClick={() => deleteUser(user.id)}
                className="deleteBtn"
                type="button"
                disabled={loadingBtn}
              >
                {loadingBtn ? "Excluindo..." : "Excluir perfil"}
              </button>
            ) : (
              <></>
            )}
            <button className="updateBtn" type="submit" disabled={loadingBtn}>
              {loadingBtn ? "Salvando..." : "Salvar alterações"}
            </button>
          </ButtonsConatinerStyle>
        </form>
      </ModalContainer>
    </BackGroundContainer>
  );
};

export default ModalProfileEditDelete;
