import { SetStateAction, useState } from "react";
import {
  BackGroundContainer,
  ModalContainer,
  TitleContainer,
} from "../../pages/DatailPost/ModalImage/modalImageStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordSchema } from "../../schemas/yupRecoverPassword";
import { FormContainer } from "./ModalPasswordStyle";
import { Api } from "../../services/api";
import { Flip, toast } from "react-toastify";

interface IModalPasswordProps {
  setShowModalPassword: React.Dispatch<SetStateAction<boolean>>;
}

interface IRecoverPasswordReq {
  email: string;
}

const ModalPassword: React.FC<IModalPasswordProps> = ({
  setShowModalPassword,
}) => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const closeModal = () => {
    setShowModalPassword(false);
  };

  const sendEmailRecoverPassword = async (email: IRecoverPasswordReq) => {
    const loadingToast = toast.loading("Carregando...");
    try {
      setLoadingBtn(true);
      await Api.post("/users/forgot", email);
      toast.update(loadingToast, {
        render: "Link enviado para seu email!",
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
      setShowModalPassword(false);
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render: `Email não encontrado`,
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
  } = useForm<IRecoverPasswordReq>({
    resolver: yupResolver(recoverPasswordSchema),
  });

  return (
    <BackGroundContainer>
      <ModalContainer>
        <TitleContainer>
          <h2>Recuperação de senha</h2>
          <button onClick={() => closeModal()}>X</button>
        </TitleContainer>
        <p>
          Para recuperar sua senha, informe seu endereço de email abaixo que nós
          enviaremos um link para a alteração da senha.
        </p>
        <FormContainer onSubmit={handleSubmit(sendEmailRecoverPassword)}>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="Digite seu email"
              {...register("email")}
            />
            <p className="erroMenssage">{errors.email?.message}</p>
          </div>
          <button disabled={loadingBtn} type="submit">
            {loadingBtn ? "Enviando..." : "Enviar"}
          </button>
        </FormContainer>
      </ModalContainer>
    </BackGroundContainer>
  );
};

export default ModalPassword;
