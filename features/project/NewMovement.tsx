import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import esLocale from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addMovement } from "./projectsSlice";
import parseISO from "date-fns/parseISO";
import { Movement } from "../../types";
import { date as dateFormat } from "../../utils/";

type Props = {
  isOpen: boolean;
  projectID: string;
  onClose: () => void;
  toEdit?: Movement;
  monthlyPayment?: number;
};

const NewMovement = ({
  isOpen,
  onClose,
  toEdit,
  projectID,
  monthlyPayment,
}: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.date)) : new Date()
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (toEdit) {
      setDate(new Date(parseISO(toEdit.date)));
    } else {
      setDate(new Date());
    }
    reset();
  }, [reset, toEdit, monthlyPayment]);

  const handleClose = () => {
    reset();
    onClose();
  };
  useEffect(() => {
    if (toEdit) {
      setDate(new Date(parseISO(toEdit.date)));
    } else {
      setDate(new Date());
    }
  }, [toEdit]);
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (!toEdit) {
      dispatch(
        addMovement({
          ...data,
          amount: Number(data.amount),
          projectID,
        })
      );
    } else {
      dispatch(
        addMovement({
          ...toEdit,
          ...data,
          date: date?.toISOString(),
        })
      );
    }
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
                defaultValue={
                  toEdit?.description ||
                  `Mensualidad de ${dateFormat(new Date(), "MMMM")}`
                }
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={
                  toEdit?.amount || Number(monthlyPayment.toFixed(2))
                }
                placeholder="Cuanto quieres  ahorrar?"
                {...register("amount", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
            </VStack>
          </Box>
        </form>
      </VStack>
    </Modal>
  );
};

export default NewMovement;
