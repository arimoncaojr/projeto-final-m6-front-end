import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import { Wrapper } from "../../styles/wrapper";
import { LoginForm } from "./loginStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ilogin } from "../../interfaces/login";
import { loginSchema } from "./schemaLogin";
import { Button } from "../../components/button/button";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import ModalPassword from "../../components/ModalPassword/ModalPassword";

export const LoginPage = () => {
  const { loginUser } = useContext(UserContext);
  const [showModalPassword, setShowModalPassword] = useState(false);

  const openModal = () => {
    setShowModalPassword(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilogin>({
    resolver: yupResolver(loginSchema),
  });

  const submitLogin = (data: Ilogin) => {
    loginUser(data);
  };

  return (
    <Wrapper>
      <Header />
      <LoginForm>
        <h2>Login</h2>
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Digite seu email"
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          register={register}
          errors={errors}
        />
        <div className="containerForgotPassword">
          <p onClick={() => openModal()} className="forgotPassword">
            Esqueci minha senha
          </p>
        </div>
        <Button typeStyle="colorBrand1" onClick={handleSubmit(submitLogin)}>
          Entrar
        </Button>
        <p className="dontAccount">Ainda não possui conta?</p>
        <Button typeStyle="noColor">Cadastrar</Button>
      </LoginForm>
      <Footer />
      {showModalPassword && (
        <ModalPassword setShowModalPassword={setShowModalPassword} />
      )}
    </Wrapper>
  );
};
