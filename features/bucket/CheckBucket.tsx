import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, getBucket } from "./selector";
import { fetchBucket, createBucket } from "./bucketSlice";
import Modal from "../../components/Modal";
import { Input, Text, useToast } from "@chakra-ui/react";
import Loading from "../../components/Loading";
type Props = {
  userName: string;
};

const CheckBucket = ({ userName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector(getStatus);
  const bucket = useSelector(getBucket);
  const toast = useToast();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBucket(userName));
    }
  }, [dispatch, status, userName]);

  useEffect(() => {
    if (status === "failed") {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, status, toast]);

  useEffect(() => {
    if (status === "succeeded") {
      setIsOpen(!bucket);
    }
  }, [status, bucket]);

  const onClose = () => {
    setIsOpen(false);
  };
  const onSubmit = () => {
    setIsOpen(false);
    dispatch(
      createBucket({
        name: userName,
      })
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      title={"Hemos detectado que no tienes un contenedor"}
      onClose={onClose}
      onSubmit={onSubmit}
      onSubmitButtonText={"Crear contenedor"}
    >
      {status !== "loading" ? (
        <>
          <Text>Para poder continuar, debes crear un contenedor.</Text>
          <Text>Un contenedor es donde guardamos tu información</Text>
          <Text>Si tienes el codigo de un contendor escribelo aquí</Text>
          <Input
            placeholder="Codigo de contenedor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default CheckBucket;
