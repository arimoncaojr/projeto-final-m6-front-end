import { ListPostsProvider } from "./ListPostsContext";
import { ListCarsKenzieProvider } from "./ListCarsKenzieContext";
import { ModalCreatePostsProvider } from "./ModalCreatePostsContext";
import { UserProvider } from "./UserContext";
import { ModalEditPostsProvider } from "./ModalEditPostsContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviderProps) => {
  return (
    <ListPostsProvider>
      <UserProvider>
        <ListCarsKenzieProvider>
          <ModalEditPostsProvider>
            <ModalCreatePostsProvider>{children}</ModalCreatePostsProvider>
          </ModalEditPostsProvider>
        </ListCarsKenzieProvider>
      </UserProvider>
    </ListPostsProvider>
  );
};
