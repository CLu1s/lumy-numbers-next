import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { Box, Button, Input, Text, VStack,Stack } from "@chakra-ui/react";
import { Income } from "../../types";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { createNewIncome, updateIcome } from "./budgetSlice";
import parseISO from "date-fns/parseISO";
import { getBucketID } from "../bucket/selector";
import NumberInput from "../../components/NumberInput";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Income;
};

const NewIncome = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.date)) : new Date()
  );
  const bucketID = useSelector(getBucketID);
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
  }, [reset, toEdit]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);
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
      <Stack spacing={4}>
        <Text>Ingresa el monto y la descripción del Ingreso</Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <NumberInput
                register={register}
                defaultValue={toEdit?.amount}
                required
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
      </Stack>
    </Modal>
  );
};

export default NewIncome;
