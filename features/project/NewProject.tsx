import React, { useState, forwardRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import {
  Box,
  Button,
  Input,
  VStack,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import add from "date-fns/add";
import { addProject, updateProject } from "./projectsSlice";
import parseISO from "date-fns/parseISO";
import { getBucketID, getUserName } from "../bucket/selector";
import { Project } from "../../types";
import NumberInput from "../../components/NumberInput";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Project;
};

const NewProject = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.endDate)) : add(new Date(), { months: 1 })
  );
  const [startDate, setStartDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.startDate)) : new Date()
  );
  const bucketID = useSelector(getBucketID);
  const userName = useSelector(getUserName);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (toEdit) {
      setDate(new Date(parseISO(toEdit.endDate)));
      setStartDate(new Date(parseISO(toEdit.startDate)));
    } else {
      setDate(add(new Date(), { months: 1 }));
    }
    reset();
  }, [reset, toEdit]);

  const handleClose = useCallback(() => {
    reset();
    setDate(add(new Date(), { months: 1 }));
    onClose();
  }, [reset, onClose]);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (!toEdit) {
      dispatch(
        addProject({
          ...data,
          bucketID,
          initAmount: data.initAmount || 0,
          endDate: date,
          userName,
        })
      );
    } else {
      dispatch(
        updateProject({
          ...toEdit,
          ...data,
          initAmount: data.initAmount || 0,
          endDate: date?.toISOString(),
          startDate: startDate?.toISOString(),
        })
      );
    }

    handleClose();
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Proyecto" : "Nuevo Proyecto",
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
      <Stack spacing={4} align="left">
        <Text>Ingresa el monto y la descripción del proyecto</Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <Input
                placeholder="Nombre"
                defaultValue={toEdit?.name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>Este Campo es Requerido</span>}
              <Textarea
                defaultValue={toEdit?.description}
                placeholder="Descripción"
                {...register("description", { required: false })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <NumberInput
                defaultValue={toEdit?.amountGoal}
                name="amountGoal"
                register={register}
                placeholder={"¿Cuanto quieres  ahorrar?"}
                required
              />

              {errors.amountGoal && <span>Este Campo es Requerido</span>}
              <NumberInput
                defaultValue={toEdit?.initAmount}
                name="initAmount"
                placeholder={"¿Tienes algo ya ahorrado?"}
                register={register}
              />
              {toEdit?.startDate && (
                <Stack w="full">
                  <Text> Fecha Inicio</Text>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale="es"
                    customInput={<ExampleCustomInput />}
                  />
                </Stack>
              )}
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
      </Stack>
    </Modal>
  );
};

export default NewProject;
