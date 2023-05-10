import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header/header";
import { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import ModalCommentEdit from "../../components/ModalCommentEdit/ModalCommentEdit";

export const DatailPostPage = () => {
  const { user } = useContext(UserContext);

  const renderTimeSinceComment = (dateComment: string): string => {
    const time = Number(new Date()) - Number(new Date(dateComment));
    const minutes = Math.round(time / 60000);
    const hours = Math.round(time / 3600000);
    const days = Math.round(time / 86400000);

    if (minutes < 60) {
      if (minutes < 1) {
        return "há 1 minuto";
      }
      return `há ${minutes} minutos`;
    } else if (hours < 24) {
      if (hours < 1) {
        return "há 1 hora";
      }
      return `há ${hours} horas`;
    } else {
      if (days < 1) {
        return "há 1 dia";
      }
      return `há ${days} dias`;
    }
  };

  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [comment, setComment] = useState<IComment | null>(null);
  const [showImage, setShowImage] = useState<string | null>(null);
  const [showModalImgage, setShowModalImage] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);
  const navigate = useNavigate();

  const catchImage = (img: string) => {
    setShowImage(img);
    setShowModalImage(true);
  };

  const randomColor = () => {
    const colors = [
      "#E34D8C",
      "#C04277",
      "#7D2A4D",
      "#7000FF",
      "#6200E3",
      "#36007D",
      "#349974",
      "#2A7D5F",
      "#153D2E",
      "#6100FF",
      "#5700E3",
      "#30007D",
    ];
    const randomIndex = Math.floor(Math.random() * 12);
    return colors[randomIndex];
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
    const token = window.localStorage.getItem("@motorsShop:Token");
    if (token) {
      try {
        const { data } = await Api.post(`/posts/${id}/comments`, dataNewPost, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCommentList([data, ...commentList]);
        setValue("description", "");

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

  const openModalContact = (comment: IComment) => {
    setComment(comment);
    setShowModalComment(true);
  };

  const handleCipher = (userData: string | undefined) => {
    const name = userData?.split(" ");
    if (name && name?.length > 1) {
      const firstLetter = name[0][0];
      const secondLetter = name[1][0];
      return (firstLetter + secondLetter).toUpperCase();
    } else {
      return name && name[0][0].toUpperCase();
    }
  };

  const { register, handleSubmit, setValue } = useForm<INewComment>({
    resolver: yupResolver(newCommentSchema),
  });

  return (
    <Wrapper>
      <Header type="dashboard" />
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
            <h3>{handleCipher(post?.user.name)}</h3>
            <h4>
              {post?.user.name.charAt(0).toUpperCase()}
              {post?.user.name.slice(1)}
            </h4>
            <p>{post?.user.description}</p>
            <Button
              typeStyle="seeAllAds"
              onClick={() => navigate(`/profile/${post?.user.id}`)}
            >
              Ver todos anuncios
            </Button>
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
                          {handleCipher(comment.userComment)}
                        </Avatar>
                        <h4>
                          {comment.userComment.charAt(0).toUpperCase()}
                          {comment.userComment.slice(1)}
                        </h4>
                        <p>{renderTimeSinceComment(comment.createdAt)}</p>
                      </div>
                      <div className="comment-description">
                        <p>{comment.description}</p>
                        {user?.id === comment.userCommentId ? (
                          <button onClick={() => openModalContact(comment)}>
                            editar
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
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
                <Avatar color={randomColor()}>{handleCipher(user.name)}</Avatar>
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
                placeholder="Digitar comentario (maximo 200 caracteres)"
                cols={30}
                rows={10}
                maxLength={200}
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
      {showModalComment && (
        <ModalCommentEdit
          setShowModalComment={setShowModalComment}
          comment={comment}
          setComment={setComment}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      )}
      <Footer />
    </Wrapper>
  );
};
