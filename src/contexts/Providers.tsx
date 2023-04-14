import { ListPostsProvider } from "./ListPostsContext";
import { ListCarsKenzieProvider } from "./ListCarsKenzieContext";
import { ModalCreatePostsProvider } from "./ModalCreatePostsContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviderProps) => {
  return (
    <ListPostsProvider>
      <ListCarsKenzieProvider>
        <ModalCreatePostsProvider>{children}</ModalCreatePostsProvider>
      </ListCarsKenzieProvider>
    </ListPostsProvider>
  );
};
