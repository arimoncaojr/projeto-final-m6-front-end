import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header/header";
import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import { IComment, INewComment, IPost } from "../../interfaces/post";
import { Footer } from "../../components/footer/footer";
import { Wrapper } from "../../styles/wrapper";
import {
  BackgroundColor,
  InfosContainer,
  ImageContainer,
  PostContainer,
  DescriptionContainer,
  ContainerMain,
  AsideContainer,
  PhotosContainer,
  AdvertiserInfos,
  CommentsContainer,
  ListComments,
  NewComment,
  Avatar,
} from "./detailPostStyle";
import { Button } from "../../components/button/button";
import ModalImage from "./ModalImage/modalImage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newCommentSchema } from "../../schemas/yupCreateComment";
import { Flip, toast } from "react-toastify";

interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  dateOfBirth: string;
  description: string;
  typeOfAccount: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const DatailPostPage = () => {
  const user: IUser = {
    id: "0fa67b2a-c5f6-4bde-91d7-2248599fbc26",
    name: "pedro",
    email: "pedro@mail.com",
    cpf: "12345678901",
    phoneNumber: "11920055768",
    dateOfBirth: "1996-11-08T02:00:00.000Z",
    description: "sou um usuário me registrando nessa plataforma",
    typeOfAccount: "comprador",
    isActive: true,
    createdAt: "2023-04-11T18:04:15.653Z",
    updatedAt: "2023-04-11T18:04:15.653Z",
  };

  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [showImage, setShowImage] = useState<string | null>(null);
  const [showModalImgage, setShowModalImage] = useState(false);
  const navigate = useNavigate();

  const catchImage = (img: string) => {
    setShowImage(img);
    setShowModalImage(true);
  };

  const randomColor = () => {
    const hashColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hashColor}`;
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await Api.get<IPost>(`/posts/${id}`);
        setPost(data);
        const commentListReverse = data.comments.reverse();
        setCommentList(commentListReverse);
      } catch (error) {
        console.log(error);
        setPost(null);
        setCommentList([]);
        navigate("/");
      }
    };

    getPost();
  }, [id, navigate]);

  const newComment = async (dataNewPost: INewComment) => {
    const loadingToast = toast.loading("Carregando...");
    const token = window.localStorage.getItem("@motorsShopToken");
    if (token) {
      try {
        const { data } = await Api.post(`/posts/${id}/comments`, dataNewPost, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommentList([data, ...commentList]);

        toast.update(loadingToast, {
          render: "Comentario adicionado",
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
          render: `Comentario não adicionado`,
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
      }
    }
  };

  const { register, handleSubmit } = useForm<INewComment>({
    resolver: yupResolver(newCommentSchema),
  });

  return (
    <Wrapper>
      <Header />
      <ContainerMain>
        <BackgroundColor />
        <PostContainer>
          <ImageContainer>
            <img src={post?.imageCap} alt={post?.model} />
          </ImageContainer>
          <InfosContainer>
            <h1>
              {post?.mark} {post?.model.toUpperCase()}
            </h1>
            <div className="infosContainer_year_km_price">
              <div>
                <Button typeStyle="detail">{post?.year}</Button>
                <Button typeStyle="detail">{post?.kilometers}KM</Button>
              </div>
              <p>R$ {post?.price}</p>
            </div>
            {user ? (
              <Button typeStyle="colorBrand1Withlimit">Comprar</Button>
            ) : (
              <Button typeStyle="colorGray5" onClick={() => navigate("/login")}>
                Comprar
              </Button>
            )}
          </InfosContainer>
          <DescriptionContainer>
            <h2>Descrição</h2>
            <p>
              {post?.description
                ? post.description
                : "Este anúncio está sem descrição no momento"}
            </p>
          </DescriptionContainer>
        </PostContainer>
        <AsideContainer>
          <PhotosContainer>
            <h2>Fotos</h2>
            {post?.images ? (
              <ul>
                {post.images.map((img) => (
                  <li key={img.id} onClick={() => catchImage(img.imageLink)}>
                    <img src={img.imageLink} alt="" />
                  </li>
                ))}
              </ul>
            ) : (
              "O anuncio não contem mais fotos"
            )}
          </PhotosContainer>
          <AdvertiserInfos>
            <h3>{post?.user.name.slice(0, 2).toUpperCase()}</h3>
            <h4>
              {post?.user.name.charAt(0).toUpperCase()}
              {post?.user.name.slice(1)}
            </h4>
            <p>{post?.user.description}</p>
            <Button typeStyle="seeAllAds">Ver todos anuncios</Button>
          </AdvertiserInfos>
        </AsideContainer>
        <CommentsContainer>
          <ListComments>
            <h2>Comentários</h2>
            <ul>
              {commentList.length ? (
                commentList.map((comment) => {
                  return (
                    <li>
                      <div>
                        <Avatar color={randomColor()}>
                          {comment.userComment.slice(0, 2).toUpperCase()}
                        </Avatar>
                        <h4>
                          {comment.userComment.charAt(0).toUpperCase()}
                          {comment.userComment.slice(1)}
                        </h4>
                        <p>
                          {comment.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                      </div>
                      <p className="comment-description">
                        {comment.description}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p>Sem Comentarios</p>
              )}
            </ul>
          </ListComments>
          <NewComment>
            {user ? (
              <section>
                <Avatar color={randomColor()}>
                  {user.name.slice(0, 2).toUpperCase()}
                </Avatar>
                <h4>
                  {user.name.charAt(0).toUpperCase()}
                  {user.name.slice(1)}
                </h4>
              </section>
            ) : (
              <></>
            )}
            <form onSubmit={handleSubmit(newComment)}>
              <textarea
                id="newComment"
                placeholder="Digitar comentario"
                cols={30}
                rows={10}
                {...register("description")}
              ></textarea>
              <Button
                typeStyle={user ? "colorBrand1Withlimit" : "colorGray5"}
                onClick={user ? () => {} : () => navigate("/login")}
              >
                Comentar
              </Button>
            </form>
          </NewComment>
        </CommentsContainer>
      </ContainerMain>
      {showModalImgage && (
        <ModalImage
          img={showImage}
          setShowImage={setShowImage}
          setShowModalImage={setShowModalImage}
        />
      )}
      <Footer />
    </Wrapper>
  );
};
