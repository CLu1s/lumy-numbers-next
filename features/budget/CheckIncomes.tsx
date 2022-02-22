import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getStatus, getIncome } from "./selector";
import Modal from "../../components/Modal";
import { Input, Text } from "@chakra-ui/react";
import Loading from "../../components/Loading";

const CheckIncomes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector(getStatus);
  const bucket = useSelector(getIncome);

  useEffect(() => {
    if (status === "succeeded") {
      setIsOpen(!bucket);
    }
  }, [status, bucket]);

  const onClose = () => {
    setIsOpen(false);
  };
  const redirect = () => {
    router.push("/presupuesto");
  };

  return (
    <Modal
      isOpen={isOpen}
      title={"Hemos detectado que no tienes un contenedor"}
      onClose={onClose}
      onSubmit={redirect}
      onSubmitButtonText={"Ir al presupuesto"}
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
