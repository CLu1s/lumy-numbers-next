import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { Transaction } from "../../types";
import esLocale from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addFixedCost, updateFixedCost } from "./fixedCostSlice";
import { getBucketID } from "../bucket/selector";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Transaction;
};

const FixedCostModal = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (toEdit) {
      dispatch(
        updateFixedCost({
          ...toEdit,
          ...data,
        })
      );
    } else {
      dispatch(
        addFixedCost({
          ...data,
          bucketID,
        })
      );
    }
    handleClose();
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Gasto" : "Ingresar Nuevo Gasto",
    onClose: handleClose,
    cancelButtonText: "Cancel",
    onSubmit: handleSubmit(onSubmit),
  };
  const ExampleCustomInput = forwardRef(
    ({ value, onClick }: { value?: any; onClick?: () => void }, ref: any) => (
      <Button onClick={onClick} ref={ref} width="full">
        {value}
      </Button>
    )
  );
  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <Modal {...config}>
      <VStack spacing={4}>
        <Text>Introduce la cantidad y la descripción del gasto.</Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <Input
                defaultValue={toEdit ? toEdit.amount : ""}
                placeholder="Cantidad"
                {...register("amount", { required: true })}
              />
              {errors.description && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={toEdit ? toEdit.description : ""}
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
            </VStack>
          </Box>
        </form>
      </VStack>
    </Modal>
  );
};

export default FixedCostModal;
