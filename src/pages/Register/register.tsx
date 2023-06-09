import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button/button";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import { IUserCreated } from "../../interfaces/user";
import { getAddress } from "../../services/viaCepApi";
import { Wrapper } from "../../styles/wrapper";
import { RegisterForm } from "./registerStyle";
import { registerSchema } from "./schemaRegister";
import { IStyledButtonProps } from "../../components/button/buttonStyle";
import { UserContext } from "../../contexts/UserContext";
import { WarningModal } from "../../components/warningModal/warningModal";

export const RegisterPage = () => {
  const { createdUser, showModal, sucessModal } = useContext(UserContext);

  const [address, setAddress] = useState({
    state: "",
    city: "",
    street: "",
  });

  const [buyerCheck, setBuyerCheck] =
    useState<IStyledButtonProps["typeStyle"]>("noColor");
  const [advertiserCheck, setAdvertiserCheck] =
    useState<IStyledButtonProps["typeStyle"]>("noColor");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserCreated>({
    resolver: yupResolver(registerSchema),
  });

  const handleAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await getAddress(cep);
        setAddress({
          state: response.data.uf,
          city: response.data.localidade,
          street: response.data.logradouro,
        });

        setValue("state", response.data.uf);
        setValue("city", response.data.localidade);
        setValue("street", response.data.logradouro);
        setValue("complement", response.data.complemento);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const submitRegister = (data: IUserCreated) => {
    const address = {
      cep: data.cep,
      city: data.city,
      state: data.state,
      street: data.street,
    };

    const dataRegister = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
      description: data.description,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      typeOfAccount: data.typeOfAccount,
      address: address,
    };
    createdUser(dataRegister);
  };

  const handleTypeAccount = (type: string, e: Event) => {
    e.preventDefault();
    setValue("typeOfAccount", type);

    if (type === "comprador") {
      setBuyerCheck("colorBrand1");
      setAdvertiserCheck("noColor");
    } else {
      setAdvertiserCheck("colorBrand1");
      setBuyerCheck("noColor");
    }
  };

  return (
    <Wrapper>
      <Header />
      <RegisterForm>
        <h2>Cadastro</h2>

        <p className="info">Informações pessoais</p>
        <Input
          type="text"
          label="Nome"
          placeholder="Ex: Thiago Silva"
          name="name"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Email"
          placeholder="Ex: thiago@mail.com"
          name="email"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="CPF"
          placeholder="Ex: 045.365.021-00"
          name="cpf"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Celular"
          placeholder="Ex: (67) 9 9108-5615"
          name="phoneNumber"
          register={register}
          errors={errors}
          typeStyled="tel"
        />
        <Input
          type="date"
          label="Data de nascimento"
          placeholder="DD/MM/AAAA"
          name="dateOfBirth"
          register={register}
          errors={errors}
        />
        <Input
          type="textarea"
          label="Descrição"
          placeholder="Digitar descrição"
          name="description"
          register={register}
          errors={errors}
        />

        <p className="info">Informações de endereço</p>

        <Input
          type="text"
          label="CEP"
          placeholder="Ex: 79765-770"
          name="cep"
          register={register}
          onChange={handleAddress}
          errors={errors}
          maxLength={8}
        />
        <div id="joinInputs">
          <Input
            type="text"
            label="Estado"
            placeholder="Ex: SP"
            name="state"
            register={register}
            errors={errors}
            value={address.state}
          />
          <Input
            type="text"
            label="Cidade"
            placeholder="Ex: Sao Paulo"
            name="city"
            register={register}
            errors={errors}
            value={address.city}
          />
        </div>
        <Input
          type="text"
          label="Rua"
          placeholder="Ex: Rua das flores"
          name="street"
          register={register}
          errors={errors}
          value={address.street}
        />
        <div id="joinInputs">
          <Input
            type="text"
            label="Número"
            placeholder="Ex: 1010"
            name="number"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Complemento"
            placeholder="Ex: apart 307B"
            name="complement"
            register={register}
            errors={errors}
          />
        </div>

        <p className="info">Tipo de conta</p>

        <div id="joinInputs">
          <Button
            typeStyle={buyerCheck}
            onClick={(e) => handleTypeAccount("comprador", e)}
          >
            Comprador
          </Button>
          <Button
            typeStyle={advertiserCheck}
            onClick={(e) => handleTypeAccount("anunciante", e)}
          >
            Anunciante
          </Button>
        </div>
        {
          <p className="errorsMessageTypeAccount">
            {errors.typeOfAccount?.message}
          </p>
        }
        <Input
          type="password"
          label="Senha"
          placeholder="Digite uma senha segura"
          name="password"
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          label="Confirmar senha"
          placeholder="Digite a mesma senha"
          name="confirmPassword"
          register={register}
          errors={errors}
        />
        <Button typeStyle="colorBrand1" onClick={handleSubmit(submitRegister)}>
          Finalizar Cadastro
        </Button>
      </RegisterForm>
      <Footer />
      <WarningModal
        type="register"
        showModal={showModal}
        sucess={sucessModal}
      />
    </Wrapper>
  );
};
