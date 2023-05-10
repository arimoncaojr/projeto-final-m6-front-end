import { useContext, useState } from "react";
import { CardStyle, IconUserStyle } from "./cardStyle";
import {
  IoIosArrowForward as Next,
  IoIosArrowBack as Back,
} from "react-icons/io";
import { CgDollar as Money } from "react-icons/cg";
import { Button } from "../button/button";
import { IPosts } from "../../contexts/ListPostsContext";
import { ModalEditPostsContext } from "../../contexts/ModalEditPostsContext";
import { ModalPostsEdit } from "../ModalPostsEdit";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface IPostCardProps {
  post: IPosts;
  type?: string;
}

export const Card = ({ post, type }: IPostCardProps) => {
  const { setIdPost, showModalEditPost, modalEditPost, listPostById } =
    useContext(ModalEditPostsContext);
  const { user } = useContext(UserContext);
  const [indexImg, setIndexImg] = useState(0);

  const navigate = useNavigate();

  const handleClickImg = (button: string) => {
    const sizeDbImg = dbImg.length - 1;

    if (button === "next") {
      setIndexImg(indexImg + 1);
      if (sizeDbImg === indexImg) {
        setIndexImg(0);
      }
    }

    if (button === "back") {
      setIndexImg(indexImg - 1);
      if (indexImg === 0) {
        setIndexImg(sizeDbImg);
      }
    }
  };

  const nameCar =
    post.model[0].toUpperCase() + post.model.slice(1).toLowerCase();
  const description = post.description
    ? post.description[0].toUpperCase() +
      post.description.slice(1).toLowerCase()
    : "";
  const isActive = post.isActive;
  const isGoodPurchase = post.isGoodPurchase;
  const km = post.kilometers;
  const year = post.year;
  const price = Number(post.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const userName = post.user.name.replace(/\b\w{1}/g, (match) =>
    match.toUpperCase()
  );
  const firstLetter = post.user.name.split(" ")[0][0];
  const dbImg = [{ imageLink: post.imageCap }, ...post.images];
  const disableButton = dbImg.length > 2 ? true : false;

  const handleCipher = () => {
    const name = post.user.name.split(" ");
    if (name && name?.length > 1) {
      const firstLetter = name[0][0];
      const secondLetter = name[1][0];
      return (firstLetter + secondLetter).toUpperCase();
    } else {
      return name && name[0][0].toUpperCase();
    }
  };

  return (
    <CardStyle isActive={isActive} type={type}>
      <figure>
        {disableButton && (
          <button onClick={() => handleClickImg("back")} className="back">
            <Back />
          </button>
        )}
        <img src={dbImg[indexImg].imageLink} alt="foto do carro" />

        {disableButton && (
          <button onClick={() => handleClickImg("next")} className="next">
            <Next />
          </button>
        )}
        {type === "home"
          ? isGoodPurchase && <Money className="isGoodPurchase" />
          : false}

        {type !== "home" ? (
          isActive ? (
            <span>Ativo</span>
          ) : (
            <span>Inativo</span>
          )
        ) : (
          false
        )}
      </figure>
      <h2 onClick={() => navigate(`/product/${post.id}`)}>{nameCar}</h2>
      <p>{description}</p>
      <IconUserStyle firstLetter={firstLetter.toUpperCase()}>
        <p className="iconUser">{handleCipher()}</p>
        <p
          className="nameUser"
          onClick={() => navigate(`/profile/${post.user.id}`)}
        >
          {userName}
        </p>
      </IconUserStyle>
      <div className="containerDetail">
        <Button typeStyle="detail">{km}</Button>
        <Button typeStyle="detail">{year}</Button>
        <p>{price}</p>
      </div>
      {type === "profile" && post.user.id === user?.id && (
        <div className="containerButtons">
          <Button
            typeStyle="noColor"
            onClick={() => {
              setIdPost(post.id);
              listPostById(post.id);
            }}
          >
            Editar
          </Button>
          <Button
            typeStyle="noColor"
            onClick={() => navigate(`/product/${post.id}`)}
          >
            Ver detalhes
          </Button>
        </div>
      )}
    </CardStyle>
  );
};
