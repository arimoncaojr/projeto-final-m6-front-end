import { ToastContainer } from "react-toastify";
import { RoutesMain } from "./routes/mainRoutes";
import { GlobalStyle } from "./styles/globalStyle";
import { ResetStyle } from "./styles/resetStyle";

function App() {
  return (
    <>
      <ResetStyle />
      <GlobalStyle/>
      <RoutesMain />
      <ToastContainer />
    </>
  );
}

export default App;
