import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack, Stack, Text } from "@chakra-ui/react";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "./projectsSlice";
import parseISO from "date-fns/parseISO";
import { getBucketID } from "../bucket/selector";
import { Project } from "../../types";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Project;
};

const NewProject = ({ isOpen, onClose, toEdit }: Props) => {
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
        addProject({
          ...data,
          bucketID,
          dueDate: date,
        })
      );
    } else {
      dispatch(
        addProject({
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
                placeholder="Nombre"
                defaultValue={toEdit?.name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={toEdit?.description}
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={toEdit?.amountGoal}
                placeholder="Cuanto quieres  ahorrar?"
                {...register("amountGoal", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <Stack w="full">
                <Text> Fecha Objetivo</Text>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  locale="es"
                  customInput={<ExampleCustomInput />}
                />
              </Stack>
            </VStack>
          </Box>
        </form>
      </VStack>
    </Modal>
  );
};

export default NewProject;
