import React from "react";
import {
  Card,
  CardImage,
  GoodPurchase,
  CardTitle,
  CardDescription,
  UserInitials,
  UserName,
  TagsContainer,
  Tag,
  CardPrice,
} from "./PostCardStyles";
import { IPosts } from "../../contexts/ListPostsContext";

interface IPostCardProps {
  post: IPosts;
}

export const PostCard: React.FC<IPostCardProps> = ({ post }) => {
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return (
      nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : "")
    ).toUpperCase();
  };

  const formattedPrice = (price: string) => {
    return `R$ ${Number(price).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const truncateDescription = (
    description: string | null,
    maxLength: number
  ) => {
    if (description === null) {
      return "";
    }

    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  return (
    <Card>
      <CardImage src={post.imageCap} alt={`${post.mark} - ${post.model}`} />
      {post.isGoodPurchase && <GoodPurchase />}
      <CardTitle>{`${post.mark} - ${post.model}`}</CardTitle>
      <CardDescription>
        {truncateDescription(post.description, 83)}
      </CardDescription>
      <UserInitials>{getInitials(post.user.name)}</UserInitials>
      <UserName>{post.user.name}</UserName>
      <TagsContainer>
        <Tag>{`${post.kilometers}KM`}</Tag>
        <Tag>{post.year}</Tag>
      </TagsContainer>
      <CardPrice>{formattedPrice(post.price)}</CardPrice>
    </Card>
  );
};
