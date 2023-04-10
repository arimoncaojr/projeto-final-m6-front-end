import { ToastContainer } from "react-toastify";
import { RoutesMain } from "./routes/mainRoutes";
import { GlobalStyle } from "./styles/globalStyle";
import { ResetStyle } from "./styles/resetStyle";
import { Wrapper } from "./styles/wrapper";

function App() {
  return (
    <Wrapper>
      <ResetStyle />
      <GlobalStyle/>
      <RoutesMain />
      <ToastContainer />
    </Wrapper>
  );
}

export default App;
