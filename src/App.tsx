import { ToastContainer } from "react-toastify";
import { RoutesMain } from "./routes/mainRoutes";
import { GlobalStyle } from "./styles/globalStyle";
import { ResetStyle } from "./styles/resetStyle";
import { WrapperGlobal } from "./styles/wrapper";

function App() {
  return (
    <WrapperGlobal>
      <ResetStyle />
      <GlobalStyle />
      <RoutesMain />
      <ToastContainer />
    </WrapperGlobal>
  );
}

export default App;
