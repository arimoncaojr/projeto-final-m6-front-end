import styled from "styled-components";

export const BackgroundColor = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 80vh;

  z-index: -100;

  background-color: var(--color-brand-1);

  @media (max-width: 920px) {
    & {
      height: 100vh;
    }
  }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  max-width: 57rem;

  margin: 2rem auto;

  gap: 3rem;

  @media (max-width: 920px) {
    & {
      justify-content: center;

      padding: 0 5%;
    }
  }
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 32rem;

  gap: 1.2rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 18rem;

  border-radius: 5px;

  background-color: var(--whiteFixed);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 1rem;

  padding: 1.3rem;
  border-radius: 5px;
  margin-bottom: 1.7rem;

  background-color: var(--gray-10);

  h1 {
    font-size: 1.2rem;
    font-weight: 600;

    margin-bottom: 0.8rem;
  }

  .infosContainer_year_km_price {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    @media (max-width: 500px) {
      & {
        align-items: start;
        flex-direction: column;

        gap: 1rem;
      }
    }

    div {
      display: flex;

      gap: 0.6rem;
    }

    p {
      font-size: 1rem;
      font-weight: 400;
    }
  }
  button {
    align-self: start;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  gap: 1.2rem;

  padding: 1.3rem;
  border-radius: 5px;

  background-color: var(--gray-10);

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const AsideContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 22rem;

  gap: 1.2rem;

  @media (max-width: 920px) {
    max-width: 32rem;
  }
`;

export const PhotosContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.2rem;
  padding: 1.3rem;
  border-radius: 5px;

  background-color: var(--gray-10);

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    gap: 0.5rem;

    li {
      width: calc((100% / 3) - 10px);

      border-radius: 4px;

      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const AdvertiserInfos = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
  padding: 1.3rem;
  border-radius: 5px;

  background-color: var(--gray-10);

  h3 {
    width: 50px;
    padding: 5px;
    border-radius: 50%;

    font-size: 1.8rem;
    text-align: center;

    color: var(--gray-10);
    background-color: var(--color-brand-1);
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 32rem;

  gap: 1.2rem;
`;

export const ListComments = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;

  gap: 1.2rem;

  padding: 1.3rem;
  border-radius: 5px;

  background-color: var(--gray-10);

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-direction: column;

    gap: 1.5rem;

    li {
      display: flex;
      flex-direction: column;

      gap: 1rem;
    }

    div {
      display: flex;
      align-items: center;

      gap: 0.5rem;
    }

    h4 {
      font-size: 0.8rem;
      font-weight: 600;
    }

    p {
      font-size: 0.7rem;
      font-weight: 400;
    }

    .comment-description {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }
`;

export const NewComment = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;

  position: relative;

  gap: 1.2rem;
  padding: 1.3rem;
  border-radius: 5px;

  background-color: var(--gray-10);

  section {
    display: flex;
    align-items: center;

    gap: 1rem;

    h4 {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  form {
    display: flex;
    align-items: end;
    flex-direction: column;

    width: 100%;
    height: 100%;
    padding: 1rem;

    border-radius: 5px;
    border: 1px solid var(--gray-3);
  }

  form:hover {
    outline: 1px solid black;
  }

  textarea {
    width: 100%;
    height: 5rem;

    font-size: 1rem;

    border: none;

    resize: none;
  }

  textarea:focus {
    outline: 0;
  }
`;

export const Avatar = styled.h3`
  text-align: center;

  width: 27px;
  padding: 5px;
  border-radius: 50%;

  font-size: 0.8rem;

  color: var(--gray-10);
  background-color: ${(props) => props.color};
`;
