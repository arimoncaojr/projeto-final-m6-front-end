import { ListPostsProvider } from "./ListPostsContext";
import { ListCarsKenzieProvider } from "./ListCarsKenzieContext";
import { ModalCreatePostsProvider } from "./ModalCreatePostsContext";
import { UserProvider } from "./UserContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviderProps) => {
  return (
    <UserProvider>
      <ListPostsProvider>
        <ListCarsKenzieProvider>
          <ModalCreatePostsProvider>{children}</ModalCreatePostsProvider>
        </ListCarsKenzieProvider>
      </ListPostsProvider>
    </UserProvider>
  );
};
