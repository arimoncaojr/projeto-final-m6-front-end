import { useState } from "react";
import ModalProfileEditDelete from "../../components/ModalProfileEditDelete/ModalProfileEditDelete";
import ModalAddressEdit from "../../components/ModalAdressEdit/ModalAdressEdit";

export const DashboardPage = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalAddress, setShowModalAddress] = useState(false);

  return (
    <>
      <button onClick={() => setShowModalProfile(true)}>
        modal editar/deletar perfil
      </button>
      <button onClick={() => setShowModalAddress(true)}>
        modal editar endereço
      </button>
      {showModalProfile && (
        <ModalProfileEditDelete setShowModalProfile={setShowModalProfile} />
      )}
      {showModalAddress && (
        <ModalAddressEdit setShowModalAddress={setShowModalAddress} />
      )}
    </>
  );
};
