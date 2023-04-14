import { Card } from "../../components/card/card";
import { ModalCreatePostsContext } from "../../contexts/ModalCreatePostsContext";
import { useContext } from "react";
import { ModalPostsCreate } from "../../components/ModalPostsCreate";

export const HomePage = () => {
  const { showModalCreatePost, modalCreatePost } = useContext(
    ModalCreatePostsContext
  );

  return (
    <>
      <div>
        <button onClick={() => showModalCreatePost(true)}></button>
        {modalCreatePost && <ModalPostsCreate />}
      </div>
    </>
  );
};
