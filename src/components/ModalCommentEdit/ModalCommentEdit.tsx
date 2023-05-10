import { SetStateAction, useState } from "react";
import {
  BackGroundContainer,
  ModalContainer,
  TitleContainer,
} from "../../pages/DatailPost/ModalImage/modalImageStyle";
import { IComment, INewComment } from "../../interfaces/post";
import { Api } from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newCommentSchema } from "../../schemas/yupCreateComment";
import { FormCommentStyle } from "./ModalCommentEditStyle";
import { ButtonsConatinerStyle } from "../ModalProfileEditDelete/ModalProfileEditDeleteStyle";
import { Flip, toast } from "react-toastify";

interface IModalCommentProps {
  comment: IComment | null;
  commentList: IComment[];
  setCommentList: React.Dispatch<SetStateAction<IComment[]>>;
  setComment: React.Dispatch<SetStateAction<IComment | null>>;
  setShowModalComment: React.Dispatch<SetStateAction<boolean>>;
}

const ModalCommentEdit: React.FC<IModalCommentProps> = ({
  setShowModalComment,
  comment,
  commentList,
  setComment,
  setCommentList,
}) => {
  const [disableBtnUpdate, setDisableBtnUpdate] = useState(false);
  const [disableBtnDelete, setDisableBtnDelete] = useState(false);
  const closeModal = () => {
    setComment(null);
    setShowModalComment(false);
  };

  const deleteComment = async () => {
    const token = localStorage.getItem("@motorsShop:Token");
    const commentId = comment?.id;
    const loadingToast = toast.loading("Carregando...", {
      position: "top-center",
    });
    if (token) {
      try {
        setDisableBtnDelete(true);
        await Api.delete(`/posts/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newCommentList = commentList.filter(
          (cmt) => cmt.id !== commentId
        );
        setCommentList([...newCommentList]);
        setShowModalComment(false);
        toast.update(loadingToast, {
          render: "Comentario excluido",
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
        setDisableBtnDelete(false);
      }
    }
  };

  const updateComment = async (updatedData: INewComment) => {
    const token = localStorage.getItem("@motorsShop:Token");
    const commentId = comment?.id;
    const loadingToast = toast.loading("Carregando...", {
      position: "top-center",
    });
    if (token) {
      try {
        setDisableBtnUpdate(true);
        const { data } = await Api.patch(
          `/posts/comments/${commentId}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newCommentList = commentList.filter(
          (cmt) => cmt.id !== commentId
        );
        setCommentList([data, ...newCommentList]);
        setShowModalComment(false);
        toast.update(loadingToast, {
          render: "Comentario atualizado",
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
        setDisableBtnUpdate(false);
      }
    }
  };

  const { register, handleSubmit } = useForm<INewComment>({
    resolver: yupResolver(newCommentSchema),
  });

  return (
    <BackGroundContainer>
      <ModalContainer>
        <TitleContainer>
          <h2>Editar comentario</h2>
          <button onClick={() => closeModal()}>X</button>
        </TitleContainer>
        <FormCommentStyle onSubmit={handleSubmit(updateComment)}>
          <textarea
            cols={30}
            rows={10}
            defaultValue={comment?.description}
            {...register("description")}
          ></textarea>
          <ButtonsConatinerStyle>
            <button
              className="cancelBtn"
              type="button"
              onClick={() => closeModal()}
            >
              Cancelar
            </button>
            <button
              className="updateBtn"
              type="submit"
              disabled={disableBtnUpdate}
            >
              {disableBtnUpdate ? "Atualizando..." : "Atualizar"}
            </button>
            <button
              type="button"
              className="deleteBtn"
              disabled={disableBtnDelete}
              onClick={() => deleteComment()}
            >
              {disableBtnDelete ? "Excluindo..." : "Excluir"}
            </button>
          </ButtonsConatinerStyle>
        </FormCommentStyle>
      </ModalContainer>
    </BackGroundContainer>
  );
};

export default ModalCommentEdit;
