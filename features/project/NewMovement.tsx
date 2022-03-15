import React, { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addMovement, updateMovement } from "./projectsSlice";
import { addNewTransaction } from "../wallet/walletSlice";
import parseISO from "date-fns/parseISO";
import { Movement } from "../../types";
import { date as dateFormat } from "../../utils/";
import { getBucketID } from "../bucket/selector";
import { getCategoryID } from "./selector";
type Props = {
  isOpen: boolean;
  projectID: string;
  onClose: () => void;
  toEdit?: Movement;
  monthlyPayment?: number;
  projectName?: string;
};

const NewMovement = ({
  isOpen,
  onClose,
  toEdit,
  projectID,
  monthlyPayment,
  projectName,
}: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.date)) : new Date()
  );
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);

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
      const { ...trans } = data;
      dispatch(
        addNewTransaction({
          ...trans,
          description: `${projectName}: ${trans.description}`,
          bucketID,
          categoryID,
          amount: Number(data.amount),
          date: new Date().toISOString(),
        })
      );
    } else {
      dispatch(
        updateMovement({
          ...toEdit,
          ...data,
          amount: Number(data.amount),
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
