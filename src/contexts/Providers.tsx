import { ListPostsProvider } from "./ListPostsContext";
import { ListCarsKenzieProvider } from "./ListCarsKenzieContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: IProviderProps) => {
  return (
    <ListPostsProvider>
      <ListCarsKenzieProvider>{children}</ListCarsKenzieProvider>
    </ListPostsProvider>
  );
};
