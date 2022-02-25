import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { Income } from "../../types";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "./selector";
import { createNewIncome, updateIcome } from "./budgetSlice";
import { getStatus } from "./selector";
import parseISO from "date-fns/parseISO";
import { getBucketID } from "../bucket/selector";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Income;
};

const NewIncome = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [selected, setSelected] = useState<any>();
  const [date, setDate] = useState<Date | null>(
    toEdit ? parseISO(toEdit.date) : new Date()
  );
  const categories = useSelector(getCategories);
  const status = useSelector(getStatus);
  const bucketID = useSelector(getBucketID);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (!toEdit) {
      dispatch(
        createNewIncome({
          ...data,
          bucketID,
          date: date,
        })
      );
    } else {
      dispatch(
        updateIcome({
          ...toEdit,
          ...data,
          date: date?.toISOString(),
        })
      );
    }
    // TOO: add handling of errors
    toast({
      title: "Gasto Registrado.",
      description: "Se ha registrado tu gasto :D",
      status: "success",
      isClosable: true,
    });
    handleClose();
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Ingreso" : "Nuevo Ingreso",
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
        <p className="text-sm text-gray-500">
          Ingresa el monto y la descripción del Ingreso
        </p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <Input
                placeholder="Cantidad"
                defaultValue={toEdit?.amount}
                {...register("amount", { required: true })}
              />
              {errors.description && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={toEdit?.description}
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                locale="es"
                customInput={<ExampleCustomInput />}
              />
            </VStack>
          </Box>
        </form>
      </VStack>
    </Modal>
  );
};

export default NewIncome;
