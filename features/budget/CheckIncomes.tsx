import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getStatus, getIncome } from "./selector";
import Modal from "../../components/Modal";
import { Text } from "@chakra-ui/react";
import Loading from "../../components/Loading";
import useGetIncomes from "../../hooks/useGetIncomes";

const CheckIncomes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { status, error } = useSelector(getStatus);
  const income = useSelector(getIncome);
  useGetIncomes();

  const onClose = () => {
    setIsOpen(false);
  };
  const redirect = () => {
    router.push("/app/presupuesto");
  };

  return (
    <Modal
      isOpen={income === 0 && status === "succeeded"}
      title={"Hemos detectado que no tienes Ingresos registrados"}
      onClose={onClose}
      onSubmit={redirect}
      onSubmitButtonText={"Ir al plan de gastos"}
    >
      {status !== "loading" ? (
        <>
          <Text>El siguiente paso es crear tu primer presupuesto</Text>
        </>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default CheckIncomes;
