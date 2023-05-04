import { useState } from "react";
import { CardStyle, IconUserStyle } from "./cardStyle";
// import { MdKeyboardDoubleArrowRight as Next, MdKeyboardDoubleArrowLeft as Back } from "react-icons/md"
import {
  IoIosArrowForward as Next,
  IoIosArrowBack as Back,
} from "react-icons/io";
import { CgDollar as Money } from "react-icons/cg";
import { Button } from "../button/button";
import { IPosts } from "../../contexts/ListPostsContext";

interface IPostCardProps {
  post: IPosts;
  type?: string;
}

export const Card = ({ post, type }: IPostCardProps) => {
  const [indexImg, setIndexImg] = useState(0);

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
  const user = post.user.name.replace(/\b\w{1}/g, (match) =>
    match.toUpperCase()
  );
  const firstLetter = post.user.name.split(" ")[0][0];
  const secondLetter = ""; //post.user.name.split(" ")[1][0]
  const cipher = (firstLetter + secondLetter).toUpperCase();
  const dbImg = [{ imageLink: post.imageCap }, ...post.images];
  const disableButton = dbImg.length === 1 ? true : false;

  return (
    <CardStyle isActive={isActive}>
      <figure>
        <button
          onClick={() => handleClickImg("back")}
          className="back"
          disabled={disableButton}
        >
          <Back />
        </button>
        <img src={dbImg[indexImg].imageLink} alt="foto do carro" />
        <button
          onClick={() => handleClickImg("next")}
          className="next"
          disabled={disableButton}
        >
          <Next />
        </button>
        {isGoodPurchase && <Money className="isGoodPurchase" />}
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
      <h2>{nameCar}</h2>
      <p>{description}</p>
      <IconUserStyle firstLetter={firstLetter.toUpperCase()}>
        <p className="iconUser">{cipher}</p>
        <p className="nameUser">{user}</p>
      </IconUserStyle>
      <div className="containerDetail">
        <Button typeStyle="detail">{km}</Button>
        <Button typeStyle="detail">{year}</Button>
        <p>{price}</p>
      </div>
    </CardStyle>
  );
};
